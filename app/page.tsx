"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import { getQuestions } from "../lib/api";

import { APP_ROUTES } from "../routes";

import Toast from "../components/Toast";

export default function Home() {
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const { toStudyTopic, setToStudyTopic, setQuestions } = useAppContext();

  const triggerError = useCallback(
    (msg: string) => {
      setMessage(msg);
      setShowToast(true);
    },
    [setMessage, setShowToast]
  );

  const closeToast = useCallback(() => {
    setShowToast(false);
  }, [setShowToast]);

  const handleChangeToStudyTopic = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setToStudyTopic(e.target.value);
    },
    [setToStudyTopic]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!toStudyTopic.length) {
        triggerError("Please enter a topic to study.");
        return;
      }

      const questionsFromApi = getQuestions(toStudyTopic);
      setQuestions(questionsFromApi);

      router.push(APP_ROUTES.QUIZ_PAGE);
    },
    [toStudyTopic, setQuestions, router, triggerError]
  );

  return (
    <div className="bg-white w-full px-6 py-6">
      <nav className="flex justify-between items-center">
        <div className="text-xl font-bold flex items-center space-x-2">
          <span>⚪</span>
          <span>samwell.ai</span>
        </div>
        <div className="hidden md:flex space-x-6 text-gray-600 text-sm">
          <a href="#" className="hover:text-black">
            Pricing
          </a>
          <a href="#" className="hover:text-black">
            Examples
          </a>
          <a href="#" className="hover:text-black">
            Affiliate
          </a>
          <a href="#" className="hover:text-black">
            Products
          </a>
        </div>
      </nav>
      <section className="text-center mt-12">
        <h1 className="text-4xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 mr-2">
            Personalized
          </span>
          Learning
        </h1>
        <h2 className="text-3xl font-bold mt-2">with Samwell.ai</h2>
        <p className="text-gray-500 mt-4 text-lg">
          Explore how Samwell can help you learn what you need, effortlessly.
        </p>
      </section>
      <section className="mt-10">
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-xl mx-auto">
          <form name="study-topic-form" onSubmit={handleSubmit}>
            <textarea
              name="study-topic-field"
              className="border mt-4 w-full p-3 rounded-md text-sm"
              placeholder="Type what you study..."
              onChange={handleChangeToStudyTopic}
              value={toStudyTopic}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold w-full py-2 mt-4 rounded-md"
            >
              Start Studying
            </button>
          </form>
        </div>
      </section>
      <section className="mt-12 text-center">
        <p className="text-gray-500">
          Loved by over 3 million Students and Academics across the world
        </p>
      </section>
      <Toast message={message} visible={showToast} onClose={closeToast} />
    </div>
  );
}
