import { NextFunction, Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';
import ContactUSModel from '../models/ContactUs';

interface IContactUsDocument extends Document {
    _id: mongoose.Types.ObjectId;
    Name: string;
    Gender: boolean;
    message: string;
}
// POST Create US :: ALL
const CreateContactUs = (req: Request, res: Response, next: NextFunction) => {
    let { Name, Gender, message } = req.body;

    const ContactUs = new ContactUSModel({
        _id: new mongoose.Types.ObjectId(),
        Name,
        Gender: Gender.toLowerCase(),
        message
    });

    return ContactUs.save()
        .then((result: IContactUsDocument) => {
            return res.status(201).json({
                ContactUs: result
            });
        })
        .catch((error: Error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};
// GET ContactUS:: ALL
const getAllContactus = (req: Request, res: Response, next: NextFunction) => {
    ContactUSModel.find()
        .exec()
        .then((ContactUs: IContactUsDocument[]) => {
            return res.status(200).json({
                ContactUs: ContactUs,
                Count: ContactUs.length
            });
        })
        .catch((error: Error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};
// Delete ContactUS
const deleteContactUS = async (req: Request, res: Response, next: NextFunction) => {
    const contactUsId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(contactUsId)) {
        return res.status(400).json({ message: 'Invaild ContactUs ID' });
    }
    try {
        const deleteContactUS = await ContactUSModel.findByIdAndDelete(contactUsId);

        if (!deleteContactUS) {
            return res.status(404).json({ message: 'ContactUS not Found' });
        }
        return res.status(200).json({ message: 'ContactUS deleted successfully', deleteContactUS });
    } catch (error) {
        return res.status(500).json({ messag: 'Error Deleting ContactUs', error });
    }
};

//update contact us

const updateContactUs = async (req: Request, res: Response, next: NextFunction) => {
    const contactUsId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(contactUsId)) {
        return res.status(400).json({ message: 'Invalid contacts us Id' });
    }
    try {
        const updateContactUs = await ContactUSModel.findByIdAndUpdate(contactUsId, { $set: req.body }, { new: true, runValidators: true });

        if (!updateContactUs) {
            return res.status(404).json({ message: 'ContactUs not Found' });
        }
        return res.status(200).json({ message: 'ContactUs updated successfully', updateContactUs });
    } catch (error) {
        return res.status(500).json({ message: ' Error updating Contact us', error });
    }
};

export default { CreateContactUs, getAllContactus, deleteContactUS, updateContactUs };
