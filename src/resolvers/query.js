const feed = async (_, args, context, info) => {
    const where = args.filter ? {
        OR: [
            { description_contains: args.filter},
            { url_contains: args.filter},
        ],
    } : {}
    const links = await context.prisma.links({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy,
    })

    return links
}

const link = (_, args, context) => context.prisma.link({ id: args.id })

module.exports = {
    feed,
    link,
}