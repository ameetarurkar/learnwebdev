import React, { useEffect, useState } from "react";
import {
  Activity,
  BookOpen,
  CheckCircle,
  Award,
  ChevronRight,
  FileCode,
} from "lucide-react";
import {
  getCourses,
  getAchievements,
  getLearningPath,
  getDocLinks,
} from "../services/dataService";

const Dashboard = ({ navigateToModule }) => {
  const [courses, setCourses] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [learningPath, setLearningPath] = useState([]);
  const [docLinks, setDocLinks] = useState({});

  useEffect(() => {
    // Load data from our data service
    setCourses(getCourses());
    setAchievements(getAchievements());
    setLearningPath(getLearningPath());

    // Get documentation links for each course
    const links = {};
    Object.keys(getCourses()).forEach((courseId) => {
      links[courseId] = getDocLinks(courseId);
    });
    setDocLinks(links);
  }, []);

  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-lg opacity-90 mb-6">
          Continue your web development journey where you left off.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigateToModule("html-fundamentals")}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center"
          >
            Continue Learning <ChevronRight size={18} className="ml-2" />
          </button>
          <button className="bg-blue-700 bg-opacity-30 text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-40 transition-colors border border-white border-opacity-30">
            View Roadmap
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Progress Card */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <Activity size={20} />
            </div>
            <h3 className="font-bold text-lg">Your Progress</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(courses).map(([courseId, course]) => (
              <div key={courseId} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{courseId.split("-")[0]}</span>
                  <span>{course.mastery}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${course.mastery}%`,
                      backgroundColor: course.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
              <CheckCircle size={20} />
            </div>
            <h3 className="font-bold text-lg">Daily Streaks</h3>
          </div>
          <div className="flex justify-between mb-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">5</div>
              <div className="text-sm text-gray-500">Current</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">7</div>
              <div className="text-sm text-gray-500">Best</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">12</div>
              <div className="text-sm text-gray-500">Total Days</div>
            </div>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg flex justify-between">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, index) => (
                <div key={day} className="text-center">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      index < 5 ? "bg-green-500" : "bg-gray-300"
                    } mb-1 mx-auto`}
                  ></div>
                  <div className="text-xs">{day}</div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Achievements Card */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
              <Award size={20} />
            </div>
            <h3 className="font-bold text-lg">Achievements</h3>
          </div>
          <div className="space-y-3">
            {achievements.slice(0, 3).map((achievement) => (
              <div
                key={achievement.id}
                className={`p-2 rounded-lg border flex items-center ${
                  achievement.earned
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    achievement.earned
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {achievement.earned ? (
                    <CheckCircle size={16} />
                  ) : (
                    <Award size={16} className="text-gray-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{achievement.title}</div>
                  <div className="text-xs text-gray-500">
                    {achievement.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
            <BookOpen size={20} />
          </div>
          <h3 className="font-bold text-lg">Learning Path</h3>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {learningPath.map((item, index) => (
            <div key={item.id} className="relative pl-12 pb-6">
              <div
                className={`absolute left-2 w-6 h-6 rounded-full flex items-center justify-center
                  ${
                    item.status === "completed"
                      ? "bg-green-500 text-white"
                      : item.status === "in-progress"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-white"
                  }`}
              >
                {item.status === "completed" ? (
                  <CheckCircle size={14} />
                ) : item.status === "in-progress" ? (
                  <Activity size={14} />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                )}
              </div>
              <div
                className={`p-3 rounded-lg
                  ${
                    item.status === "completed"
                      ? "bg-green-50 border border-green-200"
                      : item.status === "in-progress"
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-gray-50 border border-gray-200"
                  }`}
              >
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
                <div className="mt-2 flex">
                  <span
                    className={`px-2 py-0.5 rounded text-xs
                      ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : item.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {item.status === "completed"
                      ? "Completed"
                      : item.status === "in-progress"
                      ? "In Progress"
                      : "Locked"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Cards */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="font-bold text-lg mb-4">Continue Learning</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(courses).map(([courseId, course]) => {
            if (course.comingSoon) return null;
            return (
              <div key={courseId} className="border rounded-lg overflow-hidden">
                <div className="h-40 bg-red-100 flex items-center justify-center relative">
                  <div className="text-5xl text-red-500">&lt;/&gt;</div>
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {course.mastery}% Complete
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold mb-1">{course.title}</h4>
                  <p className="text-sm text-gray-500 mb-3">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigateToModule(courseId)}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                    >
                      Continue
                    </button>
                    <div className="text-xs text-gray-500">
                      {course.completedLessons}/{course.totalLessons} Lessons
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {Object.entries(courses).map(([courseId, course]) => {
            if (!course.comingSoon) return null;
            return (
              <div key={courseId} className="border rounded-lg overflow-hidden">
                <div className="h-40 bg-blue-100 flex items-center justify-center relative">
                  <div className="text-5xl text-blue-500">{`{ }`}</div>
                  <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded">
                    Coming Soon
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold mb-1">{course.title}</h4>
                  <p className="text-sm text-gray-500 mb-3">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm">
                      Coming Soon
                    </button>
                    <div className="text-xs text-gray-500">
                      {course.completedLessons}/{course.totalLessons} Lessons
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Documentation Library */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
            <FileCode size={20} />
          </div>
          <h3 className="font-bold text-lg">Documentation Library</h3>
        </div>
        <div className="border-b pb-2 mb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-8 pr-4 py-2 border rounded"
            />
            <svg
              className="w-4 h-4 absolute left-2.5 top-3 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(docLinks).map(([courseId, links], index) => {
            if (!links || links.length === 0) return null;

            const course = courses[courseId];
            if (!course) return null;

            return (
              <div
                key={courseId}
                className={`border-l-4 pl-3 border-${
                  courseId.includes("html")
                    ? "red-500"
                    : courseId.includes("css")
                    ? "blue-500"
                    : "yellow-500"
                }`}
              >
                <h4 className="font-medium">
                  {courseId.split("-")[0].toUpperCase()}
                </h4>
                <div className="mt-2 space-y-1">
                  {links.slice(0, 2).map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-blue-500 hover:text-blue-700 block text-sm"
                    >
                      {link.title}
                    </a>
                  ))}
                  {links.length > 2 && (
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-sm text-gray-500"
                    >
                      View all {courseId.split("-")[0].toUpperCase()} docs →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
