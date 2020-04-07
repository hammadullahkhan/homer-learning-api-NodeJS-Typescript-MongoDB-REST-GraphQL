import { Schema, Document, Types, Model, model } from 'mongoose';
import { allowedPrivacy, storiesModelConstants } from "../constants/";

export enum Privacy {
    Public = "Public",
    Private = "Private"
}

export interface IStories extends Document {
    title: string;
    privacy: Privacy;
    likes: number;
    launch_date: Date;
}

const storiesSchema: Schema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        minlength: storiesModelConstants.titleMin,
        maxlength: storiesModelConstants.titleMax,
        trim: true,
    },
    privacy: {
        type: String,
        required: true,
        minlength: storiesModelConstants.privacyMin,
        maxlength: storiesModelConstants.privacyMax,
        unique: false,
        trim: true,
        validate: {
            validator (privacy: string) {
                return allowedPrivacy.has(privacy);
            },
        },
        // enum: Privacy
    },
    likes: {
        type: Number,
        default: 0,
    },
    launch_date: {
        type: Date,
        required: true,
        unique: false,
        trim: true
    }
});


storiesSchema.set("toJSON", { virtuals: true });
  
export const Stories: Model<IStories> = model<IStories>("Stories", storiesSchema);
