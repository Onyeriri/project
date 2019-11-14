"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var config = {};

switch (process.env.NODE_ENV) {
  case 'production':
    config.DB = process.env.DATABASE_URL;
    config.PORT = process.env.PORT;
    break;

  case 'development':
    config.DB = process.env.DB_CONFIG;
    config.PORT = process.env.PORT;
    break;

  default:
    config.DB = process.env.DB_CONFIG;
    config.PORT = process.env.PORT || 3000;
    break;
}

var _default = config;
exports["default"] = _default;