// Import necessary modules//
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define Post model//
class Post extends Model {}

// Initialize Post model with columns and constraints//
Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1] 
        }
    },
 
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1] 
        }
    },
   
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user', 
            key: 'id'     
        }
    }
}, 

{
    sequelize,             
    freezeTableName: true,  
    underscored: true,      
    modelName: 'post'       
});

// Export the Post model//
module.exports = Post;
