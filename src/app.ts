import express from 'express';
import booksRouter from './routes/books.routes';

const app = express();

app.use(express.json());
app.use('/api/books', booksRouter);

const API_PORT = process.env.API_PORT || 9000;

app.listen(API_PORT, () => {
  console.log(`Server is running on port ${API_PORT}`);
});
