import type { Request } from "express";

export interface SignUpRequestBody {
  name: string;
  email: string;
  password: string;
  handle: string;
}

export type BodyRequest<Tbody> = Request<Record<string, never>, unknown, Tbody>;
