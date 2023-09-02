import { Request, Response } from "express";
import { PostsModel } from "../models/Posts";
import { ZodError } from "zod";
import { BaseError } from "../error/BaseError";
import { EditPostSchema } from "../dtos/posts/editPost.dto";
import { DeletePostOutputDTO, DeletePostSchema } from "../dtos/posts/deletePost.dto";
import { LikeOrDislikeOutputDTO, LikeOrDislikeSchema } from "../dtos/posts/likeOrDislike.dto";
import { GetPostsSchema } from "../dtos/posts/getPosts.dto";
import { PostBusiness } from "../business/postBusiness";
import { CreatePostOutputDTO, CreatePostSchema } from "../dtos/posts/createPost.dto";
import { GetPostByIdSchema } from "../dtos/posts/getPostById.dto";

export class PostsController {
  constructor(
    private postBusiness: PostBusiness
  ) { }

  public getPostById = async (req: Request, res: Response) => {
    try {
      const input = GetPostByIdSchema.parse({
        token: req.headers.authorization,
        id: req.params.id
      })
      const output = await this.postBusiness.getPostById(input)
      res.status(200).send(output)
    } catch (error) {
      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public getPosts = async (req: Request, res: Response) => {
    try {
      const input = GetPostsSchema.parse({
        token: req.headers.authorization
      })

      const output: Array<PostsModel> = await this.postBusiness.getPosts(input)

      res.status(200).send(output)

    } catch (error) {

      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public createPosts = async (req: Request, res: Response) => {
    try {
      const input = CreatePostSchema.parse({
        content: req.body.content,
        token: req.headers.authorization
      })

      const output: CreatePostOutputDTO = await this.postBusiness.createPost(input)

      res.status(201).send(output)

    } catch (error) {
      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public editPost = async (req: Request, res: Response) => {
    try {
      const input = EditPostSchema.parse({
        idToEdit: req.params.id,
        content: req.body.content,
        token: req.headers.authorization
      })
      const output = await this.postBusiness.editPost(input)

      res.status(200).send(output)
    } catch (error) {
      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeletePostSchema.parse({
        idToDelete: req.params.id,
        token: req.headers.authorization
      })

      const output: DeletePostOutputDTO = await this.postBusiness.deletePost(input)

      res.status(200).send(output)

    } catch (error) {
      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }


  public likeOrDislike = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikeSchema.parse({
        postId: req.params.id,
        like: req.body.like,
        token: req.headers.authorization
      })

      const output: LikeOrDislikeOutputDTO = await this.postBusiness.likeOrDislike(input)

      res.status(200).send(output)
    } catch (error) {

      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}