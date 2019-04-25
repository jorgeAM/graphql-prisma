const feed = (_, args, context, info) => context.prisma.links()
const link = (_, args, context) => context.prisma.link({ id: args.id })

module.exports = {
    feed,
    link,
}