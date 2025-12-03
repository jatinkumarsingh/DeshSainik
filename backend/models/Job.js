const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['GD', 'Clerk', 'Technical', 'Nursing', 'Constable', 'Officer', 'SSR', 'MR', 'Group X', 'Group Y', 'Admit Card', 'Result', 'Other']
  },
  region: {
    type: String,
    required: true,
    enum: ['North', 'South', 'East', 'West', 'Central', 'All India']
  },
  organization: {
    type: String,
    default: 'Indian Armed Forces'
  },
  vacancies: {
    type: Number,
    default: 0
  },
  eligibility: {
    type: String,
    default: ''
  },
  lastDate: {
    type: Date
  },
  applicationLink: {
    type: String,
    default: ''
  },
  salary: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

jobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for searching
jobSchema.index({ title: 'text', description: 'text', organization: 'text' });

module.exports = mongoose.model('Job', jobSchema);
