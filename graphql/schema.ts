import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Video {
    id: String
    title: String
    published: Boolean
  }

  type Query {
    getVideos: [Video]!
  }

  type Mutation {
      createVideo(title: String!): Video!
      togglePublished(id: String!): Video!
      deleteVideo(id: String!): Video!
      editTitle(id: String!, title: String!): Video!
  }
`