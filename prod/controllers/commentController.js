"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gif = _interopRequireDefault(require("../models/gif"));

var _article = _interopRequireDefault(require("../models/article"));

var _comment = _interopRequireDefault(require("../models/comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CommentController =
/*#__PURE__*/
function () {
  function CommentController() {
    _classCallCheck(this, CommentController);
  }

  _createClass(CommentController, null, [{
    key: "createCommentArticle",
    value: function () {
      var _createCommentArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var article, response, message, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _article["default"].getArticle(req.params.id);

              case 3:
                article = _context.sent;
                _context.next = 6;
                return _comment["default"].createCommentArticle(req.body.comment, article.articleid, req.auth.userId);

              case 6:
                response = _context.sent;
                message = 'Comment successfully created';
                data = {
                  articleTitle: article.title,
                  article: article.article,
                  createdOn: response.createdon,
                  message: message,
                  comment: response.comment
                };
                res.status(201).json({
                  status: 'success',
                  data: data
                });
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                next(_context.t0);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 12]]);
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
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var gif, response, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _gif["default"].getGif(req.params.id);

              case 3:
                gif = _context2.sent;
                _context2.next = 6;
                return _comment["default"].createCommentGif(req.body.comment, gif.gifid, req.auth.userId);

              case 6:
                response = _context2.sent;
                data = {
                  message: 'comment successfully created',
                  gifTitle: gif.title,
                  createdOn: response.createdon,
                  comment: response.comment
                };
                res.status(200).json({
                  status: 'success',
                  data: data
                });
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                next(_context2.t0);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      function createCommentGif(_x4, _x5, _x6) {
        return _createCommentGif.apply(this, arguments);
      }

      return createCommentGif;
    }()
  }]);

  return CommentController;
}();

var _default = CommentController;
exports["default"] = _default;