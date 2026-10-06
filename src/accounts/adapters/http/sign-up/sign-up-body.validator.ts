import { body } from "express-validator";
import type { SignUpRequestBody } from "./sign-up.types.ts";

const field = (name: keyof SignUpRequestBody) => body(name);

export const signUpBodyValidator = [
  field("name").isString().bail().trim().isLength({ min: 2 }),
  field("email").isString().bail().trim().isEmail(),
  field("password").isString().bail().notEmpty(),
  field("handle").isString().bail().trim().notEmpty(),
];
