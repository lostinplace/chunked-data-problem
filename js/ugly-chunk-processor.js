'use strict';
var END_OF_OBJECT_IDENTIFIER = '}',
  cache='',
  thisModule={
    processChunk: function(chunk, callback){
      var potentialEndings = chunk.split(END_OF_OBJECT_IDENTIFIER),
      tmpObject,
      lastIndex = potentialEndings.length-1,
      isLastItem,
      objectString;

      for (var i = 0; i < potentialEndings.length; i++) {
        isLastItem = i===lastIndex;
        cache += (potentialEndings[i] + (isLastItem ? '': '}') );
        try {
          tmpObject = JSON.parse(cache);
          objectString = JSON.stringify(tmpObject);
          objectString = objectString.replace(/\n/g,'');
          thisModule.flush();
          callback(objectString);
        } catch(exception) { 
          //I really dislike the try/catch method, but no one has a really great way to validate 
          //JSON without recursive regex, and I didn't feel like writing PCRE
        }
      }
    },
    flush : function(){
      cache = '';
    }
  };

module.exports = thisModule;