'use strict';
var tmpObject = null,
  END_OF_OBJECT_IDENTIFIER = '}',
  cache = '';

function processChunk(chunk){
  var potentialEndings = chunk.split(END_OF_OBJECT_IDENTIFIER),
  isLastItem = null;

  for (var i = 0; i < potentialEndings.length; i++) {
    isLastItem = i===potentialEndings.length-1;
    cache += (potentialEndings[i] + (isLastItem ? '': '}') );
    try{
      tmpObject = JSON.parse(cache);
      console.log(tmpObject);
      cache = '';
    } catch(exception){}
  }
}

module.exports = processChunk;