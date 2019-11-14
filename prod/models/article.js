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

var CreateArticle =
/*#__PURE__*/
function () {
  function CreateArticle() {
    _classCallCheck(this, CreateArticle);
  }

  _createClass(CreateArticle, null, [{
    key: "createArticle",
    value: function () {
      var _createArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref, authorId) {
        var title, article, values, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                title = _ref.title, article = _ref.article;
                values = [title, article, authorId];
                _context.next = 4;
                return _DB["default"].query('INSERT INTO articles(title, article, authorid) VALUES($1,$2, $3) RETURNING *', values)["catch"](function (error) {
                  throw new _errorhandler["default"](error.message, 400);
                });

              case 4:
                response = _context.sent;
                return _context.abrupt("return", response);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createArticle(_x, _x2) {
        return _createArticle.apply(this, arguments);
      }

      return createArticle;
    }()
  }, {
    key: "getArticle",
    value: function () {
      var _getArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        var values, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                values = [id];
                _context2.next = 3;
                return _DB["default"].query('SELECT * FROM articles WHERE articleid = $1', values)["catch"](function (error) {
                  throw new _errorhandler["default"](error.message, 400);
                });

              case 3:
                response = _context2.sent;

                if (response) {
                  _context2.next = 6;
                  break;
                }

                throw new Error('Article does not exist');

              case 6:
                return _context2.abrupt("return", response);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getArticle(_x3) {
        return _getArticle.apply(this, arguments);
      }

      return getArticle;
    }()
  }, {
    key: "EditArticle",
    value: function () {
      var _EditArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref2, id, authorId) {
        var title, article, values, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                title = _ref2.title, article = _ref2.article;
                values = [title, article, id, authorId];
                _context3.next = 4;
                return _DB["default"].query('UPDATE articles SET title = $1, article = $2 WHERE articleid = $3 AND authorid = $4 RETURNING *', values)["catch"](function (error) {
                  throw new Error(error.message);
                });

              case 4:
                response = _context3.sent;
                return _context3.abrupt("return", response);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function EditArticle(_x4, _x5, _x6) {
        return _EditArticle.apply(this, arguments);
      }

      return EditArticle;
    }()
  }, {
    key: "DeleteArticle",
    value: function () {
      var _DeleteArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(id, authorId) {
        var values;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                values = [id, authorId];
                _context4.next = 3;
                return _DB["default"].query('DELETE FROM articles WHERE articleid = $1 AND authorid = $2', values)["catch"](function (error) {
                  throw new Error(error.message);
                });

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function DeleteArticle(_x7, _x8) {
        return _DeleteArticle.apply(this, arguments);
      }

      return DeleteArticle;
    }()
  }, {
    key: "getAllArticles",
    value: function () {
      var _getAllArticles = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _DB["default"].query('SELECT * FROM articles ORDER BY articleid DESC', '', true)["catch"](function (error) {
                  throw new Error(error.message);
                });

              case 2:
                response = _context5.sent;
                return _context5.abrupt("return", response);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getAllArticles() {
        return _getAllArticles.apply(this, arguments);
      }

      return getAllArticles;
    }()
  }, {
    key: "getSpecificArticle",
    value: function () {
      var _getSpecificArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(id) {
        var value, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                value = [id];
                _context6.next = 3;
                return _DB["default"].query('SELECT * FROM articles WHERE articleid = $1', value)["catch"](function (error) {
                  throw new Error(error.message);
                });

              case 3:
                response = _context6.sent;

                if (response) {
                  _context6.next = 6;
                  break;
                }

                throw new _errorhandler["default"]('Article not found', 404);

              case 6:
                return _context6.abrupt("return", response);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getSpecificArticle(_x9) {
        return _getSpecificArticle.apply(this, arguments);
      }

      return getSpecificArticle;
    }()
  }]);

  return CreateArticle;
}();

var _default = CreateArticle;
exports["default"] = _default;