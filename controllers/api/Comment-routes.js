const router = require("express").Router();
const { User, Post, Comment } = require("../../models/comment.js");

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      attributes: ["id", "comment_text", "user_id", "post_id"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
      ],
    });
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a comment by id
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "comment_text", "user_id", "post_id"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
      ],
    });
    if (!comment) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Add a comment
router.post("/", async (req, res) => {
  try {
    const comment = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update a comment
router.put("/:id", async (req, res) => {
  try {
    const [rowsUpdated, [updatedComment]] = await Comment.update(
      {
        comment_text: req.body.comment_text,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    if (rowsUpdated !== 1) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }
    res.json(updatedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Remove a comment
router.delete("/:id", async (req, res) => {
  try {
    const rowsDeleted = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (rowsDeleted !== 1) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
