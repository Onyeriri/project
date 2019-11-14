"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _article = _interopRequireDefault(require("../models/article"));

var _comment = _interopRequireDefault(require("../models/comment"));

var _errorhandler = _interopRequireDefault(require("../ErrorHandler/errorhandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ArticleController =
/*#__PURE__*/
function () {
  function ArticleController() {
    _classCallCheck(this, ArticleController);
  }

  _createClass(ArticleController, null, [{
    key: "createArticle",
    value: function () {
      var _createArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var article, message, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _article["default"].createArticle(req.body, req.auth.userId);

              case 3:
                article = _context.sent;

                if (article) {
                  _context.next = 6;
                  break;
                }

                throw new _errorhandler["default"]('something bad happened', 400);

              case 6:
                message = 'Article successfully posted';
                data = _objectSpread({}, article, {
                  message: message
                });
                res.status(201).json({
                  status: 'success',
                  data: data
                });
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                next(_context.t0);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }));

      function createArticle(_x, _x2, _x3) {
        return _createArticle.apply(this, arguments);
      }

      return createArticle;
    }()
  }, {
    key: "editArticle",
    value: function () {
      var _editArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var article, message, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _article["default"].getArticle(req.params.id);

              case 3:
                _context2.next = 5;
                return _article["default"].EditArticle(req.body, req.params.id, req.auth.userId);

              case 5:
                article = _context2.sent;
                message = 'Article successfully updated';
                data = _objectSpread({}, article, {
                  message: message
                });
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

      function editArticle(_x4, _x5, _x6) {
        return _editArticle.apply(this, arguments);
      }

      return editArticle;
    }()
  }, {
    key: "deleteArticle",
    value: function () {
      var _deleteArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _article["default"].getArticle(req.params.id);

              case 3:
                _context3.next = 5;
                return _article["default"].DeleteArticle(req.params.id, req.auth.userId);

              case 5:
                data = {
                  message: 'Article successfully deleted'
                };
                res.status(200).json({
                  status: 'success',
                  data: data
                });
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](0);
                next(_context3.t0);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 9]]);
      }));

      function deleteArticle(_x7, _x8, _x9) {
        return _deleteArticle.apply(this, arguments);
      }

      return deleteArticle;
    }()
  }, {
    key: "getArticles",
    value: function () {
      var _getArticles = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res, next) {
        var articles, data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _article["default"].getAllArticles();

              case 3:
                articles = _context4.sent;
                data = _toConsumableArray(articles);
                res.status(200).json({
                  status: 'success',
                  data: data
                });
                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                next(_context4.t0);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 8]]);
      }));

      function getArticles(_x10, _x11, _x12) {
        return _getArticles.apply(this, arguments);
      }

      return getArticles;
    }()
  }, {
    key: "getSpecificArticle",
    value: function () {
      var _getSpecificArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res, next) {
        var article, comment, comments, data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _article["default"].getSpecificArticle(req.params.id);

              case 3:
                article = _context5.sent;
                _context5.next = 6;
                return _comment["default"].getArticleComments(article.articleid);

              case 6:
                comment = _context5.sent;
                comments = _toConsumableArray(comment);
                data = _objectSpread({}, article, {
                  comments: comments
                });
                res.status(200).json({
                  status: 'success',
                  data: data
                });
                _context5.next = 15;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](0);
                next(_context5.t0);

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 12]]);
      }));

      function getSpecificArticle(_x13, _x14, _x15) {
        return _getSpecificArticle.apply(this, arguments);
      }

      return getSpecificArticle;
    }()
  }]);

  return ArticleController;
}();

var _default = ArticleController;
exports["default"] = _default;