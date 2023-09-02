import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { UserBusiness } from "../../../src/business/userBusiness"
import { LoginSchema } from "../../../src/dtos/users/login.dto"


describe("Login test", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("login successful", async () => {
    const input = LoginSchema.parse({
      email: "userTest@email.com",
      password: "user123"
    })
    const output = await userBusiness.login(input)

    expect(output).toEqual({
      message: "Login efetuado com sucesso",
      token: "token-mock-user"
    })
  })
})