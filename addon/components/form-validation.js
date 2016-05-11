import Ember from 'ember';
import ComponentVaidation from 'ember-validation/mixins/component';
import layout from '../templates/components/form-validation';

const { RSVP } = Ember;

/**
 * @module
 * @augments ember/Component
 * @augments ember-validation/mixins/component
 */
export default Ember.Component.extend(ComponentVaidation, {

  validationScheme: {},

  layout: layout,

  /** @type {String} */
  tagName: 'form',

  /** @type {Boolean} */
  isValidating: false,

  /** @type {Boolean} */
  isSubmitting: false,

  /** @type {Boolean} */
  isSubmitted: false,

  /** @type {Boolean} */
  submitError: '',

  errorClass: 'has-error',

  /**
   * Validate all form on submit
   *
   * @function
   * @param {jQuery.Event} event
   * @returns {undefined}
   */
  submit(event) {

    event.preventDefault();

    this.setProperties({
      submitError: '',
      isSubmitted: false,
      isValidating: true
    });

    this.validationStart()
      .then(() => {
        this.validate()
          .then(this.validationPassed.bind(this), this.validationFailed.bind(this));
      })
      .finally(this.validationEnd.bind(this));

  },

  /**
   * Called before validation starts.
   * If returned promise rejected - validation will not starts
   *
   * @function
   * @returns {Ember/RSVP.resolve}
   */
  validationStart: () => RSVP.resolve(),

  /**
   * Called after validation was passed
   * Call given `action`
   *
   * @function
   * @returns {undefined}
   */
  validationPassed() {
    this.hideAllErrors();
    this.submitStart();
    this.attrs.action(this.submitDone.bind(this), this.submitFailed.bind(this));
  },

  /**
   * Called after validation was failed
   *
   * @function
   * @returns {undefined}
   */
  validationFailed(/*errors*/) {
    this.showAllErrors();
    Ember.run.scheduleOnce('afterRender', this, () => {
      this.$().find('.' + this.get('errorClass') + ':first input,textarea,select').focus();
    });
  },

  /**
   * Called at the end of validation
   *
   * @function
   * @returns {undefined}
   */
  validationEnd() {
    this.set('isValidating', false);
  },

  submitStart() {
    this.set('isSubmitting', true);
  },

  /**
   * Called when submitting done
   *
   * @function
   * @returns {undefined}
   */
  submitDone() {
    this.set('isSubmitted', true);
    this.submitEnd();
  },

  /**
   * Called when submitting failed
   *
   * @function
   * @returns {undefined}
   */
  submitFailed(error) {
    this.set('submitError', error);
    this.submitEnd();
  },

  /**
   * Called after submitting complete
   *
   * @function
   * @returns {undefined}
   */
  submitEnd() {
    this.set('isSubmitting', false);
  },

  /**
   * Make all errors visible
   *
   * @function
   * @returns {undefined}
   */
  showAllErrors() {
    this.get('mediators').forEach((mediator) => {
      let attribute = Ember.get(mediator, 'attribute');
      attribute && this.set('visibleErrors.' + attribute, true);
    });
  },

  /**
   * Make all errors hidden
   *
   * @function
   * @returns {undefined}
   */
  hideAllErrors() {
    Ember.keys(this.get('visibleErrors')).forEach((attribute) => {
      this.set('visibleErrors.' + attribute, true);
    });
  },

  /**
   * Check `action` argument was given
   *
   * @function
   * @returns {undefined}
   */
  didReceiveAttrs() {
    Ember.assert(`You must provide an \`action\` action to \`form-validation\`.`, typeof this.attrs.action === 'function');
  },

  didInsertElement() {
    this._super(...arguments);

    this.$().on('focusin', () => { this.set('submitError', ''); });

    this.$().on('change keyup', 'input, textarea, select', () => { this.set('isSubmitted', false); });

  },

  actions: {
    reset() {
      typeof this.attrs.reset === 'function' && this.attrs.reset();
      return true;
    }
  }

});
