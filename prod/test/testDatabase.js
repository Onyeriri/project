"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DB = _interopRequireDefault(require("../DB"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var dropEmpTable = 'DROP TABLE IF EXISTS employees CASCADE';
var employeTable = "CREATE TABLE IF NOT EXISTS employees(\nuserid bigserial NOT NULL,\nemail character varying NOT NULL,\npassword character varying NOT NULL,\naddress character varying,\ngender character varying,\njobrole character varying NOT NULL,\nfirstname character varying(100),\nlastname character varying(100),\ndepartment character varying(100),\nCONSTRAINT employee_pkey PRIMARY KEY(userid)\n)";
var dropArticleTable = 'DROP TABLE IF EXISTS articles CASCADE';
var articleTable = "CREATE TABLE IF NOT EXISTS articles(\narticleid bigserial NOT NULL,\nauthorid bigserial,\ntitle character varying NOT NULL,\narticle character varying NOT NULL,\nCONSTRAINT article_pkey PRIMARY KEY(articleid),\nCONSTRAINT article_id_employee_idfkey FOREIGN KEY(authorid)\nREFERENCES employees\n)";
var dropgifsTable = 'DROP TABLE IF EXISTS gifs CASCADE';
var gifTable = "CREATE TABLE IF NOT EXISTS gifs(\ngifid bigserial NOT NULL,\nauthorid bigserial,\ntitle character varying NOT NULL,\nimageurl character varying NOT NULL,\nCONSTRAINT gif_pkey PRIMARY KEY(gifid),\nCONSTRAINT gif_id_employee_idfkey FOREIGN KEY(authorid)\nREFERENCES employees\n)";
var dropArticleCommentTable = 'DROP TABLE IF EXISTS comments_articles CASCADE';
var commentArticleTable = "CREATE TABLE IF NOT EXISTS comments_articles(\ncommentid bigserial NOT NULL,\nauthorid bigserial,\narticleid bigserial,\ncomment character varying NOT NULL,\nCONSTRAINT comment_article_pkey PRIMARY KEY(commentid),\nCONSTRAINT article_comment_id_employee_idfkey FOREIGN KEY(authorid)REFERENCES employees,\nCONSTRAINT article_comment_id_article_idfkey FOREIGN KEY(articleid)\nREFERENCES articles\n)";
var dropGifCommentTable = 'DROP TABLE IF EXISTS comments_gifs CASCADE';
var gifCommentTable = "CREATE TABLE IF NOT EXISTS comments_gifs(\ncommentid bigserial NOT NULL,\nauthorid bigserial,\ngifid bigserial,\ncomment character varying NOT NULL,\nCONSTRAINT comment_gif_pkey PRIMARY KEY(commentid),\nCONSTRAINT gif_comment_id_employee_idfkey FOREIGN KEY(authorid)\nREFERENCES employees,\nCONSTRAINT gif_comment_id_article_idfkey FOREIGN KEY(gifid)\nREFERENCES gifs\n)";

var Table =
/*#__PURE__*/
function () {
  function Table() {
    _classCallCheck(this, Table);
  }

  _createClass(Table, null, [{
    key: "createTables",
    value: function () {
      var _createTables = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _DB["default"].query(dropGifCommentTable);

              case 2:
                _context.next = 4;
                return _DB["default"].query(dropArticleCommentTable);

              case 4:
                _context.next = 6;
                return _DB["default"].query(dropgifsTable);

              case 6:
                _context.next = 8;
                return _DB["default"].query(dropArticleTable);

              case 8:
                _context.next = 10;
                return _DB["default"].query(dropEmpTable);

              case 10:
                _context.next = 12;
                return _DB["default"].query(employeTable);

              case 12:
                _context.next = 14;
                return _DB["default"].query(gifTable);

              case 14:
                _context.next = 16;
                return _DB["default"].query(articleTable);

              case 16:
                _context.next = 18;
                return _DB["default"].query(commentArticleTable);

              case 18:
                _context.next = 20;
                return _DB["default"].query(gifCommentTable);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createTables() {
        return _createTables.apply(this, arguments);
      }

      return createTables;
    }()
  }]);

  return Table;
}();

var _default = Table.createTables()["catch"](function (error) {
  return console.log('error', error);
});

exports["default"] = _default;