import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StartJourney.css";

// Shared images used across all course cards (mixed randomly)
const COURSE_IMAGES = [
  "https://images.pexels.com/photos/163443/war-desert-guns-gunshow-163443.jpeg",
  "https://images.pexels.com/photos/20258/pexels-photo.jpg",
  "https://images.pexels.com/photos/669271/pexels-photo-669271.jpeg",
  "https://images.pexels.com/photos/163478/war-desert-guns-gunshow-163478.jpeg",
  "https://images.pexels.com/photos/886454/pexels-photo-886454.jpeg",
  "https://images.pexels.com/photos/669287/pexels-photo-669287.jpeg",
  "https://t3.ftcdn.net/jpg/15/36/73/46/240_F_1536734637_1OLm4EDgDpUqczEsViZIFfwFI8NlGZ9O.jpg",
  "https://t3.ftcdn.net/jpg/06/28/11/04/240_F_628110434_LxS7d8mTO1v6T8RDumrFPMRIbyocHFiS.jpg",
  "https://t3.ftcdn.net/jpg/07/57/29/80/240_F_757298070_beJ3H628P07jOnIzAP5xZrYx1W577Jy0.jpg",
  "https://t4.ftcdn.net/jpg/18/16/13/95/240_F_1816139567_TeNebqhQHXFZYsvBLggoeyRaO3rf9g6a.jpg",
  "https://t4.ftcdn.net/jpg/12/75/09/09/240_F_1275090905_heImwtvxStjZNBpATEF7aNc3ZIrHieIV.jpg",
  "https://t3.ftcdn.net/jpg/16/18/39/50/240_F_1618395068_04gF9wZSUCIbucTmAkrjBFMvuOR630JE.jpg",
];

// Shuffle function to randomize image assignment
const shuffleImages = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const SHUFFLED_IMAGES = shuffleImages(COURSE_IMAGES);

function Navbar({ isAuthenticated, user, onLogout }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add search functionality here
    }
  };
  
  return (
    <header className="w-full bg-white border-b fixed top-0 left-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-7">
        <div className="flex items-center gap-3">
          <a
            href="https://india.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-6"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Flag_of_Indian_Armed_Forces.svg/250px-Flag_of_Indian_Armed_Forces.svg.png"
              alt="India Gov Logo"
              className="h-10 w-auto rounded"
            />
            <div className="leading-tight">
              <h1 className="text-blue-400 text-base font-semibold flex items-center gap-2">
                DeshSainik
                <span className="text-yellow-500 text-xs font-bold">BETA</span>
              </h1>
              <p className="text-xs text-gray-500">
                One App for Every Defence Aspirant
              </p>
            </div>
          </a>
        </div>

        <div className="flex-1 mx-6 max-w-xl relative">
          <form onSubmit={handleSearch} className="relative">
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, exams, topics..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </form>
        </div>

        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/admin')}
                className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Control Hub
              </button>
              <span className="px-4 py-2 text-sm font-medium text-gray-700">
                Welcome, {user?.name || user?.email}
              </span>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/auth', { state: { mode: 'signup' } })}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate('/auth', { state: { mode: 'signin' } })}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </>
          )}
          <div className="flex flex-col items-end justify-center ml-4 space-y-0.5">
            <span className="h-1 w-6 bg-orange-500 rounded-sm"></span>
            <span className="h-1 w-6 bg-white border border-gray-200 rounded-sm"></span>
            <span className="h-1 w-6 bg-green-600 rounded-sm"></span>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default function StartJourney() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [courseSearchQuery, setCourseSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Filter function for courses
  const filterCourses = (courses) => {
    if (!courseSearchQuery.trim()) return courses;
    const query = courseSearchQuery.toLowerCase();
    return courses.filter(course => 
      course.title.toLowerCase().includes(query) || 
      course.description.toLowerCase().includes(query)
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Build all course lists and attach rotating images
  const activeCourses = [
    { title: "NDA Complete Preparation", badge: "Enroll now", color: "from-indigo-600 to-blue-700", description: "Full NDA syllabus: Maths, GAT, English, along with strategy, PYQs, and mock tests aligned to the latest exam pattern.", price: 799 },
    { title: "CDS (Combined Defence Services)", badge: "Enroll now", color: "from-blue-600 to-cyan-600", description: "CDS OTA/IMA/AFA prep with topic-wise notes, solved papers, and practice sets for English, GK, and Mathematics.", price: 749 },
    { title: "AFCAT Officer Entry", badge: "Enroll now", color: "from-teal-600 to-emerald-600", description: "AFCAT sections: Verbal Ability, Numerical Ability, Reasoning & Military Aptitude, and General Awareness with full mocks.", price: 699 },
    { title: "Agniveer Army (GD/Clerk/Tech)", badge: "Enroll now", color: "from-rose-600 to-red-600", description: "Targeted preparation for Army Agniveer entries—syllabus coverage, rally process guidance, and physical standards.", price: 599 },
  ].map((c, idx) => ({ ...c, image: SHUFFLED_IMAGES[idx % SHUFFLED_IMAGES.length] }));

  const subjectMastery = [
    { title: "Mathematics (NDA/CDS)", badge: "Enroll now", color: "from-purple-600 to-violet-600", description: "Algebra, Trigonometry, Coordinate Geometry, Calculus, Statistics with PYQs and speed‑building drills.", price: 449 },
    { title: "English & Comprehension", badge: "Enroll now", color: "from-emerald-600 to-green-600", description: "Grammar, vocabulary, comprehension, error spotting, and cloze tests tailored for defence exams.", price: 399 },
    { title: "General Science", badge: "Enroll now", color: "from-teal-600 to-cyan-600", description: "Physics, Chemistry, Biology fundamentals frequently asked in NDA, CDS, and other defence exams.", price: 399 },
    { title: "Current Affairs & GK", badge: "Enroll now", color: "from-indigo-600 to-blue-600", description: "Monthly CA, static GK, defence exercises, ranks, and awards—exam‑focused capsules and quizzes.", price: 299 },
  ].map((c, idx) => ({ ...c, image: SHUFFLED_IMAGES[(idx + 4) % SHUFFLED_IMAGES.length] }));

  const ssbInterviews = [
    { title: "SSB 5‑Day Process", badge: "Enroll now", color: "from-emerald-600 to-green-600", description: "Complete overview: Screening, Psychology, GTO, Interview, and Conference with actionable preparation plans.", price: 999 },
    { title: "OIR & PPDT", badge: "Enroll now", color: "from-blue-600 to-cyan-600", description: "Officer Intelligence Rating practice sets and PPDT storytelling, narration, and group discussion methods.", price: 549 },
    { title: "Psychology Tests (TAT/WAT/SRT)", badge: "Enroll now", color: "from-pink-600 to-rose-600", description: "Understand expectations and practice writing effective responses that reflect OLQs with feedback frameworks.", price: 649 },
    { title: "GTO Tasks & Leadership", badge: "Enroll now", color: "from-orange-600 to-amber-600", description: "Group tasks, PGT/HGT, Lecturette, Command Task strategies and real‑world examples to demonstrate leadership.", price: 699 },
  ].map((c, idx) => ({ ...c, image: SHUFFLED_IMAGES[(idx + 8) % SHUFFLED_IMAGES.length] }));

  const physicalMedical = [
    { title: "Physical Fitness Program", badge: "Enroll now", color: "from-indigo-600 to-violet-600", description: "Running plans, strength & endurance, flexibility, and injury prevention tailored to rally and academy standards.", price: 499 },
    { title: "Medical Standards & Tips", badge: "Enroll now", color: "from-pink-600 to-rose-600", description: "Height‑weight charts, chest expansion, dental, dermatology, and common PMT rejections with prevention guidance.", price: 349 },
    { title: "Vision & Hearing", badge: "Enroll now", color: "from-orange-600 to-amber-600", description: "Eye standards (myopia/hypermetropia), color vision, LASIK rules, and hearing tests explained clearly.", price: 299 },
    { title: "Document Verification", badge: "Enroll now", color: "from-blue-600 to-indigo-600", description: "Document checklist, caste/ domicile/ NCC certificates, affidavit formats, and verification day workflow.", price: 199 },
  ].map((c, idx) => ({ ...c, image: SHUFFLED_IMAGES[(idx + 2) % SHUFFLED_IMAGES.length] }));

  const capfParamilitary = [
    { title: "CAPF Assistant Commandant", badge: "Enroll now", color: "from-blue-600 to-indigo-600", description: "Paper I & II strategy with topic‑wise coverage, essay/précis practice, and interview guidance.", price: 649 },
    { title: "SSC GD Constable", badge: "Enroll now", color: "from-green-600 to-emerald-600", description: "Reasoning, Maths, GK, and English/Hindi with mocks. PET/PST standards and documentation overview.", price: 549 },
    { title: "CRPF/BSF/ITBP/SSB", badge: "Enroll now", color: "from-cyan-600 to-sky-600", description: "Force‑specific notifications, syllabus mapping, and selection stages explained with preparation schedules.", price: 599 },
    { title: "CISF & State Police", badge: "Enroll now", color: "from-indigo-600 to-blue-600", description: "Exam patterns, physical tests, and study plans for CISF, state constable, and SI entries.", price: 449 },
  ].map((c, idx) => ({ ...c, image: SHUFFLED_IMAGES[(idx + 6) % SHUFFLED_IMAGES.length] }));

  const navyAirForce = [
    { title: "Navy SSR/MR", badge: "Enroll now", color: "from-pink-600 to-rose-600", description: "Syllabus coverage, sample papers, medical standards, and merit list strategy for SSR/MR entries.", price: 549 },
    { title: "Coast Guard Navik/Yantrik", badge: "Enroll now", color: "from-amber-600 to-yellow-600", description: "Navik (GD/DB) and Yantrik prep with eligibility, pattern, and technical sections explained.", price: 499 },
    { title: "Air Force Agniveer (X/Y)", badge: "Enroll now", color: "from-indigo-600 to-violet-600", description: "Maths, Physics, English for X; Reasoning & GA for Y with targeted practice sets and mocks.", price: 599 },
    { title: "Navigation & Meteorology Basics", badge: "Enroll now", color: "from-red-600 to-rose-700", description: "Intro to navigation concepts, time‑zones, map reading, and weather systems relevant to air and sea operations.", price: 349 },
  ].map((c, idx) => ({ ...c, image: SHUFFLED_IMAGES[(idx + 10) % SHUFFLED_IMAGES.length] }));

  const freeCourses = [
    { title: "Exam Strategy & Time Management", badge: "Free", color: "from-indigo-600 to-blue-600", description: "Timetables, study blocks, revision cycles, and smart guessing techniques for competitive exams.", price: 0 },
    { title: "Form Fill & Documents", badge: "Free", color: "from-green-600 to-emerald-600", description: "Step‑by‑step application, photo/signature specs, and avoiding common mistakes that lead to rejection.", price: 0 },
    { title: "Map Reading Basics", badge: "Free", color: "from-emerald-600 to-green-700", description: "Topographic symbols, scales, contours, and basic navigation used in defence selection.", price: 0 },
    { title: "Ranks, Insignia & Structure", badge: "Free", color: "from-teal-600 to-cyan-600", description: "Know the rank structure across Army, Navy, and Air Force with badges and responsibilities.", price: 0 },
  ].map((c, idx) => ({ ...c, image: SHUFFLED_IMAGES[(idx + 3) % SHUFFLED_IMAGES.length] }));

  return (
    <div className="min-h-screen relative bg-gray-900">
      {/* Full-page background video */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          key="/dik.mp4"
        >
          <source src="/dik.mp4" type="video/mp4" />
        </video>
        {/* Low opacity overlay */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />

      {/* Page content over video */}
      <div className="relative z-10 pt-32 px-6">
        {/* Animated Hero Banner */}
        <section className="max-w-7xl mx-auto mb-10 mt-8">
          <div className="relative rounded-2xl p-10 bg-gray-900/80 backdrop-blur-md text-white shadow-2xl overflow-hidden border border-white/10">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 animate-fade-in">
                <span className="inline-block animate-bounce" style={{animationDelay: '0s'}}>🇮🇳</span>
                {' '}Serve the Nation with Pride{' '}
                <span className="inline-block animate-bounce" style={{animationDelay: '0.2s'}}>🎖️</span>
              </h3>
              <p className="text-xl md:text-2xl font-semibold text-white/95 animate-slide-up">
                Transform Your Dream into Reality — Join Army • Navy • Air Force
              </p>
              <div className="mt-6 flex justify-center gap-4 flex-wrap">
                <div className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/40 text-sm font-bold animate-pulse">
                  🏆 50+ Courses
                </div>
                <div className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/40 text-sm font-bold animate-pulse" style={{animationDelay: '0.5s'}}>
                  ✅ Expert Guidance
                </div>
                <div className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/40 text-sm font-bold animate-pulse" style={{animationDelay: '1s'}}>
                  🎯 100% Success Focus
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Search Box */}
        <section className="max-w-7xl mx-auto mb-8">
          <div className="relative">
            <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-lg">
              <div className="pl-4 text-white/60">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search courses... (e.g., NDA, Army, SSB, Navy, AFCAT)"
                value={courseSearchQuery}
                onChange={(e) => setCourseSearchQuery(e.target.value)}
                className="w-full px-4 py-4 bg-transparent text-white placeholder-white/50 text-lg focus:outline-none"
              />
              {courseSearchQuery && (
                <button
                  onClick={() => setCourseSearchQuery("")}
                  className="pr-4 text-white/60 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {courseSearchQuery && (
              <div className="mt-2 text-white/70 text-sm">
                Showing results for: "<span className="text-green-400 font-semibold">{courseSearchQuery}</span>"
              </div>
            )}
          </div>
        </section>

        {/* Sections - Filtered based on search */}
        {filterCourses(activeCourses).length > 0 && (
          <InfiniteSlider title="Active Courses" courses={filterCourses(activeCourses)} />
        )}

        {filterCourses(subjectMastery).length > 0 && (
          <InfiniteSlider title="Subject Mastery" courses={filterCourses(subjectMastery)} />
        )}

        {filterCourses(ssbInterviews).length > 0 && (
          <InfiniteSlider title="SSB & Interviews" courses={filterCourses(ssbInterviews)} />
        )}

        {filterCourses(physicalMedical).length > 0 && (
          <InfiniteSlider title="Physical & Medical" courses={filterCourses(physicalMedical)} />
        )}

        {filterCourses(capfParamilitary).length > 0 && (
          <InfiniteSlider title="CAPF & Paramilitary" courses={filterCourses(capfParamilitary)} />
        )}

        {filterCourses(navyAirForce).length > 0 && (
          <InfiniteSlider title="Navy & Air Force" courses={filterCourses(navyAirForce)} />
        )}

        {filterCourses(freeCourses).length > 0 && (
          <InfiniteSlider title="Free Courses" courses={filterCourses(freeCourses)} />
        )}

        {/* No Results Message */}
        {courseSearchQuery && 
          filterCourses(activeCourses).length === 0 &&
          filterCourses(subjectMastery).length === 0 &&
          filterCourses(ssbInterviews).length === 0 &&
          filterCourses(physicalMedical).length === 0 &&
          filterCourses(capfParamilitary).length === 0 &&
          filterCourses(navyAirForce).length === 0 &&
          filterCourses(freeCourses).length === 0 && (
          <section className="max-w-7xl mx-auto my-8">
            <div className="rounded-xl bg-red-500/20 backdrop-blur-md border border-red-400/30 p-8 text-center text-white">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No courses found</h3>
              <p className="text-white/70">No courses match your search "<span className="text-red-300">{courseSearchQuery}</span>". Try different keywords like NDA, Army, SSB, Navy, or AFCAT.</p>
            </div>
          </section>
        )}

        {/* Footer note */}
        <section className="max-w-7xl mx-auto my-8">
          <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-center text-white/90">
            All of our courses are currently under review for recording, and they will soon be published on our platform one by one. Stay connected with us by following our social channels.
          </div>
        </section>
      </div>
    </div>
  );
}

function InfiniteSlider({ title, courses = [] }) {
  const containerRef = React.useRef(null);
  
  // Duplicate courses for seamless infinite loop
  const duplicatedCourses = [...courses, ...courses, ...courses];
  
  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 340; // card width + gap
      const container = containerRef.current;
      const newPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };
  
  return (
    <section className="max-w-7xl mx-auto mt-8 relative group/slider">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 bg-gray-900/70 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">{title}</h2>
      <div className="relative">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .animate-slide {
            animation: slide 20s linear infinite;
          }
        `}} />
        
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover/slider:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover/slider:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <div 
          ref={containerRef}
          className="overflow-x-auto scrollbar-hide"
        >
          <div className="flex gap-5 animate-slide">
            {duplicatedCourses.map((c, idx) => (
              <div
                key={`${title}-${idx}`}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0 w-80"
              >
                {c.image ? (
                  <div className="relative h-40">
                    <img
                      src={c.image}
                      alt={`${c.title} banner`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    {c.badge && (
                      <span className="absolute top-3 right-3 text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full shadow-lg">
                        {c.badge}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className={`h-40 w-full bg-gradient-to-r ${c.color} opacity-90 relative`}>
                    {c.badge && (
                      <span className="absolute top-3 right-3 text-xs font-bold bg-white text-gray-900 px-3 py-1 rounded-full shadow-lg">
                        {c.badge}
                      </span>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{c.title}</h3>
                  {c.description && (
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{c.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                      {c.price === 0 ? (
                        <span className="text-3xl font-bold text-green-600">FREE</span>
                      ) : (
                        <>
                          <span className="text-3xl font-bold text-gray-900">₹{c.price}</span>
                          <span className="text-xs text-gray-500">per course</span>
                        </>
                      )}
                    </div>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg">
                      {c.price === 0 ? 'Start Free' : 'Enroll'}
                    </button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Full course access
                    </div>
                    <div className="flex items-center text-xs text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Video lectures & PDFs
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Mock tests & quizzes
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseCategory({ title, courses = [] }) {
  return (
    <section className="max-w-7xl mx-auto mt-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {courses.map((c, idx) => (
          <div
            key={`${title}-${idx}`}
            className="group rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md"
          >
            {c.image ? (
              <img
                src={c.image}
                alt={`${c.title} banner`}
                className="h-24 w-full object-cover"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={`h-24 w-full bg-gradient-to-r ${c.color} opacity-90`} />
            )}
            <div className="p-4">
              <h3 className="text-gray-900 font-semibold leading-snug">{c.title}</h3>
              {c.description && (
                <p className="text-gray-600 text-sm mt-1">{c.description}</p>
              )}
              {c.badge && (
                <span className="mt-2 inline-block text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-full">
                  {c.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CoursesSection() {
  const courses = [
    { id: 1, title: "NDA Complete Prep", level: "Beginner", duration: "8 weeks", badge: "Popular", color: "from-blue-500 to-indigo-500", description: "End‑to‑end NDA plan with topic‑wise videos, PYQs, and full mocks." },
    { id: 2, title: "CDS Crash Course", level: "Intermediate", duration: "6 weeks", badge: "New", color: "from-orange-500 to-red-500", description: "Fast‑track revision for English, GK, and Maths with high‑yield notes." },
    { id: 3, title: "Agniveer Army GD", level: "Beginner", duration: "4 weeks", badge: "Trending", color: "from-green-500 to-emerald-500", description: "GD exam pattern, practice sets, and rally‑day guidance in one place." },
    { id: 4, title: "Air Force X/Y Group", level: "Intermediate", duration: "7 weeks", badge: "Hot", color: "from-cyan-500 to-blue-600", description: "X: Maths/Physics/English; Y: Reasoning & GA—section‑wise drills and mocks." },
    { id: 5, title: "Navy SSR/MR Prep", level: "Beginner", duration: "5 weeks", badge: "Popular", color: "from-purple-500 to-fuchsia-500", description: "SSR/MR syllabus mapping, practice questions, and medical standards explained." },
    { id: 6, title: "Territorial Army Officer", level: "Advanced", duration: "10 weeks", badge: "Premium", color: "from-pink-500 to-rose-500", description: "TA exam sections, eligibility, and PIB interview orientation with study plan." },
    { id: 7, title: "Military Nursing Service", level: "Intermediate", duration: "6 weeks", badge: "Careers", color: "from-teal-500 to-emerald-600", description: "Nursing entrance focus: Biology, Chemistry, English, and GK with mocks." },
    { id: 8, title: "SSC GD Constable", level: "Beginner", duration: "5 weeks", badge: "Popular", color: "from-yellow-500 to-amber-500", description: "Topic‑wise reasoning, maths, GK, and English/Hindi + PET/PST tips." },
    { id: 9, title: "CAPF AC (Assistant Commandant)", level: "Advanced", duration: "12 weeks", badge: "Premium", color: "from-slate-600 to-gray-700", description: "Paper I & II, essay/précis practice, and interview preparation roadmap." },
    { id: 10, title: "Indian Coast Guard Navik", level: "Beginner", duration: "4 weeks", badge: "New", color: "from-lime-500 to-green-600", description: "Navik pattern, eligibility, and technical basics with previous year trends." },
    { id: 11, title: "Army Clerk/Store Keeper", level: "Beginner", duration: "4 weeks", badge: "Trending", color: "from-sky-500 to-blue-500", description: "Clerk/ SKT syllabus with typing/documentation preparation and practice sets." },
    { id: 12, title: "Army Technical Trades", level: "Intermediate", duration: "6 weeks", badge: "Popular", color: "from-indigo-500 to-violet-500", description: "Trade‑specific physics/maths basics and applied questions with mocks." },
    { id: 13, title: "UPSC NDA/NA (I)", level: "Advanced", duration: "16 weeks", badge: "Premium", color: "from-red-500 to-orange-500", description: "Complete NDA/NA (I) exam prep with Mathematics and GAT sections." },
    { id: 14, title: "UPSC NDA/NA (II)", level: "Advanced", duration: "16 weeks", badge: "Premium", color: "from-stone-500 to-zinc-600", description: "Second attempt strategy with advanced problem-solving and revision." },
    { id: 15, title: "AFCAT EKT Technical", level: "Intermediate", duration: "8 weeks", badge: "Technical", color: "from-blue-600 to-indigo-600", description: "Engineering Knowledge Test for technical branches with solved examples." },
    { id: 16, title: "Navy B.Tech Entry", level: "Advanced", duration: "12 weeks", badge: "Engineering", color: "from-green-600 to-teal-600", description: "Technical entry prep with physics, chemistry, maths for naval architecture." },
    { id: 17, title: "Army TGC/TES Entry", level: "Advanced", duration: "10 weeks", badge: "Officer", color: "from-amber-500 to-yellow-600", description: "Technical Graduate/Engineer entry: aptitude, reasoning, and technical tests." },
    { id: 18, title: "Navy Pilot/Observer", level: "Advanced", duration: "14 weeks", badge: "Aviation", color: "from-fuchsia-500 to-pink-600", description: "Naval aviation entry: AFCAT-like pattern plus aviation aptitude tests." },
    { id: 19, title: "IAF Meteorology Entry", level: "Intermediate", duration: "8 weeks", badge: "Specialist", color: "from-violet-500 to-purple-600", description: "Met entry syllabus: physics, maths, and atmospheric science basics." },
    { id: 20, title: "Indian Navy SSC Entry", level: "Intermediate", duration: "8 weeks", badge: "Short Service", color: "from-cyan-600 to-sky-600", description: "Short Service Commission prep with executive and technical branches." },
    { id: 21, title: "UPSC CDS (OTA)", level: "Advanced", duration: "14 weeks", badge: "Officer", color: "from-emerald-600 to-green-700", description: "Officers Training Academy entry with English, GK, and Elementary Maths." },
    { id: 22, title: "UPSC CDS (IMA)", level: "Advanced", duration: "14 weeks", badge: "Premium", color: "from-orange-600 to-amber-600", description: "Indian Military Academy preparation with complete subject coverage." },
    { id: 23, title: "UPSC CDS (AFA)", level: "Advanced", duration: "14 weeks", badge: "Aviation", color: "from-indigo-600 to-blue-700", description: "Air Force Academy: compete for flying and technical branches." },
    { id: 24, title: "UPSC CDS (INA)", level: "Advanced", duration: "14 weeks", badge: "Naval", color: "from-rose-500 to-red-600", description: "Indian Naval Academy prep with maritime focus and subject specialization." },
    { id: 25, title: "Agniveer Navy SSR", level: "Beginner", duration: "6 weeks", badge: "Entry", color: "from-teal-600 to-green-700", description: "Senior Secondary Recruit: maths, science, and English for naval duties." },
    { id: 26, title: "Agniveer Navy MR", level: "Beginner", duration: "5 weeks", badge: "Entry", color: "from-purple-600 to-fuchsia-600", description: "Matric Recruit: basic reasoning, maths, and GK for sailor entry." },
    { id: 27, title: "Agniveer Air Force", level: "Beginner", duration: "6 weeks", badge: "Entry", color: "from-sky-600 to-blue-600", description: "IAF Agniveer preparation with technical and non-technical trades." },
    { id: 28, title: "Agniveer Clerk/SKT", level: "Beginner", duration: "5 weeks", badge: "Admin", color: "from-lime-600 to-green-600", description: "Army clerical and store keeper technical posts with typing practice." },
    { id: 29, title: "Agniveer Tradesman", level: "Beginner", duration: "5 weeks", badge: "Technical", color: "from-amber-600 to-yellow-600", description: "Technical trades: fitter, electrician, welder syllabus with practicals." },
    { id: 30, title: "BSF Head Constable", level: "Intermediate", duration: "7 weeks", badge: "Paramilitary", color: "from-red-600 to-rose-600", description: "Border Security Force HC exam with reasoning, GK, and numerical ability." },
    { id: 31, title: "CRPF Sub-Inspector", level: "Intermediate", duration: "8 weeks", badge: "Officer", color: "from-indigo-600 to-violet-600", description: "Central Reserve Police SI: paper I & II with leadership focus." },
    { id: 32, title: "ITBP Constable", level: "Beginner", duration: "6 weeks", badge: "Border", color: "from-cyan-600 to-teal-600", description: "Indo-Tibetan Border Police constable prep with high-altitude training tips." },
    { id: 33, title: "SSB Constable (GD)", level: "Beginner", duration: "5 weeks", badge: "Paramilitary", color: "from-green-600 to-emerald-600", description: "Sashastra Seema Bal constable: reasoning, GK, and physical standards." },
    { id: 34, title: "CISF ASI/HC", level: "Intermediate", duration: "7 weeks", badge: "Security", color: "from-orange-600 to-amber-600", description: "Central Industrial Security Force ASI/HC with numerical and reasoning." },
    { id: 35, title: "RPF Constable", level: "Beginner", duration: "5 weeks", badge: "Railway", color: "from-blue-600 to-indigo-600", description: "Railway Protection Force constable: GK, reasoning, and arithmetic." },
    { id: 36, title: "RPF SI/ASI", level: "Intermediate", duration: "7 weeks", badge: "Railway Officer", color: "from-pink-600 to-rose-600", description: "Railway SI exam with law, GK, and case studies." },
    { id: 37, title: "SSC CPO (SI)", level: "Advanced", duration: "10 weeks", badge: "Police", color: "from-teal-600 to-cyan-600", description: "Sub-Inspector in Delhi Police, CAPFs: paper I & II with interview prep." },
    { id: 38, title: "State Police Constable", level: "Beginner", duration: "6 weeks", badge: "State", color: "from-violet-600 to-purple-600", description: "General constable recruitment for various state police forces." },
    { id: 39, title: "State Police SI", level: "Intermediate", duration: "8 weeks", badge: "Officer", color: "from-emerald-600 to-green-600", description: "State-level Sub-Inspector: reasoning, law, and state GK." },
    { id: 40, title: "Defense Interview Skills", level: "Intermediate", duration: "4 weeks", badge: "Interview", color: "from-amber-600 to-yellow-600", description: "Personal interview techniques, body language, and confidence building." },
    { id: 41, title: "SSB Lecturette & GTO", level: "Intermediate", duration: "5 weeks", badge: "SSB", color: "from-red-600 to-orange-600", description: "Group discussion, lecturette preparation, and GTO task strategies." },
    { id: 42, title: "TAT/WAT/SRT Practice", level: "Intermediate", duration: "4 weeks", badge: "Psychology", color: "from-indigo-600 to-blue-600", description: "Thematic, word association, and situation reaction tests with feedback." },
    { id: 43, title: "Conference Preparation", level: "Advanced", duration: "3 weeks", badge: "SSB Final", color: "from-lime-600 to-green-600", description: "Final board interaction, handling panel questions, and self-presentation." },
    { id: 44, title: "Running & Endurance", level: "Beginner", duration: "8 weeks", badge: "Fitness", color: "from-cyan-600 to-sky-600", description: "1.6 km run training: stamina, breathing, and progressive timing." },
    { id: 45, title: "Pull-ups & Strength", level: "Beginner", duration: "6 weeks", badge: "Fitness", color: "from-purple-600 to-fuchsia-600", description: "Upper body strength for PET: pull-ups, push-ups, and core exercises." },
    { id: 46, title: "Medical Fitness Guide", level: "Beginner", duration: "3 weeks", badge: "Medical", color: "from-rose-600 to-red-600", description: "Medical exam preparation: diet, eye care, and common disqualifications." },
    { id: 47, title: "Document Preparation 101", level: "Beginner", duration: "2 weeks", badge: "Essential", color: "from-teal-600 to-emerald-600", description: "Certificates, affidavits, and verification checklists for recruitment." },
    { id: 48, title: "Defense Current Affairs", level: "Intermediate", duration: "12 weeks", badge: "Weekly", color: "from-orange-600 to-amber-600", description: "Weekly updates on defense news, exercises, and appointments." },
    { id: 49, title: "Mock Interview Series", level: "Advanced", duration: "4 weeks", badge: "Practice", color: "from-blue-600 to-indigo-600", description: "Live mock interviews with feedback from ex-defense personnel." },
    { id: 50, title: "Final Revision Package", level: "Advanced", duration: "3 weeks", badge: "Last Mile", color: "from-green-600 to-teal-600", description: "Quick revision capsules and formula sheets for all defense exams." }
  ].map((c, idx) => ({ ...c, image: SHUFFLED_IMAGES[idx % SHUFFLED_IMAGES.length] }));

  return (
    <section className="max-w-7xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Featured Courses</h2>
        <button className="px-4 py-2 rounded-md bg-white/10 text-white border border-white/20 hover:bg-white/15 transition">View All</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((c) => (
          <div key={c.id} className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md">
            {c.image ? (
              <img
                src={c.image}
                alt={`${c.title} banner`}
                className="h-24 w-full object-cover"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={`h-24 w-full bg-gradient-to-r ${c.color} opacity-80`} />
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-full">{c.badge}</span>
                <span className="text-xs text-gray-600">{c.level}</span>
              </div>
              <h3 className="text-gray-900 text-lg font-semibold group-hover:underline">{c.title}</h3>
              <p className="text-gray-500 text-sm mt-1">Duration: {c.duration}</p>
              {c.description && (
                <p className="text-gray-600 text-sm mt-1">{c.description}</p>
              )}
              <div className="mt-4 flex items-center justify-between">
                <button className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">Enroll</button>
                <button className="px-3 py-2 text-sm rounded-md bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

