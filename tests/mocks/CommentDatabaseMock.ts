import { BaseDatabase } from "../../src/database/BaseDatabase"

import { CommentsDB, ComentsDBWithCreatorName } from "../../src/models/Comments"

const mockComments: Array<CommentsDB> = [{
  id: "comment-id-mock",
  creator_id: "id-mock-user",
  post_id: "post-id-mock1",
  content: "comment content mock",
  like: 0,
  dislike: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}, {
  id: "comment-id-mock2",
  creator_id: "id-mock-admin",
  post_id: "post-id-mock2",
  content: "comment content mock 2",
  like: 0,
  dislike: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}]

const mockCommentsWithCreatorData: Array<ComentsDBWithCreatorName> = [{
  id: "comment-id-mock",
  creator_id: "id-mock-user",
  post_id: "post-id-mock1",
  content: "comment content mock",
  like: 0,
  dislike: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  creatorName: "user-test"
},
{
  id: "comment-id-mock2",
  creator_id: "id-mock-admin",
  post_id: "post-id-mock2",
  content: "comment content mock 2",
  like: 0,
  dislike: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  creatorName: "admin-test"
}]

export class CommentsDatabaseMock extends BaseDatabase {
  private static TABLE_COMMENTS = 'comments'

  public async getComments(id: string): Promise<Array<ComentsDBWithCreatorName>> {
    return mockCommentsWithCreatorData
  }
  public async createComment(comment: CommentsDB): Promise<void> {
    return
  }
  public getCommentById = async (id: string): Promise<CommentsDB[]> => {
    const result: Array<CommentsDB> = mockComments.filter((comment) => comment.id === id)
    return result
  }
  public editComment = async (newComment: CommentsDB, id: string): Promise<void> => {
    return
  }
  public deleteComent = async (id: string): Promise<void> => {
    return
  }
}