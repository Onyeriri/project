"use strict";

var _mocha = _interopRequireWildcard(require("mocha"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var url = '/api/v1/';

_chai["default"].use(_chaiHttp["default"]);

var employee = {};
var gif = {};

_mocha["default"].describe('EMPLOYEE GIF POSTS', function () {
  _mocha["default"].before('Create a new employee', function (done) {
    _chai["default"].request(_server["default"]).post("".concat(url, "/auth/create-user")).send({
      email: 'viktor@gmail.com',
      password: 'viktor',
      jobrole: 'Programmer'
    }).then(function (res) {
      var data = res.body.data;
      employee.token = data.token;
      done();
    })["catch"](function (error) {
      return done(error);
    });
  });

  _mocha["default"].describe('Employee can create a gif post', function () {
    (0, _mocha.it)('POST /api/v1/gifs', function (done) {
      _chai["default"].request(_server["default"]).post("".concat(url, "/gifs")).auth(employee.token, {
        type: 'bearer'
      }).field('title', 'new gif post').attach('image', _fs["default"].readFileSync(_path["default"].resolve(__dirname, './image/giphy.gif')), 'giphy.gif').then(function (response) {
        _chai["default"].expect(response.body).to.have.property('status');

        _chai["default"].expect(response.body).to.have.property('data');

        var data = response.body.data;

        _chai["default"].expect(data).to.have.property('imageurl');

        _chai["default"].expect(data).to.have.property('gifid');

        _chai["default"].expect(data.message).to.eql('GIF image successfully posted');

        gif.id = data.gifid;
        done();
      })["catch"](function (error) {
        return done(error);
      });
    });
  });

  _mocha["default"].describe('Employee can view a specific gif post', function () {
    (0, _mocha.it)('GET /api/v1/gifs/gifId', function (done) {
      _chai["default"].request(_server["default"]).get("".concat(url, "/gifs/").concat(gif.id)).auth(employee.token, {
        type: 'bearer'
      }).then(function (response) {
        var data = response.body.data;

        _chai["default"].expect(data).to.have.property('comments');

        _chai["default"].expect(data.comments).to.be.an('array');

        done();
      })["catch"](function (error) {
        return done(error);
      });
    });
  });

  _mocha["default"].describe('Employee can delete a gif post', function () {
    (0, _mocha.it)('DELETE /api/v1/gifs/gifId', function (done) {
      _chai["default"].request(_server["default"])["delete"]("".concat(url, "/gifs/").concat(gif.id)).auth(employee.token, {
        type: 'bearer'
      }).then(function (response) {
        var data = response.body.data;

        _chai["default"].expect(data.message).to.eql('gif post successfully deleted');

        done();
      })["catch"](function (error) {
        return done(error);
      });
    });
  });
});