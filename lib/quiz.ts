export enum QuestionType {
  // eslint-disable-next-line no-unused-vars
  SingleAnswer = "mcq-single",
  // eslint-disable-next-line no-unused-vars
  MultiAnswer = "mcq-multi"
}

interface BaseQuestion {
  id: number;
  type: QuestionType;
  questionText: string;
  answerOptions: { id: number; answerText: string }[];
}

interface QuestionWithOneAnswer extends BaseQuestion {
  type: QuestionType.SingleAnswer;
  correctAnswerId: number;
  submittedOptionId?: number;
}

interface QuestionWithMultipleAnswers extends BaseQuestion {
  type: QuestionType.MultiAnswer;
  correctAnswerIds: Set<number>;
  submittedOptionIds?: Set<number>;
}

export type Question = QuestionWithOneAnswer | QuestionWithMultipleAnswers;
