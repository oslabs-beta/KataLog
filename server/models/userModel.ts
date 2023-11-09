import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
}, { timestamps: true });


export default mongoose.model('User', userSchema);