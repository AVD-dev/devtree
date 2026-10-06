import type { Request } from "express";

export type BodyRequest<Tbody> = Request<Record<string, never>, unknown, Tbody>;
