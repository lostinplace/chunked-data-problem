'use strict';

var http = require('http'),
  tmpObject = null,
  END_OF_OBJECT_IDENTIFIER = '}',
  cache = '',
  options = {
    hostname: 'localhost',
    port: 8001,
    path: '/',
    method: 'GET'
  };

  function processChunk(chunk){
    var potentialParts = chunk.split(END_OF_OBJECT_IDENTIFIER);

    for (var i = 0; i< potentialParts.length; i++) {
      var isLastItem = i===potentialParts.length-1;
      cache += (potentialParts[i] + (isLastItem ? '': '}') );
      try{
        tmpObject = JSON.parse(cache);
        console.log(tmpObject);
        cache = '';
      } catch(exception){

      } 
    }
  }

  http.get(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', processChunk);
  });