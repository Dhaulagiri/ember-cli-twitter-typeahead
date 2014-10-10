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

test('it gives suggestions', function() {
  expect(1);

  visit('/');

  andThen(function() {
    var typeahead = $(".tt-input");
    typeahead.val("te");
    typeahead.trigger("input");
    ok($(".tt-suggestion").length === 4);
  });
});

test('it does not give incorrect suggestions', function() {
  expect(1);

  visit('/');

  andThen(function() {
    var typeahead = $(".tt-input");
    typeahead.val("test1");
    typeahead.trigger("input");
    ok($(".tt-suggestion").length === 2);
  });
});

test('it displays the empty template when there are no options', function() {
  expect(1);

  visit('/');

  andThen(function() {
    var typeahead = $(".tt-input");
    typeahead.val("notanoption");
    typeahead.trigger("input");
    ok($(".tt-suggestion").text() === "Empty");
  });
});

test('it displays the footer at the bottom of the suggestions', function() {
  expect(1);

  visit('/');

  andThen(function() {
    var typeahead = $(".tt-input");
    typeahead.val("te");
    typeahead.trigger("input");
    ok($(".tt-suggestion:last").text() === "Footer");
  });
});

test('hitting tab selects the next response', function() {
  expect(1);

  visit('/');

  andThen(function() {
    var typeahead = $(".tt-input");
    typeahead.val("te");
    typeahead.trigger("input");
    var e = $.Event('keydown');
    e.keyCode= 9;
    typeahead.trigger(e);
    ok(typeahead.val() === "test1");
  });
});

test('hitting right selects the next response', function() {
  expect(1);

  visit('/');

  andThen(function() {
    var typeahead = $(".tt-input");
    typeahead.val("te");
    typeahead.trigger("input");
    var e = $.Event('keydown');
    e.keyCode= 39;
    typeahead.trigger(e);
    ok(typeahead.val() === "test1");
  });
});

test('hitting down iterates through the responses', function() {
  expect(2);

  visit('/');

  andThen(function() {
    var typeahead = $(".tt-input");
    typeahead.val("te");
    typeahead.trigger("input");
    var e = $.Event('keydown');
    e.keyCode= 40;
    typeahead.trigger(e);
    ok(typeahead.val() === "test1");

    typeahead.trigger(e);
    ok(typeahead.val() === "test2");
  });
});
