import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('it should be able to create an answer', async () => {

    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta',
    })

    expect(answer.content).toEqual('Nova resposta')
    expect(answer.id).toEqual(inMemoryAnswersRepository.items[0].id)
  })

})

