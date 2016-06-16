import Ember from 'ember';
import ValidationMixin from 'ember-validation/mixins/validation';
import ElementMediator from 'ember-validation/mediators/element';
import ElementProxyMediator from 'ember-validation/mediators/element-proxy';
import ElementMediatorMixin from 'ember-validation/mixins/element-mediator';

const { get, computed, observer, A, isArray, Instrumentation, on } = Ember;

/**
* @module
* @augments module:ember/ArrayProxy
* @public
*/
var ErrorsProxy = Ember.ArrayProxy.extend({

  /** @type {Array}  */
  _content: Ember.A(),

  /**
   * Adds error messages to a given attribute.
   *
   * @function
   * @param {String} attribute
   * @param {(Array|String)} messages
   */
  add(attribute, messages) {
    var content = this.get('_content');

    if (!messages) {
      messages = A(['unknown error']);
    }

    A(Ember.makeArray(messages)).forEach((message) => {
      content.addObject({attribute, message});
    });
  },

  /**
   * Removes all error messages from the given attribute.
   *
   * @function
   * @param {String} attribute
   */
  remove(attribute) {
    this.get('_content').removeObjects(this._messagesForAttribute(attribute));
  },

  /**
   * Removes all error messages.
   *
   * @function
   */
  clear() {
    this.get('_content').clear();
    this._super();
  },

  /**
   * Return errors for given attribute
   *
   * @function
   * @param {String} attribute
   * @returns {Array}
   */
  unknownProperty(attribute) {
    return this._messagesForAttribute(attribute) || this.get('content.'+attribute);
  },

  /** @type {Number} */
  length: computed('content.length', '_content.length', function () {
    return this.get('content.length') + this.get('_content.length');
  }),

  /**
   * Return errors for given attribute
   *
   * @function
   * @param {String} attr name
   * @returns {Array}
   */
  _messagesForAttribute(attribute) {
    return this.get('_content').filterBy('attribute', attribute);
  }
});

/**
 * @module
 * @mixin
 * @augments ember/Mixin
 * @mixes ember-validation/mixins/validation
 */
export default Ember.Mixin.create(ValidationMixin, {

  /** @type {Object} */
  subscriber: null,

  /** @type {ember/Object} */
  'validation-context': computed(() => {return {};}),

  /** @type {ember/Object} */
  visibleErrors: computed(() => {return {};}),

  /**
   * Initialize errors
   *
   * @function
   */
  initErrors() {
    this.set('errors', ErrorsProxy.create({ content: this.get('validation-context.errors') || A() }));
  },

  /**
   * Initialize validation
   *
   * @function
   */
  initValidation() {

    if (this.get('element')) {
      this.get('childViews').forEach(this._addElementMediator.bind(this));
      this._super();
    }

  },

  /**
   * Clear validation
   *
   * @function
   */
  clearValidation() {
    this.get('mediators').slice().forEach(this.removeMediator.bind(this));
  },

  /**
   * Reset validation
   *
   * @function
   */
  resetValidation() {
    this.clearValidation();
    this.initValidation();
  },

  /**
   * Reset errors
   *
   * @function
   */
  resetErrors() {
    this.clearErrors();
    this.initErrors();
  },

  /**
   * Return true if view is validable child
   *
   * @function
   * @returns {Boolean}
   */
  isChild(view) {

    while (view.parentView) {
      if (view.parentView.get('isValidatable')) {
        return Ember.isEqual(view.parentView, this);
      }
      view = view.parentView;
    }
  },

  /**
   * Init validation on `didInsertElement`
   *
   * @function
   */
  _onDidInsertElement: on('didInsertElement', function () {
    this.initValidation();
  }),

  /**
   * Reset validation and errors on context did change
   *
   * @function
   */
  _onContextDidChange: observer('validation-context', function () {
    this.resetErrors();
    this.resetValidation();
  }),

  /**
   * Do some initilaze stuffs for some types of mediators
   *
   * @function
   * @param {Mediator} mediator
   */
  _onMediatorDidAdd: on('mediatorDidAdd', function (mediator) {
    var selector = get(mediator, 'options.selector'),
        bind = () => {
          let element = this.$(selector),
              view = this.get('container').lookup('-view-registry:main')[element.attr('id')];

          if (view) {
            Ember.mixin(mediator, ElementMediatorMixin);
            mediator.set('view', view);
          }
        };

    if (selector) {
      this.get('element') ? bind() : this.on('didInsertElement', bind);
    }

    mediator
      .on('passed', this, this._triggerValidatePassed)
      .on('failed', this, this._triggerValidateFailed)
      .on('showErrors', this, this._showErrors)
      .on('hideErrors', this, this._hideErrors);
  }),

  /**
   * Do some stuffs before mediator will destroy
   *
   * @function
   * @param {Mediator} mediator
   */
  _onMediatorWillDestroy: on('mediatorWillRemove', function (mediator) {
    mediator
      .off('passed', this, this._triggerValidatePassed)
      .off('failed', this, this._triggerValidateFailed)
      .off('showErrors', this, this._showErrors)
      .off('hideErrors', this, this._hideErrors);

    this._hideErrors(get(mediator, 'attribute'));
  }),

  /**
   * Add mediator for given view if not exits and view is validatable or has `validate-path` attr
   *
   * @function
   * @param {Ember/View} view
   */
  _addElementMediator(view) {

    if ((get(view, 'isValidatable') || get(view, 'validate-path'))  && !this.get('mediators').findBy('view', view)) {
      let mediator = this._createElementMediator(view);

      view.on('willDestroyElement', () => { this.removeMediator(mediator); });
      this.addMediator(mediator);
    }
    if (!get(view, 'isValidatable')) {
      view.get('childViews').forEach(this._addElementMediator.bind(this));
    }

  },

  /**
   * Create mediator for given view
   *
   * @function
   * @param {Ember/View} view
   */
  _createElementMediator(view) {
    var attribute = get(view, 'validate-path');

    if (attribute) {
      return ElementMediator.create({ context: this.get('validation-context'), attribute, view });
    }

    return ElementProxyMediator.create({view});

  },

  /**
   * Show errors for for given attribute
   *
   * @function
   * @param {String} attribute
   */
  _showErrors(attribute) {
    attribute && this.set('visibleErrors.' + attribute, true);
  },


  /**
   * Hide errors for for given attribute
   *
   * @function
   * @param {String} attribute
   */
  _hideErrors(attribute) {
    attribute && this.set('visibleErrors.' + attribute, false);
  },

  /**
   * Check new rendered childs views to be registered for validation
   *
   * @function
   */
  _subscribe: on('didInsertElement', function () {
    var subscriber = Instrumentation.subscribe('render', {
      before: Ember.K,

      after: (name, timestamp, payload) => {
        var view = payload.view;

        if (Ember.typeOf(view) === "instance" && (get(view, 'isValidatable') || get(view, 'validate-path')) && this.isChild(view)) {
            this._addElementMediator(view);
        }
      }
    });

    this.set('subscriber', subscriber);
  }),

  /**
   * Unsubscribe from listening new rendered child nodes
   *
   * @function
   */
  _unsubscribe: Ember.on('willDestroyElement', function () {
    Instrumentation.unsubscribe(this.get('subscriber'));
    this.clearValidation();
  }),

  /**
   * Trigger 'passed' event for given mediator
   *
   * @function
   * @param {Mediator} mediator
   */
  _triggerValidatePassed(mediator) {
    let errors = this.get('errors'),
        errorName = get(mediator, 'errorsName');

    if (errorName) {
      errors.remove(errorName);
      errors.notifyPropertyChange(errorName);
      this.trigger('passed', mediator, errorName);
    }
  },

  /**
   * Trigger 'failed' event for given path
   *
   * @function
   * @param {String} error
   * @param {Mediator} mediator
   */
  _triggerValidateFailed(error, mediator) {
    let errors = this.get('errors'),
        errorName = get(mediator, 'errorsName'),
        message = get(mediator, 'view.error-message') || error;

    if (errorName) {
      errors.remove(errorName);
      errors.add(errorName, message);
      this._showErrors(errorName);
      this.get('errors').notifyPropertyChange(errorName);
    }

    this.trigger('failed', message, mediator, errorName);
  }

});
