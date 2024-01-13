// programModel.ts

import mongoose, { Schema, Document, Model } from 'mongoose';
import { ProgramDocument } from '../interface/program';
import slugify from 'slugify';

interface MediaLink {
    media_link: {
        original: string;
    };
}

const ProgramSchema: Schema<ProgramDocument> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: false },
    slug: { type: String, required: false, unique: true },
    media: [
        {
            media_link: [
                {
                    original: { type: String }
                }
            ]
        }
    ],
    featured: { type: Boolean, default: false }
});

async function generateSlug(title: string): Promise<string> {
    const baseSlug = slugify(title, { lower: true });

    let proposedSlug = baseSlug;
    let counter = 1;

    // Check if the proposed slug already exists in the database
    while (await ProgramModel.findOne({ slug: proposedSlug })) {
        counter++;
        proposedSlug = `${baseSlug}-${counter}`;
    }

    return proposedSlug;
}

// Pre-save hook to generate a unique slug before saving the document
ProgramSchema.pre<ProgramDocument>('save', async function (next) {
    const program = this;

    // Generate a unique slug
    if (this.isModified('title') || this.isNew) {
        program.slug = await generateSlug(program.title);
    }

    next();
});

const ProgramModel: Model<ProgramDocument> = mongoose.model('Program', ProgramSchema);

export default ProgramModel;
