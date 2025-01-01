import type { Request } from "express";
// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type TRequest<T, P = {}, Q = {}> = Request<P, {}, T, Q>;
// biome-ignore lint/complexity/noBannedTypes: <explanation>
export interface IAuthRequest<T = {}, P = {}, Q = {}>
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  extends Request<P, {}, T, Q> {
  user?: TokenPayload;
}
// ? JWT TOKEN PAYLOAD
export type TokenPayload = {
  email: string;
  id: string;
  role?: "clinic" | "doctor" | "admin" | "patient";
};
