const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')
const User = require('./resolvers/user')
const Link = require('./resolvers/link')

const resolvers = {
    Query,
    Mutation,
    User,
    Link,    
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