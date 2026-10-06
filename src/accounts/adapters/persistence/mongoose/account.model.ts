import mongoose, { Schema } from "mongoose";

export interface AccountDocument {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  handle: string;
}

const accountSchema = new Schema<AccountDocument>(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      trim: true,
    },
    handle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    // Account.id is persisted directly as MongoDB's _id. Mongoose's virtual
    // `id` is disabled so the model exposes only that single identity.
    id: false,
  },
);

const AccountModel = mongoose.model<AccountDocument>(
  "Account",
  accountSchema,
  "users",
);

export default AccountModel;
