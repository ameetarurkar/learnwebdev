import React, { useState, useEffect } from "react";
import { Code, Eye, CheckCircle } from "lucide-react";
import { getChallenge, getDocLinks } from "../services/dataService";

const Challenge = ({ activeConcept, setViewMode }) => {
  const [codeInput, setCodeInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [checkedSolution, setCheckedSolution] = useState(false);
  const [checkResults, setCheckResults] = useState([]);
  const [challenge, setChallenge] = useState(null);
  const [docLinks, setDocLinks] = useState([]);

  // Load challenge and doc links data
  useEffect(() => {
    const challengeData = getChallenge(activeConcept);
    console.log("Challenge data loaded:", challengeData); // For debugging

    if (challengeData) {
      setChallenge(challengeData);
      setCodeInput(challengeData.startingCode || "");
    } else {
      // Fallback if no challenge data exists
      setChallenge({
        title: "Challenge",
        description: "No challenge available for this module yet",
        instructions: "Please check back later",
        startingCode: "// No challenge available",
        solutionCriteria: [],
      });
      setCodeInput("// No challenge available");
    }

    setDocLinks(getDocLinks(activeConcept));
  }, [activeConcept]);

  // No need for this useEffect since we're handling the fallback in the loading useEffect
  // This was causing a potential circular dependency with the challenge state

  // Simple solution checker - in a real app this would be more sophisticated
  const checkSolution = () => {
    console.log("Checking solution with challenge:", challenge);
    if (!challenge || !challenge.solutionCriteria) {
      console.error("Missing challenge data or solution criteria");
      return;
    }

    const results = challenge.solutionCriteria.map((criterion) => {
      // Very basic checks - a real version would be more robust
      let passed = true;
      console.log("Checking criterion:", criterion);

      if (criterion.criterion.includes("HTML structure")) {
        passed =
          codeInput.includes("<!DOCTYPE html>") &&
          codeInput.includes("<html") &&
          codeInput.includes("<head") &&
          codeInput.includes("<body");
      } else if (criterion.criterion.includes("heading")) {
        passed = /\<h[1-6]\>.*\<\/h[1-6]\>/.test(codeInput);
      } else if (criterion.criterion.includes("paragraphs")) {
        const pTags = codeInput.match(/<p.*?>.*?<\/p>/gs) || [];
        passed = pTags.length >= 2;
      } else if (criterion.criterion.includes("link")) {
        passed = codeInput.includes("<a href=") && codeInput.includes("</a>");
      } else if (criterion.criterion.includes("image")) {
        passed =
          codeInput.includes("<img") &&
          (codeInput.includes("src=") || codeInput.includes("src ="));
      }

      return {
        criterion: criterion.criterion,
        description: criterion.description,
        passed,
      };
    });

    setCheckResults(results);
    setCheckedSolution(true);
  };

  const resetSolution = () => {
    if (challenge) {
      setCodeInput(challenge.startingCode);
    }
    setCheckedSolution(false);
    setCheckResults([]);
  };

  if (!challenge) {
    return <div>Loading challenge...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
      {/* Left panel - Challenge description */}
      <div className="col-span-1 border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">{challenge.title}</h2>
          <div className="mb-4">
            <span className="px-2 py-1 bg-gray-200 rounded text-sm mr-2">
              HTML
            </span>
            <span className="px-2 py-1 bg-gray-200 rounded text-sm">
              Challenge
            </span>
          </div>

          {/* Lesson/Challenge/Quiz Toggle */}
          <div className="flex mb-6 border rounded overflow-hidden">
            <button
              className="flex-1 py-2 bg-gray-100"
              onClick={() => setViewMode("lesson")}
            >
              <div className="flex items-center justify-center">
                <Code size={16} className="mr-1" />
                <span>Lessons</span>
              </div>
            </button>
            <button
              className="flex-1 py-2 bg-blue-500 text-white"
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

          <p className="mb-4">{challenge.description}</p>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Your Task:</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: challenge.instructions }}
            ></div>
          </div>

          {/* Reference Docs for Challenge */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Reference Docs:</h3>
            <ul className="space-y-1">
              {docLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-blue-500 hover:text-blue-700 inline-flex items-center"
                  >
                    {link.title}
                    <svg
                      className="w-3 h-3 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenge Check Results */}
          {checkedSolution && (
            <div className="mb-6">
              <h3 className="font-bold mb-2">Assessment:</h3>
              <div className="space-y-2">
                {checkResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg border flex items-start ${
                      result.passed
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div
                      className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                        result.passed
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {result.passed ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div
                        className={`font-medium ${
                          result.passed ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {result.criterion}
                      </div>
                      <div className="text-xs text-gray-600">
                        {result.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {checkResults.length > 0 &&
                checkResults.every((result) => result.passed) && (
                  <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                    <div className="flex items-center text-green-800 font-medium">
                      <CheckCircle size={16} className="mr-2" />
                      Congratulations! You've completed the challenge.
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      You've demonstrated your understanding of basic HTML
                      structure. Ready to move on to the next lesson?
                    </p>
                    <button
                      className="mt-2 px-4 py-1 bg-green-500 text-white rounded text-sm"
                      onClick={() => setViewMode("quiz")}
                    >
                      Take the Quiz
                    </button>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Right panel - Code editor and preview */}
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
              HTML Editor
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

        <div className="flex-1">
          {!showPreview ? (
            <textarea
              className="w-full h-full p-4 font-mono text-sm focus:outline-none resize-none"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
            />
          ) : (
            <div className="p-4 h-full overflow-auto bg-gray-50">
              <div className="border rounded-lg p-4 shadow-sm bg-white">
                <div dangerouslySetInnerHTML={{ __html: codeInput }} />
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-3 bg-gray-100 flex justify-between items-center">
          <button
            className="px-4 py-1 bg-gray-300 text-gray-700 rounded flex items-center"
            onClick={resetSolution}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
          </button>
          <div>
            <button
              className="px-4 py-1 bg-blue-500 text-white rounded mr-2 flex items-center"
              onClick={checkSolution}
            >
              <CheckCircle size={14} className="mr-1" />
              Check Solution
            </button>
            <button
              className="px-4 py-1 bg-green-500 text-white rounded flex items-center"
              onClick={() => {
                checkSolution();
                // In a real app, you would also store the submission
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
