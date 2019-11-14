"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _employeeController = _interopRequireDefault(require("../controllers/employeeController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/auth/create-user', _employeeController["default"].createEmployee);
router.post('/auth/signin', _employeeController["default"].signInEmployee);
var _default = router;
exports["default"] = _default;