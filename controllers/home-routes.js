const router = require('express').Router();
const { Blog,User } = require('../models')
const checkLogin = require('../utils/login')

router.get('/', async (req,res) => {
    try {
        const dbBlogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes:['username'],
                },
            ],
        });
        const blogbatch = dbBlogData.map((blog) => blog.get({plain:true})
        );
        console.log(blogbatch);
        res.render('home', {
            blogbatch,
            loggedIn: req.session.loggedIn });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
module.exports = router;