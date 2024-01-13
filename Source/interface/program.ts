// interface/program.ts
import { Document, Model } from 'mongoose';

export interface MediaLink {
    media_link: {
        original: string;
    };
}

export interface ProgramDocument extends Document {
    title: string;
    description: string;
    category: string;
    subCategory?: string;
    slug?: string;
    media: { media_link: { original: string } }[];
    featured: boolean;
}

export interface ProgramModel extends Model<ProgramDocument> {
    findBySlug(slug: string): Promise<ProgramDocument | null>;
    findFeatured(): Promise<ProgramDocument[]>;
}
