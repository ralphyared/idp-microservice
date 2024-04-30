import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateOfBirth: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
