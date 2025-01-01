import logger from "@libs/logger";
import type { TokenPayload } from "@type/index";
import jwt from "jsonwebtoken";
const createToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const verifyToken = (token: string): TokenPayload => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    return payload;
  } catch (error) {
    logger.error(error);
    throw new Error("Invalid Token");
  }
};

export { createToken, verifyToken };
