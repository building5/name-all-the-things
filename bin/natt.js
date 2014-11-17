#!/usr/bin/env node

// Copyright (c) 2014. David M. Lee, II
'use strict';

require('../index').register();
var path = require('path');

var args = Array.prototype.slice.call(process.argv, 2);
var arg;
var script;

var printUsage = function () {
  console.log('usage: natt [script] [script-args]');
};

while (args) {
  arg = args.shift();
  if (arg === '--') {
    break;
  }

  if (args[0] !== '-') {
    // not an argument; it must be the script
    script = arg;
    break;
  }

  switch (args[0]) {
  case '--help':
  case '-?':
    printUsage();
    process.exit(0);
    break;
  default:
    console.error('natt: unrecognized option: ' + arg);
    process.exit(1);
  }

}

if (!script) {
  printUsage();
  process.exit(1);
}

// Put 'node script' back into the args array and patch it in
args.unshift(script);
args.unshift('node');
process.argv = args;

// Find the require path for the script
if (script[0] !== '/') {
  script = path.join(process.cwd(), script);
}

// Run it
require(script);
