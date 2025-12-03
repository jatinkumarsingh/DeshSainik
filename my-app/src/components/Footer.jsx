import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-12 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-gray-800 to-gray-900"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-10">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Flag_of_Indian_Armed_Forces.svg/250px-Flag_of_Indian_Armed_Forces.svg.png"
                alt="India Gov Logo"
                className="h-10 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold text-blue-400">DeshSainik</h3>
                <p className="text-sm text-gray-400 italic">One App for Every Defence Aspirant</p>
              </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed max-w-md">
              We're here to help you turn your dreams of serving the nation into reality.
              Every aspirant deserves the best tools and support on their journey.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-xl">📘</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-xl">🐦</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-xl">📷</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-xl">💼</a>
            </div>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row gap-8">
            <div className="flex-1">
              <h4 className="text-lg font-semibold mb-3 text-blue-300">Explore</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Success Stories</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            <div className="flex-1">
              <h4 className="text-lg font-semibold mb-3 text-blue-300">Our Services</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Job Alerts</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Exam Prep</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">AI Mentor</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Fitness Tracking</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Community</a></li>
              </ul>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold mb-3 text-blue-300">Get Help</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Terms</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-6 mb-8 border-l-4 border-blue-500">
          <blockquote className="text-gray-200 italic text-base leading-relaxed">
            "Every soldier starts as an aspirant. We're honored to be part of your journey
            towards serving our great nation. Remember, it's not just about passing exams -
            it's about the courage in your heart."
          </blockquote>
          <cite className="text-gray-400 text-sm mt-2 block">- The DeshSainik Team</cite>
        </div>
        <div className="bg-gray-800/30 rounded-lg p-6 mb-8">
          <h4 className="text-xl font-semibold mb-3 text-blue-300">Stay in the Loop</h4>
          <p className="text-gray-300 text-sm mb-4 max-w-lg">
            Want the latest defence job openings and prep tips? Drop your email below.
            We promise not to spam - just useful stuff for aspirants like you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              placeholder="your.email@example.com"
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 whitespace-nowrap">
              Keep Me Updated
            </button>
          </div>
        </div>

        {/* Bottom Bar - Varied alignment */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="text-gray-400 text-sm max-w-md">
              © 2024 DeshSainik. Built with passion for defence aspirants across India.
              Your success is our mission.
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <span>🇮🇳</span> Proudly Made in India
              </span>
              <span className="flex items-center gap-1">
                <span>🛡️</span> Empowering Future Warriors
              </span>
              <span className="flex items-center gap-1">
                <span>⭐</span> Trusted by 10,000+ Aspirants
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
