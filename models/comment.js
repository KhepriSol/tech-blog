// set up imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Set up Comment model
class Comment extends Model {}

// Define Comment attributes
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      /** The unique identifier for the Comment */
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] },
      /** The text content of the Comment */
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
        /** The user who created the Comment */
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post",
        key: "id",
        /** The Post that the Comment belongs to */
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

// Export Comment model
module.exports = Comment;
