import mongoose, { Schema, Document } from 'mongoose';
import logging from '../config/logging';
import IContactUs from '../interface/ContactUS';
enum Gender {
    Female = 'female',
    Male = 'male'
}
const ContactUSchema: Schema = new Schema({
    Name: { type: String, required: true },
    Gender: { type: String, enum: Object.values(Gender), required: true },
    message: { type: String, required: true }
});

ContactUSchema.post<IContactUs>('save', function () {
    logging.info('Mongo', 'Checkout the contact us message we just saved: ', this);
});

export default mongoose.model<IContactUs & Document>('ContactUS', ContactUSchema);
