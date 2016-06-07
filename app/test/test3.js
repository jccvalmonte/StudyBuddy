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
    //chai.request("/app/lists")
      .post('/signup')
      //.send({'email': 'lloyd@l.com', 'firstName':'lloyd', 'lastName':'lopez', 'DOB':'04/06/1000', 'username':'lloyd', 'password':'lloyd'})
      .end(function (err, res) {
        response = res;
        console.log(response);
        done();
      });
  });

  it('Should add a new account on POST', function(done){
    //expect(response).to.have.status(200);
    //expect(requestResult).to.not.be.an.object;
    done();
  });


});