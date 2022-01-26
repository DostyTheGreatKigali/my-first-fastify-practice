// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

// var fs = require('fs'); 
// var parse = require('csv-parser');

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
    // const http = require('https'); // or 'https' for https:// URLs
    // const fs = require('fs');
    // const file = fs.createWriteStream("oct.csv");
    // const request = http.get("https://s3-eu-west-1.amazonaws.com/tf-trans/2029/inflow_OCT-2021.csv", function(response) {
    // response.pipe(file);
    // });

    // READ CSV FILE
    // var fs = require('fs'); 
    // var parse = require('csv-parser');
    // var parser = parse({columns: true}, function (err, records) {
    //     console.log(records);
    // });

    // fs.createReadStream(__dirname + '/downloads/downloads.csv').pipe(parser);

    // (A) CSV PARSER MODULE
    // npm install csv-parser
    // https://www.npmjs.com/package/csv-parser
    // const fs = require("fs"),
    // csv = require("csv-parser");

    // // (B) READ CSV FILE
    // var results = [];
    // fs.createReadStream(__dirname + '/downloads/downloads.csv')
    // .pipe(csv())
    // .on("data", (data) => results.push(data))
    // .on("end", () => {
    // console.log(results);
    // });

        reply.send({ hello: 'world' })
    })



    // Register routes to handle blog posts
    const blogRoutes = require('./routes/blogs')
    blogRoutes.forEach((route, index) => {
        fastify.route(route)
    })

// const http = require('https'); // or 'https' for https:// URLs
// const fs = require('fs');

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


