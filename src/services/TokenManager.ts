import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { userRole } from '../models/Users'

dotenv.config()

export interface TokenPayload {
  id: string,
  name: string,
  role: userRole
}

export class TokenManager {

  public createToken = (payload: TokenPayload): string => {
    const token = jwt.sign(
      payload,
      process.env.JWT_KEY as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    )

    return token
  }

  public getPayload = (token: string): TokenPayload | null => {
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_KEY as string
      )

      return payload as TokenPayload

    } catch (error) {
      return null
    }
  }
}