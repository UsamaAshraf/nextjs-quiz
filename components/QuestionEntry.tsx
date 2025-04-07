"use client";

import React, { useCallback, useMemo } from "react";
import { Question, QuestionType } from "../lib/api";
import { useAppContext } from "../context/AppContext";

export default function QuestionEntry({
  question,
  index,
  numOfQuestions
}: {
  question: Question;
  index: number;
  numOfQuestions: number;
}) {
  const { submitAnswerToQuestion, unsubmitAnswerToQuestion } = useAppContext();

  const isOptionSelectedForQuestion = useCallback(
    (optionId: number): boolean => {
      if (question.type === QuestionType.MultiAnswer) {
        return question.submittedOptionIds?.has(optionId) || false;
      } else if (question.type === QuestionType.SingleAnswer) {
        return question.submittedOptionId === optionId;
      } else {
        throw new Error("Unknown question type");
      }
    },
    [question]
  );

  const toggleAnswerToQuestion = useCallback(
    (optionId: number) => {
      const isAlreadySelected = isOptionSelectedForQuestion(optionId);
      if (isAlreadySelected) {
        unsubmitAnswerToQuestion(question.id, optionId);
      } else {
        submitAnswerToQuestion(question.id, optionId);
      }
    },
    [isOptionSelectedForQuestion, question, submitAnswerToQuestion, unsubmitAnswerToQuestion]
  );

  const displaySingleAnswerOptions = useCallback(
    (question: Question) => {
      return (
        <div className="mt-4 space-y-3">
          {question.answerOptions.map((answerOption) => (
            <label
              onClick={() => {
                toggleAnswerToQuestion(answerOption.id);
              }}
              key={`question-${question.id}-option-${answerOption.id}`}
              className={`flex items-center border rounded-lg p-3 cursor-pointer ${
                isOptionSelectedForQuestion(answerOption.id)
                  ? "border-blue-500"
                  : "border-gray-300 hover:border-blue-500"
              }`}
            >
              {/* <input type="radio" name={`q${question.id}-a${answerOption.id}`} className="hidden" /> */}
              <span className="text-gray-700">{answerOption.answerText}</span>
            </label>
          ))}
        </div>
      );
    },
    [isOptionSelectedForQuestion, toggleAnswerToQuestion]
  );

  const displayMultiAnswerOptions = useCallback(
    (question: Question) => {
      return (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {question.answerOptions.map((answerOption) => (
            <label
              onClick={() => toggleAnswerToQuestion(answerOption.id)}
              key={`question-${question.id}-option-${answerOption.id}`}
              className={`flex items-center border rounded-lg p-3 cursor-pointer ${
                isOptionSelectedForQuestion(answerOption.id)
                  ? "border-blue-500"
                  : "border-gray-300 hover:border-blue-500"
              }`}
            >
              {/* <input
                  type="checkbox"
                  name={`q${question.id}-a${answerOption.id}`}
                  className="hidden"
                /> */}
              <span className="text-gray-700">{answerOption.answerText}</span>
            </label>
          ))}
        </div>
      );
    },
    [isOptionSelectedForQuestion, toggleAnswerToQuestion]
  );

  const options = useMemo(() => {
    switch (question.type) {
      case QuestionType.SingleAnswer:
        return displaySingleAnswerOptions(question);
      case QuestionType.MultiAnswer:
        return displayMultiAnswerOptions(question);
      default:
        return null;
    }
  }, [question, displaySingleAnswerOptions, displayMultiAnswerOptions]);

  return (
    <div key={`question-${question.id}`} className="bg-white shadow rounded-lg p-6 mb-6">
      <p className="text-gray-600 text-sm font-medium">
        {`Question ${index + 1} of ${numOfQuestions}`}
      </p>
      <h2 className="text-lg font-semibold mt-2">{question.questionText}</h2>
      {options}
      <p className="text-blue-700 text-sm mt-5 cursor-pointer text-center">Don’t know?</p>
    </div>
  );
}
