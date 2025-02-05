import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { FetchRecentQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchRecentQuestionAnswersUseCase

describe('Fetch Recent Questions', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchRecentQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch questions answers', async () => {
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))

    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))

    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
  })


  it('should be able to fetch paginated question answers', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(makeAnswer({
        questionId: new UniqueEntityID('question-1')
      }))
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})