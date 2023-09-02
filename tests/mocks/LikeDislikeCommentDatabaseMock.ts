import { BaseDatabase } from "../../src/database/BaseDatabase"
import { LikeDislikeCommentDB } from "../../src/models/LikeDislikeComment"

const mockLikeDislikeComment: Array<LikeDislikeCommentDB> = [{
  comment_id: "comment-id-mock",
  user_id: "id-mock-admin",
  like: 1
}, {
  comment_id: "comment-id-mock2",
  user_id: "id-mock-user",
  like: 0
}]

export class LikeDislikeCommentDatabaseMock extends BaseDatabase {

  private static LIKE_DISLIKE_TABLE = 'like_dislike_comments'

  public getLikeDislikeCommentTable = async (id: string, creatorId: string): Promise<Array<LikeDislikeCommentDB>> => {
    return mockLikeDislikeComment
  }

  public getUserLikedPost = async (id: string, userId: string): Promise<Array<LikeDislikeCommentDB>> => {
    const result = mockLikeDislikeComment.filter((mock) => mock.comment_id === id && mock.user_id === userId)
    return result
  }

  public createLikeDislikeComment = async (newLikeDislikeComment: LikeDislikeCommentDB): Promise<void> => {
    return
  }

  public removeLikeDislikeComment = async (postId: string, userId: string): Promise<void> => {
    return
  }

  public updateLikeDislikeComment = async (postId: string, userId: string, newLikeDislikeComment: LikeDislikeCommentDB): Promise<void> => {
    return
  }
}