import { bodyField } from "../shared/body-field.ts";
import type { SignUpRequestBody } from "./sign-up.types.ts";

const field = bodyField<SignUpRequestBody>;

export const signUpBodyValidator = [
  field("name")
    .isString()
    .bail()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name cannot be empty"),
  field("email")
    .isString()
    .bail()
    .trim()
    .isEmail()
    .withMessage("Email is not valid"),
  field("password")
    .isString()
    .bail()
    .notEmpty()
    .withMessage("Password cannot be empty"),
  field("handle")
    .isString()
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Handle cannot be empty"),
];
