import { Request, Response } from 'express';
import { BooksService } from '../services/books.service';
import { BooksRepository } from '../repositories/books.repository';
import { ILogger } from '../utils/logger';
import {
  createBookSchema,
  deleteBookSchema,
  getBookSchema,
  updateBookSchema,
} from '../schemas/books.schemas';
import { Validate } from '../decorators/validation.decorator';
import { IHttpResponse } from '../utils/response';
import { BookGenre } from '../factories/book.factory';

export class BooksController {
  private service: BooksService;

  constructor(
    private logger: ILogger,
    private httpResponse: IHttpResponse,
  ) {
    this.service = new BooksService(new BooksRepository());
  }

  async getAll(req: Request, res: Response): Promise<void> {
    this.logger.log('Fetching all books');
    try {
      const books = await this.service.getAllBooks();
      this.logger.log('Books fetched successfully');
      this.httpResponse.sendSuccess(res, books, 'Books fetched successfully');
    } catch (error) {
      this.logger.error(`Failed to fetch books, error: ${error}`);
      this.httpResponse.sendError(res, 'Failed to fetch books');
    }
  }

  @Validate(getBookSchema, 'params')
  async getById(req: Request, res: Response): Promise<void> {
    this.logger.log(`Fetching book with id: ${req.params.id}`);
    try {
      const book = await this.service.getBookById(req.params.id);
      if (!book) {
        this.logger.warn(`Book not found with id: ${req.params.id}`);
        this.httpResponse.sendError(res, 'Book not found', 404);
      }
      this.logger.log(`Book fetched successfully with id: ${req.params.id}`);
      this.httpResponse.sendSuccess(res, book, 'Book fetched successfully');
    } catch (error) {
      this.logger.error(
        `Failed to fetch book with id: ${req.params.id}, error: ${error}`,
      );
      this.httpResponse.sendError(res, 'Failed to fetch book');
    }
  }

  @Validate(createBookSchema, 'body')
  async create(req: Request, res: Response): Promise<void> {
    this.logger.log('Creating a new book');
    try {
      const { genre, ...template } = req.body;
      const book = await this.service.createBook(template, genre as BookGenre);
      this.logger.log('Book created successfully');
      this.httpResponse.sendSuccess(
        res,
        book,
        'Book created successfully',
        201,
      );
    } catch (error) {
      this.logger.error(`Failed to create book, error: ${error}`);
      this.httpResponse.sendError(res, 'Failed to create book');
    }
  }

  @Validate(updateBookSchema, 'body')
  async update(req: Request, res: Response): Promise<void> {
    this.logger.log(`Updating book with id: ${req.params.id}`);
    try {
      const book = await this.service.updateBook(req.params.id, req.body);
      this.logger.log(`Book updated successfully with id: ${req.params.id}`);
      this.httpResponse.sendSuccess(res, book, 'Book updated successfully');
    } catch (error) {
      this.logger.error(
        `Failed to update book with id: ${req.params.id}, error: ${error}`,
      );
      this.httpResponse.sendError(res, 'Failed to update book');
    }
  }

  @Validate(deleteBookSchema, 'params')
  async delete(req: Request, res: Response): Promise<void> {
    this.logger.log(`Deleting book with id: ${req.params.id}`);
    try {
      await this.service.deleteBook(req.params.id);
      this.logger.log(`Book deleted successfully with id: ${req.params.id}`);
      this.httpResponse.sendSuccess(
        res,
        req.params.id,
        'Book deleted successfully',
        200,
      );
    } catch (error) {
      this.logger.error(
        `Failed to delete book with id: ${req.params.id}, error: ${error}`,
      );
      this.httpResponse.sendError(res, 'Failed to delete book');
    }
  }
}
