import express from "express"
import { PostBusiness } from "../business/postBusiness"
import { PostsDatabase } from "../database/PostDatabase"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"
import { LikeOrDislikeDatabase } from "../database/LikeDislikeDatabase"
import { UsersDatabase } from "../database/UserDatabase"
import { PostsController } from "../controller/postController"
import { CommentsDatabase } from "../database/CommentsDatabase"

export const postRouter = express.Router()

const postController = new PostsController(
  new PostBusiness(
    new PostsDatabase(),
    new IdGenerator(),
    new TokenManager(),
    new LikeOrDislikeDatabase(),
    new UsersDatabase(),
  )
)

postRouter.get("/", postController.getPosts)
postRouter.get("/:id", postController.getPostById)
postRouter.post("/", postController.createPosts)
postRouter.put("/:id", postController.editPost)
postRouter.put("/:id/like", postController.likeOrDislike)
postRouter.delete("/:id", postController.deletePost)