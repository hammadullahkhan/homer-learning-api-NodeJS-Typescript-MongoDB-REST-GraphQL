// Validation for POST and PUT requests

import * as Joi from "joi";

import {allowedPrivacy, storiesModelConstants} from "../constants";
import {db, IStories} from '../models';

// Validate stories fields
export function validateStories(stories: IStories): Joi.ValidationResult<IStories> {
    const schema = {
        title: Joi.string().min(storiesModelConstants.titleMin).max(storiesModelConstants.titleMax).required(),
        privacy: Joi.string().min(storiesModelConstants.privacyMin).max(storiesModelConstants.privacyMax).required(),
        likes: Joi.number().min(0).precision(2).required(),
        launch_date: Joi.string().required(),
    };
    return Joi.validate(stories, schema);
}
