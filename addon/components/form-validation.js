import Ember from 'ember';
import ComponentVaidation from 'ember-validation/mixins/component';
import layout from '../templates/components/form-validation';

export default Ember.Component.extend(ComponentVaidation, {
  layout: layout, // "{{yield this}}",
  tagName: 'form',

  events : {
    failed : function () {
      // body...
    },

    passed: function () {
      // body...
    }
  }
});
