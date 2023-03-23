"use strict";

// Import the User, Post, and Comment models
var User = require('./User');

var Post = require('./Post');

var Comment = require('./Comment'); // Define the relationships between the models
// A User has many Posts, with a foreign key of user_id


User.hasMany(Post, {
  foreignKey: 'user_id'
});
User.hasMany(Comment, {
  foreignKey: 'user_id'
});
Post.belongsTo(User, {
  foreignKey: 'user_id'
});
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
}); // Export the User, Post, and Comment models

module.exports = {
  User: User,
  Post: Post,
  Comment: Comment
};
//# sourceMappingURL=index.dev.js.map
