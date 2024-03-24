const router = require('express').Router();
const { Blog,User } = require('../models')
const checkLogin = require('../utils/login')

router.get('/', async (req,res) => {
    try {
        const dbBlogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes:['username']
                }
            ]
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});