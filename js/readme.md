#Instructions

I wrote a node.js script to do parsing of the ugly infinistream

if you have pyenv configured it can manage the pyton version for you

usage is fairly straightforward:

* install dependencies by running npm install (make sure that you're running it from this folder)

    * note that node-gyp installation requires python 2.7, hence the python version file

* run tests (two options)

    * with global mocha (just enter ```mocha``` at command line)

    * or run ```gulp test```

* execute the reader by entering ```node reader.js```,  *make sure the ugly data server is running*


*note that there are no tests for the reader itself because I figured it was a simple enough wrapper for the chunkprocessor and because testing non-module scripts in node is irritating*
