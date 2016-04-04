import Ember from "ember";
import ComponentVaidation from 'ember-validation/mixins/component';
// import layout from '../templates/components/user-age-gender';

export default Ember.Component.extend(ComponentVaidation, {
  // layout: layout
  isNested: true,

});

