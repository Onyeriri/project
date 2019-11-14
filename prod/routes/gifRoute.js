"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _gifController = _interopRequireDefault(require("../controllers/gifController"));

var _cloudinary_config = _interopRequireDefault(require("../middlewares/cloudinary_config"));

var _jsonWebToken = _interopRequireDefault(require("../middlewares/jsonWebToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storage = _multer["default"].memoryStorage();

var upload = (0, _multer["default"])({
  storage: storage
}).single('image');
var route = (0, _express.Router)();
route.post('/gifs', _jsonWebToken["default"].authenticate, upload, _cloudinary_config["default"].upload, _gifController["default"].createGif);
route["delete"]('/gifs/:id', _jsonWebToken["default"].authenticate, _gifController["default"].deleteGif);
route.get('/gifs/:id', _jsonWebToken["default"].authenticate, _gifController["default"].getSpecificGif);
var _default = route;
exports["default"] = _default;