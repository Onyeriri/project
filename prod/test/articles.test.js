"use strict";

var _mocha = _interopRequireWildcard(require("mocha"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var url = '/api/v1/';

_chai["default"].use(_chaiHttp["default"]);

var employee = {};
var article = {};

_mocha["default"].describe('EMPLOYEE ARTICLE TESTS', function () {
  _mocha["default"].before('Create a new employee', function (done) {
    _chai["default"].request(_server["default"]).post("".concat(url, "/auth/create-user")).send({
      email: 'viktorArticle@gmail.com',
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

  _mocha["default"].describe('Employee can create an article', function () {
    (0, _mocha.it)('POST /api/v1/articles', function (done) {
      _chai["default"].request(_server["default"]).post("".concat(url, "/articles")).auth(employee.token, {
        type: 'bearer'
      }).send({
        title: 'My first title',
        article: 'My first article'
      }).then(function (response) {
        _chai["default"].expect(response.body).to.have.property('data');

        var data = response.body.data;

        _chai["default"].expect(data).to.have.property('title');

        _chai["default"].expect(data).to.have.property('articleid');

        _chai["default"].expect(data.message).to.eql('Article successfully posted');

        article.id = data.articleid;
        done();
      })["catch"](function (error) {
        return done(error);
      });
    });
  });

  _mocha["default"].describe('Employee can edit an article', function () {
    (0, _mocha.it)('PATCH /api/v1/articles/:articleId', function (done) {
      _chai["default"].request(_server["default"]).patch("".concat(url, "/articles/").concat(article.id)).auth(employee.token, {
        type: 'bearer'
      }).send({
        title: 'I have edited this title',
        article: 'I have edited this article'
      }).then(function (response) {
        _chai["default"].expect(response.body).to.have.property('data');

        var data = response.body.data;

        _chai["default"].expect(data).to.have.property('title');

        _chai["default"].expect(data).to.have.property('article');

        _chai["default"].expect(data.message).to.eql('Article successfully updated');

        done();
      })["catch"](function (error) {
        return done(error);
      });
    });
  });

  _mocha["default"].describe('Employee can view all articles', function () {
    (0, _mocha.it)('GET /feed', function (done) {
      _chai["default"].request(_server["default"]).get("".concat(url, "/feed")).auth(employee.token, {
        type: 'bearer'
      }).then(function (response) {
        var data = response.body.data;

        _chai["default"].expect(data).to.be.an('array');

        done();
      })["catch"](function (error) {
        return done(error);
      });
    });
  });

  _mocha["default"].describe('Employee can view a specific article', function () {
    (0, _mocha.it)('GET /api/v1/articles/articleId', function (done) {
      _chai["default"].request(_server["default"]).get("".concat(url, "/articles/").concat(article.id)).auth(employee.token, {
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

  _mocha["default"].describe('Employee delete article', function () {
    (0, _mocha.it)('DELETE /api/v1/articles/articleid', function (done) {
      _chai["default"].request(_server["default"])["delete"]("".concat(url, "/articles/").concat(article.id)).auth(employee.token, {
        type: 'bearer'
      }).then(function (response) {
        var data = response.body.data;

        _chai["default"].expect(data.message).to.eql('Article successfully deleted');

        done();
      })["catch"](function (error) {
        return done(error);
      });
    });
  });
});