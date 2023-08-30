import express from "express"
import { UserController } from "../controller/userController"
import { UserBusiness } from "../business/userBusiness"
import { UsersDatabase } from "../database/UserDatabase"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"
import { HashManager } from "../services/HashManager"

export const userRouter = express.Router()

const userController = new UserController(
  new UserBusiness(
    new UsersDatabase(),
    new IdGenerator(),
    new TokenManager(),
    new HashManager()
  )
)

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)