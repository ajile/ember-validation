import Ember from 'ember';
import ComponentVaidation from 'ember-validation/mixins/component';
import layout from '../templates/components/component-validation';

export default Ember.Component.extend(ComponentVaidation, {
  template: layout
});
