import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IBook from '../interface/books';

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        Name: { type: String, required: true },
        phonenumber: {
            type: String,
            required: true,
            validate: {
                validator: function (value: string) {
                    const phoneRegex = /^\d{8,}$/;
                    return phoneRegex.test(value);
                },
                message: (props: any) => `${props.value} is not a valid phone number!`
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            trim: true,
            lowercase: true
        },
        program: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

BookSchema.post<IBook>('save', function () {
    logging.info('Mongo', 'Checkout the book we just saved: ', this);
});

export default mongoose.model<IBook>('Book', BookSchema);
