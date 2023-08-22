import { z } from "zod"

export interface EditCommentInputDTO {
  token: string,
  postId: string,
  commentId: string,
  content: string
}

export type EditCommentOutputDTO = "Comentario atualizado com sucesso"

export const editCommentSchema = z.object({
  token: z.string(),
  postId: z.string(),
  commentId: z.string(),
  content: z.string()
}).transform(data => data as EditCommentInputDTO)