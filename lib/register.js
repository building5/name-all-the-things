// Copyright (c) 2014. David M. Lee, II
'use strict';

var Module = require('module');
var fs = require('fs');
var insertNames = require('../lib/insert-names').insertNames;


module.exports.register = function () {
  var originalLoader = Module._extensions['.js'];

  Module._extensions['.js'] = function (module, filename) {
    var contents = fs.readFileSync(filename, 'utf8');

    // Don't process modules; some of them do evil things.
    // I'm looking at you, node-newrelic.
    // https://github.com/newrelic/node-newrelic/blob/17db4f34f14fc98af2df89cc4113b65a29e15879/lib/instrumentation/connect.js#L119
    if (filename.indexOf('/node_modules/') === -1) {
      contents = insertNames(contents, filename);
    }

    module._compile(contents, filename);
  }
};
