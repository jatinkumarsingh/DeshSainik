const Job = require('../models/Job');

// CREATE - Add a new job
const createJob = async (req, res) => {
  try {
    const { title, description, category, region, organization, vacancies, eligibility, lastDate, applicationLink, salary } = req.body;

    if (!title || !category || !region) {
      return res.status(400).json({ message: 'Title, category, and region are required' });
    }

    const job = new Job({
      title,
      description: description || '',
      category,
      region,
      organization: organization || 'Indian Armed Forces',
      vacancies: vacancies || 0,
      eligibility: eligibility || '',
      lastDate: lastDate ? new Date(lastDate) : null,
      applicationLink: applicationLink || '',
      salary: salary || '',
      createdBy: req.user?.userId
    });

    await job.save();
    console.log('Job created:', job.title);

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
};

// READ - Get all jobs with pagination, sorting, filtering, searching
const getJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      category,
      region,
      organization,
      search,
      isActive
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (category && category !== 'All') filter.category = category;
    if (region && region !== 'All') filter.region = region;
    if (organization) filter.organization = { $regex: organization, $options: 'i' };
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    // Search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { organization: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute query
    const jobs = await Job.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await Job.countDocuments(filter);

    res.json({
      success: true,
      data: jobs,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit),
        hasNextPage: skip + jobs.length < total,
        hasPrevPage: Number(page) > 1
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
};

// READ - Get single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Get job by ID error:', error);
    res.status(500).json({ message: 'Error fetching job', error: error.message });
  }
};

// UPDATE - Update a job
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Convert lastDate string to Date if provided
    if (updates.lastDate) {
      updates.lastDate = new Date(updates.lastDate);
    }

    const job = await Job.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    console.log('Job updated:', job.title);

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Error updating job', error: error.message });
  }
};

// DELETE - Delete a job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    console.log('Job deleted:', job.title);

    res.json({
      success: true,
      message: 'Job deleted successfully',
      data: job
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
};

// Get job categories and regions (for filters)
const getJobFilters = async (req, res) => {
  try {
    const categories = await Job.distinct('category');
    const regions = await Job.distinct('region');
    
    res.json({
      success: true,
      data: {
        categories,
        regions
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filters', error: error.message });
  }
};

// Bulk create jobs (for seeding)
const bulkCreateJobs = async (req, res) => {
  try {
    const { jobs } = req.body;
    
    if (!jobs || !Array.isArray(jobs)) {
      return res.status(400).json({ message: 'Jobs array is required' });
    }

    const createdJobs = await Job.insertMany(jobs);
    
    res.status(201).json({
      success: true,
      message: `${createdJobs.length} jobs created successfully`,
      data: createdJobs
    });
  } catch (error) {
    console.error('Bulk create error:', error);
    res.status(500).json({ message: 'Error creating jobs', error: error.message });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobFilters,
  bulkCreateJobs
};
