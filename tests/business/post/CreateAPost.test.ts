import { PostBusiness } from "../../../src/business/postBusiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { LikeOrDislikeDatabaseMock } from "../../mocks/LikeDislikeDatabaseMock"
import { CreatePostSchema } from "../../../src/dtos/posts/createPost.dto"

describe("Create post test", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new LikeOrDislikeDatabaseMock(),
    new UserDatabaseMock()
  )
  test("post successfully created", async () => {
    const input = CreatePostSchema.parse({
      content: "Content",
      token: "token-mock-user"
    })

    const output = await postBusiness.createPost(input)
    expect(output).toBeUndefined()
  })

}
)