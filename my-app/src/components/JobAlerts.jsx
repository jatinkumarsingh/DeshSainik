import React, { useState } from 'react';

const JobAlerts = () => {
  const [region, setRegion] = useState("All");
  const [category, setCategory] = useState("All");

  const data = [
    { id: 1, title: "Army GD Rally", region: "North", category: "GD", date: "2025-12-10", status: "Active", applications: "2.5K" },
    { id: 2, title: "Air Force Clerk Exam", region: "South", category: "Clerk", date: "2025-12-15", status: "Upcoming", applications: "1.8K" },
    { id: 3, title: "Navy Technical Entry", region: "West", category: "Technical", date: "2026-01-05", status: "Active", applications: "3.2K" },
    { id: 4, title: "Army Nursing Recruitment", region: "East", category: "Nursing", date: "2025-12-25", status: "Active", applications: "1.1K" },
    { id: 5, title: "Air Force X Group", region: "North", category: "Technical", date: "2026-01-15", status: "Upcoming", applications: "4.7K" },
    { id: 6, title: "Navy SSR Recruitment", region: "South", category: "GD", date: "2026-02-01", status: "Active", applications: "5.3K" },
  ];

  const filtered = data.filter(
    (item) =>
      (region === "All" || item.region === region) &&
      (category === "All" || item.category === category)
  );

  const regions = ["All", "North", "South", "East", "West"];
  const categories = ["All", "GD", "Technical", "Clerk", "Nursing"];

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest Job Alerts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest defence recruitment notifications across all services
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {regions.map((reg) => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.region} Region</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  job.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {job.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{job.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Date:</span>
                  <span className="font-medium">{job.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Applications:</span>
                  <span className="font-medium">{job.applications}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Apply Now
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors duration-200">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Never Miss a Recruitment Opportunity
            </h3>
            <p className="mb-6 opacity-90">
              Get instant notifications for all defence job openings. Set up personalized alerts based on your preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Set Up Alerts
              </button>
              <button className="border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                View All Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobAlerts;
