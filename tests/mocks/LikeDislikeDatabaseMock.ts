import { BaseDatabase } from "../../src/database/BaseDatabase"
import { LikeDislikeDB } from "../../src/models/LikeDislikePost"

const mockLikeDislike: Array<LikeDislikeDB> = [{
  post_id: "post-id-mock1",
  user_id: "id-mock-user",
  like: 1
}, {
  post_id: "post-id-mock2",
  user_id: "id-mock-admin",
  like: 0
}]

export class LikeOrDislikeDatabaseMock extends BaseDatabase {
  public static LIKES_DISLIKES = 'likes_dislikes'

  public getLikeDislikeTable = async (id: string, creatorId: string): Promise<Array<LikeDislikeDB>> => {
    return mockLikeDislike
  }

  public getThisUserLiked = async (id: string, userId: string): Promise<Array<LikeDislikeDB>> => {
    const result = mockLikeDislike.filter((mock) => mock.post_id === id && mock.user_id === userId)
    return result
  }

  public createLikeDislike = async (newLikeDislike: LikeDislikeDB): Promise<void> => {
    return
  }

  public removeLikeDislike = async (postId: string, userId: string): Promise<void> => {
    return
  }

  public updateLikeDislike = async (postId: string, userId: string, newLikeDislike: LikeDislikeDB): Promise<void> => {
    return
  }
}