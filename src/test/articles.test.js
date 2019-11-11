import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';

import server from '../server';
const url = '/api/v1/'
chai.use(chaiHttp);
const employee = {}

mocha.describe('EMPLOYEE CREATE GIF POST', () => {
    mocha.before('Create a new employee', (done) => {
        chai.request(server).post(`${url}/auth/create-user`).send({
                email: 'viktorArticle@gmail.com',
                password: 'viktor',
                jobrole: 'Programmer'
            })
            .then(res => {
                const {
                    data
                } = res.body;
                employee.token = data.token;
                done()
            }).catch(error => done(error))
    })

    mocha.describe('Employee can create an article', () => {
        it('POST /api/v1/articles', (done) => {
            chai
                .request(server)
                .post(`${url}/articles`)
                .auth(employee.token, {
                    type: 'bearer'
                })
                .send({
                    title: 'My first title',
                    article: 'My first article'
                })
                .then(response => {
                    chai.expect(response.body).to.have.property('data');
                    const data = response.body.data;
                    chai.expect(data).to.have.property('title');
                    chai.expect(data).to.have.property('articleid');
                    chai.expect(data.message).to.eql('Article successfully posted');
                    done()
                }).catch(error => done(error))
        })
    })
})