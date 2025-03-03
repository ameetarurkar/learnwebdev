import React from "react";
import { Bot, Send, X, Coffee, Sparkles } from "lucide-react";

const AIHelper = ({
  showAIHelper,
  setShowAIHelper,
  aiChat,
  setAiChat,
  aiMessage,
  setAiMessage,
  activeConcept,
}) => {
  // Helper function to generate AI responses based on the context and user message
  const generateAIResponse = (userMessage) => {
    if (userMessage.toLowerCase().includes("html")) {
      return "HTML is the standard markup language for creating web pages. It uses elements with opening and closing tags to structure content. For example, <p>This is a paragraph</p> creates a paragraph of text.";
    } else if (
      userMessage.toLowerCase().includes("image") ||
      userMessage.toLowerCase().includes("img")
    ) {
      return 'To add an image in HTML, use the <img> tag with the src attribute pointing to your image file and alt attribute for accessibility: <img src="image.jpg" alt="Description">';
    } else if (
      userMessage.toLowerCase().includes("link") ||
      userMessage.toLowerCase().includes("href")
    ) {
      return 'To create a link in HTML, use the <a> tag with the href attribute: <a href="https://example.com">Visit Example</a>';
    } else if (
      userMessage.toLowerCase().includes("stuck") ||
      userMessage.toLowerCase().includes("help")
    ) {
      return "I see you might be stuck. For HTML structure, remember that every HTML document should have <!DOCTYPE html>, <html>, <head>, and <body> tags. The content visible to users goes inside the <body> tag.";
    } else if (userMessage.toLowerCase().includes("css")) {
      return "CSS (Cascading Style Sheets) is used to style and format HTML content. It controls things like colors, fonts, spacing, and layout. You can add CSS to HTML using inline styles, internal stylesheets, or external stylesheets.";
    } else if (
      userMessage.toLowerCase().includes("javascript") ||
      userMessage.toLowerCase().includes("js")
    ) {
      return "JavaScript is a programming language that adds interactivity to web pages. You can use it to respond to user actions, modify HTML content dynamically, validate forms, create animations, and much more.";
    } else if (
      userMessage.toLowerCase().includes("element") ||
      userMessage.toLowerCase().includes("tag")
    ) {
      return "HTML elements are the building blocks of web pages. They are represented by tags like <p> for paragraphs, <h1> to <h6> for headings, <a> for links, <img> for images, etc. Most elements have an opening tag, content, and a closing tag: <tagname>Content</tagname>.";
    } else {
      return "I'm here to help with your web development learning! Do you have a specific question about HTML elements, attributes, or structure? Or would you like an example of a particular concept?";
    }
  };

  // Handler for sending messages
  const handleSendMessage = () => {
    if (aiMessage.trim()) {
      const userMessage = aiMessage;
      setAiChat([...aiChat, { role: "user", content: userMessage }]);

      // Simulate AI response
      setTimeout(() => {
        const response = generateAIResponse(userMessage);
        setAiChat((prev) => [
          ...prev,
          { role: "assistant", content: response },
        ]);
      }, 800);

      setAiMessage("");
    }
  };

  return (
    <>
      {/* AI Helper Button (always visible) */}
      <button
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg flex items-center justify-center ${
          showAIHelper ? "bg-red-500" : "bg-blue-500"
        } text-white z-50 transition-colors`}
        onClick={() => setShowAIHelper(!showAIHelper)}
      >
        {showAIHelper ? <X size={24} /> : <Bot size={24} />}
      </button>

      {/* AI Helper Panel */}
      {showAIHelper && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col border overflow-hidden z-50 animate-fadeIn">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles size={20} className="mr-2" />
              <h3 className="font-bold">AI Learning Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-blue-600 rounded">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2V4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 20V22"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.93 4.93L6.34 6.34"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.66 17.66L19.07 19.07"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12H4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 12H22"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.93 19.07L6.34 17.66"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.66 6.34L19.07 4.93"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-3">
            {aiChat.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[85%] ${
                  message.role === "user"
                    ? "bg-blue-100 ml-auto text-gray-800"
                    : "bg-gray-100 border border-gray-200"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center mb-1 text-xs text-gray-500">
                    <Bot size={12} className="mr-1" />
                    <span>AI Assistant</span>
                  </div>
                )}
                <div
                  className={message.role === "user" ? "text-sm" : "text-sm"}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-3 flex bg-gray-50">
            <input
              type="text"
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              placeholder="Ask me anything about coding..."
              className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === "Enter" && aiMessage.trim()) {
                  handleSendMessage();
                }
              }}
            />
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-r hover:bg-blue-600 transition-colors"
              onClick={handleSendMessage}
            >
              <Send size={18} />
            </button>
          </div>

          <div className="bg-gray-50 border-t px-3 py-2 text-xs text-gray-500 flex items-center">
            <Coffee size={12} className="mr-1" />
            <span>
              Pro Tip: Ask me about specific HTML elements or try "Show me an
              example"
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default AIHelper;
