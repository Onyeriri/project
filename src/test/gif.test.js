import mocha, { it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import path from 'path';

import server from '../server';

const url = '/api/v1/';
chai.use(chaiHttp);
const employee = {};
const gif = {};

mocha.describe('EMPLOYEE GIF POSTS', () => {
  mocha.before('Create a new employee', (done) => {
    chai
      .request(server)
      .post(`${url}/auth/create-user`)
      .send({
        email: 'viktor@gmail.com',
        password: 'viktor',
        jobrole: 'Programmer',
      })
      .then((res) => {
        const { data } = res.body;
        employee.token = data.token;
        done();
      })
      .catch((error) => done(error));
  });

  mocha.describe('Employee can create a gif post', () => {
    it('POST /api/v1/gifs', (done) => {
      chai
        .request(server)
        .post(`${url}/gifs`)
        .auth(employee.token, {
          type: 'bearer',
        })
        .field('title', 'new gif post')
        .attach(
          'image',
          fs.readFileSync(path.resolve(__dirname, './image/giphy.gif')),
          'giphy.gif',
        )
        .then((response) => {
          chai.expect(response.body).to.have.property('status');
          chai.expect(response.body).to.have.property('data');
          const { data } = response.body;
          chai.expect(data).to.have.property('imageurl');
          chai.expect(data).to.have.property('gifid');
          chai.expect(data.message).to.eql('GIF image successfully posted');
          gif.id = data.gifid;
          done();
        })
        .catch((error) => done(error));
    });
  });

  mocha.describe('Employee can view a specific gif post', () => {
    it('GET /api/v1/gifs/gifId', (done) => {
      chai
        .request(server)
        .get(`${url}/gifs/${gif.id}`)
        .auth(employee.token, {
          type: 'bearer',
        })
        .then((response) => {
          const { data } = response.body;
          chai.expect(data).to.have.property('comments');
          chai.expect(data.comments).to.be.an('array');
          done();
        })
        .catch((error) => done(error));
    });
  });

  mocha.describe('Employee can delete a gif post', () => {
    it('DELETE /api/v1/gifs/gifId', (done) => {
      chai
        .request(server)
        .delete(`${url}/gifs/${gif.id}`)
        .auth(employee.token, {
          type: 'bearer',
        })
        .then((response) => {
          const { data } = response.body;
          chai.expect(data.message).to.eql('gif post successfully deleted');
          done();
        })
        .catch((error) => done(error));
    });
  });
});
