import { NewBook } from '../db/schema/books.schema';

export enum BookGenre {
  FICTION = 'Fiction',
  NON_FICTION = 'Non-Fiction',
}

export interface BookTemplate {
  title: string;
  author: string;
  publishedDate: Date;
}

export class BookFactory {
  static createBook(genre: BookGenre, template: BookTemplate): NewBook {
    switch (genre) {
      case BookGenre.FICTION:
        return this.createFictionBook(template);
      case BookGenre.NON_FICTION:
        return this.createNonFictionBook(template);
      default:
        throw new Error('Invalid book genre');
    }
  }

  private static createFictionBook(template: BookTemplate): NewBook {
    return {
      ...template,
      genre: BookGenre.FICTION,
    };
  }

  private static createNonFictionBook(template: BookTemplate): NewBook {
    return {
      ...template,
      genre: BookGenre.NON_FICTION,
    };
  }
}
