"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Import necessary dependencies
var _require = require('sequelize'),
    Model = _require.Model,
    DataTypes = _require.DataTypes;

var sequelize = require('../config/connection'); // const bcrypt = require('bcrypt');
// Define a User model that extends Sequelize's Model class


var User =
/*#__PURE__*/
function (_Model) {
  _inherits(User, _Model);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, _getPrototypeOf(User).apply(this, arguments));
  }

  return User;
}(Model);

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
  sequelize: sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'user'
}); // Export the User model for use in other modules

module.exports = User;
//# sourceMappingURL=users.dev.js.map
