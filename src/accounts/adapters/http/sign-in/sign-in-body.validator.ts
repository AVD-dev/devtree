import { bodyField } from "../shared/body-field.ts";
import type { SignInRequestBody } from "./sign-in.types.ts";

const field = bodyField<SignInRequestBody>;

export const signInBodyValidator = [
  field("email")
    .isString()
    .bail()
    .trim()
    .isEmail()
    .withMessage("Email format is not valid"),
  field("password")
    .isString()
    .bail()
    .notEmpty()
    .withMessage("Password is empty"),
];
