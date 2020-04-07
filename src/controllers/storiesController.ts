import { Request, Response, NextFunction } from 'express';
import { IStories, Stories } from "../models/stories";
import * as validation from "../validation/validation";
import { ValidationError } from "joi";

// THE ONE ASKED
export async function getAllPublicStoriesForTwentyLikesMin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  
  try {
    const privacy = 'public';
    const numLikes = req.params.numLikes;
    const stories: IStories[] | null = await Stories.find({privacy: privacy, likes: { $gte: numLikes }});
    const response = { count: stories.length, data: stories};
    if (stories) return res.status(200).json(response);
    return res.status(404).json({ message:  `The server has not found anything matching the Request-URI.` });
  } catch (error) {
    return next(error);
  }
}


// POST Rest Call
export async function createStory(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

  const { error }: { error: ValidationError } = validation.validateStories(req.body);
  if (error) {
    return res.status(400).json(error.details[0]);
  }

  try {
    const storyCreateBody = {
      title: req.body.title,
      privacy: req.body.privacy,
      likes: req.body.likes,
      launch_date: req.body.launch_date
    };
    const story: IStories = new Stories(storyCreateBody);
    const savedStory: IStories = await story.save();

    return res.json(savedStory);
  } catch (error) {
    return next(error);
  }
}

export async function getAllStories(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  
  try {
    const stories: IStories[] | null = await Stories.find({});
    const response = { count: stories.length, data: stories};
    if (stories) return res.status(200).json(response);
    return res.status(404).json({ message:  `The server has not found anything matching the Request-URI.` });
  } catch (error) {
    return next(error);
  }
}

export async function getAllStoriesByPrivacy(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  
  try {
    const privacy = req.params.privacy;
    const stories: IStories[] | null = await Stories.find({privacy: privacy});
    const response = { count: stories.length, data: stories};
    if (stories) return res.status(200).json(response);
    return res.status(404).json({ message:  `The server has not found anything matching the Request-URI.` });
  } catch (error) {
    return next(error);
  }
}
