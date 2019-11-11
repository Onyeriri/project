import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';
const url = '/api/v1/'
chai.use(chaiHttp);
const employee = {}
const article = {};

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
                    article.id = data.articleid;
                    done()
                }).catch(error => done(error))
        })
    })

    mocha.describe('Employee can edit an article', () => {
        it('PATCH /api/v1/articles/:articleId', (done) => {
            chai.request(server)
                .patch(`${url}/articles/${article.id}`)
                .auth(employee.token, {
                    type: 'bearer'
                })
                .send({
                    title: 'I have edited this title',
                    'article': 'I have edited this article'
                })
                .then(response => {
                    chai.expect(response.body).to.have.property('data');
                    const data = response.body.data;
                    chai.expect(data).to.have.property('title');
                    chai.expect(data).to.have.property('article');
                    chai.expect(data.message).to.eql('Article successfully updated');
                    done()
                }).catch(error => done(error))
        })
    })

    mocha.describe('Employee delete article', () => {
        it('DELETE /api/v1/articles/articleid', (done) => {
            chai.request(server)
                .delete(`${url}/articles/${article.id}`)
                .auth(employee.token, {
                    type: 'bearer'
                })
                .then(response => {
                    const {
                        data
                    } = response.body;
                    console.log('response data', data)
                    chai.expect(data.message).to.eql('Article successfully deleted')
                    done()
                }).catch(error => done(error));
        })
    })
})