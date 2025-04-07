"use client";
import React, { createContext, useContext, useState } from "react";

import { Question, QuestionType } from "../lib/quiz";

interface AppState {
  toStudyTopic: string;
  questions: Question[];
  timeTakenToCompleteSeconds: number;
  setToStudyTopic: (topic: string) => void;
  setQuestions: (questions: Question[]) => void;
  submitAnswerToQuestion: (questionId: number, optionId: number) => void;
  unsubmitAnswerToQuestion: (questionId: number, optionId: number) => void;
  setTimeTakenToCompleteSeconds: (timeSecs: number) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [toStudyTopic, setToStudyTopic] = useState<string>("");
  const [timeTakenToCompleteSeconds, setTimeTakenToCompleteSeconds] = useState<number>(0);

  const submitAnswerToQuestion = (questionId: number, optionId: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const questionIndex = updatedQuestions.findIndex((q) => q.id === questionId)!;
      const question = updatedQuestions[questionIndex];

      if (question.type === QuestionType.MultiAnswer) {
        if (!question.submittedOptionIds) {
          question.submittedOptionIds = new Set<number>();
        }
        question.submittedOptionIds.add(optionId);
      } else if (question.type === QuestionType.SingleAnswer) {
        question.submittedOptionId = optionId;
      } else {
        throw new Error("Unknown question type");
      }

      updatedQuestions[questionIndex] = question;
      return updatedQuestions;
    });
  };

  const unsubmitAnswerToQuestion = (questionId: number, optionId: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const questionIndex = updatedQuestions.findIndex((q) => q.id === questionId)!;
      const question = updatedQuestions[questionIndex];

      if (question.type === QuestionType.MultiAnswer) {
        question.submittedOptionIds?.delete(optionId);
      } else if (question.type === QuestionType.SingleAnswer) {
        question.submittedOptionId = undefined;
      } else {
        throw new Error("Unknown question type");
      }

      updatedQuestions[questionIndex] = question;
      return updatedQuestions;
    });
  };

  return (
    <AppContext.Provider
      value={{
        toStudyTopic,
        setToStudyTopic,
        questions,
        setQuestions,
        submitAnswerToQuestion,
        unsubmitAnswerToQuestion,
        setTimeTakenToCompleteSeconds,
        timeTakenToCompleteSeconds
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
