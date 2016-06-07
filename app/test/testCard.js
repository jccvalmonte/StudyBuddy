console.log('starting test');
var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('Test result for /card/:setIdNum GET REST API', function () {
//  this.timeout(15000);

  var requestResult;
  var response;
  
  //making call to localhost 8080 app list   
  before(function(done) {
    chai.request('http://localhost:8080')
    //chai.request("/app/lists")
      .get('/card/1')
      .end(function (err, res) {
        requestResult = res.body;
        response = res;
        done();
      });
  });

  it('Should return an object', function(done){
    expect(response).to.have.status(200);
    expect(requestResult).to.be.an.object;
    expect(response).to.have.headers;
    done();
  });

  it('The first entry in the array has known properties', function(done){
    expect(requestResult).to.include.property('setIdNum');
    expect(requestResult).to.not.be.a.number;
    done();
  });

  it('The elements in the array have the expected properties', function(done){
    expect(requestResult).to.satisfy(
      function (body) {
        for (var i = 0; i < body.length; i++) {
          expect(body[i]).to.have.property('cardId').that.is.a.number;
          expect(body[i]).to.have.property('front').that.is.a('string');
          expect(body[i]).to.have.property('back').that.is.a('string');
        }
        return true;
      });
    done();
  }); 
});