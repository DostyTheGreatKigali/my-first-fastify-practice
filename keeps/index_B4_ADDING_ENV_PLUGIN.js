// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

// Declare a route
fastify.get('/', function (req, reply) {
    reply.send({ hello: 'world' })
})

// Register routes to handle blog posts
const blogRoutes = require('./routes/blogs')
blogRoutes.forEach((route, index) => {
    fastify.route(route)
})


// Run the server!
fastify.listen(7070, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})
