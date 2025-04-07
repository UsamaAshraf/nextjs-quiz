import { Question, QuestionType } from "./quiz";

export const getQuestions = (studyTopic: string): Question[] => {
  console.log(`Get questions for ${studyTopic}`);

  return [
    {
      id: 1,
      type: QuestionType.SingleAnswer,
      questionText: "Hahaha",
      answerOptions: [
        { id: 1, answerText: "Paris" },
        { id: 2, answerText: "London" },
        { id: 3, answerText: "Berlin" },
        { id: 4, answerText: "Madrid" }
      ],
      correctAnswerId: 2
    },
    {
      id: 2,
      type: QuestionType.SingleAnswer,
      questionText: "Yoyo",
      answerOptions: [
        { id: 1, answerText: "2" },
        { id: 2, answerText: "3" },
        { id: 3, answerText: "4" },
        { id: 4, answerText: "5" }
      ],
      correctAnswerId: 3
    },
    {
      id: 3,
      type: QuestionType.MultiAnswer,
      questionText: "Select all that apply...",
      answerOptions: [
        { id: 1, answerText: "1" },
        { id: 2, answerText: "2" },
        { id: 3, answerText: "3" },
        { id: 4, answerText: "4" }
      ],
      correctAnswerIds: new Set([2, 3, 4])
    }
  ];
};
