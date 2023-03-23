"use strict";

var sequelize = require('../config/connection'); // const { User } = require('../models/users');


var User = require("../models/users");

var userData = require('./userData.json');

var seedDatabase = function seedDatabase() {
  var users;
  return regeneratorRuntime.async(function seedDatabase$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(sequelize.sync({
            force: true
          }));

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(User.bulkCreate(userData, {
            individualHooks: true,
            returning: true
          }));

        case 4:
          users = _context.sent;
          //   for (const project of projectData) {
          //     await Project.create({
          //       ...project,
          //       user_id: users[Math.floor(Math.random() * users.length)].id,
          //     });
          //   }
          process.exit(0);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

seedDatabase();
//# sourceMappingURL=seeds.dev.js.map
