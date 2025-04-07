"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../context/AppContext";
import QuestionEntry from "../../components/QuestionEntry";

import routes from "../../routes";
import config from "../../config";

export default function Quiz() {
  const router = useRouter();

  const { questions, toStudyTopic, setToStudyTopic, setTimeTakenToCompleteSeconds } = useAppContext();
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(config.MAX_QUIZ_TIME_ALLOWED_SECS);

  // Redirect to landing page if no topic is specified.
  useEffect(() => {
    if (!toStudyTopic.length) {
      router.push(routes.HOME_PAGE);
      return;
    }
  }, [toStudyTopic, router]);

  // Start the countdown timer.
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds((prevTimeLeftSecs) => {
        if (prevTimeLeftSecs <= 1) {
          clearInterval(timer);

          setTimeTakenToCompleteSeconds(config.MAX_QUIZ_TIME_ALLOWED_SECS);
          router.push(routes.RESULTS_PAGE);
          return 0;
        }
        return prevTimeLeftSecs - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(secs).padStart(2, "0")}`;
  }, []);

  const handleCancelllation = useCallback(() => {
    setToStudyTopic("");
    router.push("/landing");
  }, [router, setToStudyTopic]);

  const handleQuizSubmission = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setTimeTakenToCompleteSeconds(config.MAX_QUIZ_TIME_ALLOWED_SECS - timeLeftSeconds);
      router.push(routes.RESULTS_PAGE);
    },
    [router, timeLeftSeconds, setTimeTakenToCompleteSeconds]
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 h-full">
      <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🟡</span>
          <h1 className="text-lg font-semibold">Quiz - {toStudyTopic}</h1>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <i className="far fa-clock"></i>
          <span className="font-medium">Time left:</span>
          <span className="bg-gray-200 px-2 py-1 rounded text-sm font-semibold inline-block w-20 text-center">
            {formatTime(timeLeftSeconds)}
          </span>
        </div>
      </div>
      <div className="mt-6 space-y-6">
        <form name="quiz-form" onSubmit={handleQuizSubmission}>
          {questions.map((question, index) => (
            <QuestionEntry
              key={question.id}
              question={question}
              index={index}
              numOfQuestions={questions.length}
            />
          ))}
          <div className="flex justify-end mt-10 space-x-4">
            <button
              type="button"
              onClick={handleCancelllation}
              className="bg-gray-500 text-white font-semibold px-6 py-2 rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
