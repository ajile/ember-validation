import Ember from 'ember';
import ComponentVaidation from 'ember-validation/mixins/component';

const { RSVP, get } = Ember;

/**
 * @module
 * @augments ember/Component
 * @augments ember-validation/mixins/component
 */
export default Ember.Component.extend(ComponentVaidation, {

  validationScheme: {},

  /**
   * @type {String}
   * @todo: This property with direct path should be removed, but when you try
   *        do it validation somehow become broken. For temporary solution in
   *        components that extended from this component should set this
   *        property to `null` like so: `layoutName: null`.
   */
  layoutName: "components/form-validation",

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

  /**
   * Focus first invalid input after validaton failed
   * @type {Boolean}
   * @default false
   */
  focusFirstInvalid: false,

  /**
   * Call check() method on didInsertElement
   * @type {Boolean}
   * @default false
   */
  checkFirst: false,

  /**
   * Validate all form on submit
   *
   * @function
   * @param {jQuery.Event} event
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
        this.validate().then(this.validationPassed.bind(this), this.validationFailed.bind(this));
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
   */
  validationPassed() {
    this.hideAllErrors();
    this.submitStart();
    this._invokeAction();
  },

  /**
   * Called after validation was failed
   *
   * @function
   */
  validationFailed(/*errors*/) {
    this.showAllErrors();
    Ember.run.scheduleOnce('afterRender', this, () => {
      if (this.get('focusFirstInvalid')) {
        let mediator = this.get('mediators').find((mediator) => {
          let name = get(mediator, 'errorsName');
          if (name && this.get('errors.' + name + '.length')) {
            return true;
          }
        });

        if (mediator) {
          const view = get(mediator, 'view');

          if (typeof view.focus === 'function') {
            view.focus();
          } else {
            if (/INPUT|TEXTAREA|SELECT/.test(view.element.nodeName)) {
              view.element.focus();
            } else {
              view.$('input,textarea,select').filter(':first').focus();
            }
          }

          this.set('visibleErrors.' + get(mediator, 'errorsName'), true);
        }

      }
    });
  },

  /**
   * Called at the end of validation
   *
   * @function
   */
  validationEnd() {
    this.set('isValidating', false);
  },

  /**
   * Invokes given `action`. Method can be overridden by a child to currying
   * function's arguments.
   *
   * @function
   */
  _invokeAction() {
    const args = [this.submitDone.bind(this), this.submitFailed.bind(this), ...arguments];
    Ember.assert(`You must provide an 'action' action to 'form-validation'`, typeof this.attrs.action === 'function');
    this.attrs.action(...args);
  },

  submitStart() {
    this.set('isSubmitting', true);
  },

  /**
   * Called when submitting done
   *
   * @function
   */
  submitDone() {
    this.set('isSubmitted', true);
    this.submitEnd();
  },

  /**
   * Called when submitting failed
   *
   * @function
   */
  submitFailed(error) {
    this.set('submitError', error);
    this.submitEnd();
  },

  /**
   * Called after submitting complete
   *
   * @function
   */
  submitEnd() {
    this.set('isSubmitting', false);
  },

  /**
   * Make all errors visible
   *
   * @function
   */
  showAllErrors() {
    this.get('mediators').forEach((mediator) => {
      let name = get(mediator, 'errorsName');
      name && this.set('visibleErrors.' + name, true);
    });
  },

  /**
   * Make all errors hidden
   *
   * @function
   */
  hideAllErrors() {
    Object.keys(this.get('visibleErrors')).forEach((errorsName) => {
      this.set('visibleErrors.' + errorsName, true);
    });
  },

  didInsertElement() {
    this._super(...arguments);

    this.$().on('input', () => { this.get('submitError') && Ember.run.later(this, () => { this.set('submitError', ''); }, 300); });

    this.$().on('change keyup', 'input, textarea, select', () => { this.set('isSubmitted', false); });

    if (this.get('checkFirst')) {
      this.check();
    }
  },

  actions: {
    reset() {
      typeof this.attrs.reset === 'function' && this.attrs.reset();
      return true;
    }
  }

});
