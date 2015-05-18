# name all the things

## v0.2.1 (2015-05-18)

 * Disable the processing of modules, which might do [evil things][] like call
   `.toString()` on a function and make assumptions about the resulting string.
   Granted, your application code could be evil, too. But you can change your
   ways. You can't control what your modules do.

 [evil things]: https://github.com/newrelic/node-newrelic/blob/17db4f34f14fc98af2df89cc4113b65a29e15879/lib/instrumentation/connect.js#L119-L126

## v0.2.0 (2015-05-15)

 * Added `register` module for tools like [mocha](http://mochajs.org/#require-option)

## v0.1.2 (2014-05-06)

 * Corrected docs

## v0.1.1 (2014-11-17)

 * Corrected project metadata

## v0.1.0 (2014-11-17)

 * Initial Release
