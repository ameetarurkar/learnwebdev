import React, { useState } from "react";
import { Code, CheckCircle, ChevronRight, Sparkles } from "lucide-react";

// Sample quiz data
const quizData = {
  "html-fundamentals": {
    id: "html-basics-quiz",
    title: "HTML Basics Quiz",
    questions: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Multi Language",
          "Hyper Transfer Module Language",
          "Hyper Text Modern Language",
        ],
        correctAnswer: 0,
        explanation:
          "HTML stands for Hyper Text Markup Language. It is the standard markup language for creating web pages.",
      },
      {
        question: "Which tag is used to define a paragraph?",
        options: ["<para>", "<p>", "<paragraph>", "<text>"],
        correctAnswer: 1,
        explanation:
          "The <p> tag defines a paragraph in HTML. Paragraphs are block-level elements that automatically add some space before and after the content.",
      },
      {
        question: "Which HTML element is used to define an image?",
        options: ["<picture>", "<image>", "<img>", "<src>"],
        correctAnswer: 2,
        explanation:
          "The <img> tag is used to embed images in an HTML document. It requires the src attribute to specify the image source and should include an alt attribute for accessibility.",
      },
      {
        question: "What is the correct HTML element for the largest heading?",
        options: ["<heading>", "<h6>", "<head>", "<h1>"],
        correctAnswer: 3,
        explanation:
          "The <h1> tag defines the largest and most important heading. Headings range from <h1> (most important) to <h6> (least important).",
      },
      {
        question:
          "Which part of the HTML document contains information not displayed on the page?",
        options: ["<body>", "<title>", "<head>", "<meta>"],
        correctAnswer: 2,
        explanation:
          "The <head> section contains meta-information about the document that isn't displayed on the page, such as the title, character set, styles, scripts, and other meta information.",
      },
    ],
  },
};

const Quiz = ({ activeConcept, setViewMode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const quiz = quizData[activeConcept] || {
    title: "Quiz",
    questions: [],
  };

  const handleAnswerClick = (optionIndex) => {
    if (answeredQuestions.includes(currentQuestion)) return;
    setSelectedOption(optionIndex);
    setShowExplanation(true);

    // Add to answered questions
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);

    // Update score if correct
    if (optionIndex === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setShowExplanation(false);
  };

  const currentQ = quiz.questions[currentQuestion] || {
    question: "No questions available",
    options: [],
    correctAnswer: 0,
    explanation: "",
  };

  // Calculate progress percentage
  const progressPercentage =
    ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
      {/* Left panel - Quiz navigation */}
      <div className="col-span-1 border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
          <div className="mb-4">
            <span className="px-2 py-1 bg-gray-200 rounded text-sm mr-2">
              HTML
            </span>
            <span className="px-2 py-1 bg-gray-200 rounded text-sm">Quiz</span>
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
              className="flex-1 py-2 bg-gray-100"
              onClick={() => setViewMode("challenge")}
            >
              <div className="flex items-center justify-center">
                <Code size={16} className="mr-1" />
                <span>Challenge</span>
              </div>
            </button>
            <button
              className="flex-1 py-2 bg-blue-500 text-white"
              onClick={() => setViewMode("quiz")}
            >
              <div className="flex items-center justify-center">
                <CheckCircle size={16} className="mr-1" />
                <span>Quiz</span>
              </div>
            </button>
          </div>

          {/* Question Navigation */}
          {!showResult && (
            <>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>
                    Question {currentQuestion + 1} of {quiz.questions.length}
                  </span>
                  <span>
                    Score: {score}/{answeredQuestions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-wrap mb-6">
                {quiz.questions.map((_, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 m-1 w-8 h-8 rounded-full flex items-center justify-center text-sm
                      ${
                        currentQuestion === index ? "ring-2 ring-blue-500 " : ""
                      }
                      ${
                        answeredQuestions.includes(index)
                          ? index === quiz.questions[index].correctAnswer
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-gray-200"
                      }`}
                    onClick={() => {
                      if (!showResult) {
                        setCurrentQuestion(index);
                        setSelectedOption(null);
                        setShowExplanation(false);
                      }
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Quiz Instructions */}
          {!showResult && (
            <div className="mb-6">
              <h3 className="font-bold mb-2">Quiz Instructions:</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-gray-200 mt-0.5 mr-2"></span>
                  <span>Answer all questions to complete the quiz</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-green-500 text-white text-xs flex items-center justify-center mt-0.5 mr-2">
                    ✓
                  </span>
                  <span>Green indicates a correct answer</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center mt-0.5 mr-2">
                    ✗
                  </span>
                  <span>Red indicates an incorrect answer</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-gray-200 ring-2 ring-blue-500 mt-0.5 mr-2"></span>
                  <span>Current question has a blue outline</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right panel - Quiz content */}
      <div className="col-span-2 p-6 h-full overflow-auto">
        {!showResult ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">{currentQ.question}</h3>
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors
                        ${
                          selectedOption === index &&
                          index === currentQ.correctAnswer
                            ? "border-green-500 bg-green-50"
                            : ""
                        }
                        ${
                          selectedOption === index &&
                          index !== currentQ.correctAnswer
                            ? "border-red-500 bg-red-50"
                            : ""
                        }
                        ${
                          selectedOption !== index &&
                          index === currentQ.correctAnswer &&
                          showExplanation
                            ? "border-green-500 bg-green-50"
                            : ""
                        }
                        ${selectedOption === null ? "hover:bg-gray-50" : ""}
                      `}
                      onClick={() => handleAnswerClick(index)}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center mr-2
                          ${
                            selectedOption === index &&
                            index === currentQ.correctAnswer
                              ? "bg-green-500 text-white"
                              : ""
                          }
                          ${
                            selectedOption === index &&
                            index !== currentQ.correctAnswer
                              ? "bg-red-500 text-white"
                              : ""
                          }
                          ${
                            selectedOption !== index &&
                            index === currentQ.correctAnswer &&
                            showExplanation
                              ? "bg-green-500 text-white"
                              : ""
                          }
                          ${
                            selectedOption === null
                              ? "bg-gray-200"
                              : "bg-gray-200"
                          }
                        `}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>

                        {selectedOption === index &&
                          index === currentQ.correctAnswer && (
                            <CheckCircle
                              size={18}
                              className="ml-auto text-green-500"
                            />
                          )}

                        {selectedOption === index &&
                          index !== currentQ.correctAnswer && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 ml-auto text-red-500"
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

                        {selectedOption !== index &&
                          index === currentQ.correctAnswer &&
                          showExplanation && (
                            <CheckCircle
                              size={18}
                              className="ml-auto text-green-500"
                            />
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {showExplanation && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex">
                    <div className="text-blue-500 mr-3">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">
                        Explanation
                      </h4>
                      <p className="text-sm text-blue-800">
                        {currentQ.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <button
                  className="text-gray-500"
                  onClick={() => {
                    handleAnswerClick(
                      Math.floor(Math.random() * currentQ.options.length)
                    );
                  }}
                  disabled={answeredQuestions.includes(currentQuestion)}
                >
                  Skip
                </button>
                <button
                  className={`px-6 py-2 rounded-lg flex items-center ${
                    answeredQuestions.includes(currentQuestion)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={handleNextQuestion}
                  disabled={!answeredQuestions.includes(currentQuestion)}
                >
                  {currentQuestion < quiz.questions.length - 1
                    ? "Next Question"
                    : "Finish Quiz"}
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="mb-6">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
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
                </div>
                <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
                <p className="text-gray-600">
                  You've completed the HTML Basics Quiz.
                </p>
              </div>

              <div className="mb-8">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {score}/{quiz.questions.length}
                </div>
                <div className="text-lg">
                  {score === quiz.questions.length ? (
                    <span className="text-green-600">
                      Perfect score! Excellent work!
                    </span>
                  ) : score >= Math.floor(quiz.questions.length * 0.7) ? (
                    <span className="text-blue-600">
                      Great job! You're doing well!
                    </span>
                  ) : (
                    <span className="text-yellow-600">
                      Keep practicing! You're making progress.
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full ${
                      score === quiz.questions.length
                        ? "bg-green-500"
                        : score >= Math.floor(quiz.questions.length * 0.7)
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                    style={{
                      width: `${(score / quiz.questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500">
                  {Math.round((score / quiz.questions.length) * 100)}% correct
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={resetQuiz}
                >
                  Retake Quiz
                </button>
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => setViewMode("lesson")}
                >
                  Back to Lessons
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
