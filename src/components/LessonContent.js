import React, { useState } from "react";
import { ChevronRight, FileCode, CheckCircle, Eye, Code } from "lucide-react";

// Sample lesson data - in a real app, this would come from a database or API
const lessonData = {
  "html-fundamentals": [
    {
      id: "html-intro",
      title: "What is HTML?",
      content: `
        <h3>Introduction to HTML</h3>
        <p>HTML stands for <strong>HyperText Markup Language</strong>. It is the standard language used to create web pages.</p>
        
        <div class="image-container">
          <img src="/api/placeholder/600/300" alt="HTML example" />
          <p class="image-caption">A visual representation of HTML structure</p>
        </div>
        
        <p>Think of HTML as the skeleton of a webpage - it provides the basic structure that holds everything together.</p>
        
        <div class="key-points">
          <h4>Key Points:</h4>
          <ul>
            <li>HTML is not a programming language; it's a markup language</li>
            <li>HTML uses "tags" to define different elements on a page</li>
            <li>HTML documents have the file extension .html</li>
            <li>Web browsers read HTML files and render them into visible web pages</li>
          </ul>
        </div>
        
        <div class="info-box">
          <div class="info-box-header">
            <span class="info-icon">ℹ️</span> Did You Know?
          </div>
          <p>HTML was created by Sir Tim Berners-Lee in 1991, while he was working at CERN. It was originally designed to help scientists share documents across different computer systems.</p>
        </div>
      `,
    },
    {
      id: "html-structure-basics",
      title: "Basic HTML Document Structure",
      content: `
        <h3>The Basic Structure of an HTML Document</h3>
        <p>Every HTML document follows a standard structure. Here's what it looks like:</p>
        
        <div class="code-example">
          <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;My First Heading&lt;/h1&gt;
    &lt;p&gt;My first paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>
        
        <div class="image-container">
          <img src="/api/placeholder/600/400" alt="HTML document structure" />
          <p class="image-caption">Visual breakdown of HTML document structure</p>
        </div>
        
        <h3>Understanding Each Part:</h3>
        <div class="element-breakdown">
          <div class="element-item">
            <div class="element-tag">&lt;!DOCTYPE html&gt;</div>
            <div class="element-description">Tells the browser this is an HTML5 document</div>
          </div>
          <div class="element-item">
            <div class="element-tag">&lt;html&gt;</div>
            <div class="element-description">The root element of the HTML page</div>
          </div>
          <div class="element-item">
            <div class="element-tag">&lt;head&gt;</div>
            <div class="element-description">Contains meta-information about the document (not visible on the page)</div>
          </div>
          <div class="element-item">
            <div class="element-tag">&lt;title&gt;</div>
            <div class="element-description">Specifies the title shown in the browser tab</div>
          </div>
          <div class="element-item">
            <div class="element-tag">&lt;body&gt;</div>
            <div class="element-description">Contains the visible content of the page</div>
          </div>
        </div>
      `,
    },
    {
      id: "html-elements",
      title: "Basic HTML Elements",
      content: `
        <h3>Common HTML Elements</h3>
        <p>Let's learn about the most frequently used HTML elements:</p>
        
        <h4>Headings</h4>
        <p>HTML has six levels of headings, from <code>&lt;h1&gt;</code> (most important) to <code>&lt;h6&gt;</code> (least important):</p>
        
        <div class="image-container">
          <img src="/api/placeholder/600/200" alt="HTML headings" />
          <p class="image-caption">Visual comparison of heading sizes</p>
        </div>
        
        <div class="code-example">
          <pre><code>&lt;h1&gt;This is heading 1&lt;/h1&gt;
&lt;h2&gt;This is heading 2&lt;/h2&gt;
&lt;h3&gt;This is heading 3&lt;/h3&gt;
&lt;h4&gt;This is heading 4&lt;/h4&gt;
&lt;h5&gt;This is heading 5&lt;/h5&gt;
&lt;h6&gt;This is heading 6&lt;/h6&gt;</code></pre>
        </div>
        
        <h4>Paragraphs</h4>
        <p>Paragraphs are defined with the <code>&lt;p&gt;</code> tag:</p>
        
        <div class="code-example">
          <pre><code>&lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;p&gt;This is another paragraph.&lt;/p&gt;</code></pre>
        </div>
        
        <h4>Links</h4>
        <p>Links are created using the <code>&lt;a&gt;</code> tag with the <code>href</code> attribute:</p>
        
        <div class="code-example">
          <pre><code>&lt;a href="https://www.example.com"&gt;Visit Example.com&lt;/a&gt;</code></pre>
        </div>
        
        <h4>Images</h4>
        <p>Images are added using the <code>&lt;img&gt;</code> tag with the <code>src</code> and <code>alt</code> attributes:</p>
        
        <div class="code-example">
          <pre><code>&lt;img src="image.jpg" alt="Description of the image"&gt;</code></pre>
        </div>
        <p>Note: The <code>&lt;img&gt;</code> tag doesn't need a closing tag.</p>
        
        <div class="interactive-exercise">
          <h4>Try It Yourself</h4>
          <p>Which tag would you use to create a clickable link?</p>
          <div class="options">
            <div class="option correct">
              <span>&lt;a&gt;</span>
            </div>
            <div class="option">
              <span>&lt;link&gt;</span>
            </div>
            <div class="option">
              <span>&lt;href&gt;</span>
            </div>
          </div>
        </div>
      `,
    },
  ],
};

// Documentation links
const docLinks = {
  "html-fundamentals": [
    {
      title: "MDN: HTML Basics",
      url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics",
      description: "Learn the basics of HTML",
    },
    {
      title: "W3Schools: HTML Tutorial",
      url: "https://www.w3schools.com/html/",
      description: "HTML tutorial with examples and exercises",
    },
    {
      title: "MDN: HTML elements reference",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element",
      description: "Comprehensive guide to all HTML elements",
    },
  ],
};

const LessonContent = ({
  activeConcept,
  activeLesson,
  setActiveLesson,
  setViewMode,
}) => {
  const [showPreview, setShowPreview] = useState(false);

  // Get current lesson data
  const getCurrentLessons = () => {
    return lessonData[activeConcept] || [];
  };

  const getCurrentLesson = () => {
    const lessons = getCurrentLessons();
    return (
      lessons[activeLesson] || {
        title: "Lesson",
        content: "Content not available",
      }
    );
  };

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
                Lesson {activeLesson + 1}/{getCurrentLessons().length}
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
                    activeLesson === getCurrentLessons().length - 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  disabled={activeLesson === getCurrentLessons().length - 1}
                  onClick={() =>
                    activeLesson < getCurrentLessons().length - 1 &&
                    setActiveLesson(activeLesson + 1)
                  }
                >
                  →
                </button>
              </div>
            </div>

            <div className="flex overflow-x-auto">
              {getCurrentLessons().map((_, index) => (
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
            <h3 className="font-bold text-lg mb-3">
              {getCurrentLesson().title}
            </h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: getCurrentLesson().content }}
            ></div>
          </div>

          {/* Next Lesson/Start Challenge Buttons */}
          <div className="mt-6 flex justify-between">
            {activeLesson < getCurrentLessons().length - 1 ? (
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
              {docLinks[activeConcept] &&
                docLinks[activeConcept].map((link, index) => (
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
