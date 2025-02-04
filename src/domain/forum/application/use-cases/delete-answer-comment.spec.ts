import { InMemoryAnswersCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { NotAllowedError } from './errors/not-allowed-error'


let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(
      inMemoryAnswersCommentsRepository
    )
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment()


    await inMemoryAnswersCommentsRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryAnswersCommentsRepository.items).toHaveLength(0)
  })

  it('should be able to delete another user answer comment', async () => {

    const answerComment = makeAnswerComment({}, new UniqueEntityID('author-1'))


    await inMemoryAnswersCommentsRepository.create(answerComment)


    const result = await sut.execute({
      authorId: 'author-2',
      answerCommentId: answerComment.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  })
})