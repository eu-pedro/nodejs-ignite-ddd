import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository
  ) { }

  async execute({
    authorId, answerCommentId
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
