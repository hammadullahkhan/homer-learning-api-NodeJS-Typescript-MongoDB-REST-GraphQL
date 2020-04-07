import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { StoryType, StoryCreateType } from "./types";
import { IStories, Stories } from "../models/stories";

export const StoryMutationType = new GraphQLObjectType({
    name: 'StoryMutationType',
    description: 'Mutations for StoryType',
    fields: {
        createStory: {
            type: StoryType,
            args: {
                input: { type: new GraphQLNonNull(StoryCreateType) }
            },
            resolve: async (source, { input }) => {
                
                try {
                    const storyCreateBody = {
                      title: input.title,
                      privacy: input.privacy,
                      likes: input.likes,
                      launch_date: input.launch_date
                    };
                    const story: IStories = new Stories(storyCreateBody);
                    const savedStory: IStories = await story.save();
                
                    return savedStory;
                } catch (error) {
                    return null;
                }
            }
        }
    }
});
