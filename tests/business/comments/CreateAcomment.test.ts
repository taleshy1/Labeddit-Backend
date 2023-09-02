import { CommentBusiness } from "../../../src/business/commentBusiness"
import { CommentsDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { LikeDislikeCommentDatabaseMock } from "../../mocks/LikeDislikeCommentDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { createCommentSchema } from "../../../src/dtos/posts/comments/createComment.dto"

describe("Create a comment test", () => {
  const commentBusiness = new CommentBusiness(
    new CommentsDatabaseMock(),
    new LikeDislikeCommentDatabaseMock(),
    new TokenManagerMock(),
    new PostDatabaseMock(),
    new IdGeneratorMock()
  )
  test("Comment sucessfuly created", async () => {
    const input = createCommentSchema.parse({
      token: "token-mock-user",
      postId: "post-id-mock2",
      content: "any content"
    })
    const output = await commentBusiness.createComment(input)
    expect(output).toBeUndefined()
  })
})