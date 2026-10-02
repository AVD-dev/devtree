import mongoose, { Schema } from "mongoose";
import type User from "../../domain/user.entity.ts";

const userSchema = new Schema<User>({
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
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
