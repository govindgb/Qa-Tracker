import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

export interface JWTPayload {
  email: string;
}

export const signJWT = (
  payload: JWTPayload,
  expiresIn: string | number = "1h"
): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn,
  } as SignOptions);
};

export const verifyJWT = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (err) {
    return null;
  }
};
