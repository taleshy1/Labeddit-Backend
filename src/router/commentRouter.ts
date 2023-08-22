import express from "express"
import { CommentController } from "../controller/commentControlle"
import { commentBusiness } from "../business/commentBusiness"
import { CommentsDatabase } from "../database/CommentsDatabase"
import { LikeDislikeCommentDatabase } from "../database/LikeDislikeCommentDatabase"
import { TokenManager } from "../services/TokenManager"
import { PostsDatabase } from "../database/PostDatabase"

export const commentRouter = express.Router()

const commentController = new CommentController(
  new commentBusiness(
    new CommentsDatabase(),
    new LikeDislikeCommentDatabase(),
    new TokenManager(),
    new PostsDatabase()
  )
)
commentRouter.get("/", commentController.getComments)