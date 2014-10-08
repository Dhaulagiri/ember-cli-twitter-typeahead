'use strict';

var path = require("path");
var fs = require("fs");

function EmberCLITwitterTypeahead(project) {
    this.project = project;
    this.name    = 'Ember CLI Twitter Typeahead';
}

function unwatchedTree(dir) {
    return {
      read:    function() { return dir; },
      cleanup: function() { }
    };
}

EmberCLITwitterTypeahead.prototype.treeFor = function treeFor(name) {
  var treePath =  path.join('node_modules', 'ember-cli-twitter-typeahead', name + '-addon');

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

module.exports = EmberCLITwitterTypeahead;
