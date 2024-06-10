import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export class ProfilePicture {
  url!: string;
}