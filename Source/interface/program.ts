import { Document } from 'mongoose';

export default interface Programs extends Document {
    title: string;
    description: string;
    imageUrl?: string;
    category: string;
    subcategory?: string;
    slug: string;
    media: { media_link: { original: string } }[];
}
