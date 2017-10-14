#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var hookInputPath = 'misc/validate-commit.js';
var hookOutputPath = '.git/hooks';
var hookOutputFile = hookOutputPath + '/commit-msg';
var mode = '0755';

function mkdirRecursive(fs, dir) {
  var current = '';

  dir.split('/').forEach(function(path) {
    current += (current.length > 0  ? '/' : '') + path;

    if ( !fs.existsSync(current) ) {
      fs.mkdirSync(current, mode);
    }
  });
}

if (!fs.existsSync(hookOutputFile)) {
  mkdirRecursive(fs, hookOutputPath);
  fs.writeFileSync(hookOutputFile, fs.readFileSync(hookInputPath));
  fs.chmodSync(hookOutputFile, mode);
}
