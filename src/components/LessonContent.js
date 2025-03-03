import React, { useState, useEffect } from "react";
import { ChevronRight, FileCode, CheckCircle, Eye, Code } from "lucide-react";
import { getLessons, getLesson, getDocLinks } from "../services/dataService";

const LessonContent = ({
  activeConcept,
  activeLesson,
  setActiveLesson,
  setViewMode,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [docLinks, setDocLinks] = useState([]);

  // Load lessons and doc links when component mounts or activeConcept changes
  useEffect(() => {
    setLessons(getLessons(activeConcept));
    setDocLinks(getDocLinks(activeConcept));
  }, [activeConcept]);

  // Update current lesson when activeLesson changes
  useEffect(() => {
    const lesson = getLesson(activeConcept, activeLesson);
    setCurrentLesson(lesson);
  }, [activeConcept, activeLesson]);

  // Code example to be displayed in preview
  const codeExample = `<!DOCTYPE html>
<html>
  <head>
    <title>HTML Elements Example</title>
  </head>
  <body>
    <h1>Welcome to HTML</h1>
    <p>This is a paragraph about HTML elements.</p>
    <p>Here's a <a href="https://example.com">link to Example.com</a>.</p>
    <h2>Images in HTML</h2>
    <p>Here's an example image:</p>
    <img src="example.jpg" alt="An example image">
  </body>
</html>`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
      {/* Left panel - Lesson content */}
      <div className="col-span-1 border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">HTML Fundamentals</h2>
          <div className="mb-4">
            <span className="px-2 py-1 bg-gray-200 rounded text-sm mr-2">
              HTML
            </span>
            <span className="px-2 py-1 bg-gray-200 rounded text-sm">
              Beginner
            </span>
          </div>

          {/* Lesson/Challenge/Quiz Toggle */}
          <div className="flex mb-6 border rounded overflow-hidden">
            <button
              className="flex-1 py-2 bg-blue-500 text-white"
              onClick={() => setViewMode("lesson")}
            >
              <div className="flex items-center justify-center">
                <Code size={16} className="mr-1" />
                <span>Lessons</span>
              </div>
            </button>
            <button
              className="flex-1 py-2 bg-gray-100"
              onClick={() => setViewMode("challenge")}
            >
              <div className="flex items-center justify-center">
                <Code size={16} className="mr-1" />
                <span>Challenge</span>
              </div>
            </button>
            <button
              className="flex-1 py-2 bg-gray-100"
              onClick={() => setViewMode("quiz")}
            >
              <div className="flex items-center justify-center">
                <CheckCircle size={16} className="mr-1" />
                <span>Quiz</span>
              </div>
            </button>
          </div>

          {/* Lesson Navigation */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">
                Lesson {activeLesson + 1}/{lessons.length}
              </h3>
              <div className="flex">
                <button
                  className={`p-1 mr-1 rounded border ${
                    activeLesson === 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  disabled={activeLesson === 0}
                  onClick={() =>
                    activeLesson > 0 && setActiveLesson(activeLesson - 1)
                  }
                >
                  ←
                </button>
                <button
                  className={`p-1 rounded border ${
                    activeLesson === lessons.length - 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  disabled={activeLesson === lessons.length - 1}
                  onClick={() =>
                    activeLesson < lessons.length - 1 &&
                    setActiveLesson(activeLesson + 1)
                  }
                >
                  →
                </button>
              </div>
            </div>

            <div className="flex overflow-x-auto">
              {lessons.map((_, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 p-2 mr-2 rounded-full w-8 h-8 flex items-center justify-center ${
                    activeLesson === index
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setActiveLesson(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Lesson Content */}
          <div className="overflow-y-auto pr-2 max-h-[calc(100vh-20rem)] custom-scrollbar">
            {currentLesson && (
              <>
                <h3 className="font-bold text-lg mb-3">
                  {currentLesson.title}
                </h3>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                ></div>
              </>
            )}
          </div>

          {/* Next Lesson/Start Challenge Buttons */}
          <div className="mt-6 flex justify-between">
            {activeLesson < lessons.length - 1 ? (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
                onClick={() => setActiveLesson(activeLesson + 1)}
              >
                Next Lesson
                <ChevronRight size={16} className="ml-1" />
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded flex items-center"
                onClick={() => setViewMode("challenge")}
              >
                Start Challenge
                <Code size={16} className="ml-1" />
              </button>
            )}
          </div>

          {/* Documentation Links */}
          <div className="mt-6 mb-6">
            <h4 className="font-bold mb-2 flex items-center">
              <FileCode size={16} className="mr-1" />
              Additional Resources:
            </h4>
            <div className="bg-gray-50 p-3 rounded border">
              {docLinks.map((link, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-blue-500 hover:text-blue-700 font-medium block flex items-center"
                  >
                    <FileCode size={14} className="mr-1" />
                    {link.title}
                  </a>
                  <p className="text-sm text-gray-600 ml-5">
                    {link.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Code example and preview */}
      <div className="col-span-2 flex flex-col h-full">
        <div className="border-b p-2 bg-gray-100 flex">
          <button
            className={`px-3 py-1 ${
              !showPreview
                ? "bg-white rounded-t border-t border-l border-r"
                : "text-gray-500"
            }`}
            onClick={() => setShowPreview(false)}
          >
            <div className="flex items-center">
              <Code size={14} className="mr-1" />
              HTML Example
            </div>
          </button>
          <button
            className={`px-3 py-1 ${
              showPreview
                ? "bg-white rounded-t border-t border-l border-r"
                : "text-gray-500"
            }`}
            onClick={() => setShowPreview(true)}
          >
            <div className="flex items-center">
              <Eye size={14} className="mr-1" />
              Preview
            </div>
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {!showPreview ? (
            <div className="p-4 font-mono text-sm whitespace-pre-wrap bg-gray-50 h-full overflow-auto">
              <div>
                <span className="text-pink-600">&lt;!DOCTYPE html&gt;</span>
              </div>
              <div>
                <span className="text-pink-600">&lt;html&gt;</span>
              </div>
              <div>
                {" "}
                <span className="text-pink-600">&lt;head&gt;</span>
              </div>
              <div>
                {" "}
                <span className="text-pink-600">&lt;title&gt;</span>HTML
                Elements Example
                <span className="text-pink-600">&lt;/title&gt;</span>
              </div>
              <div>
                {" "}
                <span className="text-pink-600">&lt;/head&gt;</span>
              </div>
              <div>
                {" "}
                <span className="text-pink-600">&lt;body&gt;</span>
              </div>
              <div>
                {" "}
                <span className="text-pink-600">&lt;h1&gt;</span>Welcome to HTML
                <span className="text-pink-600">&lt;/h1&gt;</span>
              </div>
              <div>
                {" "}
                <span className="text-pink-600">&lt;p&gt;</span>This is a
                paragraph about HTML elements.
                <span className="text-pink-600">&lt;/p&gt;</span>
              </div>
              <div>
                {" "}
                <span className="text-pink-600">&lt;p&gt;</span>Here's a{" "}
                <span className="text-pink-600">&lt;a href=</span>
                <span className="text-green-600">"https://example.com"</span>
                <span className="text-pink-600">&gt;</span>link to Example.com
                <span className="text-pink-600">&lt;/a&gt;</span>.
                <span className="text-pink-600">&lt;/p&gt;</span>
              </div>
              <div>
                {" "}
                <span className="text-pink-600">&lt;h2&gt;</span>Images in HTML
                <span className="text-pink-600">&lt;/h2&gt;</span>
              </div>
              <div>
                {" "}
                <span className="text-pink-600">&lt;p&gt;</span>Here's an
                example image:<span className="text-pink-600">&lt;/p&gt;</span>
              </div>
              <div>
                {" "}
                <span className="text-pink-600">&lt;img src=</span>
                <span className="text-green-600">"example.jpg"</span>{" "}
                <span className="text-pink-600">alt=</span>
                <span className="text-green-600">"An example image"</span>
                <span className="text-pink-600">&gt;</span>
              </div>
              <div>
                {" "}
                <span className="text-pink-600">&lt;/body&gt;</span>
              </div>
              <div>
                <span className="text-pink-600">&lt;/html&gt;</span>
              </div>
            </div>
          ) : (
            <div className="p-6 h-full overflow-auto">
              <div className="border rounded-lg p-6 shadow-sm">
                <h1 className="text-2xl font-bold mb-4">Welcome to HTML</h1>
                <p className="mb-4">This is a paragraph about HTML elements.</p>
                <p className="mb-4">
                  Here's a{" "}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-blue-500 underline"
                  >
                    link to Example.com
                  </a>
                  .
                </p>
                <h2 className="text-xl font-bold mb-3">Images in HTML</h2>
                <p className="mb-3">Here's an example image:</p>
                <img
                  src="/api/placeholder/400/200"
                  alt="An example image"
                  className="rounded border"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-3 bg-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Try modifying this example in the Challenge section!
          </div>
          <button
            className="px-4 py-1 bg-blue-500 text-white rounded"
            onClick={() => setViewMode("challenge")}
          >
            Try It Yourself
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;
