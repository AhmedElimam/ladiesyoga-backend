import { Document } from 'mongoose';

export default interface IBook extends Document {
    title: string;
    Name: string;
    phonenumber: string;
    email: string;
    program: string;
}
