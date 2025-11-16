import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import FeaturesAccordion from "./components/FeaturesAccordion";
import AIChatbot from "./components/AIChatbot";
import Testimonials from "./components/Testimonials";
import JobAlerts from "./components/JobAlerts";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import axios from 'axios';

// Lightweight icon stubs so the UI can render without external icon libs.
const Icon = ({ children, size = 18, className = "" }) => (
  <span className={className} style={{ fontSize: size, display: "inline-flex", alignItems: "center" }}>
    {children}
  </span>
);

const Search = (props) => <Icon {...props}>🔍</Icon>;
const Calendar = (props) => <Icon {...props}>📅</Icon>;
const User = (props) => <Icon {...props}>👤</Icon>;
const Globe = (props) => <Icon {...props}>🌐</Icon>;
const MoreHorizontal = (props) => <Icon {...props}>⋯</Icon>;
const Bell = (props) => <Icon {...props}>🔔</Icon>;

const Card = ({ children, className = "" }) => (
  <div className={`bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl ${className}`.trim()}>{children}</div>
);

/**
 * HERO BOX:
 * - "Inside a box" as requested: a centered card with rounded corners and subtle backdrop.
 * - Replace heroBg with your image path if you want the exact screenshot as background.
 */
function HeroBox() {
  // change this path to where your screenshot sits (public folder recommended)
  // Example if you put it in public/images: "/images/hero-screenshot.png"
  const heroBg = "/images/hero-bg.jpg";

  return (
    <div className="w-full flex justify-center px-6">
      <Card className="max-w-6xl w-full p-12 relative overflow-hidden">
        {/* optional decorative background image inside the card (faint) */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
            filter: "grayscale(20%) blur(1px)",
            pointerEvents: "none",
          }}
        />
        {/* overlay to get the dark-blue fade like the screenshot */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#183152]/80 to-[#234365]/70 pointer-events-none" />

        <div className="relative z-10 text-center text-white">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Your Path to Defence Excellence
          </h2>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/90 mb-8">
            Complete preparation platform for aspirants dreaming of serving the nation.
            From exam prep to job alerts, we have got you covered.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <a
              href="#start"
              className="inline-flex items-center px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-blue-900 font-semibold shadow-md transition"
            >
              Start Your Journey
            </a>

            <button
              className="inline-flex items-center px-5 py-3 rounded-full border border-white/60 bg-transparent text-white/90 hover:bg-white/5 transition"
            >
              Watch Demo
            </button>
          </div>

          {/* stat row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
            <Stat number="50K+" label="Active Users" />
            <Stat number="1000+" label="Success Stories" />
            <Stat number="95%" label="Success Rate" />
            <Stat number="24/7" label="Support" />
          </div>
        </div>
      </Card>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold">{number}</div>
      <div className="text-sm text-white/80">{label}</div>
    </div>
  );
}

function HomePage() {
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const headingRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const [region, setRegion] = useState("All");
  const [category, setCatepgory] = useState("All");

  const data = [
    { id: 1, title: "Army GD Rally", region: "North", category: "GD", date: "2025-12-10" },
    { id: 2, title: "Air Force Clerk Exam", region: "South", category: "Clerk", date: "2025-12-15" },
    { id: 3, title: "Navy Technical Entry", region: "West", category: "Technical", date: "2026-01-05" },
    { id: 4, title: "Army Nursing Recruitment", region: "East", category: "Nursing", date: "2025-12-25" },
  ];

  const filtered = data.filter(
    (item) =>
      (region === "All" || item.region === region) &&
      (category === "All" || item.category === category) &&
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* 🧭 Fixed Header */}
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

          <div className="flex-1 mx-6 max-w-xl">
            {/* prevent full page reload on submit */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-full px-3 py-2 shadow-sm"
            >
              <Search size={18} className="text-gray-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search here for jobs, results, admit cards..."
                className="flex-1 px-3 text-sm bg-transparent outline-none text-gray-700"
              />
              <button
                type="submit"
                className="ml-3 bg-red-600 text-white px-4 py-1.5 text-sm font-semibold rounded-full hover:bg-red-700 transition"
              >
                Search
              </button>
            </form>
          </div>

          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="px-4 py-2 text-sm font-medium text-gray-700">
                  Welcome, {user?.name || user?.email}
                </span>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('isAuthenticated');
                    setIsAuthenticated(false);
                    setUser(null);
                    navigate('/');
                  }}
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

      {/* Intro Section with Background Video */}
      <section className="relative w-full h-screen overflow-hidden mb-8">
        {/* Background video - full screen */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/bg.mp4"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Centered hero box on top of video */}
        <div className="relative z-20 h-full flex items-center justify-center pt-28">
          <HeroBox />
        </div>
      </section>

      {/* Radial Animation Section - Below Background Video */}
      <section className="relative w-full py-8 overflow-hidden" ref={headingRef}>
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/op.mp4"
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/70" />

        <style>{`
          @keyframes slideUpFade {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideUpFadeDelay {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-on-scroll {
            opacity: 0;
          }
          .animate-on-scroll.visible {
            animation: slideUpFade 0.8s ease-out forwards;
          }
          .animate-on-scroll-delay {
            opacity: 0;
          }
          .animate-on-scroll-delay.visible {
            animation: slideUpFadeDelay 0.8s ease-out 0.2s forwards;
          }
        `}</style>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold text-white mb-2 animate-on-scroll ${isVisible ? "visible" : ""}`}>Why Choose DeshSainik?</h2>
          <p className={`text-lg text-white/80 mb-0 animate-on-scroll-delay ${isVisible ? "visible" : ""}`}>Everything you need for defence services preparation</p>
        </div>
        <div className="relative z-10">
          <FeaturesAccordion />
        </div>
      </section>

      {/* AI Chatbot Section */}
      <AIChatbot />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Job Alerts Section */}
      <JobAlerts />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
