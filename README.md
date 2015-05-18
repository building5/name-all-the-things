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

## Interop

As of v0.2.1, `name-all-the-things` can work with transpilers like
[babel](http://babeljs.io/). But there are some challenges with that. First, be
sure to register `name-all-the-things` after the other transpiler(s), so that it
can hook into the compiler properly.

Secondly, it is less useful if the transpiler generates its own names on what
would otherwise be anonymous methods. Then the only things left to name are
anonymous callbacks. These are named based on filename/line number, and the line
number injected by `name-all-the-things` will be in the resulting ES5
JavaScript, so the line numbers will be incorrect.
