const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const checkLogin = require("../utils/login");

// get all blogs at homepage
router.get("/", async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const blogbatch = dbBlogData.map((blog) => blog.get({ plain: true }));
    res.render("home", {
      blogbatch,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//view a single blog, view comments, leave comment
router.get("/blog/:id", checkLogin, async (req, res) => {
  try {
    const oneBlog = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "blogTitle", "blogBody", "createdAt"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      include: [
        {
          model: Comment,
          attributes: ["comBody", "user_id", "blog_id", "createdAt"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const mapBlog = oneBlog.get({ plain: true });
    res.render("viewBlog", {
      loggedIn: req.session.loggedIn,
      mapBlog,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// post comment to database
router.post("/comm", checkLogin, async (req, res) => {
  const blogID = parseInt(req.body.blog_id);
  try {
    const postComm = await Comment.create({
      comBody: req.body.comBody,
      user_id: req.session.user_id,
      blog_id: blogID,
    });
    res.status(200).json(postComm);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// navigating to log in screen when logged in returns to homepage
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
module.exports = router;
