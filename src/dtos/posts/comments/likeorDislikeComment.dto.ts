import z from "zod"

export interface LikeOrDislikeInputDTO {
  postId: string,
  commentId: string,
  like: boolean,
  token: string,
}

export type LikeOrDislikeOutputDTO = undefined

export const LikeOrDislikeSchema = z.object({
  postId: z.string().min(1),
  like: z.boolean(),
  token: z.string().min(1),
  commentId: z.string()
}).transform(data => data as LikeOrDislikeInputDTO)