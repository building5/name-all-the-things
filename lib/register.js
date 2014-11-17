// Copyright (c) 2014. David M. Lee, II
'use strict';

var Module = require('module');
var fs = require('fs');
var insertNames = require('../lib/insert-names').insertNames;

var originalLoader = Module._extensions['.js'];

module.exports.register = function () {
  Module._extensions['.js'] = function (module, filename) {
    var fileContents = fs.readFileSync(filename, 'utf8');
    var annotatedCode = insertNames(fileContents, filename);
    module._compile(annotatedCode, filename);
  }
};
