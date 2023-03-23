const router = require("express").Router();
const homeRoutes = require("./home-routes");
const commentRoutes = require("./api/comment-routes.js");
const userRoutes = require("./api/user-routes.js");
const postRoutes = require("./api/post-routes.js");
//set up the route useage
router.use("/", homeRoutes);
router.use("/api/comments", commentRoutes);
router.use("/api/users", userRoutes);
router.use("/api/posts", postRoutes);
module.exports = router;