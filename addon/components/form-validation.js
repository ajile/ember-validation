import Ember from 'ember';
import ComponentVaidation from 'ember-validation/mixins/component';
import layout from '../templates/components/form-validation';

/**
 * @module
 * @augments ember/Component
 * @augments ember-validation/mixins/component
 */
export default Ember.Component.extend(ComponentVaidation, {
  layout: layout,

  /** @type {String} */
  tagName: 'form',

  submit(event) {
    event.preventDefault()
    console.log('submit', event)
    this.validate().then(
      () => {
        this.trigger('passed');
        this.sendAction('action');
      },
      (error) => {
        // console.log('first_name', this.get('errors.first_name'))
        // console.log('last_name', this.get('errors.last_name'))
        // console.log('age_and_gender', this.get('errors.age_and_gender'))
        // this.get('errors').forEach((e) => { console.log(e); })
        this.trigger('failed');
      });

  }

});
