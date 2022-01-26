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
    // DOWNLOAD A FILE
    // https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries
    // const file = fs.createWriteStream("oct.csv");
    // const request = http.get("https://s3-eu-west-1.amazonaws.com/tf-trans/2029/inflow_OCT-2021.csv", function(response) {
    // response.pipe(file);
    // });
    reply.send({ hello: 'world' })
})

// Register routes to handle blog posts
const blogRoutes = require('./routes/blogs')
blogRoutes.forEach((route, index) => {
    fastify.route(route)
})

const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

// const file = fs.createWriteStream("oct.csv");
// const request = http.get("https://s3-eu-west-1.amazonaws.com/tf-trans/2029/inflow_OCT-2021.csv", function(response) {
//   response.pipe(file);
// });


// Run the server!
fastify.listen(4000, (err, address) => {
    // fastify.listen(fastify.config.PORT, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})


