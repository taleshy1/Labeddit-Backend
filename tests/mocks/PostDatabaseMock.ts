import { BaseDatabase } from "../../src/database/BaseDatabase"
import { PostsDB } from "../../src/models/Posts"

const mockPosts: Array<PostsDB> = [{
  id: "post-id-mock1",
  creator_id: "id-mock-user",
  content: "Content mock",
  comments: 0,
  likes: 0,
  dislikes: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}, {
  id: "post-id-mock2",
  creator_id: "id-mock-admin",
  content: "Content mock2",
  comments: 0,
  likes: 0,
  dislikes: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}]

export class PostDatabaseMock extends BaseDatabase {
  public static POSTS_TABLE = 'posts'

  public async getPosts(): Promise<Array<PostsDB>> {
    const result: Array<PostsDB> = mockPosts
    return result
  }

  public async getPostById(id: string): Promise<PostsDB[]> {
    const result: Array<PostsDB> = mockPosts.filter((post) => post.id === id)
    return result
  }

  public async createPost(): Promise<void> {
    return
  }

  public async editPost(newPost: PostsDB, id: string): Promise<void> {
    return
  }

  public async deletePost(id: string): Promise<void> {
    return
  }
}