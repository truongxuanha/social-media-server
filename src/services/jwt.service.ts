import jwt, { JwtPayload } from "jsonwebtoken";

export interface IJwtService {
  verify(token: string): JwtPayload;
  decode(token: string): JwtPayload | null;
}

export class JwtService implements IJwtService {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  verify(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }

  decode(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch {
      return null;
    }
  }
}
