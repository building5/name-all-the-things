# Name All The Things

With Node.js, there are several situations in which using anonymous functions is
less than helpful for debugging purposes.

Name All The Things (`name-all-the-things`) is a Node.js require hook which
scans any loaded modules, and inserts a name for any functions that it find. The
function names are meant to be somewhat reasonable.

```JavaScript
// Putting a name on unnamed functions that initialize vars is easy
var foo = function () {};
// becomes var foo = function anon$foo() {};

// Initializing fields is also easy
{
  bar: function () {}
  // becomes bar: function anon$bar() {}
}

// Anonymous functions passed directly in as callbacks can be tricky. These
// are simply given names that indicate the filename and line number
doSomething(someParams, function () {})
// becomes doSomething(someParams, function anon$readme$19() {})
```

## Usage

To use `name-all-the-things` on any Node.js app, install globally and run the
`name-all-the-things` command.

```bash
$ npm i -g name-all-the-things
$ natt app.js
```

To embed `name-all-the-things` in your application, add a call to the
`register()`. Note that this won't be able to instrument anything in this file
itself; just in the modules that are loaded later.

```JavaScript
require('not-named');
require('name-all-the-things').register();
require('gets-named');

var alsoNotNamed = function () {}
```

## Compatibility

This module probably doesn't work with most transpilers, since they are trying
similar but different hackery to get into the require process. But this isn't
very useful with them anyways, since line numbers will be from the generated
JavaScript, so they probably won't line up with the original source.
