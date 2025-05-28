import { BooksRepository } from '../../repositories/books.repository';

export const seedBooks = async () => {
  const repository = new BooksRepository();

  const books = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedDate: new Date('1925-04-10'),
      genre: 'Literary Fiction',
    },
    {
      title: '1984',
      author: 'George Orwell',
      publishedDate: new Date('1949-06-08'),
      genre: 'Dystopian Fiction',
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publishedDate: new Date('1960-07-11'),
      genre: 'Literary Fiction',
    },
  ];

  for (const book of books) {
    await repository.create(book);
  }

  console.log('Books seeded successfully');
};
