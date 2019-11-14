"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _articleController = _interopRequireDefault(require("../controllers/articleController"));

var _jsonWebToken = _interopRequireDefault(require("../middlewares/jsonWebToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = (0, _express.Router)();
route.post('/articles', _jsonWebToken["default"].authenticate, _articleController["default"].createArticle);
route.patch('/articles/:id', _jsonWebToken["default"].authenticate, _articleController["default"].editArticle);
route["delete"]('/articles/:id', _jsonWebToken["default"].authenticate, _articleController["default"].deleteArticle);
route.get('/feed', _jsonWebToken["default"].authenticate, _articleController["default"].getArticles);
route.get('/articles/:id', _jsonWebToken["default"].authenticate, _articleController["default"].getSpecificArticle);
var _default = route;
exports["default"] = _default;