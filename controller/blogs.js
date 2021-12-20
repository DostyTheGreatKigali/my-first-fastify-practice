// const fastify = require('fastify')({
//     logger: true
// })

// Demo data
let blogs = [
    {
        id: 1,
        title: 'This is an experiment'
    },
    {
        id: 2,
        title: 'fastify is pretty cool'
    },
    {
        id: 3,
        title: 'Just another blog, yea!'
    }
]

// Handlers
const getAllBlogs = async (req, reply) => {
    // if(blogs.length == 0)
    // console.log("Now news found")
    // fastify.log.error("No news")
    // throw fastify.httpErrors.notFound('news not found') //fastify.log.error(err)
    return blogs
}

const getBlog = async (req, reply) => {
    const id = Number(req.params.id) // blog ID
    const blog = blogs.find(blog => blog.id === id)
    
    return blog
}

const addBlog = async (req, reply) => {
    const id = blogs.length + 1 // generate new ID
    const newBlog = {
        id,
        title: req.body.title
    }

    blogs.push(newBlog)
    return newBlog
}

const updateBlog = async (req, reply) => {
    const id = Number(req.params.id)
    blogs = blogs.map(blog => {
        if (blog.id === id) {
            return {
                id,
                title: req.body.title
            }
        }
    })

    return {
        id,
        title: req.body.title
    }
}

const deleteBlog = async (req, reply) => {
    const id = Number(req.params.id)

    blogs = blogs.filter(blog => blog.id !== id)
    return { msg: `Blog with ID ${id} is deleted` }
}

module.exports = {
    getAllBlogs,
    getBlog,
    addBlog,
    updateBlog,
    deleteBlog
}
