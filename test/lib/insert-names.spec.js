// Copyright (c) 2014. David M. Lee, II
'use strict';

var expect = require('code').expect;
var insertNames = require('../../lib/insert-names').insertNames;

describe('insert-names', function () {
  describe('test cases', function () {
    var testCases = [
      {
        input: 'var foo = function() {}',
        expected: 'var foo = function anon$foo() {}'
      }, {
        input: 'var o = { bar: function() {} }',
        expected: 'var o = { bar: function anon$bar() {} }'
      }, {
        input: 'doSomething(function() {})',
        expected: 'doSomething(function anon$test$1() {})',
        file: '/some/path/to/test.js'
      }, {
        input: '// multi line\n// code\ndoSomething(function() {})',
        expected: '// multi line\n// code\ndoSomething(function anon$test$3() {})',
        file: '/some/path/to/test.js'
      }, {
        input: 'doSomething(function() {})',
        expected: 'doSomething(function anon$module$index$1() {})',
        file: '/some/path/to/module/index.js'
      }, {
        input: 'module.exports.foo = function() {};',
        expected: 'module.exports.foo = function anon$foo() {};'
      }, {
        input: 'module.exports.foo = foo = function() {};',
        expected: 'module.exports.foo = foo = function anon$foo() {};'
      }, {
        input: 'var foo = module.exports.foo = function() {};',
        expected: 'var foo = module.exports.foo = function anon$foo() {};'
      }, {
        input: 'foo = function() {};',
        expected: 'foo = function anon$foo() {};'
      }, {
        // don't change strings within the function block
        input: 'foo = function() {"function() {}";};',
        expected: 'foo = function anon$foo() {"function() {}";};'
      }, {
        // support for shebang
        input: '#!/usr/bin/env node\nfoo = function() {};',
        expected: '#!/usr/bin/env node\nfoo = function anon$foo() {};'
      }, {
        // ultra one liners
        input: '(function() { return function() {}; })()()',
        expected: '(function anon$test$1() { return function anon$test$1() {}; })()()'
      }
    ];

    testCases.forEach(function (testCase) {
      var name = testCase.input;
      var newline = name.indexOf('\n');
      if (newline != -1) {
        name = name.substring(0, newline);
      }
      it(name, function () {
        var actual = insertNames(testCase.input, testCase.file || '/test.js');
        expect(actual).to.equal(testCase.expected);
      });
    });
  });

  describe('things that should not change', function () {
    var testCases = [
      'function foo() {}',
      'var foo = function foo() {}',
      'var o = { bar: function bar() {} }',
      'doSomething(function thing() {})'
    ];

    testCases.forEach(function (testCase) {
      it(testCase, function () {
        var actual = insertNames(testCase, 'test');
        expect(actual).to.equal(testCase);
      });
    });
  });
});
