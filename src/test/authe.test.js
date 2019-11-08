import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';
const url = '/api/v1/auth'
chai.use(chaiHttp);

mocha.describe('EMPLOYEE AUTHENTICATION TESTS', () => {
    mocha.describe('Admin can create user account', () => {
        it('POST /api/v1/auth/create-user', (done) => {
            chai.request(server).post(`${url}/create-user`).send({
                    email: 'admin@gmail.com',
                    password: 'adminpassword',
                    jobrole: 'admin'
                })
                .then(response => {
                    chai.expect(response.body).to.have.property('status');
                    chai.expect(response.body).to.have.property('data');
                    const data = response.body.data;
                    console.log('response data', data)

                    chai.expect(data).to.have.property('token');
                    chai.expect(data).to.have.property('userId');
                    chai.expect(data.message).to.eql('user account successfully created');
                    done()
                }).catch(error => done(error))
        })
    })
})