import { BooksRepository } from '../repositories/books.repository';
import { Book, NewBook } from '../db/schema/books.schema';
import {
  BookFactory,
  BookGenre,
  BookTemplate,
} from '../factories/book.factory';

export class BooksService {
  constructor(private repository: BooksRepository) {}

  async getAllBooks(): Promise<Book[]> {
    return this.repository.findAll();
  }

  async getBookById(id: string): Promise<Book | null> {
    return this.repository.findById(id);
  }

  async createBook(template: BookTemplate, genre: BookGenre): Promise<Book> {
    const book = BookFactory.createBook(genre, template);
    return this.repository.create(book);
  }

  async updateBook(id: string, book: Partial<NewBook>): Promise<Book> {
    const existingBook = await this.repository.findById(id);
    if (!existingBook) {
      throw new Error(`Book with id ${id} not found`);
    }
    return this.repository.update(id, book);
  }

  async deleteBook(id: string): Promise<void> {
    const existingBook = await this.repository.findById(id);
    if (!existingBook) {
      throw new Error(`Book with id ${id} not found`);
    }
    return this.repository.delete(id);
  }
}
