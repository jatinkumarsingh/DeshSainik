const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['NDA', 'CDS', 'AFCAT', 'Agniveer', 'SSB', 'CAPF', 'Navy', 'AirForce', 'Physical', 'General']
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  duration: {
    type: String,
    default: '3 months'
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  image: {
    type: String,
    default: ''
  },
  instructor: {
    type: String,
    default: 'DeshSainik Team'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
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

courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for searching
courseSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Course', courseSchema);
