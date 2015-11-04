import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addSelectedItem(item) {
      console.log('added: ', item);
    }
  }
});
