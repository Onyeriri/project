"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DB = _interopRequireDefault(require("../DB"));

var _errorhandler = _interopRequireDefault(require("../ErrorHandler/errorhandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CommentModel =
/*#__PURE__*/
function () {
  function CommentModel() {
    _classCallCheck(this, CommentModel);
  }

  _createClass(CommentModel, null, [{
    key: "createCommentArticle",
    value: function () {
      var _createCommentArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(comment, articleId, authorId) {
        var values, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                values = [comment, articleId, authorId];
                _context.next = 3;
                return _DB["default"].query('INSERT INTO comments_articles(comment, articleid, authorid) VALUES($1,$2, $3) RETURNING *', values)["catch"](function (error) {
                  throw new _errorhandler["default"](error.message, 400);
                });

              case 3:
                response = _context.sent;
                return _context.abrupt("return", response);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createCommentArticle(_x, _x2, _x3) {
        return _createCommentArticle.apply(this, arguments);
      }

      return createCommentArticle;
    }()
  }, {
    key: "createCommentGif",
    value: function () {
      var _createCommentGif = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(comment, gifId, authorId) {
        var values, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                values = [comment, gifId, authorId];
                _context2.next = 3;
                return _DB["default"].query('INSERT INTO comments_gifs(comment, gifid, authorid) VALUES($1,$2, $3) RETURNING *', values)["catch"](function (error) {
                  throw new _errorhandler["default"](error.message, 400);
                });

              case 3:
                response = _context2.sent;
                return _context2.abrupt("return", response);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createCommentGif(_x4, _x5, _x6) {
        return _createCommentGif.apply(this, arguments);
      }

      return createCommentGif;
    }()
  }, {
    key: "getArticleComments",
    value: function () {
      var _getArticleComments = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(articleid) {
        var value, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                value = [articleid];
                _context3.next = 3;
                return _DB["default"].query('SELECT * FROM comments_articles WHERE articleid = $1', value, true)["catch"](function (error) {
                  throw new Error(error.message);
                });

              case 3:
                response = _context3.sent;

                if (response) {
                  _context3.next = 6;
                  break;
                }

                throw new _errorhandler["default"]('comments not found', 404);

              case 6:
                return _context3.abrupt("return", response);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getArticleComments(_x7) {
        return _getArticleComments.apply(this, arguments);
      }

      return getArticleComments;
    }()
  }, {
    key: "getGifComments",
    value: function () {
      var _getGifComments = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(gifid) {
        var value, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                value = [gifid];
                _context4.next = 3;
                return _DB["default"].query('SELECT * FROM comments_gifs WHERE gifid = $1', value, true)["catch"](function (error) {
                  throw new Error(error.message);
                });

              case 3:
                response = _context4.sent;

                if (response) {
                  _context4.next = 6;
                  break;
                }

                throw new _errorhandler["default"]('comments not found', 404);

              case 6:
                return _context4.abrupt("return", response);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getGifComments(_x8) {
        return _getGifComments.apply(this, arguments);
      }

      return getGifComments;
    }()
  }]);

  return CommentModel;
}();

var _default = CommentModel;
exports["default"] = _default;