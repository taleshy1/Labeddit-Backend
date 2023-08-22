import { Request, Response } from "express";
import { commentBusiness } from "../business/commentBusiness";
import { ZodError } from "zod";
import { BaseError } from "../error/BaseError";
import { getCommentSchema } from "../dtos/posts/comments/getComments.dto";

export class CommentController {
  constructor(
    private commentBusiness: commentBusiness
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