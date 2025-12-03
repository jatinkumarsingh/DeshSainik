import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import FeaturesAccordion from "./components/FeaturesAccordion";
import AIChatbot from "./components/AIChatbot";
import Testimonials from "./components/Testimonials";
import JobAlerts from "./components/JobAlerts";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import StartJourney from "./components/StartJourney";
import AdminPanel from "./components/AdminPanel";


const Icon = ({ children, size = 18, className = "" }) => (
  <span className={className} style={{ fontSize: size, display: "inline-flex", alignItems: "center" }}>
    {children}
  </span>
);
const Search = (props) => <Icon {...props}>🔍</Icon>;
const Calendar = (props) => <Icon {...props}>📅</Icon>;
const User = (props) => <Icon {...props}>👤</Icon>;
const GlobeIcon = (props) => <Icon {...props}>🌐</Icon>;
const MoreHorizontal = (props) => <Icon {...props}>⋯</Icon>;
const Bell = (props) => <Icon {...props}>🔔</Icon>;

const Card = ({ children, className = "" }) => (
  <div className={`bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl ${className}`.trim()}>{children}</div>
);

function HeroBox() {
  const heroBg = "/back.jpg";

  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center px-6">
      <Card className="max-w-6xl w-full p-12 relative overflow-hidden">
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
            <button
              onClick={() => navigate("/start-journey")}
              className="inline-flex items-center px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-blue-900 font-semibold shadow-md transition"
            >
              Start Your Journey
            </button>
            <button
              className="inline-flex items-center px-5 py-3 rounded-full border border-white/60 bg-transparent text-white/90 hover:bg-white/5 transition"
            >
              Watch Demo
            </button>
          </div>

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
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const headingRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fine-tuned cache clearing for smooth experience
    const keysToRemove = [
      'isAuthenticated',
      'wastedCookie',
      'oldSession',
      'tempData',
      'unusedKey',
      // Add any other app-specific or unused keys here
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    // Optionally clear sessionStorage for app-specific keys
    if (window.sessionStorage) {
      ['oldSession', 'tempData', 'unusedKey'].forEach((key) => sessionStorage.removeItem(key));
    }

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
  const [category, setCategory] = useState("All");

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(true);

    try {
      const response = await fetch('http://localhost:8002/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: search,
          region: region,
          category: category,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSearchResults(result.data);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    // Live search suggestions as user types
    const trimmedSearch = search.trim();
    if (trimmedSearch === "") {
      setSearchResults([]);
      return;
    }
    fetch('http://localhost:8002/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: trimmedSearch,
        region: region,
        category: category,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setSearchResults(result.data);
        } else {
          setSearchResults([]);
        }
      })
      .catch(() => setSearchResults([]));
  }, [search, region, category]);

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

          <form className="flex-1 mx-6 max-w-xl relative" onSubmit={handleSearch}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for jobs, results, admit cards..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
                {searchResults.map((result) => (
                  <div key={result.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
                    <div className="font-medium text-gray-900">{result.title}</div>
                    <div className="text-sm text-gray-600">{result.category} • {result.region}</div>
                  </div>
                ))}
              </div>
            )}
            {search.trim() !== "" && searchResults.length === 0 && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg p-4 z-50">
                <p className="text-gray-600 text-center">No results found for "{search}"</p>
              </div>
            )}
          </form>

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
                    localStorage.clear(); // Clear all cache and cookies
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

      <section className="relative w-full h-screen overflow-hidden mb-8">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url(/back.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/back.jpg"
          className="absolute top-0 left-0 w-full h-full object-cover"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noplaybackrate"
          onError={(e) => {
            const el = e.currentTarget;
            el.style.display = "none";
          }}
        >
          <source src="https://assets.mixkit.co/videos/23593/23593-720.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-20 h-full flex items-center justify-center pt-28">
          <HeroBox />
        </div>
      </section>

      <section className="relative w-full py-8 overflow-hidden" ref={headingRef}>
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url(/back.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/back.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noplaybackrate"
          onError={(e) => {
            const el = e.currentTarget;
            el.style.display = "none";
          }}
        >
          <source src="/op.mp4" type="video/mp4" />
        </video>
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

      <AIChatbot />

      <Testimonials />

      <JobAlerts />

      <ContactForm />

      <Footer />
    </>
  );
}



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/start-journey" element={<StartJourney />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
