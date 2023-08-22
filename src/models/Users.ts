export enum userRole {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL"
}

export interface UserDB {
  id: string,
  name: string,
  email: string,
  password: string,
  role: userRole,
  created_at: string
}

export interface UserModel {
  id: string,
  name: string,
  email: string,
  role: userRole,
  createdAt: string
}


export class Users {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: userRole,
    private createdAt: string
  ) { }
  public getId(): string {
    return this.id
  }
  public setId(value: string): void {
    this.id = value
  }
  public getName(): string {
    return this.name
  }
  public setName(value: string): void {
    this.name = value
  }
  public getEmail(): string {
    return this.email
  }
  public setEmail(value: string): void {
    this.email = value
  }
  public getPassword(): string {
    return this.password
  }
  public setPassword(value: string): void {
    this.password = value
  }
  public getRole(): userRole {
    return this.role
  }
  public setRole(value: userRole): void {
    this.role = value
  }
  public getCreatedAt(): string {
    return this.createdAt
  }
  public setCreatedAt(value: string): void {
    this.createdAt = value
  }

  public toUserDB(): UserDB {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      created_at: this.createdAt
    }
  }

  public toUserModel(): UserModel {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: userRole.NORMAL,
      createdAt: this.createdAt
    }
  }
}