import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema({
  projectName: {type: String, required: true},
  user_id: {type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);