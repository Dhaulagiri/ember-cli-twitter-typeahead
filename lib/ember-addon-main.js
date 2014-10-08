'use strict';

var path = require("path");
var fs = require("fs");

function EmberCLIFSTypeahead(project) {
    this.project = project;
    this.name    = 'Ember CLI Frontside Typeahead';
}

function unwatchedTree(dir) {
    return {
      read:    function() { return dir; },
      cleanup: function() { }
    };
}

EmberCLIFSTypeahead.prototype.treeFor = function treeFor(name) {
  var treePath =  path.join('node_modules', 'fs-ember-cli-typeahead', name + '-addon');

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

module.exports = EmberCLIFSTypeahead;
