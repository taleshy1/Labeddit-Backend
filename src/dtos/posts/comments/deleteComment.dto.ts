import { z } from "zod"

export interface DeleteCommentInputDTO {
  postId: string,
  commentId: string,
  token: string
}

export type DeleteCommentOutputDTO = "Comentario removido com sucesso"

export const deleteCommentSchema = z.object({
  postId: z.string(),
  commentId: z.string(),
  token: z.string()
}).transform(data => data as DeleteCommentInputDTO)