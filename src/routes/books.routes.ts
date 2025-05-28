import { Router } from 'express';
import { BooksController } from '../controllers/books.controller';
import Logger from '../utils/logger';
import { HttpResponse } from '../utils/response';

const router = Router();
const logger = new Logger();
const httpResponse = new HttpResponse();
const controller = new BooksController(logger, httpResponse);

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
