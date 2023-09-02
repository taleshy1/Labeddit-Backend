import { PostBusiness } from "../../../src/business/postBusiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { LikeOrDislikeDatabaseMock } from "../../mocks/LikeDislikeDatabaseMock"
import { LikeOrDislikeSchema } from "../../../src/dtos/posts/likeOrDislike.dto"

describe("Edit post test", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new LikeOrDislikeDatabaseMock(),
    new UserDatabaseMock()
  )
  test("The post is successfully edited", async () => {
    const input = LikeOrDislikeSchema.parse({
      token: "token-mock-user",
      like: true,
      postId: "post-id-mock2"
    })

    const output = await postBusiness.likeOrDislike(input)
    expect(output).toBeUndefined()
  })

}
)