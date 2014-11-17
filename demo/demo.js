// Copyright (c) 2014. David M. Lee, II
'use strict';

/*
 * Quick test to see anonymous function names in the profiler.
 *  1. Run ./bin/natt.js ./demo/demo.js
 *  2. Wait for the Chrome debugger to pop up
 *  3. Wait a few seconds for the app to eat some memory
 *  4. Take a memory snapshot
 *  5. Look for 'ShowsUpInProfiler' objects
 *  6. Expand the object until you see inside the timers that are leaking
 *  7. Marvel at the anonymous function renamed to anon$demo$lineno
 */

// Load up the profiler in Chrome
var agent = require('webkit-devtools-agent');

agent.start();

// Agent doesn't give a callback for when it's done. Just wait a few seconds
// before starting the profiler.
setTimeout(function () {
  require('open')('http://c4milo.github.io/node-webkit-agent/26.0.1410.65/inspector.html?host=localhost:9999&page=0');
}, 3000);

function ShowsUpInProfiler() {
  this.arr = new Array(3000);
  // Leak a closure; then it shows up in the memory profiler
  this.timer = setTimeout(function () {}, 3600);
}

var keep = [];

// Blatantly leak memory
setInterval(function () {
  keep.push(new ShowsUpInProfiler());
}, 100);
