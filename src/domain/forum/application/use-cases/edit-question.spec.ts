import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {

    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'))

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toValue(),
      title: 'Pergunta test',
      content: 'Conteúdo teste',
    })


    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta test',
      content: 'Conteúdo teste',
    })
  })

  it('should not be able to edit a question from another user', async () => {

    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'))

    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-2',
      content: 'Conteúdo teste',
      title: 'Pergunta teste'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)


  })
})