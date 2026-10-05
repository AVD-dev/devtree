import mongoose, { Schema } from "mongoose";

export interface AccountDocument {
  name: string;
  email: string;
  passwordHash: string;
}

const accountSchema = new Schema<AccountDocument>({
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
});

const AccountModel = mongoose.model<AccountDocument>(
  "Account",
  accountSchema,
  "users",
);

export default AccountModel;
