const { Blog } = require('../models');

const blogData = [
{
    blogTitle: 'A New Tech Blog',
    blogBody: 'Welcome to the New Tech Blog.  We are so happy you joined',
    user_id: '1',
},
{
    blogTitle: 'Handlebars question',
    blogBody: 'I hope to add a meaningful question on handlebars here.  Thanks to anyone tha can help!',
    user_id: '2',
},
{
    blogTitle: 'MySQL Devotees',
    blogBody: 'Here is a place to show your love for the MySQL database management system.',
    user_id: '4',
},
]

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;