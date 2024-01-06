"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const book_1 = __importDefault(require("../controllers/book"));
const router = express_1.default.Router();
router.post('/create/book', book_1.default.createBook);
router.get('/get/books', book_1.default.getAllBooks);
router.get('/update/book/:bookId', book_1.default.getBookById);
router.put('/update/book/:bookId', book_1.default.updateBook);
router.patch('/update/book/:bookId', book_1.default.updateBook);
router.delete('/delete/book/:bookId', book_1.default.deleteBook);
module.exports = router;
