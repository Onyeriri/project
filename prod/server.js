"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _feedbackHandler = _interopRequireDefault(require("./Utils/feedbackHandler"));

var _employeeRoute = _interopRequireDefault(require("./routes/employeeRoute"));

var _gifRoute = _interopRequireDefault(require("./routes/gifRoute"));

var _articleRoute = _interopRequireDefault(require("./routes/articleRoute"));

var _commentRoute = _interopRequireDefault(require("./routes/commentRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use('/api/v1', _employeeRoute["default"]);
app.use('/api/v1', _gifRoute["default"]);
app.use('/api/v1', _articleRoute["default"]);
app.use('/api/v1', _commentRoute["default"]);
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  next();
});
app.use(_feedbackHandler["default"].error);
app.listen(3000, function () {
  console.log('app is running on port 3000');
});
var _default = app;
exports["default"] = _default;