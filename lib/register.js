// Copyright (c) 2014. David M. Lee, II
'use strict';

var Module = require('module');
var insertNames = require('../lib/insert-names').insertNames;

module.exports.register = function () {
  var originalLoader = Module._extensions['.js'];

  Module._extensions['.js'] = function (module, filename) {
    var originalCompiler;
    if (!module._compile._natt_patched) {
      originalCompiler = module._compile.bind(module);
      module._compile = function(contents, filename) {
        var annotatedCode = insertNames(contents, filename);
        return originalCompiler(annotatedCode, filename);
      }
      module._compile._natt_patched = true;
    }
    originalLoader(module, filename);
  }
};
