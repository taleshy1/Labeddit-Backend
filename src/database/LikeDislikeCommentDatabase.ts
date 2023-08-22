import { LikeDislikeCommentDB } from "../models/LikeDislikeComment";
import { BaseDatabase } from "./BaseDatabase";

export class LikeDislikeCommentDatabase extends BaseDatabase {
  private static LIKE_DISLIKE_TABLE = 'like_dislike_comments'

  public getLikeDislikeCommentTable = async (id: string, creatorId: string): Promise<Array<LikeDislikeCommentDB>> => {
    const result = BaseDatabase.connection(LikeDislikeCommentDatabase.LIKE_DISLIKE_TABLE).where({ comment_id: id }).andWhere({ user_id: creatorId })
    return result
  }

  public createLikeDislikeComment = async (newLikeDislikeComment: LikeDislikeCommentDB): Promise<void> => {
    await BaseDatabase
      .connection(LikeDislikeCommentDatabase.LIKE_DISLIKE_TABLE)
      .insert(newLikeDislikeComment)
    return
  }

  public removeLikeDislikeComment = async (postId: string, userId: string): Promise<void> => {
    await BaseDatabase.connection(LikeDislikeCommentDatabase.LIKE_DISLIKE_TABLE).delete().where({ comment_id: postId }).andWhere({ user_id: userId })
  }

  public updateLikeDislikeComment = async (postId: string, userId: string, newLikeDislikeComment: LikeDislikeCommentDB): Promise<void> => {
    await BaseDatabase.connection(LikeDislikeCommentDatabase.LIKE_DISLIKE_TABLE).update(newLikeDislikeComment).where({ comment_id: postId }).andWhere({ user_id: userId })
    return
  }
}