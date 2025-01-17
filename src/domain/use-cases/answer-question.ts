import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  questionId: string;
  instructorId: string;
  content: string
}

export class AnswerQuestionUseCase {

  constructor(private answerRepository: AnswersRepository){}

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      authorId: instructorId, 
      questionId,
      content,
    })

    await this.answerRepository.create(answer)

    return answer
  }
}