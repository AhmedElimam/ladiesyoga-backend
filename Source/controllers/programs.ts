import { NextFunction, Response, Request } from 'express';
import mongoose, { Document } from 'mongoose';
import ProgramModel from '../models/program';
import path from 'path';
import multer from 'multer';
// multer image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets'); // Adjust the destination folder as needed
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }).single('media');

// Define the type from Program

interface ProgramDocument extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    category: string;
    subCategory?: string;
    slug?: string;
    media: { media_link: { original: string } }[];
}

// POST A Program
export const createProgram = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Image upload error:', err);
            return res.status(500).json({ message: 'Image upload failed' });
        }

        let { title, description, category, subCategory, slug } = req.body;

        const program = new ProgramModel({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            category,
            slug,
            subCategory,
            media: []
        });

        try {
            if (req.file) {
                program.media.push({
                    media_link: { original: req.file.filename }
                });
            }

            const result = await program.save();
            return res.status(200).json({
                program: result
            });
        } catch (error) {
            console.error('Program save error:', error);
            return res.status(500).json({ message: 'Program creation failed' });
        }
    });
};
//get all programs
export const getAllPrograms = (req: Request, res: Response, next: NextFunction) => {
    ProgramModel.find()
        .exec()
        .then((programs: ProgramDocument[]) => {
            return res.status(200).json({
                program: programs,
                count: programs.length
            });
        })
        .catch((error: Error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};
const getProgramById = (req: Request, res: Response, next: NextFunction) => {
    const programId = req.params.id;

    ProgramModel.findById(programId)
        .then((program) => {
            if (!program) {
                return res.status(404).json({ message: 'Program not found' });
            }

            return res.status(200).json({ program });
        })
        .catch((error) => {
            console.error('Error fetching program by ID:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        });
};

const deleteProgram = async (req: Request, res: Response, next: NextFunction) => {
    const programId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(programId)) {
        return res.status(400).json({ message: 'Invalid book ID' });
    }

    try {
        const deleteProgram = await ProgramModel.findByIdAndDelete(programId);

        if (!deleteProgram) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({ message: 'Book deleted successfully', deleteProgram });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting book', error });
    }
};

const updateProgram = async (req: Request, res: Response, next: NextFunction) => {
    const programId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(programId)) {
        return res.status(400).json({ message: 'Invalid book ID' });
    }

    try {
        const updateProgram = await ProgramModel.findByIdAndUpdate(programId, { $set: req.body }, { new: true, runValidators: true });

        if (!updateProgram) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({ message: 'Book updated successfully', updateProgram });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating book', error });
    }
};

export default { createProgram, getProgramById, getAllPrograms, deleteProgram, updateProgram };
