const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  foundItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoundItem',
    required: [true, 'Found item reference is required']
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Claiming student reference is required']
  },
  reason: {
    type: String,
    required: [true, 'Please explain why this item belongs to you'],
    trim: true,
    minlength: [5, 'Reason must be at least 5 characters long']
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index to quickly look up claims per found item and student
claimSchema.index({ foundItemId: 1, claimedBy: 1 });

module.exports = mongoose.model('Claim', claimSchema);
