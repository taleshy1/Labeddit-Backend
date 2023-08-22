import { PostsModel } from "../../models/Posts";
import z from "zod"

export interface GetPostsInputDTO {
  token: string
}

export type GetPostsOutputDTO = Array<PostsModel>

export const GetPostsSchema = z.object({
  token: z.string().min(1)
}).transform(data => data as GetPostsInputDTO)