import { z } from "zod"
import { CommentsModel } from "../../../models/Comments"

export interface GetCommentsInputDTO {
  postId: string,
  token: string
}

export type GetCommentsOutputDTO = Array<CommentsModel>

export const getCommentSchema = z.object({
  postId: z.string(),
  token: z.string()
}).transform(data => data as GetCommentsInputDTO)