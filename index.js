// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

// Use Fastify Env plugin: https://github.com/fastify/fastify-env
// const fastifyEnv = require('fastify-env') // load plugin

// const options = {
//     confKey: 'config', // optional, default: 'config'
//     schema: {
//         type: 'object',
//         required: ['PORT'],
//         properties: {
//             PORT: {
//                 type: 'string',
//                 default: 1000
//             }
//         }
//     }
// }

// fastify
//   .register(fastifyEnv, options)
//     .ready((err) => {
//         if (err) console.error(err)

//         console.log(fastify.config)
//         // output: { PORT: 1000 }
//     })


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
fastify.listen(4000, (err, address) => {
    // fastify.listen(fastify.config.PORT, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})
