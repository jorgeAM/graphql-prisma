const link = (parent, _, context) => context.prisma.vote({ id: parent.id }).link()
const user = (parent, _, context) => context.prisma.vote({ id: parent.id }).user()
  
module.exports = {
    link,
    user,
}