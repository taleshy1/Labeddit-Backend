import { Request, Response } from "express";
import { CommentBusiness } from "../business/commentBusiness";
import { ZodError } from "zod";
import { BaseError } from "../error/BaseError";
import { getCommentSchema } from "../dtos/posts/comments/getComments.dto";
import { createCommentSchema } from "../dtos/posts/comments/createComment.dto";
import { deleteCommentSchema } from "../dtos/posts/comments/deleteComment.dto";
import { editCommentSchema } from "../dtos/posts/comments/editComment.dto";
import { likeDislikeCommentSchema } from "../dtos/posts/comments/likeorDislikeComment.dto";

export class CommentController {
  constructor(
    private commentBusiness: CommentBusiness
  ) { }

  public getComments = async (req: Request, res: Response) => {
    try {
      const input = getCommentSchema.parse({
        postId: req.params.id,
        token: req.headers.authorization
      })
      const output = await this.commentBusiness.getComments(input)
      res.status(200).send(output)
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public createComment = async (req: Request, res: Response) => {
    try {
      const input = createCommentSchema.parse({
        token: req.headers.authorization,
        postId: req.params.id,
        content: req.body.content
      })

      const output = await this.commentBusiness.createComment(input)

      res.status(201).send(output)
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public deleteComment = async (req: Request, res: Response) => {
    try {
      const input = deleteCommentSchema.parse({
        token: req.headers.authorization,
        postId: req.params.id,
        commentId: req.params.commentId
      })

      const output = await this.commentBusiness.deleteComment(input)
      res.status(200).send(output)
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public editComment = async (req: Request, res: Response) => {
    try {
      const input = editCommentSchema.parse({
        token: req.headers.authorization,
        postId: req.params.id,
        commentId: req.params.commentId,
        content: req.body.content
      })
      const output = await this.commentBusiness.editComment(input)

      res.status(204).send(output)
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public likeDislikeComment = async (req: Request, res: Response) => {
    try {
      const input = likeDislikeCommentSchema.parse({
        token: req.headers.authorization,
        postId: req.params.id,
        commentId: req.params.commentId,
        like: req.body.like
      })
      const output = await this.commentBusiness.likeDislikeComment(input)
      res.status(200).send(output)
    } catch (error) {
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