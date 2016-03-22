import Ember from 'ember';
import FormVaidation from 'ember-validation/mixins/form';
import layout from '../templates/components/form-validation';

export default Ember.Component.extend(FormVaidation, {
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
