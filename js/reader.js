'use strict';

var http = require('http'),
  chunkProcessor = require('./ugly-chunk-processor'),
  requestOptions = {
    hostname: 'localhost',
    port: 8001,
    path: '/',
    method: 'GET'
  };

http.get(requestOptions, function(res) {
  res.setEncoding('utf8');
  res.on('data', chunkProcessor);
});