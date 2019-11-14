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
var article = {};
var gif = {};

_mocha["default"].describe('EMPLOYEE COMMENT TESTS', function () {
  _mocha["default"].before('Create a new employee', function (done) {
    _chai["default"].request(_server["default"]).post("".concat(url, "/auth/create-user")).send({
      email: 'viktorArticleComment@gmail.com',
      password: 'viktor',
      jobrole: 'admin'
    }).then(function (res) {
      var data = res.body.data;
      employee.token = data.token;
    })["catch"](function (error) {
      return done(error);
    }).then(function () {
      _chai["default"].request(_server["default"]).post("".concat(url, "/articles")).auth(employee.token, {
        type: 'bearer'
      }).send({
        title: 'another article',
        article: 'a fresh article'
      }).then(function (response) {
        var data = response.body.data;
        article.id = data.articleid;
      })["catch"](function (error) {
        return done(error);
      });
    }).then(function () {
      _chai["default"].request(_server["default"]).post("".concat(url, "/gifs")).auth(employee.token, {
        type: 'bearer'
      }).field('title', 'gif to comment on').attach('image', _fs["default"].readFileSync(_path["default"].resolve(__dirname, './image/giphy.gif')), 'giphy.gif').then(function (response) {
        var data = response.body.data;
        gif.id = data.gifid;
        done();
      })["catch"](function (error) {
        return done(error);
      });
    })["catch"](function (error) {
      return done(error);
    });
  });

  _mocha["default"].describe('Employee can create a comment on an article', function () {
    (0, _mocha.it)('POST /api/v1/articles/comment', function (done) {
      _chai["default"].request(_server["default"]).post("".concat(url, "/articles/").concat(article.id, "/comment")).auth(employee.token, {
        type: 'bearer'
      }).send({
        comment: 'My first comment'
      }).then(function (response) {
        _chai["default"].expect(response.body).to.have.property('data');

        var data = response.body.data;

        _chai["default"].expect(data).to.have.property('article');

        _chai["default"].expect(data).to.have.property('articleTitle');

        _chai["default"].expect(data.message).to.eql('Comment successfully created');

        done();
      })["catch"](function (error) {
        return done(error);
      });
    });
  });

  _mocha["default"].describe('Employee can create a comment on a gif post', function () {
    (0, _mocha.it)('PATCH /api/v1/gifs/:gifId', function (done) {
      _chai["default"].request(_server["default"]).post("".concat(url, "/gifs/").concat(gif.id, "/comment")).auth(employee.token, {
        type: 'bearer'
      }).send({
        comment: 'My first gif comment'
      }).then(function (response) {
        _chai["default"].expect(response.body).to.have.property('data');

        var data = response.body.data;

        _chai["default"].expect(data).to.have.property('gifTitle');

        _chai["default"].expect(data.message).to.eql('comment successfully created');

        done();
      })["catch"](function (error) {
        return done(error);
      });
    });
  });
});