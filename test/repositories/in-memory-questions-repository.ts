import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionRepository {
  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) return null

    return question
  }
  public items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }
}