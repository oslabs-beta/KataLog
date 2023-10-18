import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
}, { timestamps: true });

export default mongoose.model('User', userSchema);