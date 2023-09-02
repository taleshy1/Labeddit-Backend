import { CommentsDatabase } from "../database/CommentsDatabase";
import { LikeDislikeCommentDatabase } from "../database/LikeDislikeCommentDatabase";
import { PostsDatabase } from "../database/PostDatabase";
import {
  CreateCommentInputDTO,
  CreateCommentOutputDTO,
} from "../dtos/posts/comments/createComment.dto";
import {
  DeleteCommentInputDTO,
  DeleteCommentOutputDTO,
} from "../dtos/posts/comments/deleteComment.dto";
import {
  EditCommentInputDTO,
  EditCommentOutputDTO,
} from "../dtos/posts/comments/editComment.dto";
import {
  GetCommentsInputDTO,
  GetCommentsOutputDTO,
} from "../dtos/posts/comments/getComments.dto";
import {
  LikeOrDislikeCommentInputDTO,
  likeDislikeCommentOutputDTO,
} from "../dtos/posts/comments/likeorDislikeComment.dto";
import { BadRequestError } from "../error/BadRequestError";
import { NotAuthenticatedError } from "../error/NotAuthenticatedError";
import { NotFoundError } from "../error/NotFoundError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Comments, CommentsWithCreatorInfo } from "../models/Comments";
import { LikeDislikeComment } from "../models/LikeDislikeComment";
import { Posts } from "../models/Posts";
import { userRole } from "../models/Users";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { IdGenerator } from "../services/idGenerator";

export class CommentBusiness {
  constructor(
    private commentDatabase: CommentsDatabase,
    private likeDislikeCommentDatabase: LikeDislikeCommentDatabase,
    private tokenManager: TokenManager,
    private postDatabase: PostsDatabase,
    private idGenerator: IdGenerator
  ) { }

  public getComments = async (
    input: GetCommentsInputDTO
  ): Promise<GetCommentsOutputDTO> => {
    const { token, postId } = input;

    const tokenPayload: TokenPayload | null =
      this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new NotAuthenticatedError();
    }

    const [post] = await this.postDatabase.getPostById(postId);

    if (!post) {
      throw new NotFoundError("Post não encontrado");
    }

    const commentsDB = await this.commentDatabase.getComments(postId);

    const commentsModelPromise = commentsDB.map(async (comment) => {
      const [userLiked] =
        await this.likeDislikeCommentDatabase.getUserLikedPost(
          comment.id,
          tokenPayload.id
        );
      return new CommentsWithCreatorInfo(
        comment.id,
        comment.creator_id,
        comment.post_id,
        comment.content,
        comment.like,
        comment.dislike,
        comment.created_at,
        comment.updated_at,
        userLiked ? userLiked.like : undefined,
        comment.creatorName
      ).toModelWithCreatorName();
    });
    const commentsModel = await Promise.all(commentsModelPromise);

    return commentsModel;
  };

  public createComment = async (
    input: CreateCommentInputDTO
  ): Promise<CreateCommentOutputDTO> => {
    const { token, postId, content } = input;

    const tokenPayload: TokenPayload | null =
      this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new NotAuthenticatedError();
    }

    const [post] = await this.postDatabase.getPostById(postId);

    if (!post) {
      throw new NotFoundError("Post não encontrado");
    }

    const id = this.idGenerator.generate();

    const newComment = new Comments(
      id,
      tokenPayload.id,
      postId,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    ).toDbModel();
    await this.commentDatabase.createComment(newComment);
    const updatedPost = new Posts(
      post.id,
      post.creator_id,
      post.content,
      post.comments + 1,
      post.likes,
      post.dislikes,
      post.created_at,
      post.updated_at
    );
    await this.postDatabase.editPost(updatedPost.toDBModel(), postId);
    return undefined;
  };

  public deleteComment = async (
    input: DeleteCommentInputDTO
  ): Promise<DeleteCommentOutputDTO> => {
    const { token, postId, commentId } = input;

    const tokenPayload: TokenPayload | null =
      this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new NotAuthenticatedError();
    }

    const [post] = await this.postDatabase.getPostById(postId);

    if (!post) {
      throw new NotFoundError("Post não encontrado");
    }

    const [comment] = await this.commentDatabase.getCommentById(commentId);

    if (!comment) {
      throw new NotFoundError("Comentario não encontrado");
    }

    if (
      tokenPayload.role !== userRole.ADMIN &&
      tokenPayload.id !== comment.creator_id
    ) {
      throw new UnauthorizedError();
    }

    await this.commentDatabase.deleteComent(commentId);

    return "Comentario removido com sucesso";
  };

  public editComment = async (
    input: EditCommentInputDTO
  ): Promise<EditCommentOutputDTO> => {
    const { token, postId, commentId, content } = input;
    const tokenPayload: TokenPayload | null =
      this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new NotAuthenticatedError();
    }

    const [post] = await this.postDatabase.getPostById(postId);

    if (!post) {
      throw new NotFoundError("Post não encontrado");
    }

    const [comment] = await this.commentDatabase.getCommentById(commentId);

    if (!comment) {
      throw new NotFoundError("Comentario não encontrado");
    }

    if (tokenPayload.id !== comment.creator_id) {
      throw new UnauthorizedError();
    }

    const newComment = new Comments(
      comment.id,
      comment.creator_id,
      comment.post_id,
      content,
      comment.like,
      comment.dislike,
      comment.created_at,
      new Date().toISOString()
    );
    await this.commentDatabase.editComment(newComment.toDbModel(), commentId);
    return "Comentario atualizado com sucesso";
  };

  public likeDislikeComment = async (
    input: LikeOrDislikeCommentInputDTO
  ): Promise<likeDislikeCommentOutputDTO> => {
    const { token, like, postId, commentId } = input;
    let removeLikeOrDislike = false;
    let wasLikedOrDisliked = false;
    const tokenPayload: TokenPayload | null =
      this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new NotAuthenticatedError();
    }

    const [post] = await this.postDatabase.getPostById(postId);

    if (!post) {
      throw new NotFoundError("Post não encontrado");
    }

    const [comment] = await this.commentDatabase.getCommentById(commentId);

    if (!comment) {
      throw new NotFoundError("Comentario não encontrado");
    }

    if (tokenPayload.id === comment.creator_id) {
      throw new BadRequestError(
        "O criador não pode dar like/dislike em seu comentario"
      );
    }

    const [commemtOnLikeTable] =
      await this.likeDislikeCommentDatabase.getLikeDislikeCommentTable(
        comment.id,
        tokenPayload.id
      );
    const newLikeDislikeCommentDB = new LikeDislikeComment(
      tokenPayload.id,
      commentId,
      like
    ).likeDislikeToDB();
    if (!commemtOnLikeTable) {
      this.likeDislikeCommentDatabase.createLikeDislikeComment(
        newLikeDislikeCommentDB
      );
    } else if (like) {
      if (commemtOnLikeTable.like) {
        this.likeDislikeCommentDatabase.removeLikeDislikeComment(
          commentId,
          tokenPayload.id
        );
        removeLikeOrDislike = true;
      } else {
        this.likeDislikeCommentDatabase.updateLikeDislikeComment(
          commentId,
          tokenPayload.id,
          newLikeDislikeCommentDB
        );
        wasLikedOrDisliked = !wasLikedOrDisliked;
      }
    } else {
      if (!commemtOnLikeTable.like) {
        this.likeDislikeCommentDatabase.removeLikeDislikeComment(
          commentId,
          tokenPayload.id
        );
        removeLikeOrDislike = true;
      } else {
        this.likeDislikeCommentDatabase.updateLikeDislikeComment(
          commentId,
          tokenPayload.id,
          newLikeDislikeCommentDB
        );
        wasLikedOrDisliked = !wasLikedOrDisliked;
      }
    }

    if (like) {
      const newComment = new Comments(
        comment.id,
        comment.creator_id,
        comment.post_id,
        comment.content,
        removeLikeOrDislike ? comment.like - 1 : comment.like + 1,
        wasLikedOrDisliked ? comment.dislike - 1 : comment.dislike,
        comment.created_at,
        comment.updated_at
      ).toDbModel();
      await this.commentDatabase.editComment(newComment, commentId);
    } else {
      const newComment = new Comments(
        comment.id,
        comment.creator_id,
        comment.post_id,
        comment.content,
        wasLikedOrDisliked ? comment.like - 1 : comment.like,
        removeLikeOrDislike ? comment.dislike - 1 : comment.dislike + 1,
        comment.created_at,
        comment.updated_at
      ).toDbModel();
      await this.commentDatabase.editComment(newComment, commentId);
    }
  };
}
