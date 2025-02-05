import { InMemoryQuestionsCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { NotAllowedError } from './errors/not-allowed-error'


let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {

  beforeEach(() => {
    inMemoryQuestionsCommentsRepository = new InMemoryQuestionsCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(
      inMemoryQuestionsCommentsRepository
    )
  })

  it('should be able to delete a question comment', async () => {

    const questionComment = makeQuestionComment()


    await inMemoryQuestionsCommentsRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })


    expect(inMemoryQuestionsCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user question comment', async () => {

    const questionComment = makeQuestionComment({}, new UniqueEntityID('author-1'))


    await inMemoryQuestionsCommentsRepository.create(questionComment)

    const result = await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})