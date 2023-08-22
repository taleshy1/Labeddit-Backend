export interface LikeDislikeCommentDB {
  user_id: string,
  comment_id: string,
  like: 1 | 0,
}

export interface LikeDislikeCommentModel {
  userId: string,
  commentId: string,
  like: boolean
}

export class LikeDislikeComment {
  constructor(
    private userId: string,
    private commentId: string,
    private like: boolean
  ) { }

  public getUserId(): string {
    return this.userId
  }
  public setUserId(value: string): void {
    this.userId = value
  }
  public getcommentId(): string {
    return this.commentId
  }
  public setPost(value: string): void {
    this.commentId = value
  }
  public getLike(): boolean {
    return this.like
  }
  public setLikeId(value: boolean): void {
    this.like = value
  }

  public likeDislikeToDB(): LikeDislikeCommentDB {
    return {
      user_id: this.userId,
      comment_id: this.commentId,
      like: this.like ? 1 : 0
    }
  }

  public likeToModel(): LikeDislikeCommentModel {
    return {
      userId: this.userId,
      commentId: this.commentId,
      like: this.like
    }
  }
}