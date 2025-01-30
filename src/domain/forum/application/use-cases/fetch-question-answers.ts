import { Answer } from "../../enterprise/entities/answer";
import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionRepository } from "../repositories/questions-repository";

interface FetchRecentQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchRecentQuestionsAnwersUseCaseResponse {
  answers: Answer[]
}

export class FetchRecentQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute({ page, questionId }: FetchRecentQuestionAnswersUseCaseRequest): Promise<FetchRecentQuestionsAnwersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, {
      page
    })

    return { answers }
  }
}