import { CommentsWithCreatorInfo } from "./Comments";

export interface PostsDB {
  id: string,
  creator_id: string,
  content: string,
  comments: number,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string,
}

export interface PostsModel {
  id: string,
  creator_id?: string,
  content: string,
  comments: number,
  likes: number,
  dislikes: number,
  createdAt: string,
  updatedAt: string,
  creator?: { id: string, name: string }
}

export class Posts {
  constructor(
    private id: string,
    private creatorId: string,
    private content: string,
    private comments: number,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
  ) { }

  public getId(): string {
    return this.id
  }

  public setId(v: string): void {
    this.id = v;
  }

  public getCreatorId(): string {
    return this.creatorId
  }

  public setCreatorId(v: string): void {
    this.creatorId = v;
  }

  public getContent(): string {
    return this.content
  }

  public setContent(v: string): void {
    this.content = v;
  }

  public getComments(): number {
    return this.comments
  }

  public setComments(value: number): void {
    this.comments = value
  }

  public getLikes(): number {
    return this.likes
  }

  public setLikes(v: number): void {
    this.likes = v;
  }

  public getDislikes(): number {
    return this.dislikes
  }

  public setDislikes(v: number): void {
    this.dislikes = v;
  }

  public getCreatedAt(): string {
    return this.createdAt
  }

  public setCreatedAt(v: string): void {
    this.createdAt = v;
  }

  public getUpdatedAt(): string {
    return this.updatedAt
  }

  public setUpdatedAt(v: string): void {
    this.updatedAt = v;
  }

  public toDBModel(): PostsDB {
    return {
      id: this.id,
      creator_id: this.creatorId,
      content: this.content,
      comments: this.comments,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    }
  }

  public toBusinessModel(): PostsModel {
    return {
      id: this.id,
      creator_id: this.creatorId,
      content: this.content,
      comments: this.comments,
      likes: this.likes,
      dislikes: this.dislikes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}


export class PostsWithCreator extends Posts {
  constructor(
    id: string,
    creatorId: string,
    content: string,
    comments: number,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    private name: string
  ) {
    super(id, creatorId, content, comments, likes, dislikes, createdAt, updatedAt);
  }
  public getName(): string {
    return this.name
  }
  public setName(v: string): void {
    this.name = v
  }

  public toBusinessModelWithCreator(): PostsModel {
    return {
      id: this.getId(),
      content: this.getContent(),
      comments: this.getComments(),
      likes: this.getLikes(),
      dislikes: this.getDislikes(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      creator: {
        id: this.getCreatorId(),
        name: this.name
      }
    }
  }
}
