import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
  constructor(
    message: string = "Você não tem permissão para realizar essa ação"
  ) {
    super(401, message)
  }
}