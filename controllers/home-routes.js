const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// Get all posts and their associated users and comments
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title", "body", "user_id"],
      include: [
        { model: User, as: "user", attributes: ["username"] },
        { model: Comment, as: "comments", attributes: ["id", "comment_text", "user_id"] },
      ],
    });

    if (!posts.length) {
      return res.status(404).json({ message: "No posts available" });
    }

    res.render("home", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a single post and its associated user and comments
router.get("/viewpost/:id", async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "title", "body", "user_id"],
      include: [
        { model: User, as: "user", attributes: ["username"] },
        { model: Comment, as: "comments", attributes: ["id", "comment_text", "user_id"],
          include: [{ model: User, as: "user", attributes: ["username"] }] 
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: "No post available" });
    }

    const myPost = post.user_id === req.session.user_id;
    res.render("single-post", { post, loggedIn: req.session.loggedIn, currentUser: myPost });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Serve up the login page
router.get("/login", (req, res) => {
  res.render("login", { loggedIn: req.session.loggedIn });
});

// Get all posts associated with the logged-in user
router.get("/dashboard", async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { user_id: req.session.user_id },
      attributes: ["id", "title", "body", "user_id"],
      include: [
        { model: User, as: "user", attributes: ["username"] },
        { model: Comment, as: "comments", attributes: ["id", "comment_text", "user_id"],
          include: [{ model: User, as: "user", attributes: ["username"] }]
        },
      ],
    });

    if (!posts.length) {
      return res.status(404).json({ message: "No posts available" });
    }

    res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Serve up the create post page
router.get("/post", (req, res) => {
  res.render("create-post", { loggedIn: req.session.loggedIn });
});

// Serve up the edit post page
router.get("/edit/:id", (req, res) => {
  res.render("edit-post", { loggedIn: req.session.loggedIn, post_id: req.params.id });
});

module.exports = router;
