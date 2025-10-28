import { Schema, model } from 'mongoose';

const apiKeySchema = new Schema({
  ownerId: {
    type: String,
    required: true,
  },
  keyHash: {
    type: String,
    required: true,
  },
  scopes: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const ApiKey = model('ApiKey', apiKeySchema);

export default ApiKey;