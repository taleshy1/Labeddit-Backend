import { PostBusiness } from "../../../src/business/postBusiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { LikeOrDislikeDatabaseMock } from "../../mocks/LikeDislikeDatabaseMock"
import { GetPostsSchema } from "../../../src/dtos/posts/getPosts.dto"

describe("Get a post by id", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new LikeOrDislikeDatabaseMock(),
    new UserDatabaseMock()
  )
  test("return a post", async () => {
    const input = GetPostsSchema.parse({
      token: "token-mock-user"
    })

    const output = await postBusiness.getPosts(input)

    expect(output).toContainEqual({
      id: "post-id-mock2",
      content: "Content mock2",
      comments: 0,
      likes: 0,
      dislikes: 0,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      creator: {
        id: "id-mock-admin",
        name: "admin-test"
      },
      userLiked: undefined
    })
  })
})