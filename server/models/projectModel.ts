import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema({
  logDirectory: {type: String, required: true},
  authToken: {type: String, required: true, unique: true},
  projectName: {type: String, required: true},
  user_id: {type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);