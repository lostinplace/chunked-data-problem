'use strict';

var http = require('http'),
  chunkProcessor = require('./ugly-chunk-processor'),
  requestOptions = {
    hostname: 'localhost',
    port: 8001,
    path: '/',
    method: 'GET'
  },
  chunkResult;

http.get(requestOptions, function(res) {
  res.setEncoding('utf8');
  res.on('data', function(chunk){
    chunkProcessor.processChunk(chunk, console.log);
  });
});