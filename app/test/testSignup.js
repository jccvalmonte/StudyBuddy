console.log('starting test');
var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);


describe('Test result for /signup POST REST API', function () {
//  this.timeout(15000);

  var requestResult;
  var response;
  
  // making call to localhost 8080 app list   
  before(function(done) {
    chai.request('http://localhost:8080')
      .post('/signup')
      .send({'email': 'lloyd@l.com', 'firstName':'lloyd', 'lastName':'lopez', 'dob':'04/06/1000', 'username':'lloyd', 'password':'lloyd'})
      .end(function (err, res) {
        response = res;
        console.log(response);
        done();
      });
  });

    it('Should return an array object with more than 1 object', function(done){
    expect(response).to.have.status(200);
    expect(requestResult).to.be.an.object;
    expect(requestResult).to.have.length.above(1);
    //expect(response).to.have.headers;
    done();
  });
  it('The first entry in the array has known properties', function(done){
    expect(requestResult[0]).to.include.property('email');
    done();
  });

  it('The elements in the array have the expected properties', function(done){
    expect(response.body).to.satisfy(
      function (body) {
        for (var i = 0; i < body.length; i++) {
          expect(body[i]).to.have.property('email').that.is.a('string');
          expect(body[i]).to.have.property('firstName').that.is.a('string');
          expect(body[i]).to.have.property('lastName');
          expect(body[i]).to.have.property('dob');
          expect(body[i]).to.have.property('username').that.is.a('string');
        }
        return true;
      });
    done();
  }); 


});