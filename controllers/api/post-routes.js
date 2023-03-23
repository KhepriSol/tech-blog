const router = require("express").Router();
const { User, Post, Comment } = require("../../models/comment.js");


//get all the posts
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["id", "title", "body", "user_id"],
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment_text", "user_id"],
        },
      ],
    });
    res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

//get post by id
router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "body", "user_id"],
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment_text", "user_id"],
        },
      ],
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No Post found with this id" });
      return;
    }
    res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Create a new post
router.post("/", async (req, res) => {
    try {
      const post = await Post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user_id,
      });
      res.status(201).json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Update a post
  router.put("/:id", async (req, res) => {
    try {
      const [rowsUpdated, [updatedPost]] = await Post.update(
        {
          title: req.body.title,
          body: req.body.body,
        },
        {
          where: {
            id: req.params.id,
          },
          returning: true,
        }
      );
      if (rowsUpdated === 0) {
        return res.status(404).json({ message: "No post found with this id" });
      }
      res.json(updatedPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Delete a post
  router.delete("/:id", async (req, res) => {
    try {
      const rowsDeleted = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (rowsDeleted === 0) {
        return res.status(404).json({ message: "No post found with this id" });
      }
      res.json({ message: "Post successfully deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  module.exports = router;
