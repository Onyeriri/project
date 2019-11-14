"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _commentController = _interopRequireDefault(require("../controllers/commentController"));

var _jsonWebToken = _interopRequireDefault(require("../middlewares/jsonWebToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = (0, _express.Router)();
route.post('/articles/:id/comment', _jsonWebToken["default"].authenticate, _commentController["default"].createCommentArticle);
route.post('/gifs/:id/comment', _jsonWebToken["default"].authenticate, _commentController["default"].createCommentGif);
var _default = route;
exports["default"] = _default;