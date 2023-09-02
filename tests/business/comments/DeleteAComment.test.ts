import { CommentBusiness } from "../../../src/business/commentBusiness"
import { CommentsDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { LikeDislikeCommentDatabaseMock } from "../../mocks/LikeDislikeCommentDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { deleteCommentSchema } from "../../../src/dtos/posts/comments/deleteComment.dto"

describe("Delete a comment test", () => {
  const commentBusiness = new CommentBusiness(
    new CommentsDatabaseMock(),
    new LikeDislikeCommentDatabaseMock(),
    new TokenManagerMock(),
    new PostDatabaseMock(),
    new IdGeneratorMock()
  )
  test("Delete a post", async () => {
    const input = deleteCommentSchema.parse({
      token: "token-mock-user",
      postId: "post-id-mock2",
      commentId: "comment-id-mock"
    })
    const output = await commentBusiness.deleteComment(input)
    expect(output).toEqual("Comentario removido com sucesso")
  })
})