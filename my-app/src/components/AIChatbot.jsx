'use client'

import { SplineScene } from "./ui/splite";
import { Card } from "./ui/card";
import { Spotlight } from "./ui/spotlight";

export function AIChatbot() {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-6">
              Meet Your AI Assistant
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Get personalized guidance for your defence services preparation. Our AI assistant is here to help you every step of the way with expert advice, study plans, and instant answers to your questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Conversation
              </button>
              <button className="border border-gray-400 text-gray-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right content - 3D Robot */}
          <div className="relative">
            <Card className="w-full h-[800px] bg-black/[0.96] relative overflow-hidden shadow-2xl border border-white/10">
              <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
              />

              <div className="absolute top-4 left-4 right-4 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white/80 text-sm font-medium">AI Assistant Online</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex h-full">
                <div className="flex-1 relative">
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <p className="text-white/90 text-sm">
                    🤖 "Hello! I'm here to help you with your defence preparation journey. What would you like to know?"
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIChatbot;
