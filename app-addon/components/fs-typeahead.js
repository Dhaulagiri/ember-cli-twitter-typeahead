import Ember from "ember";

/**
 * Usage:
 * 
 * {{type-ahead
 * 
 * filterContent=filterContentFn
 * displayKey="somePropertyToDisplayStuff"
 * valueToken="somePropertyToFilterOn"
 * footerTemplate=somePropertyThatMapsToHandlebarsFunction
 * emptyTemplate=somePropertyThatMapsToHandlebarsFunction
 * on-select-without-match="someActionNameToHandleWhenThereIsn'tAMatchInTheList"
 * 
 * }}
 */

export default Ember.TextField.extend({
  intitializeTypeahead: Ember.observer(function(){
    Ember.run.scheduleOnce('afterRender', this, '_initializeTypeahead');
  }).on('didInsertElement'),

    classNames: [ 'form-control' ],

  _validateEmail: function(email){
    var emailRegex = /\S+@\S+\.\S+/;
    return !!(email && emailRegex.test(email));
  },

  keyUp: function(event){
    if (event.which === 13){
      var $dropdownMenu = this.$().siblings('.tt-dropdown-menu');
      var $suggestions = $dropdownMenu.find('.tt-suggestion:not(.enter-suggest)');
      if ($suggestions.length) {
        $suggestions.first().click();
      } else {
        this.sendAction('on-select-without-match', this, this.$().val());
      }
    }
  },

  _filterContent: function(query){
    var regex = new RegExp(query, 'i');
    var valueKey = this.get('valueToken');
    return this.get('content').filter(function(thing){
      return regex.test(Ember.get(thing, valueKey));
    });
  },

  _initializeTypeahead: function(){
    this.$().typeahead({
    }, {
      minLength: 0,
    displayKey: function(object){
      console.log(Ember.get(object, this.get("displayKey")));
      return Ember.get(object, this.get('displayKey'));
    }.bind(this),
    source: function(query, cb){
      var content = this.get('content');
      if (!query || query === '*'){
        return cb(content);
      }
      cb(this._filterContent(query));
    }.bind(this),
    templates: {
      footer: function(object){
        if (object.isEmpty) {
          return '';
        } else if(this._validateEmail(object.query)){
          if (this._filterContent(object.query).length){
            return '';
          }
          return '<span class="tt-suggestion enter-suggest">Footer</span>';
        } else {
          return '<span class="tt-suggestion enter-suggest">Footer</span>';
        }
      }.bind(this),
      empty: function(object){
        var query = object.query;
        if (this._validateEmail(query)){
          return "<span class='tt-suggestion enter-suggest'>Empty</span>";
        } else {
          return "<span class='tt-suggestion enter-suggest'>Empty</span>";
        }
      }.bind(this)
    }
    /* jshint unused:false */
    }).on('typeahead:selected typeahead:autocompleted', Ember.run.bind(this, function(e, obj, dataSet){
      this.set('selection', obj);
    }));
  },

  focusOut: function(){
    var query = this.$().typeahead('val');
    var results = this._filterContent(query);
    if (Ember.$.trim(query).length) {
      if (results.length) {
        this.set('selection', results[0]);
      } else {
        this.sendAction('on-select-without-match', this, query);
      }
    }
  },

  setTypeaheadValue: Ember.observer('selection', function(){
    Ember.run.once(this, 'setSelectionValue');
  }),

  setSelectionValue: function(){
    var selection = this.get('selection');
    if (selection){
      this.$().typeahead('val', Ember.get(selection, this.get('displayKey')));
    }
  },

  close: function(){
    this.$().typeahead('close');
  },

  focusIn: function(){
    var typeahead;
    if (!this.$().val()) {
      typeahead = this.$().data('ttTypeahead');
      typeahead.dropdown.update(this.$().val());
    }
  },

  destroyTypeahead: Ember.observer(function(){
    this.$().typeahead('destroy');
  }).on('willDestroyElement')
});
