import { z } from 'zod';
import { BookGenre } from '../factories/book.factory';

export const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  publishedDate: z.date({coerce: true}),
  genre: z.nativeEnum(BookGenre, {
    errorMap: () => ({ message: 'Invalid book genre' }),
  }),
});

export const updateBookSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  author: z.string().min(1, 'Author is required').optional(),
  publishedDate: z.date({coerce: true}).optional(),
  genre: z.nativeEnum(BookGenre, {
    errorMap: () => ({ message: 'Invalid book genre' }),
  }),
});

const idSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

export const getBookSchema = idSchema;

export const deleteBookSchema = idSchema;
