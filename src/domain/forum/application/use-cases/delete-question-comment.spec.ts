import { InMemoryQuestionsCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'


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

  it('should be able to delete another user question comment', async () => {

    const questionComment = makeQuestionComment({}, new UniqueEntityID('author-1'))


    await inMemoryQuestionsCommentsRepository.create(questionComment)

    expect(async () => {
      return await sut.execute({
        questionCommentId: 'author-2',
        authorId: questionComment.authorId.toString(),
      })
    }).rejects.toBeInstanceOf(Error)

  })
})