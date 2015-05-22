/**
 * index.js
 *
 * Auto-loads all gulp tasks within ./tasks
 *
 */
'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks', { recurse: true });
