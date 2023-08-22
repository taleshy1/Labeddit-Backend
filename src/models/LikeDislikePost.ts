export interface LikeDislikeDB {
  user_id: string,
  post_id: string,
  like: 1 | 0,
}

export interface LikeDislikeModel {
  userId: string,
  postId: string,
  like: boolean
}

export class LikeDislike {
  constructor(
    private userId: string,
    private postId: string,
    private like: boolean
  ) { }

  public getUserId(): string {
    return this.userId
  }
  public setUserId(value: string): void {
    this.userId = value
  }
  public getPostId(): string {
    return this.postId
  }
  public setPost(value: string): void {
    this.postId = value
  }
  public getLike(): boolean {
    return this.like
  }
  public setLikeId(value: boolean): void {
    this.like = value
  }

  public likeDislikeToDB(): LikeDislikeDB {
    return {
      user_id: this.userId,
      post_id: this.postId,
      like: this.like ? 1 : 0
    }
  }

  public likeToModel(): LikeDislikeModel {
    return {
      userId: this.userId,
      postId: this.postId,
      like: this.like
    }
  }
}