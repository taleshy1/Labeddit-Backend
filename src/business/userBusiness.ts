import { UsersDatabase } from "../database/UserDatabase";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/users/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/users/signup.dto";
import { BadRequestError } from "../error/BadRequestError";
import { UserDB, Users, userRole } from "../models/Users";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";

export class UserBusiness {
  constructor(
    private userDatabase: UsersDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) { }

  public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {

    const { name, email, password } = input
    const id: string = this.idGenerator.generate()

    const [userDBExists]: Array<UserDB> = await this.userDatabase.getUserByEmail(email)

    if (userDBExists) {
      throw new BadRequestError("email já existe")
    }

    const passwordHashed = await this.hashManager.hash(password)
    const user = new Users(
      id,
      name,
      email,
      passwordHashed,
      userRole.NORMAL,
      new Date().toISOString()
    )

    const TokenPayload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole()
    }

    await this.userDatabase.signUp(user.toUserDB())
    const token = this.tokenManager.createToken(TokenPayload)
    const output: SignupOutputDTO = {
      message: "Usuario cadastrado com sucesso",
      token: token
    }
    return output
  }


  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {

    const { email, password } = input
    const [exists] = await this.userDatabase.getUserByEmail(email)

    if (!exists) {
      throw new BadRequestError("Usuario não existe")
    }
    const passwordIsCorrect: boolean = await this.hashManager.compare(password, exists.password)

    if (!passwordIsCorrect) {
      throw new BadRequestError("'email' ou 'senha' incorretos")
    }

    const user = new Users(
      exists.id,
      exists.name,
      email,
      password,
      exists.role,
      new Date().toISOString()
    )

    const TokenPayload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole()
    }
    const token = this.tokenManager.createToken(TokenPayload)

    const output: LoginOutputDTO = {
      message: "Login efetuado com sucesso",
      token: token
    }
    return output
  }

}