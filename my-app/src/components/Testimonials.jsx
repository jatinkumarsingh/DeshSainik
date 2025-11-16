import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Army Officer",
      image: "👨‍✈️",
      content: "DeshSainik helped me crack the NDA exam on my first attempt. The AI mentor provided personalized guidance that made all the difference.",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Singh",
      role: "Navy Officer",
      image: "👩‍⚓",
      content: "The job alerts feature kept me updated about all recruitment drives. I got selected for the Navy through the platform's preparation materials.",
      rating: 5
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "Air Force Pilot",
      image: "👨‍🚀",
      content: "The fitness tracking and study plans were incredible. DeshSainik's community support motivated me throughout my preparation journey.",
      rating: 5
    },
    {
      id: 4,
      name: "Sneha Patel",
      role: "Army Medical Corps",
      image: "👩‍⚕️",
      content: "As a medical aspirant, I found the specialized content and mock tests extremely helpful. The platform covers everything needed for defence medical exams.",
      rating: 5
    }
  ];

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our successful aspirants who achieved their dream of serving the nation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">{testimonial.image}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-blue-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join the Success Club
            </h3>
            <p className="text-gray-600 mb-6">
              Thousands of aspirants have achieved their dreams with DeshSainik.
              Your success story could be next!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Start Your Journey
              </button>
              <button className="border border-gray-400 text-gray-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Read More Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
