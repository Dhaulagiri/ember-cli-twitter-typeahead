import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return {
      typeaheadContent: [
        {name: 'test1', value: 'test1'},
        {name: 'test2', value: 'test2'},
        {name: 'test3', value: 'test3'}
      ],
      filterContent: function(){
        return true;
      }
    };
  }
});
