import { LikeDislikeDB } from "../models/LikeDislikePost";
import { BaseDatabase } from "./BaseDatabase";

export class LikeOrDislikeDatabase extends BaseDatabase {
  public static LIKES_DISLIKES = 'likes_dislikes'

  public getLikeDislikeTable = async (id: string, creatorId: string): Promise<Array<LikeDislikeDB>> => {
    const result = BaseDatabase.connection(LikeOrDislikeDatabase.LIKES_DISLIKES).where({ post_id: id }).andWhere({ user_id: creatorId })
    return result
  }

  public createLikeDislike = async (newLikeDislike: LikeDislikeDB): Promise<void> => {
    await BaseDatabase
      .connection(LikeOrDislikeDatabase.LIKES_DISLIKES)
      .insert(newLikeDislike)
    return
  }

  public removeLikeDislike = async (postId: string, userId: string): Promise<void> => {
    await BaseDatabase.connection(LikeOrDislikeDatabase.LIKES_DISLIKES).delete().where({ post_id: postId }).andWhere({ user_id: userId })
  }

  public updateLikeDislike = async (postId: string, userId: string, newLikeDislike: LikeDislikeDB): Promise<void> => {
    await BaseDatabase.connection(LikeOrDislikeDatabase.LIKES_DISLIKES).update(newLikeDislike).where({ post_id: postId }).andWhere({ user_id: userId })
    return
  }
}