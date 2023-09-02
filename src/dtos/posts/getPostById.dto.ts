import { PostsModel } from "../../models/Posts";
import z from "zod"

export interface GetPostByIdInputDTO {
  token: string,
  id: string
}

export type GetPostByIdOutputDTO = PostsModel

export const GetPostByIdSchema = z.object({
  token: z.string().min(1),
  id: z.string().min(1)
}).transform(data => data as GetPostByIdInputDTO)