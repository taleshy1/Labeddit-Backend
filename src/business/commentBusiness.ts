import { CommentsDatabase } from "../database/CommentsDatabase";
import { LikeDislikeCommentDatabase } from "../database/LikeDislikeCommentDatabase";
import { PostsDatabase } from "../database/PostDatabase";
import { GetCommentsInputDTO, GetCommentsOutputDTO } from "../dtos/posts/comments/getComments.dto";
import { NotAuthenticatedError } from "../error/NotAuthenticatedError";
import { NotFoundError } from "../error/NotFoundError";
import { Comments, CommentsWithCreatorInfo } from "../models/Comments";
import { TokenManager, TokenPayload } from "../services/TokenManager";

export class commentBusiness {
  constructor(
    private commentDatabase: CommentsDatabase,
    private likeDislikeCommentDatabase: LikeDislikeCommentDatabase,
    private tokenManager: TokenManager,
    private postDatabase: PostsDatabase
  ) { }

  public getComments = async (input: GetCommentsInputDTO): Promise<GetCommentsOutputDTO> => {
    const { token, postId } = input

    const tokenPayload: TokenPayload | null = this.tokenManager.getPayload(token)

    if (!tokenPayload) {
      throw new NotAuthenticatedError
    }

    const [post] = await this.postDatabase.getPostById(postId)

    if (!post) {
      throw new NotFoundError("Post não encontrado")
    }

    const commentsDB = await this.commentDatabase.getComments(postId)

    const commentsModel = commentsDB.map(comment => {
      return new CommentsWithCreatorInfo(
        comment.id,
        comment.creator_id,
        comment.post_id,
        comment.content,
        comment.like,
        comment.dislike,
        comment.created_at,
        comment.updated_at,
        comment.creatorName
      ).toModel()
    })
    return commentsModel
  }
}