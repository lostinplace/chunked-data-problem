'use strict';

var chunkProcessor = require('../ugly-chunk-processor'),
  sinon = require('sinon'),
  _ = require('lodash');
require('should');

describe('Chunk Processor', function(){
  var simpleObject = { prop : 'test'},
    complexObject = {
      'a' : 1,
      'b' : ' { "a": "2" , b2: [ true, false, true] }',
      'c' : {
        x : true,
        y : false,
        e : null
      },
      d : [
        1,
        2,
        {
          r: true,
          s: 1
        },
        null
      ]
    },
    simpleObjectString,
    complexObjectString;

  function generateObjectEqualityChecker(anObject, aCallback){
    return function(result){
      JSON.parse(result).should.eql(anObject);
      aCallback();  
    };
  }

  beforeEach(function(done){
    simpleObjectString = JSON.stringify(simpleObject);
    complexObjectString = JSON.stringify(complexObject);
    chunkProcessor.flush();
    done();
  });

  it('should correctly report a simple json string', function(done){
    chunkProcessor.processChunk(simpleObjectString, generateObjectEqualityChecker(simpleObject,done));
  });

  it('should correctly report a complex json string', function(done){
    chunkProcessor.processChunk(complexObjectString, generateObjectEqualityChecker(complexObject,done));
  });


  describe('chunk size tests', function(){
    it('should be able to correctly report when I send it the complex string 1 character at a time', function(done){
      var equalityChecker = generateObjectEqualityChecker(complexObject, done);
      for(var i = 0; i< complexObjectString.length;i++){
        chunkProcessor.processChunk(complexObjectString[i],equalityChecker);
      }
    });

    it('should only report once per object (not by chunk)', function(done){
      var callbackSpy = sinon.spy();
      for(var i = 0; i< complexObjectString.length;i++){
        chunkProcessor.processChunk(complexObjectString[i],callbackSpy);
      }
      sinon.assert.calledOnce(callbackSpy);
      done();
    });

    it('should indulge me when I send it 3 characters at a time (just for a sanity check)', function(done){
      var equalityChecker = generateObjectEqualityChecker(complexObject, done),
        chunks = complexObjectString.split(/(.{3})/);
      chunks = chunks.filter(function(val){
        return val.length;
      });
      for(var i = 0; i< chunks.length;i++){
        chunkProcessor.processChunk(chunks[i],equalityChecker);
      }
    });
  });

  it('should correctly report one object when I hand it a chunk that specifies a complete object and an incomplete object',function(done){
    var equalityChecker = generateObjectEqualityChecker(simpleObject, done),
      chunk = simpleObjectString + complexObjectString;
    chunk = chunk.substr(0, simpleObjectString.length+5);
    chunkProcessor.processChunk(chunk,equalityChecker);
  });

  it('should correctly report multiple distinct objects when they are provided in a single chunk',function(done){
    var objects = [
        simpleObject,
        _.extend({test: true}, simpleObject),
        _.extend({mariachi: 4}, simpleObject)
      ],
      objectStrings = objects.map(function(val){
        return JSON.stringify(val);
      }),
      chunk = objectStrings.join(''),
      results = [];
    
    chunkProcessor.processChunk(chunk, function(result){
      results.push(result);
    });

    results.map(function(val){
      return JSON.parse(val);
    }).should.eql(objects);
    done();
  });

  it('should strip all of the newlines out before reporting back',function(done){
    /*
    I personally believe that this requirement is silly, but the specification stands: 
    "Line breaks may not appear within an object; they may only be used to separate objects."
    This states pretty explicitly that there can be no content line breaks
    Additionally the process of differentiating content linebreaks from formatter output is non-trivial
    */
    chunkProcessor.processChunk(complexObjectString,function(result){
      result.indexOf('\n').should.equal(-1);
      done();
    });
  });

});