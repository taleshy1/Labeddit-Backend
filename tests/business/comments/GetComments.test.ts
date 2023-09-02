import { CommentBusiness } from "../../../src/business/commentBusiness"
import { CommentsDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { LikeDislikeCommentDatabaseMock } from "../../mocks/LikeDislikeCommentDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { getCommentSchema } from "../../../src/dtos/posts/comments/getComments.dto"

describe("Get comments test", () => {
  const commentBusiness = new CommentBusiness(
    new CommentsDatabaseMock(),
    new LikeDislikeCommentDatabaseMock(),
    new TokenManagerMock(),
    new PostDatabaseMock(),
    new IdGeneratorMock()
  )
  test("Return all the comments from a post", async () => {
    const input = getCommentSchema.parse({
      token: "token-mock-user",
      postId: "post-id-mock2"
    })
    const output = await commentBusiness.getComments(input)
    expect(output).toContainEqual({
      id: "comment-id-mock2",
      creatorId: "id-mock-admin",
      postId: "post-id-mock2",
      content: "comment content mock 2",
      like: 0,
      dislike: 0,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      creatorName: "admin-test",
      userLiked: 0
    })
  })
})