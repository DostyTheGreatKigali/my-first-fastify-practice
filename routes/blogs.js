const blogController = require('../controller/blogs');
const downloadController = require('../controller/downloadFile');

// Validation Schema
const getBlogValidation = {
    params: {
        // id: { type: 'object' } Mistake for testing
        id: { type: 'string' }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' }
            }
        }
    }
}

const addBlogValidation = {
    body: {
        type: 'object',
        required: [
            'title'
        ],
        properties: {
            title: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' }
            }
        }
    }
}

// Routes
const routes = [{
        method: 'GET',
        url: '/api/blogs',
        handler: blogController.getAllBlogs
    },
    {
        method: 'GET',
        url: '/api/blogs/:id',
        schema: getBlogValidation, // add validation
        handler: blogController.getBlog
    },
    {
        method: 'POST',
        url: '/api/blogs',
        schema: addBlogValidation, // add validation
        handler: blogController.addBlog
    },
    {
        method: 'PUT',
        url: '/api/blogs/:id',
        handler: blogController.updateBlog
    },
    {
        method: 'DELETE',
        url: '/api/blogs/:id',
        handler: blogController.deleteBlog
    },
    {
        method: 'GET',
        url: '/api/download',
        handler: downloadController.pDownload
    }
]


module.exports = routes