import React from "react";
import {
  Activity,
  BookOpen,
  CheckSquare,
  Code,
  Settings,
  Award,
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, setViewMode }) => {
  return (
    <div className="w-16 bg-gray-800 flex flex-col items-center py-6">
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mb-8">
        WC
      </div>

      <nav className="flex flex-col items-center space-y-6 text-gray-400">
        <button
          className={`p-2 rounded ${
            activeTab === "dashboard"
              ? "bg-gray-700 text-white"
              : "hover:text-white"
          }`}
          onClick={() => setActiveTab("dashboard")}
          title="Dashboard"
        >
          <Activity size={24} />
        </button>
        <button
          className={`p-2 rounded ${
            activeTab === "learn"
              ? "bg-gray-700 text-white"
              : "hover:text-white"
          }`}
          onClick={() => {
            setActiveTab("learn");
            setViewMode("lesson");
          }}
          title="Lessons"
        >
          <BookOpen size={24} />
        </button>
        <button
          className={`p-2 rounded ${
            activeTab === "challenges"
              ? "bg-gray-700 text-white"
              : "hover:text-white"
          }`}
          onClick={() => setActiveTab("challenges")}
          title="Challenges"
        >
          <CheckSquare size={24} />
        </button>
        <button
          className={`p-2 rounded ${
            activeTab === "projects"
              ? "bg-gray-700 text-white"
              : "hover:text-white"
          }`}
          onClick={() => setActiveTab("projects")}
          title="Projects"
        >
          <Code size={24} />
        </button>
        <button
          className={`p-2 rounded ${
            activeTab === "achievements"
              ? "bg-gray-700 text-white"
              : "hover:text-white"
          }`}
          onClick={() => setActiveTab("achievements")}
          title="Achievements"
        >
          <Award size={24} />
        </button>
      </nav>

      <div className="mt-auto">
        <button
          className={`p-2 rounded ${
            activeTab === "settings"
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("settings")}
          title="Settings"
        >
          <Settings size={24} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
