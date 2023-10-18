import mongoose, { Schema } from 'mongoose';

const logSchema = new Schema({
  timestamp: {type: String, required: true},
  sourceInfo: {type: String, required: true},
  type: {type: String, required: true},
  podInfo: {type: Object, required: true},
  logObject: {type: Object, required: true},
  project_id: {type: Schema.Types.ObjectId, ref: 'Project' }
}, { timestamps: true });

export default mongoose.model('Log', logSchema);