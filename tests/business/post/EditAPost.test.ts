import { PostBusiness } from "../../../src/business/postBusiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { LikeOrDislikeDatabaseMock } from "../../mocks/LikeDislikeDatabaseMock"
import { EditPostSchema } from "../../../src/dtos/posts/editPost.dto"

describe("Edit post test", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new LikeOrDislikeDatabaseMock(),
    new UserDatabaseMock()
  )
  test("The post is successfully edited", async () => {
    const input = EditPostSchema.parse({
      content: "Content",
      token: "token-mock-user",
      idToEdit: "post-id-mock1"
    })

    const output = await postBusiness.editPost(input)
    expect(output).toEqual("Post editado com sucesso")
  })

}
)