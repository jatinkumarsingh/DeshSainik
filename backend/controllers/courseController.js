const Course = require('../models/Course');

// CREATE - Add a new course
const createCourse = async (req, res) => {
  try {
    const { title, description, category, price, duration, level, image, instructor } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Title, description, and category are required' });
    }

    const course = new Course({
      title,
      description,
      category,
      price: price || 0,
      duration: duration || '3 months',
      level: level || 'Beginner',
      image: image || '',
      instructor: instructor || 'DeshSainik Team',
      createdBy: req.user?.userId
    });

    await course.save();
    console.log('Course created:', course.title);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

// READ - Get all courses with pagination, sorting, filtering, searching
const getCourses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      category,
      level,
      minPrice,
      maxPrice,
      search,
      isActive
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { instructor: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute query
    const courses = await Course.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await Course.countDocuments(filter);

    res.json({
      success: true,
      data: courses,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit),
        hasNextPage: skip + courses.length < total,
        hasPrevPage: Number(page) > 1
      }
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};

// READ - Get single course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Get course by ID error:', error);
    res.status(500).json({ message: 'Error fetching course', error: error.message });
  }
};

// UPDATE - Update a course
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const course = await Course.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    console.log('Course updated:', course.title);

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
};

// DELETE - Delete a course
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    console.log('Course deleted:', course.title);

    res.json({
      success: true,
      message: 'Course deleted successfully',
      data: course
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
};

// Get course categories (for filters)
const getCourseCategories = async (req, res) => {
  try {
    const categories = await Course.distinct('category');
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

// Bulk create courses (for seeding)
const bulkCreateCourses = async (req, res) => {
  try {
    const { courses } = req.body;
    
    if (!courses || !Array.isArray(courses)) {
      return res.status(400).json({ message: 'Courses array is required' });
    }

    const createdCourses = await Course.insertMany(courses);
    
    res.status(201).json({
      success: true,
      message: `${createdCourses.length} courses created successfully`,
      data: createdCourses
    });
  } catch (error) {
    console.error('Bulk create error:', error);
    res.status(500).json({ message: 'Error creating courses', error: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseCategories,
  bulkCreateCourses
};
