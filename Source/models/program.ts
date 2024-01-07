import mongoose, { Schema, Document } from 'mongoose';
import logging from '../config/logging';
import Programs from '../interface/program';
import slugify from 'slugify';

const ProgramSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: false },
    imageUrl: { type: String, require: false },
    slug: { type: String, required: false, unique: true },
    media: [{ type: String }]
});

ProgramSchema.pre<Programs>('save', function (next) {
    const program = this as Programs;
    program.slug = generateSlug(program.title);
    next();
});

ProgramSchema.statics.findBySlug = function (slug: string): Promise<Programs | null> {
    return this.findOne({ slug }).exec();
};

function generateSlug(title: string): string {
    return slugify(title, { lower: true });
}

const ProgramModel = mongoose.model<Programs>('Program', ProgramSchema);

export default ProgramModel;
