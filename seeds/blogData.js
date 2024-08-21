const { Blog } = require('../models');

const blogData = [
  {
    blogTitle: 'A New Tech Blog',
    blogBody: 'Welcome to the New Tech Blog.  We are so happy you joined',
    user_id: '1',
  },
];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;
