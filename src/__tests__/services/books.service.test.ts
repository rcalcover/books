import { BooksService } from '../../services/books.service';
import { BooksRepository } from '../../repositories/books.repository';
import { BookGenre } from '../../factories/book.factory';

jest.mock('../../repositories/books.repository');

describe('BooksService', () => {
  let service: BooksService;
  let repository: jest.Mocked<BooksRepository>;

  beforeEach(() => {
    repository = new BooksRepository() as jest.Mocked<BooksRepository>;
    service = new BooksService(repository);
  });

  describe('getAllBooks', () => {
    it('should return all books', async () => {
      const mockBooks = [
        {
          id: '1',
          title: 'Test Book',
          author: 'Test Author',
          publishedDate: new Date(),
          genre: 'Test Genre',
        },
      ];

      repository.findAll.mockResolvedValue(mockBooks);

      const result = await service.getAllBooks();
      expect(result).toEqual(mockBooks);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('getBookById', () => {
    it('should return a book by id', async () => {
      const mockBook = {
        id: '1',
        title: 'Test Book',
        author: 'Test Author',
        publishedDate: new Date(),
        genre: 'Test Genre',
      };

      repository.findById.mockResolvedValue(mockBook);

      const result = await service.getBookById('1');
      expect(result).toEqual(mockBook);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });

    it('should return null for non-existent book', async () => {
      repository.findById.mockResolvedValue(null);

      const result = await service.getBookById('999');
      expect(result).toBeNull();
      expect(repository.findById).toHaveBeenCalledWith('999');
    });
  });

  describe('createBook', () => {
    it('should create a new book', async () => {
      const newBook = {
        title: 'New Book',
        author: 'New Author',
        publishedDate: new Date(),
        genre: 'Fiction',
      };
      const {genre, ...rest} = newBook;

      const createdBook = { id: '1', ...newBook };
      repository.create.mockResolvedValue(createdBook);

      const result = await service.createBook(rest, newBook.genre as BookGenre);
      expect(result).toEqual(createdBook);
      expect(repository.create).toHaveBeenCalledWith(newBook);
    });
  });

  describe('updateBook', () => {
    it('should update an existing book', async () => {
      const bookId = '1';
      const updateData = {
        title: 'Updated Book',
        author: 'Updated Author',
        genre: 'Updated Genre',
      };

      const updatedBook = {
        id: bookId,
        ...updateData,
        publishedDate: new Date(),
      };

      repository.findById.mockResolvedValue({
        id: bookId,
        title: 'Old Book',
        author: 'Old Author',
        publishedDate: new Date(),
        genre: 'Old Genre',
      });
      repository.update.mockResolvedValue(updatedBook);

      const result = await service.updateBook(bookId, updateData);
      expect(result).toEqual(updatedBook);
      expect(repository.update).toHaveBeenCalledWith(bookId, updateData);
    });

    it('should throw error if book does not exist', async () => {
      const bookId = '999';
      const updateData = {
        title: 'Updated Book',
        author: 'Updated Author',
        genre: 'Updated Genre',
      };
      repository.findById.mockResolvedValue(null);

      await expect(service.updateBook(bookId, updateData)).rejects.toThrow(
        'Book with id 999 not found',
      );
    });
  });

  describe('deleteBook', () => {
    it('should delete an existing book', async () => {
      const bookId = '1';

      repository.findById.mockResolvedValue({
        id: bookId,
        title: 'Test Book',
        author: 'Test Author',
        publishedDate: new Date(),
        genre: 'Test Genre',
      });

      await service.deleteBook(bookId);
      expect(repository.delete).toHaveBeenCalledWith(bookId);
    });

    it('should throw error if book does not exist', async () => {
      const bookId = '999';
      repository.findById.mockResolvedValue(null);

      await expect(service.deleteBook(bookId)).rejects.toThrow(
        'Book with id 999 not found',
      );
    });
  });
});
