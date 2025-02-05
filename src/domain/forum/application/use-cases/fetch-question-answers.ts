import { Either, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface FetchRecentQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchRecentQuestionsAnwersUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchRecentQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute({ page, questionId }: FetchRecentQuestionAnswersUseCaseRequest): Promise<FetchRecentQuestionsAnwersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, {
      page
    })

    return right({ answers })
  }
}