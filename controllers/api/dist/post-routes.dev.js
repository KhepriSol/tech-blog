"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = require("express").Router();

var _require = require("../../models/comment.js"),
    User = _require.User,
    Post = _require.Post,
    Comment = _require.Comment; //get all the posts


router.get("/", function _callee(req, res) {
  var dbPostData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Post.findAll({
            attributes: ["id", "title", "body", "user_id"],
            include: [{
              model: Comment,
              as: "comments",
              attributes: ["id", "comment_text", "user_id"]
            }]
          }));

        case 3:
          dbPostData = _context.sent;
          res.status(200).json(dbPostData);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            error: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //get post by id

router.get("/:id", function _callee2(req, res) {
  var dbPostData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Post.findOne({
            where: {
              id: req.params.id
            },
            attributes: ["id", "title", "body", "user_id"],
            include: [{
              model: Comment,
              as: "comments",
              attributes: ["id", "comment_text", "user_id"]
            }]
          }));

        case 3:
          dbPostData = _context2.sent;

          if (dbPostData) {
            _context2.next = 7;
            break;
          }

          res.status(404).json({
            message: "No Post found with this id"
          });
          return _context2.abrupt("return");

        case 7:
          res.status(200).json(dbPostData);
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            error: _context2.t0.message
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // Create a new post

router.post("/", function _callee3(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.user_id
          }));

        case 3:
          post = _context3.sent;
          res.status(201).json(post);
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            error: "Internal Server Error"
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Update a post

router.put("/:id", function _callee4(req, res) {
  var _ref, _ref2, rowsUpdated, _ref2$, updatedPost;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Post.update({
            title: req.body.title,
            body: req.body.body
          }, {
            where: {
              id: req.params.id
            },
            returning: true
          }));

        case 3:
          _ref = _context4.sent;
          _ref2 = _slicedToArray(_ref, 2);
          rowsUpdated = _ref2[0];
          _ref2$ = _slicedToArray(_ref2[1], 1);
          updatedPost = _ref2$[0];

          if (!(rowsUpdated === 0)) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "No post found with this id"
          }));

        case 10:
          res.json(updatedPost);
          _context4.next = 17;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            error: "Internal Server Error"
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); // Delete a post

router["delete"]("/:id", function _callee5(req, res) {
  var rowsDeleted;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Post.destroy({
            where: {
              id: req.params.id
            }
          }));

        case 3:
          rowsDeleted = _context5.sent;

          if (!(rowsDeleted === 0)) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "No post found with this id"
          }));

        case 6:
          res.json({
            message: "Post successfully deleted"
          });
          _context5.next = 13;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            error: "Internal Server Error"
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;
//# sourceMappingURL=post-routes.dev.js.map
