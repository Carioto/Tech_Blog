const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const checkLogin = require("../utils/login");

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
//view a single blog
router.get("/blog/:id", checkLogin, async (req, res) => {
  try {
    const oneBlog = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "blogTitle", "blogBody", "createdAt"],
      include: [
        {
          model:User,
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

router.post("/comm", checkLogin, async (req, res) => {
  console.log('\x1b[1;31m================>',req.body, req.session.user_id);
  const blogID = parseInt(req.body.blog_id);
  console.log(blogID);
  try {
    const postComm = await Comment.create({
      comBody: req.body.comBody,
      user_id: req.session.user_id,
      blog_id: blogID,
    });
    console.log(postComm);
    res.status(200).json(postComm);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
module.exports = router;
