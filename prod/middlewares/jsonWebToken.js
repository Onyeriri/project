"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("dotenv/config");

var _errorhandler = _interopRequireDefault(require("../ErrorHandler/errorhandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JWT =
/*#__PURE__*/
function () {
  function JWT() {
    _classCallCheck(this, JWT);
  }

  _createClass(JWT, null, [{
    key: "generateToken",
    value: function generateToken(payload) {
      return _jsonwebtoken["default"].sign(payload, process.env.JWT_SECRET);
    }
  }, {
    key: "authenticate",
    value: function authenticate(req, res, next) {
      try {
        if (!req.headers.authorization) {
          throw new _errorhandler["default"]('Invalid header authorization', 404);
        }

        var token = req.headers.authorization.split(' ')[1];

        _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, function (err, response) {
          if (err) {
            throw new _errorhandler["default"]('No token is provided', 401);
          }

          req.auth = response;
          next();
        });
      } catch (error) {
        next(error);
      }
    }
  }]);

  return JWT;
}();

var _default = JWT;
exports["default"] = _default;