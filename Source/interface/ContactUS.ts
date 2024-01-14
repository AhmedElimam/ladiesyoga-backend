import { Document } from 'mongoose';

export default interface IContactUs extends Document {
    Name: string;
    Gender: boolean;
    message: string;
}
