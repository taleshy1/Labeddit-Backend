import { CommentBusiness } from "../../../src/business/commentBusiness"
import { CommentsDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { LikeDislikeCommentDatabaseMock } from "../../mocks/LikeDislikeCommentDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { likeDislikeCommentSchema } from "../../../src/dtos/posts/comments/likeorDislikeComment.dto"

describe("Get comments test", () => {
  const commentBusiness = new CommentBusiness(
    new CommentsDatabaseMock(),
    new LikeDislikeCommentDatabaseMock(),
    new TokenManagerMock(),
    new PostDatabaseMock(),
    new IdGeneratorMock()
  )
  test("Return all the comments from a post", async () => {
    const input = likeDislikeCommentSchema.parse({
      token: "token-mock-user",
      postId: "post-id-mock2",
      like: true,
      commentId: "comment-id-mock2"
    })
    const output = await commentBusiness.likeDislikeComment(input)
    expect(output).toBeUndefined()
  })
})