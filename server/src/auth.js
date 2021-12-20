module.exports = {
    secret: process.env.AUTH_SECRET || "alkemy",
    expires: process.env.AUTH_EXPIRES || '10h',
    rounds: process.env.AUTH_ROUNDS || 10
}