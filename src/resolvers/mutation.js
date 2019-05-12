const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

const post = (_, args, context) => {
    const userId = getUserId(context)
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
    })
}

const signup = async (_, args, context) => {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.createUser({...args, password})
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return { token, user }
}

const login = async (_, args, context) => {
    const user = await context.prisma.user({ email: args.email })
    if (!user) throw new Error('No such user found')
    const ok = await bcrypt.compare(args.password, user.password)
    if (!ok) throw new Error('Wrong password')
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return { token, user }
}

const vote = async (_,args, context) => {
    const userId = getUserId(context)
    const linkExist = await context.prisma.$exists.vote({
        user: { id: userId },
        link: { id: args.linkId },
    })
    if (linkExist) throw new Error(`Already voted for link ${args.linkId}`)
    return context.prisma.createVote({
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId} },
    })

}

module.exports = {
    post,
    signup,
    login,
    vote,
}