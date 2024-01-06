import { NextFunction, Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';
import BookModel from '../models/book';

// Define the type for a Book document
interface IBookDocument extends Document {
    _id: mongoose.Types.ObjectId;
    Name: string;
    title: string;
    phonenumber: string;
    email: string;
    program: string;
}
// POST Booking order :: ALL
const createBook = (req: Request, res: Response, next: NextFunction) => {
    let { Name, title, phonenumber, email, program } = req.body;

    const book = new BookModel({
        _id: new mongoose.Types.ObjectId(),
        Name,
        title,
        phonenumber, //CSFR Valdation
        email,
        program
    });

    return book
        .save()
        .then((result: IBookDocument) => {
            return res.status(201).json({
                book: result
            });
        })
        .catch((error: Error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};
// GET Booking order :: ALL
const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
    BookModel.find()
        .exec()
        .then((books: IBookDocument[]) => {
            return res.status(200).json({
                books: books,
                count: books.length
            });
        })
        .catch((error: Error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

// GET Booking order by::ID
const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: 'Invalid book ID' });
    }

    try {
        const foundBook = await BookModel.findById(bookId);

        if (!foundBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({ book: foundBook });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving book by ID', error });
    }
};

// DELETE Booking Order
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: 'Invalid book ID' });
    }

    try {
        const deletedBook = await BookModel.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting book', error });
    }
};
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: 'Invalid book ID' });
    }

    try {
        const updatedBook = await BookModel.findByIdAndUpdate(bookId, { $set: req.body }, { new: true, runValidators: true });

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({ message: 'Book updated successfully', updatedBook });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating book', error });
    }
};

export default { createBook, getAllBooks, deleteBook, getBookById, updateBook };
