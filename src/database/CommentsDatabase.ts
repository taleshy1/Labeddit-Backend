import { ComentsDB, ComentsDBWithCreatorName } from "../models/Comments";
import { BaseDatabase } from "./BaseDatabase";
import { UsersDatabase } from "./UserDatabase";

export class CommentsDatabase extends BaseDatabase {
  private static TABLE_COMMENTS = 'comments'

  public getComments = async (id: string): Promise<Array<ComentsDBWithCreatorName>> => {
    const result = await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS).select(
      `${UsersDatabase.USERS_TABLES}.name as creatorName`,
      `${CommentsDatabase.TABLE_COMMENTS}.id`,
      `${CommentsDatabase.TABLE_COMMENTS}.creator_id`,
      `${CommentsDatabase.TABLE_COMMENTS}.post_id`,
      `${CommentsDatabase.TABLE_COMMENTS}.content`,
      `${CommentsDatabase.TABLE_COMMENTS}.like`,
      `${CommentsDatabase.TABLE_COMMENTS}.dislike`,
      `${CommentsDatabase.TABLE_COMMENTS}.created_at`,
      `${CommentsDatabase.TABLE_COMMENTS}.updated_at`,
    ).join(
      `${UsersDatabase.USERS_TABLES}`,
      `${CommentsDatabase.TABLE_COMMENTS}.creator_id`,
      "=",
      `${UsersDatabase.USERS_TABLES}.id`
    ).where({ post_id: id })
    return result
  }

  public createComment = async (comment: ComentsDB): Promise<void> => {
    await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS).insert(comment)
  }

  public async getCommentById(id: string) {
    const result: Array<ComentsDB> = await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS).where({ id })
    return result
  }

  public async editComment(newComment: ComentsDB, id: string) {
    await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .update(newComment).where({ id })
  }
}