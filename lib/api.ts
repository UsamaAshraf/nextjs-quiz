import { Question, QuestionType } from "./quiz";

export const getQuestions = (studyTopic: string): Question[] => {
  console.log(`Get questions for ${studyTopic}`);

  return [
    {
      id: 1,
      type: QuestionType.SingleAnswer,
      questionText: "What is the capital of France?",
      answerOptions: [
        { id: 1, answerText: "Paris" },
        { id: 2, answerText: "London" },
        { id: 3, answerText: "Berlin" },
        { id: 4, answerText: "Madrid" }
      ],
      correctAnswerId: 1
    },
    {
      id: 2,
      type: QuestionType.SingleAnswer,
      questionText: "The Apollo 11 mission landed on the moon in which year?",
      answerOptions: [
        { id: 1, answerText: "1981" },
        { id: 2, answerText: "1946" },
        { id: 3, answerText: "1969" },
        { id: 4, answerText: "1957" }
      ],
      correctAnswerId: 3
    },
    {
      id: 3,
      type: QuestionType.MultiAnswer,
      questionText: "Which of the following are programming languages?",
      answerOptions: [
        { id: 1, answerText: "Lisp" },
        { id: 2, answerText: "C" },
        { id: 3, answerText: "Fortran" },
        { id: 4, answerText: "Swahili" }
      ],
      correctAnswerIds: new Set([1, 2, 3])
    },
    {
      id: 4,
      type: QuestionType.MultiAnswer,
      questionText: "Which of the following are fruits?",
      answerOptions: [
        { id: 1, answerText: "Apple" },
        { id: 2, answerText: "Carrot" },
        { id: 3, answerText: "Banana" },
        { id: 4, answerText: "Broccoli" },
        { id: 5, answerText: "Tomato" }
      ],
      correctAnswerIds: new Set([1, 3, 5])
    },
    {
      id: 5,
      type: QuestionType.SingleAnswer,
      questionText: "Which is the largest planet in our solar system?",
      answerOptions: [
        { id: 1, answerText: "Earth" },
        { id: 2, answerText: "Mars" },
        { id: 3, answerText: "Jupiter" },
        { id: 4, answerText: "Saturn" }
      ],
      correctAnswerId: 3
    }
  ];
};

export const evaluateSubmittedAnswersToQuestions = (
  questions: Question[]
): {
  totalCorrect: number;
  totalWrong: number;
  totalUnanswered: number;
} => {
  const totalQuestions = questions.length;
  if (totalQuestions === 0) return { totalCorrect: 0, totalWrong: 0, totalUnanswered: 0 };

  let correctAnswersCount = 0;
  let wrongAnswersCount = 0;

  for (const question of questions) {
    if (question.type === QuestionType.SingleAnswer) {
      // Check if the question has been answered.
      if (question.submittedOptionId === undefined) {
        continue;
      }

      if (question.submittedOptionId === question.correctAnswerId) correctAnswersCount++;
      else wrongAnswersCount++;
    } else if (question.type === QuestionType.MultiAnswer) {
      // Check if the question has been answered.
      if (!question.submittedOptionIds) {
        continue;
      }

      const isCorrect = Array.from(question.correctAnswerIds).every(
        (id) =>
          question.submittedOptionIds?.has(id) &&
          question.correctAnswerIds.size === question.submittedOptionIds.size
      );
      if (isCorrect) correctAnswersCount++;
      else wrongAnswersCount++;
    }
  }

  return {
    totalCorrect: correctAnswersCount,
    totalWrong: wrongAnswersCount,
    totalUnanswered: totalQuestions - (correctAnswersCount + wrongAnswersCount)
  };
};
