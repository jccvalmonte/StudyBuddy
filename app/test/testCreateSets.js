console.log('starting test for Creating Set POST REST API');
var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);


describe('Test result for /CreatSet POST REST API', function () {
//  this.timeout(15000);

  var requestResult;
  var response;
  
  // making call to localhost 8080 app list   
  before(function(done) {
    chai.request('http://su-studybuddy.azurewebsites.net')
      .post('/CreateSet')
      .send({'Author': 'Dipali K.', 'Category':'Chinese Learning', 'DateCreated':'6-8-2016', 'Name':'Chinese Words', 'email':'vagal.dipali@gmail.com'})
      .end(function (err, res) {
        response = res;
        done();
      });
  });

    it('Should return an array object with more than 1 object', function(done){
    expect(response).to.have.status(200);
    expect(response).to.have.headers;
    done();
  });

  it('The elements in the array have the expected properties', function(done){
    expect(response.body).to.satisfy(
      function (body) {
        for (var i = 0; i < body.length; i++) {
          expect(body[i]).to.have.property('Author').that.is.a('string');
          expect(body[i]).to.have.property('Category').that.is.a('string');
          expect(body[i]).to.have.property('DateCreated');
          expect(body[i]).to.have.property('Name');
          expect(body[i]).to.have.property('email').that.is.a('string');
          expect(body[i]).to.have.property('setIdNum').that.is.a('Number');
        }
        return true;
      });
    done();
  }); 


});