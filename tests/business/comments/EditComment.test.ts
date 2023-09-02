import { CommentBusiness } from "../../../src/business/commentBusiness"
import { CommentsDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { LikeDislikeCommentDatabaseMock } from "../../mocks/LikeDislikeCommentDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { editCommentSchema } from "../../../src/dtos/posts/comments/editComment.dto"

describe("Edit a comment test", () => {
  const commentBusiness = new CommentBusiness(
    new CommentsDatabaseMock(),
    new LikeDislikeCommentDatabaseMock(),
    new TokenManagerMock(),
    new PostDatabaseMock(),
    new IdGeneratorMock()
  )
  test("Comment sucessfuly edited", async () => {
    const input = editCommentSchema.parse({
      token: "token-mock-user",
      postId: "post-id-mock2",
      commentId: "comment-id-mock",
      content: "New Content"
    })
    const output = await commentBusiness.editComment(input)
    expect(output).toEqual("Comentario atualizado com sucesso")
  })
})