import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Courses state
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({
    title: '', description: '', category: 'NDA', price: 0, duration: '3 months', level: 'Beginner', instructor: ''
  });
  const [editingCourse, setEditingCourse] = useState(null);
  
  // Jobs state
  const [jobs, setJobs] = useState([]);
  const [jobForm, setJobForm] = useState({
    title: '', description: '', category: 'GD', region: 'North', organization: '', vacancies: 0, eligibility: '', salary: ''
  });
  const [editingJob, setEditingJob] = useState(null);
  
  // Pagination state
  const [coursePagination, setCoursePagination] = useState({ currentPage: 1, totalPages: 1 });
  const [jobPagination, setJobPagination] = useState({ currentPage: 1, totalPages: 1 });
  
  // Filters state
  const [courseFilters, setCourseFilters] = useState({ search: '', category: '', sortBy: 'createdAt', sortOrder: 'desc' });
  const [jobFilters, setJobFilters] = useState({ search: '', category: '', region: '', sortBy: 'createdAt', sortOrder: 'desc' });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [popupSearchQuery, setPopupSearchQuery] = useState('');
  const [popupSearchResults, setPopupSearchResults] = useState([]);

  const courseCategories = ['NDA', 'CDS', 'AFCAT', 'Agniveer', 'SSB', 'CAPF', 'Navy', 'AirForce', 'Physical', 'General'];
  const jobCategories = ['GD', 'Clerk', 'Technical', 'Nursing', 'Constable', 'Officer', 'SSR', 'MR', 'Group X', 'Group Y', 'Admit Card', 'Result', 'Other'];
  const regions = ['North', 'South', 'East', 'West', 'Central', 'All India'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }
    setIsAuthenticated(true);
    fetchCourses();
    fetchJobs();
  }, []);

  // ESC key to close search popup
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showSearchPopup) {
        closeSearchPopup();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [showSearchPopup]);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Search popup functionality
  const handlePopupSearch = async (query) => {
    setPopupSearchQuery(query);
    if (!query.trim()) {
      setPopupSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(`/api/courses?search=${query}&limit=20`);
      setPopupSearchResults(response.data.data);
    } catch (error) {
      console.error('Error searching courses:', error);
    }
  };

  const openSearchPopup = () => {
    setShowSearchPopup(true);
    setPopupSearchQuery('');
    setPopupSearchResults([]);
  };

  const closeSearchPopup = () => {
    setShowSearchPopup(false);
    setPopupSearchQuery('');
    setPopupSearchResults([]);
  };

  // ============ COURSES CRUD ============
  const fetchCourses = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 10,
        sortBy: courseFilters.sortBy,
        sortOrder: courseFilters.sortOrder,
        ...(courseFilters.search && { search: courseFilters.search }),
        ...(courseFilters.category && { category: courseFilters.category })
      });
      
      const response = await axios.get(`/api/courses?${params}`);
      setCourses(response.data.data);
      setCoursePagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching courses:', error);
      showMessage('Error fetching courses', 'error');
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('/api/courses', courseForm, getAuthHeader());
      showMessage('Course created successfully!');
      setCourseForm({ title: '', description: '', category: 'NDA', price: 0, duration: '3 months', level: 'Beginner', instructor: '' });
      fetchCourses();
    } catch (error) {
      console.error('Error creating course:', error);
      showMessage(error.response?.data?.message || 'Error creating course', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`/api/courses/${editingCourse._id}`, courseForm, getAuthHeader());
      showMessage('Course updated successfully!');
      setEditingCourse(null);
      setCourseForm({ title: '', description: '', category: 'NDA', price: 0, duration: '3 months', level: 'Beginner', instructor: '' });
      fetchCourses();
    } catch (error) {
      console.error('Error updating course:', error);
      showMessage(error.response?.data?.message || 'Error updating course', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      setLoading(true);
      await axios.delete(`/api/courses/${id}`, getAuthHeader());
      showMessage('Course deleted successfully!');
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      showMessage(error.response?.data?.message || 'Error deleting course', 'error');
    } finally {
      setLoading(false);
    }
  };

  const editCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      price: course.price,
      duration: course.duration,
      level: course.level,
      instructor: course.instructor
    });
  };

  // ============ JOBS CRUD ============
  const fetchJobs = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 10,
        sortBy: jobFilters.sortBy,
        sortOrder: jobFilters.sortOrder,
        ...(jobFilters.search && { search: jobFilters.search }),
        ...(jobFilters.category && { category: jobFilters.category }),
        ...(jobFilters.region && { region: jobFilters.region })
      });
      
      const response = await axios.get(`/api/jobs?${params}`);
      setJobs(response.data.data);
      setJobPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      showMessage('Error fetching jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('/api/jobs', jobForm, getAuthHeader());
      showMessage('Job created successfully!');
      setJobForm({ title: '', description: '', category: 'GD', region: 'North', organization: '', vacancies: 0, eligibility: '', salary: '' });
      fetchJobs();
    } catch (error) {
      console.error('Error creating job:', error);
      showMessage(error.response?.data?.message || 'Error creating job', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`/api/jobs/${editingJob._id}`, jobForm, getAuthHeader());
      showMessage('Job updated successfully!');
      setEditingJob(null);
      setJobForm({ title: '', description: '', category: 'GD', region: 'North', organization: '', vacancies: 0, eligibility: '', salary: '' });
      fetchJobs();
    } catch (error) {
      console.error('Error updating job:', error);
      showMessage(error.response?.data?.message || 'Error updating job', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      setLoading(true);
      await axios.delete(`/api/jobs/${id}`, getAuthHeader());
      showMessage('Job deleted successfully!');
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      showMessage(error.response?.data?.message || 'Error deleting job', 'error');
    } finally {
      setLoading(false);
    }
  };

  const editJob = (job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      description: job.description,
      category: job.category,
      region: job.region,
      organization: job.organization,
      vacancies: job.vacancies,
      eligibility: job.eligibility,
      salary: job.salary
    });
  };

  // Apply filters
  useEffect(() => {
    if (isAuthenticated) {
      fetchCourses();
    }
  }, [courseFilters]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchJobs();
    }
  }, [jobFilters]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/23157/23157-720.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content over video */}
      <div className="relative z-10">
      {/* Search Popup Modal */}
      {showSearchPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
            {/* Popup Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Course Title</h2>
                <button
                  onClick={closeSearchPopup}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Search Input */}
            <div className="p-4 border-b">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search courses by title..."
                  value={popupSearchQuery}
                  onChange={(e) => handlePopupSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  autoFocus
                />
                {popupSearchQuery && (
                  <button
                    onClick={() => handlePopupSearch('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {popupSearchQuery && popupSearchResults.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="text-4xl mb-2">🔍</div>
                  <p>No courses found for "<span className="font-semibold">{popupSearchQuery}</span>"</p>
                </div>
              ) : popupSearchResults.length > 0 ? (
                <div className="divide-y">
                  {popupSearchResults.map((course) => (
                    <div
                      key={course._id}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        editCourse(course);
                        closeSearchPopup();
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{course.description?.substring(0, 100)}...</p>
                          <div className="flex gap-2 mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{course.category}</span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">₹{course.price}</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">{course.level}</span>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Edit →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <div className="text-4xl mb-2">📚</div>
                  <p>Start typing to search courses</p>
                </div>
              )}
            </div>
            
            {/* Popup Footer */}
            <div className="bg-gray-50 px-4 py-3 border-t text-center text-sm text-gray-500">
              Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">ESC</kbd> to close
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Control Hub</h1>
          <div className="flex gap-3">
            <button
              onClick={openSearchPopup}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Courses
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Message */}
      {message.text && (
        <div className={`max-w-7xl mx-auto mt-4 px-4`}>
          <div className={`p-4 rounded-md backdrop-blur-sm ${message.type === 'error' ? 'bg-red-100/90 text-red-700' : 'bg-green-100/90 text-green-700'}`}>
            {message.text}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-4 border-b border-white/30">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-3 font-semibold ${activeTab === 'courses' ? 'border-b-2 border-white text-white bg-white/20 rounded-t-lg' : 'text-white/80 hover:text-white'}`}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 font-semibold ${activeTab === 'jobs' ? 'border-b-2 border-white text-white bg-white/20 rounded-t-lg' : 'text-white/80 hover:text-white'}`}
          >
            Jobs
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Course Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
              <form onSubmit={editingCourse ? updateCourse : createCourse} className="space-y-4">
                <input
                  type="text"
                  placeholder="Course Title"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={3}
                  required
                />
                <select
                  value={courseForm.category}
                  onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  {courseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    placeholder="Enter Price"
                    value={courseForm.price || ''}
                    onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                    className="w-full p-2 pl-7 border rounded"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Duration (e.g., 3 months)"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="flex-1 p-2 border rounded"
                  />
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => {
                        const current = parseInt(courseForm.duration) || 0;
                        setCourseForm({ ...courseForm, duration: `${current + 1} months` });
                      }}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-t border text-xs"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const current = parseInt(courseForm.duration) || 1;
                        if (current > 1) {
                          setCourseForm({ ...courseForm, duration: `${current - 1} months` });
                        }
                      }}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-b border border-t-0 text-xs"
                    >
                      ▼
                    </button>
                  </div>
                </div>
                <select
                  value={courseForm.level}
                  onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  {levels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                </select>
                <input
                  type="text"
                  placeholder="Instructor Name"
                  value={courseForm.instructor}
                  onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : (editingCourse ? 'Update' : 'Create')}
                  </button>
                  {editingCourse && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCourse(null);
                        setCourseForm({ title: '', description: '', category: 'NDA', price: 0, duration: '3 months', level: 'Beginner', instructor: '' });
                      }}
                      className="px-4 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Course List */}
            <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Courses List</h2>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={courseFilters.search}
                  onChange={(e) => setCourseFilters({ ...courseFilters, search: e.target.value })}
                  className="flex-1 min-w-[200px] p-2 border rounded"
                />
                <select
                  value={courseFilters.category}
                  onChange={(e) => setCourseFilters({ ...courseFilters, category: e.target.value })}
                  className="p-2 border rounded"
                >
                  <option value="">All Categories</option>
                  {courseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select
                  value={courseFilters.sortBy}
                  onChange={(e) => setCourseFilters({ ...courseFilters, sortBy: e.target.value })}
                  className="p-2 border rounded"
                >
                  <option value="createdAt">Date Created</option>
                  <option value="title">Title</option>
                  <option value="price">Price</option>
                </select>
                <select
                  value={courseFilters.sortOrder}
                  onChange={(e) => setCourseFilters({ ...courseFilters, sortOrder: e.target.value })}
                  className="p-2 border rounded"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>

              {/* Course Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">Category</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Level</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course._id} className="border-t">
                        <td className="p-3">{course.title}</td>
                        <td className="p-3">{course.category}</td>
                        <td className="p-3">₹{course.price}</td>
                        <td className="p-3">{course.level}</td>
                        <td className="p-3">
                          <button
                            onClick={() => editCourse(course)}
                            className="text-blue-600 hover:underline mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCourse(course._id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {courses.length === 0 && (
                      <tr><td colSpan={5} className="p-3 text-center text-gray-500">No courses found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">
                  Page {coursePagination.currentPage} of {coursePagination.totalPages} ({coursePagination.totalItems} items)
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => fetchCourses(coursePagination.currentPage - 1)}
                    disabled={!coursePagination.hasPrevPage}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => fetchCourses(coursePagination.currentPage + 1)}
                    disabled={!coursePagination.hasNextPage}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Job Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
              <form onSubmit={editingJob ? updateJob : createJob} className="space-y-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
                <select
                  value={jobForm.category}
                  onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  {jobCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select
                  value={jobForm.region}
                  onChange={(e) => setJobForm({ ...jobForm, region: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  {regions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
                </select>
                <input
                  type="text"
                  placeholder="Organization"
                  value={jobForm.organization}
                  onChange={(e) => setJobForm({ ...jobForm, organization: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Number of Vacancies"
                  value={jobForm.vacancies}
                  onChange={(e) => setJobForm({ ...jobForm, vacancies: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Eligibility"
                  value={jobForm.eligibility}
                  onChange={(e) => setJobForm({ ...jobForm, eligibility: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Salary (e.g., ₹25,000 - ₹40,000)"
                  value={jobForm.salary}
                  onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : (editingJob ? 'Update' : 'Create')}
                  </button>
                  {editingJob && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingJob(null);
                        setJobForm({ title: '', description: '', category: 'GD', region: 'North', organization: '', vacancies: 0, eligibility: '', salary: '' });
                      }}
                      className="px-4 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Job List */}
            <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Jobs List</h2>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={jobFilters.search}
                  onChange={(e) => setJobFilters({ ...jobFilters, search: e.target.value })}
                  className="flex-1 min-w-[200px] p-2 border rounded"
                />
                <select
                  value={jobFilters.category}
                  onChange={(e) => setJobFilters({ ...jobFilters, category: e.target.value })}
                  className="p-2 border rounded"
                >
                  <option value="">All Categories</option>
                  {jobCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select
                  value={jobFilters.region}
                  onChange={(e) => setJobFilters({ ...jobFilters, region: e.target.value })}
                  className="p-2 border rounded"
                >
                  <option value="">All Regions</option>
                  {regions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
                </select>
                <select
                  value={jobFilters.sortBy}
                  onChange={(e) => setJobFilters({ ...jobFilters, sortBy: e.target.value })}
                  className="p-2 border rounded"
                >
                  <option value="createdAt">Date Created</option>
                  <option value="title">Title</option>
                  <option value="vacancies">Vacancies</option>
                </select>
                <select
                  value={jobFilters.sortOrder}
                  onChange={(e) => setJobFilters({ ...jobFilters, sortOrder: e.target.value })}
                  className="p-2 border rounded"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>

              {/* Job Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">Category</th>
                      <th className="p-3 text-left">Region</th>
                      <th className="p-3 text-left">Vacancies</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job._id} className="border-t">
                        <td className="p-3">{job.title}</td>
                        <td className="p-3">{job.category}</td>
                        <td className="p-3">{job.region}</td>
                        <td className="p-3">{job.vacancies}</td>
                        <td className="p-3">
                          <button
                            onClick={() => editJob(job)}
                            className="text-blue-600 hover:underline mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteJob(job._id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {jobs.length === 0 && (
                      <tr><td colSpan={5} className="p-3 text-center text-gray-500">No jobs found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">
                  Page {jobPagination.currentPage} of {jobPagination.totalPages} ({jobPagination.totalItems} items)
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => fetchJobs(jobPagination.currentPage - 1)}
                    disabled={!jobPagination.hasPrevPage}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => fetchJobs(jobPagination.currentPage + 1)}
                    disabled={!jobPagination.hasNextPage}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default AdminPanel;
