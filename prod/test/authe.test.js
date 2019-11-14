"use strict";

var _mocha = _interopRequireWildcard(require("mocha"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var url = '/api/v1/auth';

_chai["default"].use(_chaiHttp["default"]);

_mocha["default"].describe('EMPLOYEE AUTHENTICATION TESTS', function () {
  _mocha["default"].describe('Admin can create user account', function () {
    (0, _mocha.it)('POST /api/v1/auth/create-user', function (done) {
      _chai["default"].request(_server["default"]).post("".concat(url, "/create-user")).send({
        email: 'admin@gmail.com',
        password: 'adminpassword',
        jobrole: 'admin'
      }).then(function (response) {
        _chai["default"].expect(response.body).to.have.property('status');

        _chai["default"].expect(response.body).to.have.property('data');

        var data = response.body.data;

        _chai["default"].expect(data).to.have.property('token');

        _chai["default"].expect(data).to.have.property('userId');

        _chai["default"].expect(data.message).to.eql('user account successfully created');

        done();
      })["catch"](function (error) {
        return done(error);
      });
    });
  });

  _mocha["default"].describe('POST /api/v1/auth/signin', function () {
    (0, _mocha.it)('Admin/employee can sign in', function (done) {
      _chai["default"].request(_server["default"]).post("".concat(url, "/signin")).send({
        email: 'admin@gmail.com',
        password: 'adminpassword'
      }).then(function (response) {
        _chai["default"].expect(response.body).to.have.property('data');

        var data = response.body.data;

        _chai["default"].expect(data).to.have.property('token');

        _chai["default"].expect(data).to.have.property('userId');

        done();
      })["catch"](function (error) {
        return done(error);
      });
    });
    (0, _mocha.it)('Throw error if user cannot sign in', function (done) {
      _chai["default"].request(_server["default"]).post("".concat(url, "/signin")).send({
        email: 'admin2@gmail.com',
        password: 'adminPassword'
      }).then(function (response) {
        _chai["default"].expect(response.body).to.have.property('error');

        _chai["default"].expect(response.body.error).to.eql('User email not found');

        done();
      })["catch"](function (error) {
        return done(error);
      });
    });
  });
});