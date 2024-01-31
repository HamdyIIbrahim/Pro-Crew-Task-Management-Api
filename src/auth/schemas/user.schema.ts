import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const defaultProfilePhoto =
  'https://res.cloudinary.com/dshidxtkr/image/upload/f_auto/v1688501523/blank-image_bsyvep_kjuq9f_t2ftcb.avif';

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    photo: { type: String, default: defaultProfilePhoto },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  name: string;
  email: string;
  photo: string;
  password: string;
}
