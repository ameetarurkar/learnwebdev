import courseData from "../data/courseData.json";
import lessonData from "../data/lessonData.json";
import challengeData from "../data/challengeDataImport"; // Using the verified import
import quizData from "../data/quizData.json";
import docLinksData from "../data/docLinksData.json";

// Course data
export const getCourses = () => {
  return courseData.courses;
};

export const getCourse = (courseId) => {
  return courseData.courses[courseId];
};

export const getLearningPath = () => {
  return courseData.learningPath;
};

export const getAchievements = () => {
  return courseData.achievements;
};

// Lesson data
export const getLessons = (courseId) => {
  return lessonData[courseId] || [];
};

export const getLesson = (courseId, lessonIndex) => {
  const lessons = getLessons(courseId);
  return lessons[lessonIndex] || null;
};

// Challenge data
export const getChallenges = () => {
  return challengeData;
};

export const getChallenge = (courseId) => {
  // Make sure we're getting the correct challenge object
  const challenge = challengeData[courseId] || null;
  console.log(`Getting challenge for ${courseId}:`, challenge);
  return challenge;
};

// Quiz data
export const getQuizzes = () => {
  return quizData;
};

export const getQuiz = (courseId) => {
  return quizData[courseId] || null;
};

// Documentation links data
export const getDocLinks = (courseId) => {
  return docLinksData[courseId] || [];
};

// Combined data utility functions
export const getCourseProgress = (courseId) => {
  const course = getCourse(courseId);
  return {
    totalLessons: course?.totalLessons || 0,
    completedLessons: course?.completedLessons || 0,
    progress: course
      ? (course.completedLessons / course.totalLessons) * 100
      : 0,
  };
};

export default {
  getCourses,
  getCourse,
  getLearningPath,
  getAchievements,
  getLessons,
  getLesson,
  getChallenges,
  getChallenge,
  getQuizzes,
  getQuiz,
  getDocLinks,
  getCourseProgress,
};
