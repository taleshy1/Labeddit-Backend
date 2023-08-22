import { LikeDislikeCommentDB } from "../models/LikeDislikeComment";
import { BaseDatabase } from "./BaseDatabase";

export class LikeDislikeCommentDatabase extends BaseDatabase {
  private static LIKE_DISLIKE_TABLE = 'like_dislike_comments'

  public getLikeDislikeCommentTable = async (id: string, creatorId: string): Promise<Array<LikeDislikeCommentDB>> => {
    const result = BaseDatabase.connection(LikeDislikeCommentDatabase.LIKE_DISLIKE_TABLE).where({ post_id: id }).andWhere({ user_id: creatorId })
    return result
  }
}