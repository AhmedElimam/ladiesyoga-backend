import express from 'express';
import controller from '../controllers/book';

const router = express.Router();

router.post('/create/book', controller.createBook);
router.get('/get/books', controller.getAllBooks);
router.get('/update/book/:bookId', controller.getBookById);
router.put('/update/book/:bookId', controller.updateBook);
router.patch('/update/book/:bookId', controller.updateBook);
router.delete('/delete/book/:bookId', controller.deleteBook);

export = router;
