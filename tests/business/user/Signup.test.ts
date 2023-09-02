import { UserBusiness } from "../../../src/business/userBusiness"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { SignupSchema } from "../../../src/dtos/users/signup.dto"


describe("Signup test", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("account successfully created ", async () => {
    const input = SignupSchema.parse({
      name: "Anyname",
      email: "newUserEmail@email.com",
      password: "newPassword123"
    })
    const output = await userBusiness.signup(input)

    expect(output).toEqual({
      message: "Usuario cadastrado com sucesso",
      token: "token-mock"
    })
  })
})