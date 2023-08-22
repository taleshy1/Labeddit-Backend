import { BaseError } from "./BaseError";

export class NotAuthenticatedError extends BaseError {
  constructor(
    message: string = "Você precisa estar autenticado para acessar este endpoint"
  ) {
    super(401, message)
  }
}