import mongoose from "mongoose";
import { ProfilePicture } from "../global/types";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateOfBirth: Date,
    profilePicture: {url: String}
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });

export default mongoose.model("User", userSchema);
