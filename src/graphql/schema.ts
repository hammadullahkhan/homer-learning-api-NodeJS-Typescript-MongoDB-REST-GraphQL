import { GraphQLSchema } from 'graphql';
import { StoryQueryType } from "./queries";
import { StoryMutationType } from "./mutations";

export const StorySchema = new GraphQLSchema({
    query: StoryQueryType,
    mutation: StoryMutationType
});
