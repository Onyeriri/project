import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import server from '../server';
import path from 'path';

const url = '/api/v1/'
chai.use(chaiHttp);
const employee = {}
const article = {};
const gif = {};

mocha.describe('EMPLOYEE CREATE GIF POST', () => {
    mocha.before('Create a new employee', (done) => {
        chai
            .request(server)
            .post(`${url}/auth/create-user`)
            .send({
                email: 'viktorArticleComment@gmail.com',
                password: 'viktor',
                jobrole: 'admin'
            })
            .then(res => {
                const {
                    data
                } = res.body;
                employee.token = data.token;
            }).catch(error => done(error))
            .then(() => {
                chai.request(server)
                    .post(`${url}/articles`)
                    .auth(employee.token, {
                        type: 'bearer'
                    })
                    .send({
                        title: 'another article',
                        article: 'a fresh article'
                    })
                    .then(response => {
                        const {
                            data
                        } = response.body;
                        article.id = data.articleid;
                    }).catch(error => done(error));
            })
            .then(() => {
                chai.request(server)
                    .post(`${url}/gifs`)
                    .auth(employee.token, {
                        type: 'bearer'
                    })
                    .field('title', 'gif to comment on')
                    .attach('image', fs.readFileSync(path.resolve(__dirname, './image/giphy.gif')), 'giphy.gif')
                    .then(response => {
                        const {
                            data
                        } = response.body;
                        gif.id = data.gifid;
                        done()
                    }).catch(error => done(error));
            })
            .catch(error => done(error))
    })

    mocha.describe('Employee can create a comment on an article', () => {
        it('POST /api/v1/articles/comment', (done) => {
            chai
                .request(server)
                .post(`${url}/articles/${article.id}/comment`)
                .auth(employee.token, {
                    type: 'bearer'
                })
                .send({
                    comment: 'My first comment'
                })
                .then(response => {
                    chai.expect(response.body).to.have.property('data');
                    const data = response.body.data;
                    chai.expect(data).to.have.property('article');
                    chai.expect(data).to.have.property('articleTitle');
                    chai.expect(data.message).to.eql('Comment successfully created');
                    done()
                }).catch(error => done(error))
        })
    })

    mocha.describe('Employee can create a comment on a gif post', () => {
        it('PATCH /api/v1/gifs/:gifId', (done) => {
            chai.request(server)
                .post(`${url}/gifs/${gif.id}/comment`)
                .auth(employee.token, {
                    type: 'bearer'
                })
                .send({
                    comment: 'My first gif comment',
                })
                .then(response => {
                    chai.expect(response.body).to.have.property('data');
                    const data = response.body.data;
                    chai.expect(data).to.have.property('gifTitle');
                    chai.expect(data.message).to.eql('comment successfully created');
                    done()
                }).catch(error => done(error))
        })
    })

})