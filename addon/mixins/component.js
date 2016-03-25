import Ember from 'ember';
import ValidationMixin from 'ember-validation/mixins/validation';
import ElementMediator from 'ember-validation/mediators/element';
// import lookup from 'ember-validation/utils/lookup';

const { get, computed, observer, A, isArray, Instrumentation, on, Logger } = Ember;

var ErrorsProxy = Ember.ArrayProxy.extend({

  /**
    @property _content
  */
  _content: Ember.A(),

  /**
    Adds error messages to a given attribute.

    @param {String} attribute
    @param {(Array|String)} messages
    @method remove
  */
  add(attribute, messages) {
    var item = this._find(attribute);

    if (!item) {
      item = {attribute, messages: A()};
      this.get('_content').addObject(item);
    }

    item.messages.addObjects(isArray(messages) ? messages : [messages]);
    item.messages.uniq();

  },

  /**
    Removes all error messages from the given attribute.

    @param {String} attribute
    @method remove
  */
  remove(attribute) {
    var item = this._find(attribute);

    if (item) {
      this.get('_content').removeObject(item);
    }
  },

  /**
    Removes all error messages.

    @method remove
  */
  clear() {
    this.get('_content').clear();
    this.clear();
  },

  /**
    @method unknownProperty
  */
  unknownProperty(attribute) {
    var item = this._find(attribute);

    return item ? get(item, 'messages') : this.get('content.'+attribute);
  },

  /**
    @property length
  */
  length: computed('content.length', '_content.length', function () {
    return this.get('content.length') + this.get('_content.length');
  }),

  /**
    Find item in _content by attribute name

    @param {String} attr name
    @return {Object|undefined}
    @method _find
  */
  _find(attribute) {
    return this.get('_content').findBy('attribute', attribute);
  }
});

const loggerSubject = 'Validation : Mixin : Component : ';

/**
  Return true if `child` is child view for `parent` view

  @param Ember.View parent
  @param Ember.View child
*/
function isChild(parent, child) {
  var parents;

  if (Ember.isEqual(child.parentView, parent)) {
    return true;
  }
  if (typeof child.get('validate') === 'function' || child.get('validate-path')) {
    parents = Ember.A();

    while (child.parentView) {
      parents.pushObject(child.parentView)
      child = child.parentView;
    }

    return parents.indexOf(parent) !== -1;
  }

}

export default Ember.Mixin.create(ValidationMixin, {

  /**
    Object wich properies will be validate.

    @property validation-context
    @type Object
    @default {}
    @public
  */
  'validation-context' : computed(() => { return {}; }),

  /**
    Hash with visible/hidden errors names

    @property visibleErrors
    @type Object
    @default {}
    @public
  */
  visibleErrors: computed(() => { return {}; }),

  /**
    Store Instrumentation.subscribe() result to unsibscribe at the end

    @property subscriber
    @type Object
    @default {}
    @public
  */
  subscriber: null,

  /**
    Create proxy for validation context errors

    @method initErrors
    @public
    @return undefined
  */
  initErrors() {
    this.set('errors', ErrorsProxy.create({content: this.get('validation-context.errors') || []}));

    this.get('validation-context').validate().then(() => {}, () => {});
  },

  /**
    Remove prev validation and create new one

    @method initValidation
    @on init
    @public
    @return undefined
  */
  initValidation: on('didInsertElement', function () {

    if (this.get('element')) {
      this.get('mediators').slice().forEach((mediator) => this.unregisterView(get(mediator, 'view')));
      this.get('childViews').forEach((view) => this.registerView(view));
    }

    this._super();
  }),

  /**
    Crete new errors and validation

    @method contextDidChange
    @observes validation-context
    @private
    @return undefined
  */
  contextDidChange: observer('validation-context', function () {
    this.initErrors();
    this.initValidation();
  }),

  /**
    Register view for validation

    @method registerView
    @param Ember.Component view
    @return Boolean
    @private
  */
  registerView(view) {
    var mediators = this.get('mediators'),
        path = get(view, 'validate-path'),
        mediator;

    if (mediators.findBy('view', view) || !(get(view, 'isValidatable') || path)) {
      return;
    }

    mediator = ElementMediator.create({context : this.get('validation-context'), view})
      .on('focusIn', this, this.hideError)
      .on('focusOut', this, this.showError)
      .on('passed', this, this.triggerValidatePassed)
      .on('failed', this, this.triggerValidateFailed);

    view.on('willDestroyElement', this, () => this.unregisterView(view));

    mediators.addObject(mediator);

    Logger.info(loggerSubject, 'register view :', path, view);

    return true;
  },

  /**
    Unregister view for validation

    @method unregisterView
    @param Ember.Component view
    @return undefined
    @private
  */
  unregisterView(view) {
    var mediators = this.get('mediators'),
        mediator = mediators.findBy('view', view),
        path = get(view, 'validate-path');

    if (mediator) {
      mediator
        .off('focusIn', this, this.hideError)
        .off('focusOut', this, this.showError)
        .off('passed', this, this.triggerValidatePassed)
        .off('failed', this, this.triggerValidateFailed)
        .destroy();

      delete view.mediator;

      mediators.removeObject(mediator);

      this.set('visibleErrors.' + path, false);

      Logger.info(loggerSubject, 'unregister view :', path, view);
    }
  },

  /**
    Check new rendered childs views to be registered for validation

    @method subscribe
    @on didInsertElement
    @return undefined
    @private
  */
  subscribe: on('didInsertElement', function () {
    var subscriber = Instrumentation.subscribe('render', {
      before: Ember.K,

      after: (name, timestamp, payload) => {
        var view = payload.view;

        if (Ember.typeOf(view) === "instance" && isChild(this, view)) {
          this.registerView(view);
        }

      }
    });

    this.set('subscriber', subscriber);
  }),

  /**
    Unsubscribe from listening new rendered child nodes

    @method unsubscribe
    @on willDestroyElement
    @return undefined
    @private
  */
  unsubscribe: Ember.on('willDestroyElement', function () {
    Instrumentation.unsubscribe(this.get('subscriber'));
  }),

  /**
    Hide error for given path

    @method hideError
    @param String path
    @param Ember.View view
    @return undefined
    @private
  */
  hideError(path) {
    this.set('visibleErrors.' + path, false);
  },

  /**
    Show error for given path

    @method showError
    @param String path
    @param Ember.View view
    @return undefined
    @private
  */
  showError(path) {
    this.set('visibleErrors.' + path, true);
  },

  /**
    Trigger 'passed' event for given path

    @method triggerValidatePassed
    @param String path
    @return undefined
    @private
  */
  triggerValidatePassed(path /*,view*/) {
    this.trigger('passed', path);
  },

  /**
    Trigger 'failed' event for given path

    @method triggerValidatePassed
    @param String path
    @param String error
    @return undefined
    @private
  */
  triggerValidateFailed(path, error /*,view*/) {
    this.trigger('failed', path, error);
  }

});
