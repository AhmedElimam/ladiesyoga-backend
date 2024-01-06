"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const book_1 = __importDefault(require("../models/book"));
// POST Booking order :: ALL
const createBook = (req, res, next) => {
    let { Name, title, phonenumber, email, program } = req.body;
    const book = new book_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        Name,
        title,
        phonenumber, //CSFR Valdation
        email,
        program
    });
    return book
        .save()
        .then((result) => {
        return res.status(201).json({
            book: result
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};
// GET Booking order :: ALL
const getAllBooks = (req, res, next) => {
    book_1.default.find()
        .exec()
        .then((books) => {
        return res.status(200).json({
            books: books,
            count: books.length
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};
// GET Booking order by::ID
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    if (!mongoose_1.default.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: 'Invalid book ID' });
    }
    try {
        const foundBook = yield book_1.default.findById(bookId);
        if (!foundBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json({ book: foundBook });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error retrieving book by ID', error });
    }
});
// DELETE Booking Order
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    if (!mongoose_1.default.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: 'Invalid book ID' });
    }
    try {
        const deletedBook = yield book_1.default.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting book', error });
    }
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    if (!mongoose_1.default.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: 'Invalid book ID' });
    }
    try {
        const updatedBook = yield book_1.default.findByIdAndUpdate(bookId, { $set: req.body }, { new: true, runValidators: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json({ message: 'Book updated successfully', updatedBook });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating book', error });
    }
});
exports.default = { createBook, getAllBooks, deleteBook, getBookById, updateBook };
