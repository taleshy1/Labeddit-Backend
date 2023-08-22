export interface ComentsDB {
  id: string,
  creator_id: string,
  post_id: string,
  content: string,
  like: number,
  dislike: number,
  created_at: string,
  updated_at: string,
}

export interface ComentsDBWithCreatorName {
  id: string,
  creator_id: string,
  post_id: string,
  content: string,
  like: number,
  dislike: number,
  created_at: string,
  updated_at: string,
  creatorName: string
}

export interface CommentsModel {
  id: string,
  creatorId: string,
  postId: string,
  content: string,
  like: number,
  dislike: number,
  createdAt: string,
  updatedAt: string,
  creatorName?: string
}

export class Comments {
  constructor(
    private id: string,
    private creatorId: string,
    private postId: string,
    private content: string,
    private like: number,
    private dislike: number,
    private createdAt: string,
    private updatedAt: string
  ) { }

  public getId(): string {
    return this.id
  }

  public setId(value: string): void {
    this.id = value
  }

  public getCreatorId(): string {
    return this.creatorId
  }

  public setCreatorId(value: string): void {
    this.creatorId = value
  }

  public getPostId(): string {
    return this.postId
  }

  public setPostId(value: string): void {
    this.postId = value
  }

  public getContent(): string {
    return this.content
  }

  public setContent(value: string): void {
    this.content = value
  }

  public getLike(): number {
    return this.like
  }

  public setLike(value: number): void {
    this.like = value
  }

  public getDislike(): number {
    return this.dislike
  }

  public setDislike(value: number): void {
    this.dislike = value
  }


  public getCreatedAt(): string {
    return this.createdAt
  }

  public setCreatedAt(value: string): void {
    this.createdAt = value
  }


  public getUpdatedAt(): string {
    return this.updatedAt
  }

  public setUpdatedAt(value: string): void {
    this.updatedAt = value
  }

  public toDbModel(): ComentsDB {
    return ({
      id: this.id,
      creator_id: this.creatorId,
      post_id: this.postId,
      content: this.content,
      like: this.like,
      dislike: this.dislike,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    })
  }


  public toModel(): CommentsModel {
    return ({
      id: this.id,
      creatorId: this.creatorId,
      postId: this.postId,
      content: this.content,
      like: this.like,
      dislike: this.dislike,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    })
  }
}

export class CommentsWithCreatorInfo extends Comments {
  constructor(
    id: string,
    creatorId: string,
    postId: string,
    content: string,
    like: number,
    dislike: number,
    createdAt: string,
    updatedAt: string,
    private creatorName: string
  ) {
    super(id, creatorId, postId, content, like, dislike, createdAt, updatedAt)
  }
  public getCreatorName(): string {
    return this.creatorName
  }
  public setCreatorName(value: string): void {
    this.creatorName = value
  }

  public toModelWithCreatorName(): CommentsModel {
    return {
      id: this.getId(),
      creatorId: this.getCreatorId(),
      postId: this.getPostId(),
      content: this.getContent(),
      like: this.getLike(),
      dislike: this.getDislike(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      creatorName: this.creatorName
    }
  }
}