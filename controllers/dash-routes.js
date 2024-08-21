const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

const checkLogin = require('../utils/login');

// view all blogs of logged in user.  Allow edit, delete.  View comments
router.get('/', checkLogin, async (req, res) => {
  try {
    const userBlogs = await Blog.findAll({
      where: { user_id: req.session.user_id },
      attributes: ['id', 'blogTitle', 'blogBody', 'createdAt'],
      include: [
        {
          model: Comment,
          attributes: ['comBody', 'user_id', 'blog_id', 'createdAt'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const blogbatch = userBlogs.map((blog) => blog.get({ plain: true }));
    console.log(blogbatch);
    res.render('Dashboard', {
      blogbatch,
      loggedIn: req.session.loggedIn,
      user: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render create-new-blog- page
router.get('/newblog', checkLogin, async (req, res) => {
  res.render('newBlog', { loggedIn: req.session.loggedIn });
});

// Post new blog to database
router.post('/newblog', checkLogin, async (req, res) => {
  try {
    const newBlogPost = await Blog.create({
      blogTitle: req.body.title,
      blogBody: req.body.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlogPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// render 1 blog to edit or delete
router.get('/edit/:id', checkLogin, async (req, res) => {
  try {
    const getBlog = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'blogTitle', 'blogBody', 'createdAt'],
    });
    const mapBlog = getBlog.get({ plain: true });
    res.render('editblog', {
      loggedIn: req.session.loggedIn,
      mapBlog,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit a blog
router.put('/edit', checkLogin, async (req, res) => {
  try {
    const updateBlog = await Blog.update(
      {
        blogTitle: req.body.title,
        blogBody: req.body.body,
      },
      {
        where: {
          id: req.body.id,
        },
      },
    );
    res.status(200).json({ message: 'Updated blog post' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a blog
router.delete('/edit/:id', checkLogin, async (req, res) => {
  try {
    const delBlog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Blog post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Cannot delete blog post' });
  }
});

module.exports = router;
