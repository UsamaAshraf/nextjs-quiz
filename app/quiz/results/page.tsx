"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../../context/AppContext";

import { APP_ROUTES } from "../../../routes";
import { APP_CONFIG } from "../../../config";
import { evaluateSubmittedAnswersToQuestions } from "../../../lib/api";

export default function Results() {
  const {
    toStudyTopic,
    setToStudyTopic,
    questions,
    timeTakenToCompleteSeconds,
    resetSubmittedAnswers
  } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!toStudyTopic.length || !questions.length) {
      router.push(APP_ROUTES.HOME_PAGE);
      return;
    }
  }, [toStudyTopic, router, questions.length]);

  const { totalCorrect, totalWrong, totalUnanswered } = useMemo(
    () => evaluateSubmittedAnswersToQuestions(questions),
    [questions]
  );

  const correctPercentage = useMemo(() => {
    const totalQuestions = questions.length;
    if (totalQuestions === 0) return 0;

    return Math.round((totalCorrect / totalQuestions) * 100);
  }, [totalCorrect, questions]);

  const isResultSatisfactory = useMemo(() => {
    return correctPercentage > APP_CONFIG.SATISFACTORY_RESULT_THRESHOLD;
  }, [correctPercentage]);

  const message = useMemo(
    () => (isResultSatisfactory ? "Awesome work!" : "Don't worry, you'll bounce back!"),
    [isResultSatisfactory]
  );

  const { minutesTakenToComplete, remainderSeconds, avgTimeMessage } = useMemo(() => {
    const totalAttempted = totalWrong + totalCorrect;
    const minutes = Math.floor(timeTakenToCompleteSeconds / 60);
    const seconds = timeTakenToCompleteSeconds % 60;
    const avgTimePerQuestionSecs =
      totalAttempted > 0 ? Math.round(timeTakenToCompleteSeconds / totalAttempted) : 0;
    const avgMessage =
      avgTimePerQuestionSecs > 60
        ? `${Math.floor(avgTimePerQuestionSecs / 60)} min ${avgTimePerQuestionSecs % 60} secs`
        : `${avgTimePerQuestionSecs} secs`;

    return {
      minutesTakenToComplete: minutes,
      remainderSeconds: seconds,
      avgTimeMessage: avgMessage
    };
  }, [timeTakenToCompleteSeconds, totalWrong, totalCorrect]);

  const progressCircle = useMemo(() => {
    const total = 100;
    const correctAngle = (correctPercentage / total) * 360;
    const wrongAngle = ((total - correctPercentage) / total) * 360;

    return (
      <div
        className="mt-2 relative w-14 h-14 rounded-full"
        style={{
          background: `conic-gradient(
            green ${correctAngle}deg,
            orange 0 ${correctAngle + wrongAngle}deg,
            #e5e7eb 0deg
          )`
        }}
      >
        <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center text-sm"></div>
      </div>
    );
  }, [correctPercentage]);

  const handleRetryOfQuiz = useCallback(() => {
    resetSubmittedAnswers();
    router.push(APP_ROUTES.QUIZ_PAGE);
  }, [resetSubmittedAnswers, router]);

  const handleReviewOfQuizAnswers = useCallback(() => {
    router.push(`${APP_ROUTES.QUIZ_PAGE}?review=true`);
  }, [router]);

  const handleCompletion = useCallback(() => {
    setToStudyTopic("");
    router.push(APP_ROUTES.HOME_PAGE);
  }, [router, setToStudyTopic]);

  return (
    <div className="max-w-[1020px] mx-auto px-6 py-6 h-screen">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{isResultSatisfactory ? "🟢" : "🟡"}</span>
          <h1 className="text-lg font-semibold">{toStudyTopic}</h1>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-500 space-x-2 mb-6">
        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">Module 3</button>
        <span className="text-gray-400">›</span>
        <span>Cinematic Context</span>
        <span className="text-gray-400">›</span>
        <span className="font-semibold text-gray-800">Final Quiz</span>
      </div>
      <h2 className="text-2xl font-semibold mb-8">{message}</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-700 font-semibold mb-2">Quiz Score</h3>
          <p className="text-3xl font-bold mb-3">{correctPercentage}%</p>
          <div className="flex items-center">
            {progressCircle}
            <div className="ml-4">
              <p className="text-sm text-green-500">
                Correct
                <span className="text-gray-500 font-semibold text-sm ml-4 mt-2">
                  {totalCorrect}
                </span>
              </p>
              <p className="text-sm text-orange-500 mt-2">
                Incorrect
                <span className="text-gray-500 font-semibold text-sm ml-2 mt-2">{totalWrong}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow col-span-1">
          <h3 className="text-gray-700 font-semibold mb-2">Time Completed</h3>
          <div className="flex items-center space-x-2">
            <span className="bg-gray-800 text-white px-2 py-1 rounded text-sm font-semibold">
              {String(minutesTakenToComplete).padStart(2, "0")}
            </span>
            <span className="text-gray-800">:</span>
            <span className="bg-gray-800 text-white px-2 py-1 rounded text-sm font-semibold">
              {String(remainderSeconds).padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow col-span-1">
          <h3 className="text-gray-700 font-semibold mb-2">Avg. Time Per Question</h3>
          <p className="text-gray-500 font-semibold mb-4">{avgTimeMessage}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow col-span-1 space-y-4">
          <div>
            <h3 className="text-gray-800 font-semibold">Try Again</h3>
            <p className="text-sm text-gray-500 mt-2">Retake the test to improve your score.</p>
            <a
              href="#"
              onClick={handleRetryOfQuiz}
              className="text-blue-600 text-sm font-semibold inline-flex items-center mt-1"
            >
              Try Again <i className="fas fa-chevron-right ml-1 text-xs"></i>
            </a>
          </div>
          <div>
            {totalUnanswered > 0 && (
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-orange-100 text-orange-500 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {totalUnanswered} missed items
                </span>
              </div>
            )}
            <h3 className="text-gray-800 font-semibold">Review your answers</h3>
            <p className="text-sm text-gray-500 mt-2">
              Go over your answers and get instant AI feedback.
            </p>
            <a
              href="#"
              onClick={handleReviewOfQuizAnswers}
              className="text-blue-600 text-sm font-semibold inline-flex items-center mt-1"
            >
              Review <i className="fas fa-chevron-right ml-1 text-xs"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-10 space-x-4">
        <button
          onClick={handleCompletion}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full"
        >
          Complete
        </button>
      </div>
    </div>
  );
}
