const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: (_, args, context, info) => context.prisma.links(),
      link: (_, args, context) => context.prisma.link({ id: args.id })
    },
    Link: {
      id: (parent) => parent.id,
      description: (parent) => parent.description,
      url: (parent) => parent.url,
    },
    Mutation: {
      post: (_, args, context) => {
        return context.prisma.createLink({
          url: args.url,
          description: args.description,
        })
      },
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
      return {
        ...request,
        prisma,
      }
    },
})

server.start(() => console.log(`server is running on http://localhost:4000 🚀`))