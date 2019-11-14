"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _errorhandler = _interopRequireDefault(require("../ErrorHandler/errorhandler"));

require("dotenv/config");

var _datauri = _interopRequireDefault(require("datauri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var datauri = new _datauri["default"]();

_cloudinary["default"].config(process.env.CLOUDINARY_URL);

var Cloudinary =
/*#__PURE__*/
function () {
  function Cloudinary() {
    _classCallCheck(this, Cloudinary);
  }

  _createClass(Cloudinary, null, [{
    key: "upload",
    value: function upload(req, res, next) {
      try {
        if (req.file.mimetype !== 'image/gif') {
          throw new _errorhandler["default"]('Image is not in gif format', 400);
        }

        var image = datauri.format('gif', req.file.buffer).content;

        _cloudinary["default"].uploader.upload(image).then(function (response) {
          req.url = response.url;
          next();
        })["catch"](function (error) {
          return next(error);
        });
      } catch (error) {
        next(error);
      }
    }
  }]);

  return Cloudinary;
}();

var _default = Cloudinary;
exports["default"] = _default;