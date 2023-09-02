import { BaseDatabase } from "../../src/database/BaseDatabase"
import { UserDB, userRole } from "../../src/models/Users"

const mockUsers: Array<UserDB> = [{
  id: "id-mock-user",
  name: "user-test",
  email: "userTest@email.com",
  password: "user-hash-mock",
  role: userRole.NORMAL,
  created_at: new Date().toISOString()
}, {
  id: "id-mock-admin",
  name: "admin-test",
  email: "adminTest@email.com",
  password: "admin-hash-mock",
  role: userRole.ADMIN,
  created_at: new Date().toISOString()
}]

export class UserDatabaseMock extends BaseDatabase {
  public static USERS_TABLES = "users"

  public async getUserByEmail(email: string): Promise<UserDB[]> {

    const result = mockUsers.filter((user) => user.email === email)
    return result
  }

  public async signUp(user: UserDB): Promise<void> {
    return
  }

  public async getUserById(id: string): Promise<UserDB[]> {
    const result = mockUsers.filter((user) => user.id === id)
    return result
  }

}