import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';
const url = '/api/v1/auth'
chai.use(chaiHttp);

mocha.describe('EMPLOYEE AUTHENTICATION TESTS', () => {
    mocha.describe('Admin can create user account', () => {
        xit('POST /api/v1/auth/create-user', (done) => {
            chai.request(server).post(`${url}/create-user`).send({
                    email: 'admin@gmail.com',
                    password: 'adminpassword',
                    jobrole: 'admin'
                })
                .then(response => {
                    chai.expect(response.body).to.have.property('status');
                    chai.expect(response.body).to.have.property('data');
                    const data = response.body.data;
                    chai.expect(data).to.have.property('token');
                    chai.expect(data).to.have.property('userId');
                    chai.expect(data.message).to.eql('user account successfully created');
                    done()
                }).catch(error => done(error))
        })
    })

    mocha.describe('POST /api/v1/auth/signin', () => {
        it('Admin/employee can sign in', (done) => {
            chai.request(server).post(`${url}/signin`).send({
                    email: 'admin@gmail.com',
                    password: 'adminpassword'
                })
                .then(response => {
                    chai.expect(response.body).to.have.property('data');
                    const {
                        data
                    } = response.body;
                    chai.expect(data).to.have.property('token');
                    chai.expect(data).to.have.property('userId');
                    done();
                }).catch(error => done(error));
        })

        it('Throw error if user cannot sign in', (done) => {
            chai.request(server).post(`${url}/signin`).send({
                    email: 'admin2@gmail.com',
                    password: 'adminPassword'
                })
                .then(response => {
                    chai.expect(response.body).to.have.property('error');
                    chai.expect(response.body.error).to.eql('User email not found');
                    done();
                }).catch(error => done(error));
        })
    })
})