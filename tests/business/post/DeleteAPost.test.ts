import { PostBusiness } from "../../../src/business/postBusiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { LikeOrDislikeDatabaseMock } from "../../mocks/LikeDislikeDatabaseMock"
import { GetPostsSchema } from "../../../src/dtos/posts/getPosts.dto"
import { DeletePostSchema } from "../../../src/dtos/posts/deletePost.dto"

describe("Delete a post by id", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new LikeOrDislikeDatabaseMock(),
    new UserDatabaseMock()
  )
  test("Post sucessfuly deleted", async () => {
    const input = DeletePostSchema.parse({
      idToDelete: "post-id-mock1",
      token: "token-mock-user"
    })

    const output = await postBusiness.deletePost(input)

    expect(output).toEqual("Post Removido com sucesso")
  })
})