// Copyright (c) 2014. David M. Lee, II
'use strict';

var falafel = require('falafel');
var path = require('path');

var getShortName = function (filename) {
  var fileSegment = path.basename(filename, '.js');
  if (fileSegment === 'index') {
    // prepend the last path segment for index.js files
    fileSegment = path.basename(path.dirname(filename)) + '$' + fileSegment;
  }
  fileSegment = fileSegment.replace(/[^0-9A-Z_$]/ig, '_');
  return fileSegment;
};

var getName = function (node) {
  switch (node.type) {
  case 'MemberExpression':
    return node.property.name;
  case 'Identifier':
    return node.name;
  default:
    console.log('Unknown expression type', type);
    return null;
  }
};

module.exports.insertNames = function (source, filename) {
  var originalSource = source;
  var shebangLine = '';
  try {
    if (source[0] === '#' && source[1] === '!') {
      shebangLine = source.substring(0, source.indexOf('\n') + 1);
      source = source.substring(source.indexOf('\n') + 1);
    }

    return shebangLine + falafel(source, {loc: true}, function (node) {
      var name;

      if (node.type === 'FunctionExpression') {
        if (!node.id) {
          switch (node.parent.type) {
          case 'VariableDeclarator':
            name = node.parent.id.name;
            break;
          case 'Property':
            name = node.parent.key.name;
            break;
          case 'AssignmentExpression':
            name = getName(node.parent.left);
            break;
          default:
            name = getShortName(filename) + '$' + node.loc.start.line;
            break;
          }

          if (name) {
            if (!name.match(/^[$A-Z_][0-9A-Z_$]*$/i)) {
              throw new Error('Invalid function name: ' + name);
            }
            return node.update(node.source().replace('function', 'function anon$' + name));
          }
        }
      }
    }).toString();
  } catch (err) {
    /* TODO - add a debug flag to log these errors
    console.error('Parse error in:', filename, err, err.stack);
    Object.keys(err).forEach(function (key) {
      console.log(key, err[key]);
    });
     */
    return originalSource;
  }
};
