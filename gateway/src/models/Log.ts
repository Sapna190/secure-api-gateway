import { Schema, model } from 'mongoose';

const logSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  clientIp: { type: String, required: true },
  method: { type: String, required: true },
  path: { type: String, required: true },
  statusCode: { type: Number, required: true },
  userId: { type: String, required: false },
  apiKeyId: { type: String, required: false },
  headers: { type: Object, required: false },
  bodySummary: { type: String, required: false },
  threatScore: { type: Number, default: 0 },
  threatTags: { type: [String], default: [] },
  actionTaken: { type: String, enum: ['allow', 'blocked', 'throttled'], required: true },
});

const Log = model('Log', logSchema);

export default Log;