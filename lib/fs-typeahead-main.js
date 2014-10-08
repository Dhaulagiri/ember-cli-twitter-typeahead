'use strict';

var path = require("path");
var fs = require("fs");

EmberCLIFSTypeahead.prototype.treeFor = function treeFor(name) {
  var treePath =  path.join('node_modules', 'ember-cli-fs-typeahead', name + '-addon');

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

module.exports = EmberCLIFSTypeahead;
