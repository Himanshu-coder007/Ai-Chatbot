"use client";
import React, { useState } from "react";
import {
  MessageSquare,
  Users,
  Zap,
  Brain,
  Shield,
  Palette,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from "lucide-react";

const FeaturesShowcase = () => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      icon: <Brain className="h-8 w-8" />,
      title: "Multiple AI Personas",
      description:
        "Switch between specialized AI assistants tailored for different needs and contexts.",
      details:
        "Our chatbot offers five distinct personas: Career Coach for professional guidance, Health Expert for wellness advice, Event Planner for organization help, Interviewer for practice sessions, and a General Assistant for everyday questions.",
      color: "bg-blue-500",
    },
    {
      id: 2,
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Natural Conversations",
      description:
        "Engage in fluid, human-like dialogues with context awareness and memory.",
      details:
        "The AI maintains conversation context, remembers previous exchanges, and adapts its responses based on the flow of discussion for a truly natural interaction experience.",
      color: "bg-green-500",
    },
    {
      id: 3,
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast Responses",
      description: "Get instant answers with our optimized AI response system.",
      details:
        "Leveraging the latest Gemini AI technology, our system delivers responses in under 1.5 seconds on average, ensuring smooth and uninterrupted conversations.",
      color: "bg-yellow-500",
    },
    {
      id: 4,
      icon: <Palette className="h-8 w-8" />,
      title: "Customizable Interface",
      description:
        "Personalize your chat experience with theme options and layout preferences.",
      details:
        "Choose from light, dark, or system-themed interfaces. Adjust text size, bubble styles, and notification preferences to create your ideal chatting environment.",
      color: "bg-purple-500",
    },
    {
      id: 5,
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy Focused",
      description:
        "Your conversations are encrypted and we never store personal data.",
      details:
        "We employ end-to-end encryption for all messages, regularly audit our security practices, and comply with global data protection regulations to keep your information safe.",
      color: "bg-red-500",
    },
    {
      id: 6,
      icon: <Users className="h-8 w-8" />,
      title: "Multi-User Support",
      description:
        "Perfect for teams with shared access and collaboration features.",
      details:
        "Create workspaces, share conversations with team members, and collaborate on ideas. Manage permissions and access levels for different team members.",
      color: "bg-indigo-500",
    },
  ];

  const toggleFeature = (id: number) => {
    if (expandedFeature === id) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Multipurpose AI Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            One powerful chatbot with specialized personas for every need. From
            career coaching to health advice, event planning to interview
            practice - we&apos;ve got you covered.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
              Start
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how our multipurpose chatbot can transform your daily tasks
            and workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                expandedFeature === feature.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div
                className={`p-6 cursor-pointer ${feature.color} bg-opacity-10 flex items-start`}
                onClick={() => toggleFeature(feature.id)}
              >
                <div
                  className={`p-3 rounded-lg ${feature.color} text-white mr-4`}
                >
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <div className="ml-2">
                  {expandedFeature === feature.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>

              {expandedFeature === feature.id && (
                <div className="p-6 border-t border-gray-100">
                  <p className="text-gray-700 mb-4">{feature.details}</p>
                  <div className="flex items-center text-sm text-blue-600 font-medium">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Included in all plans</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Personas Showcase */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Specialized AI Personas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Switch between expert assistants tailored for different tasks and
              needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Career Coach
              </h3>
              <p className="text-gray-600 text-sm">
                Professional guidance and career advice
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-6 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Health Expert
              </h3>
              <p className="text-gray-600 text-sm">
                Wellness and nutrition guidance
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Event Planner
              </h3>
              <p className="text-gray-600 text-sm">
                Event organization and coordination
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Interviewer
              </h3>
              <p className="text-gray-600 text-sm">
                Practice and preparation for interviews
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                General Assistant
              </h3>
              <p className="text-gray-600 text-sm">
                Everyday questions and tasks
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesShowcase;
