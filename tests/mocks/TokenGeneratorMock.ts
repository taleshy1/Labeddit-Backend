import { userRole } from "../../src/models/Users"
import { TokenPayload } from "../../src/services/TokenManager"
export class TokenManagerMock {
  public createToken = (payload: TokenPayload): string => {
    if (payload.id === "id-mock") {
      return "token-mock"
    } else if (payload.id === "id-mock-admin") {
      return "token-mock-admin"
    } else {
      return "token-mock-user"
    }
  }

  public getPayload = (token: string): TokenPayload | null => {
    if (token === "token-mock-admin") {
      return {
        id: "id-mock-admin",
        name: "Test Admin",
        role: userRole.ADMIN
      }

    } else if (token === "token-mock-user") {
      return {
        id: "id-mock-user",
        name: "Test User",
        role: userRole.NORMAL
      }

    } else if (token === "token-mock-test-error") {
      return {
        id: "id-mock-test-error",
        name: "Test Error",
        role: userRole.NORMAL
      }
    }
    else {
      return null
    }
  }
}