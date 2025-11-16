import React, { useEffect, useRef, useState } from 'react';

const FeaturesAccordion = () => {
  const scrollRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: 1,
      title: "Job Alerts & Notifications",
      icon: "📋",
      content: "Get real-time notifications for defence recruitment notifications across all services including Army, Navy, Air Force, and Coast Guard. Never miss an opportunity with instant alerts for new job postings, exam dates, and application deadlines.",
      details: ["Real-time notifications", "Multi-service coverage", "Application deadline reminders", "Exam date alerts"]
    },
    {
      id: 2,
      title: "Comprehensive Exam Preparation",
      icon: "📚",
      content: "Access comprehensive study materials, mock tests, and expert strategies tailored for defence entrance exams. Our platform provides everything you need to excel in written exams, physical fitness tests, and medical examinations.",
      details: ["Study materials & notes", "Mock tests & practice papers", "Expert exam strategies", "Physical fitness guides", "Medical exam preparation"]
    },
    {
      id: 3,
      title: "AI-Powered Personal Mentor",
      icon: "🤖",
      content: "Experience personalized guidance with our AI mentor that adapts to your learning style and progress. Get customized study plans, performance analytics, and intelligent recommendations to optimize your preparation journey.",
      details: ["Personalized study plans", "Performance analytics", "Adaptive learning", "Progress tracking", "Smart recommendations"]
    },
    {
      id: 4,
      title: "Fitness & Health Tracking",
      icon: "💪",
      content: "Monitor your fitness progress with detailed tracking and get workout plans specifically designed for defence service standards. Track your physical parameters and ensure you're meeting the required fitness criteria.",
      details: ["Workout plan generator", "Fitness progress tracking", "Physical standard guides", "Health monitoring", "Performance metrics"]
    },
    {
      id: 5,
      title: "Community & Peer Support",
      icon: "👥",
      content: "Connect with fellow aspirants, share experiences, and learn from success stories. Join study groups, participate in discussions, and get motivated by the achievements of those who have successfully joined the defence forces.",
      details: ["Study groups & forums", "Success story sharing", "Mentorship programs", "Discussion boards", "Motivational content"]
    },
    {
      id: 6,
      title: "Video Learning & Tutorials",
      icon: "🎬",
      content: "Access expert-curated video tutorials and live sessions covering all aspects of defence preparation. Learn from experienced defence personnel and subject matter experts through engaging video content.",
      details: ["Expert video tutorials", "Live interactive sessions", "Subject-wise video series", "Interview preparation videos", "Leadership & discipline training"]
    }
  ];

  // Duplicate features for seamless infinite scroll
  const duplicatedFeatures = [...features, ...features];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const cardWidth = 320; // Approximate width of each card
    const totalWidth = cardWidth * features.length;

    const scroll = () => {
      scrollAmount += 2; // Increased speed for more animation
      scrollContainer.scrollLeft = scrollAmount;

      // Reset scroll when reaching the end of original content
      if (scrollAmount >= totalWidth) {
        scrollAmount = 0;
        scrollContainer.scrollLeft = 0;
      }
    };

    const interval = setInterval(scroll, 30); // Faster interval for more animation

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          ref={scrollRef}
          className="flex overflow-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {duplicatedFeatures.map((feature, index) => (
            <div
              key={`${feature.id}-${index}`}
              className="flex-shrink-0 w-80 px-4 cursor-pointer"
              onMouseEnter={() => {
                setHoveredCard(feature.id);
              }}
              onMouseLeave={() => {
                setHoveredCard(null);
              }}
            >
              <div className={`bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 h-full transition-all duration-500 ${
                hoveredCard === feature.id
                  ? 'bg-white/20 scale-110 shadow-2xl z-10 relative'
                  : 'hover:bg-white/15 hover:scale-105'
              }`}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl">{feature.icon}</span>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className={`text-white/80 mb-4 leading-relaxed text-sm transition-all duration-500 ${
                  hoveredCard === feature.id ? 'line-clamp-none' : 'line-clamp-3'
                }`}>
                  {hoveredCard === feature.id ? feature.content : feature.content.substring(0, 120) + '...'}
                </p>
                {hoveredCard === feature.id && (
                  <div className="grid grid-cols-1 gap-2 animate-fade-in">
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2 text-white/70 text-sm">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></span>
                        {detail}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Join thousands of aspirants who are already using DeshSainik to achieve their dream of serving the nation.
            Start your preparation today with our comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200">
              Get Started Free
            </button>
            <button className="px-8 py-3 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors duration-200">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesAccordion;
