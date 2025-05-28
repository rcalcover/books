import { db } from '../db/db';
import { Book, NewBook, books } from '../db/schema/books.schema';
import { eq } from 'drizzle-orm';

export class BooksRepository {
  async findAll(): Promise<Book[]> {
    return db.select().from(books);
  }

  async findById(id: string): Promise<Book | null> {
    const result = await db.select().from(books).where(eq(books.id, id));
    return result[0] || null;
  }

  async create(book: NewBook): Promise<Book> {
    const result = await db.insert(books).values(book).returning();
    return result[0];
  }

  async update(id: string, book: Partial<NewBook>): Promise<Book> {
    const result = await db
      .update(books)
      .set(book)
      .where(eq(books.id, id))
      .returning();
    return result[0];
  }

  async delete(id: string): Promise<void> {
    await db.delete(books).where(eq(books.id, id));
  }
}
