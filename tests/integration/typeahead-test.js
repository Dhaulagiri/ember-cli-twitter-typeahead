import startApp from "ember-cli-twitter-typeahead/tests/helpers/start-app";
import Ember from 'ember';

var App;

module('integration:typeahead', {
    setup: function() { App = startApp(); },
    teardown: function() { Ember.run(App, App.destroy); }
});

test('shows the typeahead input box', function() {
  expect(1);

  visit('/');

  andThen(function() {
    ok($(".tt-input").length);
  });
});
