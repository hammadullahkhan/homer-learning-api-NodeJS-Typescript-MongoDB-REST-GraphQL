import { GraphQLList, GraphQLObjectType } from "graphql";
import { StoryType } from "./types";
import { IStories, Stories } from "../models/stories";


export const StoryQueryType = new GraphQLObjectType({
    name: 'StoryQueryType',
    description: 'Query Schema for StoryType',
    fields: {
        stories: {
            type: new GraphQLList(StoryType),
            resolve: async () => {
                
                const stories: IStories[] | null = await Stories.find({});
                
                return stories;
            }
        }
    }
});
