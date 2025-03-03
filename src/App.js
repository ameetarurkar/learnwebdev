import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import LessonContent from "./components/LessonContent";
import Challenge from "./components/Challenge";
import Quiz from "./components/Quiz";
import AIHelper from "./components/AIHelper";
import { X, Award, FileCode, Users } from "lucide-react";

// CSS for animations and custom styling
import "./App.css";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeConcept, setActiveConcept] = useState("html-fundamentals");
  const [activeLesson, setActiveLesson] = useState(0);
  const [viewMode, setViewMode] = useState("lesson"); // 'lesson', 'challenge', or 'quiz'
  const [showAIHelper, setShowAIHelper] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiChat, setAiChat] = useState([
    {
      role: "assistant",
      content:
        "Hi there! I'm your AI coding assistant. How can I help you with your web development journey today?",
    },
  ]);
  const [showAchievement, setShowAchievement] = useState(false);

  // Function to navigate to a specific module
  const navigateToModule = (module, mode = "lesson") => {
    setActiveConcept(module);
    setActiveLesson(0);
    setViewMode(mode);
    setActiveTab("learn");
  };

  // Helper function to render the main content based on active tab
  const renderMainContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard navigateToModule={navigateToModule} />;
      case "learn":
        if (viewMode === "lesson") {
          return (
            <LessonContent
              activeConcept={activeConcept}
              activeLesson={activeLesson}
              setActiveLesson={setActiveLesson}
              setViewMode={setViewMode}
            />
          );
        } else if (viewMode === "challenge") {
          return (
            <Challenge
              activeConcept={activeConcept}
              setViewMode={setViewMode}
            />
          );
        } else if (viewMode === "quiz") {
          return (
            <Quiz activeConcept={activeConcept} setViewMode={setViewMode} />
          );
        }
        return null;
      case "challenges":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-lg">
              <div className="w-16 h-16 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                More Challenges Coming Soon
              </h2>
              <p className="text-gray-600 mb-4">
                We're busy creating more coding challenges for you to practice
                your skills. Check back soon!
              </p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() =>
                  navigateToModule("html-fundamentals", "challenge")
                }
              >
                Try HTML Challenge
              </button>
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-lg">
              <div className="w-16 h-16 rounded-full bg-purple-100 mx-auto mb-4 flex items-center justify-center text-purple-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Projects Coming Soon</h2>
              <p className="text-gray-600 mb-4">
                Exciting real-world projects are being developed to help you
                apply your skills. Stay tuned!
              </p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setActiveTab("dashboard")}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
      case "achievements":
        return (
          <div className="p-6">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Achievements</h2>
              <p className="text-lg opacity-90 mb-6">
                Track your progress and unlock badges as you learn!
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">1/12</div>
                  <div className="text-sm">Badges Earned</div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">3/8</div>
                  <div className="text-sm">HTML Progress</div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm">Day Streak</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">HTML Achievements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center mx-auto mb-3">
                    <Award size={32} />
                  </div>
                  <h4 className="font-bold mb-1">HTML Rookie</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Completed your first HTML lesson
                  </p>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Completed
                  </span>
                </div>

                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
                    <Award size={32} />
                  </div>
                  <h4 className="font-bold mb-1">Challenge Accepted</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Completed your first coding challenge
                  </p>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    Locked
                  </span>
                </div>

                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
                    <Award size={32} />
                  </div>
                  <h4 className="font-bold mb-1">Quiz Master</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Scored 100% on a quiz
                  </p>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    Locked
                  </span>
                </div>

                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
                    <Award size={32} />
                  </div>
                  <h4 className="font-bold mb-1">HTML Pro</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Completed all HTML modules
                  </p>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    Locked
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">CSS Achievements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
                    <Award size={32} />
                  </div>
                  <h4 className="font-bold mb-1">CSS Beginner</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Completed your first CSS lesson
                  </p>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    Locked
                  </span>
                </div>

                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
                    <Award size={32} />
                  </div>
                  <h4 className="font-bold mb-1">Style Guru</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Completed advanced CSS challenges
                  </p>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    Locked
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    className="w-full sm:w-1/2 px-3 py-2 border rounded-md"
                    value="Web Dev Student"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full sm:w-1/2 px-3 py-2 border rounded-md"
                    value="student@example.com"
                    readOnly
                  />
                </div>

                <div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">
                    Update Profile
                  </button>
                </div>
              </div>

              <hr className="my-6" />

              <h3 className="text-xl font-bold mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="darkMode"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={false}
                    readOnly
                  />
                  <label
                    htmlFor="darkMode"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Dark Mode (Coming Soon)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notifications"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={true}
                    readOnly
                  />
                  <label
                    htmlFor="notifications"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Show Notifications
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="aiHelper"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={true}
                    readOnly
                  />
                  <label
                    htmlFor="aiHelper"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    AI Helper Enabled
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p>This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setViewMode={setViewMode}
      />

      {/* Main content area */}
      <div className="flex-1 overflow-auto relative">
        {renderMainContent()}

        {/* AI Helper */}
        <AIHelper
          showAIHelper={showAIHelper}
          setShowAIHelper={setShowAIHelper}
          aiChat={aiChat}
          setAiChat={setAiChat}
          aiMessage={aiMessage}
          setAiMessage={setAiMessage}
          activeConcept={activeConcept}
        />

        {/* Quick Floating Help Bubbles */}
        <div className="fixed bottom-24 left-6 space-y-2 z-40">
          <div className="bg-white p-3 rounded-full shadow-lg flex items-center justify-center">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              title="Documentation"
            >
              <FileCode size={20} className="text-blue-500" />
            </a>
          </div>
          <div className="bg-white p-3 rounded-full shadow-lg flex items-center justify-center">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              title="Video Tutorials"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </div>
          <div className="bg-white p-3 rounded-full shadow-lg flex items-center justify-center">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              title="Community Forum"
            >
              <Users size={20} className="text-green-500" />
            </a>
          </div>
        </div>

        {/* Achievement Notification (Popup) - conditionally rendered */}
        {showAchievement && (
          <div className="fixed top-6 right-6 z-50 bg-white rounded-lg shadow-lg p-4 border-l-4 border-green-500 flex items-center max-w-sm animate-fadeIn">
            <div className="bg-green-100 text-green-500 rounded-full p-2 mr-3">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-bold">Achievement Unlocked!</h4>
              <p className="text-sm text-gray-600">
                HTML Elements Master - You've completed the lesson!
              </p>
            </div>
            <button
              className="ml-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowAchievement(false)}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Keyboard Shortcuts Tooltip - can be conditionally shown for new users */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm z-50 flex items-center">
          <span>Tip: Press </span>
          <kbd className="bg-gray-700 px-2 py-0.5 rounded mx-1 text-xs">
            Tab
          </kbd>
          <span> to indent code and </span>
          <kbd className="bg-gray-700 px-2 py-0.5 rounded mx-1 text-xs">
            Ctrl+/
          </kbd>
          <span> for code comments</span>
        </div>
      </div>
    </div>
  );
}

export default App;
