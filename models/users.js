// Import necessary dependencies
const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');
// const bcrypt = require('bcrypt');

// Define a User model that extends Sequelize's Model class
class User extends Model {

    
    // checkPassword(loginPw) {
    //     return bcrypt.compareSync(loginPw, this.password);
    // }
}

// Initialize the User model with its attributes and options
User.init({
    
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
    }
}, {
    
    // hooks: {
    //     async beforeCreate(newUserData) {
    //         newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //         return newUserData;
    //     },
    //     async beforeUpdate(updatedUserData) {
    //         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    //         return updatedUserData;
    //     }
    // },
   
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
})

// Export the User model for use in other modules
module.exports = User;
