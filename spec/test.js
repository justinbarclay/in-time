var expect = require('chai').expect;
var should = require('chai').should;
var myApp = 'localhost:8888';
var request = require('supertest')(myApp);


/*function hasPreviousAndNextKeys(res) {
    if (!('next' in res.body)) return "missing next key";
    if (!('prev' in res.body)) throw new Error("missing prev key");
    console.log(res.body);
}*/

describe('Testing the login page', function(){
    it('should provide a 404 response', function (done) {
        request.get('/loginz').expect(404).end(function(err, res){
            done();
        });
    });
    it('should provide a GET response of 200', function(done){
      request.get('/').expect(200).end(function(err, res){
        console.log(res.text);
        done();
      });
    });
  });

describe('some second test', function(){
    it('should have a body', function(done){
      request.get('/test').expect(function(res){
        if(!('test' in res.body)) console.log(res.body);
      }).end(done);
    });

});
