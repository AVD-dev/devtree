import { body } from "express-validator";

export const bodyField = <TBody extends object>(
  name: Extract<keyof TBody, string>,
) => body(name);
