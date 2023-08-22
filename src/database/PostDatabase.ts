
import { PostsDB } from "../models/Posts";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase {
  public static POSTS_TABLE = 'posts'

  public async getPosts() {
    const result: Array<PostsDB> = await BaseDatabase.connection(PostsDatabase.POSTS_TABLE)
    return result
  }

  public async getPostById(id: string) {
    const result: Array<PostsDB> = await BaseDatabase.connection(PostsDatabase.POSTS_TABLE).where({ id })
    return result
  }

  public async createPost(newPost: PostsDB) {
    await BaseDatabase
      .connection(PostsDatabase.POSTS_TABLE)
      .insert(newPost)
  }

  public async editPost(newPost: PostsDB, id: string) {
    await BaseDatabase
      .connection(PostsDatabase.POSTS_TABLE)
      .update(newPost).where({ id })
  }

  public async deletePost(id: string) {
    await BaseDatabase
      .connection(PostsDatabase.POSTS_TABLE)
      .delete().where({ id })
  }
}