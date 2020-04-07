import { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLInputObjectType, GraphQLNonNull } from "graphql";

export const StoryType = new GraphQLObjectType({
  name: 'StoryType',
  fields:  () =>{
    return {
        id: { type: GraphQLString },
        title: { type: GraphQLString },      
        privacy: { type: GraphQLString },     
        likes: { type: GraphQLInt },
        launch_date: { type: GraphQLString }
      }
}});

export const StoryCreateType = new GraphQLInputObjectType({
  name: 'StoryCreateType',
  description: 'Add a story to the list',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },      
    privacy: { type: GraphQLString },     
    likes: { type: GraphQLInt },
    launch_date: { type: GraphQLString }
  }
});
