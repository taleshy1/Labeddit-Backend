import { UserDB } from "../models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase {
  public static USERS_TABLES = 'users'

  public async getUserByEmail(email: string): Promise<Array<UserDB>> {
    const result: Array<UserDB> = await BaseDatabase.connection(UsersDatabase.USERS_TABLES).where({ email })
    return result
  }

  public async signUp(user: UserDB): Promise<void> {
    await BaseDatabase.connection(UsersDatabase.USERS_TABLES).insert(user)
  }

  public async getUserById(id: string): Promise<Array<UserDB>> {
    const result: Array<UserDB> = await BaseDatabase.connection(UsersDatabase.USERS_TABLES).where({ id })
    return result
  }


}