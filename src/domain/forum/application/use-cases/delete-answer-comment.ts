import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerUseCaseResponse { }

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository
  ) { }

  async execute({
    authorId, answerCommentId
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {}

  }
}
