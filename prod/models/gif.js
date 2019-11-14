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

var GifModel =
/*#__PURE__*/
function () {
  function GifModel() {
    _classCallCheck(this, GifModel);
  }

  _createClass(GifModel, null, [{
    key: "createGif",
    value: function () {
      var _createGif = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(title, url, authorId) {
        var values, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                values = [title, url, authorId];
                _context.next = 3;
                return _DB["default"].query('INSERT INTO gifs(title, imageurl, authorid) VALUES($1,$2, $3) RETURNING *', values)["catch"](function (error) {
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

      function createGif(_x, _x2, _x3) {
        return _createGif.apply(this, arguments);
      }

      return createGif;
    }()
  }, {
    key: "deleteGif",
    value: function () {
      var _deleteGif = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id, authorId) {
        var values;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                values = [id, authorId];
                _context2.next = 3;
                return _DB["default"].query('DELETE FROM gifs WHERE gifid = $1 AND authorid = $2', values)["catch"](function (error) {
                  throw new Error(error.message);
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function deleteGif(_x4, _x5) {
        return _deleteGif.apply(this, arguments);
      }

      return deleteGif;
    }()
  }, {
    key: "getGif",
    value: function () {
      var _getGif = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(id) {
        var value, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                value = [id];
                _context3.next = 3;
                return _DB["default"].query('SELECT * FROM gifs WHERE gifid = $1', value)["catch"](function (error) {
                  throw new _errorhandler["default"](error.message, 400);
                });

              case 3:
                response = _context3.sent;

                if (response) {
                  _context3.next = 6;
                  break;
                }

                throw new _errorhandler["default"]('Gif does not exist', 404);

              case 6:
                return _context3.abrupt("return", response);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getGif(_x6) {
        return _getGif.apply(this, arguments);
      }

      return getGif;
    }()
  }]);

  return GifModel;
}();

var _default = GifModel;
exports["default"] = _default;