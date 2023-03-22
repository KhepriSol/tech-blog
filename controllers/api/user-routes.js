const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          as: "posts",
          attributes: ["id", "title", "body"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment_text", "post_id"],
        },
      ],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          as: "posts",
          attributes: ["id", "title", "body"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment_text", "post_id"],
        },
      ],
    });
    if (!user) {
      res.status(404).json({ message: "No user found with this ID." });
      return;
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Add a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;
      res.json(newUser);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Log in the user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      res.status(400).json({ message: "User not found." });
      return;
    }
    const validPassword = await user.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password." });
      return;
    }
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
      res.json({ user, message: "You are now logged in." });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Update user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
    try {
      const deletedUser = await User.destroy({
        where: { id: req.params.id },
      });
      if (!deletedUser) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ message: "User deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  //Log out the user
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        // end the session
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  module.exports = router;
