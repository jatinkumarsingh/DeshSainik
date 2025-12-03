const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobFilters,
  bulkCreateJobs
} = require('../controllers/jobController');
const { authenticateToken } = require('../middlewares/auth');

// Public routes
router.get('/', getJobs);              // GET all jobs with pagination, sorting, filtering
router.get('/filters', getJobFilters); // GET job categories and regions for filters
router.get('/:id', getJobById);        // GET single job

// Protected routes (require authentication)
router.post('/', authenticateToken, createJob);           // CREATE job
router.post('/bulk', authenticateToken, bulkCreateJobs);  // BULK CREATE jobs
router.put('/:id', authenticateToken, updateJob);         // UPDATE job
router.delete('/:id', authenticateToken, deleteJob);      // DELETE job

module.exports = router;
