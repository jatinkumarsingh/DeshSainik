const express = require('express');
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseCategories,
  bulkCreateCourses
} = require('../controllers/courseController');
const { authenticateToken } = require('../middlewares/auth');

// Public routes
router.get('/', getCourses);                    // GET all courses with pagination, sorting, filtering
router.get('/categories', getCourseCategories); // GET course categories for filters
router.get('/:id', getCourseById);              // GET single course

// Protected routes (require authentication)
router.post('/', authenticateToken, createCourse);           // CREATE course
router.post('/bulk', authenticateToken, bulkCreateCourses);  // BULK CREATE courses
router.put('/:id', authenticateToken, updateCourse);         // UPDATE course
router.delete('/:id', authenticateToken, deleteCourse);      // DELETE course

module.exports = router;
