"use strict";

var router = require("express").Router();

var homeRoutes = require("./home-routes");

var commentRoutes = require("./api/comment-routes.js");

var userRoutes = require("./api/user-routes.js");

var postRoutes = require("./api/post-routes.js"); //set up the route useage


router.use("/", homeRoutes);
router.use("/api/comments", commentRoutes);
router.use("/api/users", userRoutes);
router.use("/api/posts", postRoutes);
module.exports = router;
//# sourceMappingURL=index.dev.js.map
