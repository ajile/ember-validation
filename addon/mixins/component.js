import Ember from 'ember';
import ValidationMixin from 'ember-validation/mixins/validation';
import ElementMediator from 'ember-validation/mediators/element';
import ElementProxyMediator from 'ember-validation/mediators/element-proxy';

const { get, computed, observer, A, isArray, Instrumentation, on } = Ember;

/**
  @module
  @augments module:ember/ArrayProxy
  @public
*/
var ErrorsProxy = Ember.ArrayProxy.extend({

  /**
    @type Array
    @private
  */
  _content: Ember.A(),

  /**
    Adds error messages to a given attribute.

    @param {String} attribute
    @param {(Array|String)} messages
    @method remove
  */
  add(attribute, message) {
    var item = this._find(attribute);

    if (!item) {
      item = {attribute, messages: A()};
      this.get('_content').addObject(item);
    }

    if (!item.messages.findBy('message', message)) {
      item.messages.addObject({message})
    }
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
    this._super();
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


/**
  Return true if `child` is child view for `parent` view

  @param Ember.View parent
  @param Ember.View child
*/
function isChild(parent, child) {
  var parents;
  // console.log('isNested', get(parent, 'isNested'), 'child', child.element, 'parent', parent.element)
  // console.log('child', child.element, 'parent', parent.element)
  if (Ember.isEqual(child.parentView, parent)) {//console.log('OK')
    return true;
  }

  if (child.get('isValidatable') || child.get('validate-path')) {
    parents = Ember.A();

    while (child.parentView) {
      if (child.parentView.get('isValidatable')) {
        console.log('nested validation', child.parentView.element)
        return Ember.isEqual(child.parentView, parent);
      }
      // console.log(child.parentView)
      parents.pushObject(child.parentView)
      child = child.parentView;
    }
    // parents.indexOf(parent) !== -1 && console.log('OK')
    return parents.indexOf(parent) !== -1;
  }

}



function onMediatorFocusIn() {
  this.trigger('focusIn', this);
}

function onMediatorFocusOut() {
  this.trigger('focusOut', this);
}

/**
  @module
  @augments module:ember/Mixin
  @augments module:addon/mixins/validation
  @public
*/
export default Ember.Mixin.create(ValidationMixin, {

  /**
    Object wich properies will be validate.

    @property validation-context
    @type Object
    @default {}
    @public
  */
  'validation-context' : computed(() => {return {};}),

  /**
    Hash with visible/hidden errors names

    @property visibleErrors
    @type Object
    @default {}
    @public
  */
  visibleErrors: computed(() => {return {};}),

  elementsMediators: computed(() => {return A();}),

  /**
    Store Instrumentation.subscribe() result to unsibscribe on `willDestroyElement`

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
    this.set('errors', ErrorsProxy.create({content: this.get('validation-context.errors') || A()}));
  },

  /**
    Remove prev validation and create new one

    @method initValidation
    @on init
    @public
    @return undefined
  */
  initValidation() {
    var mediators;

    if (this.get('element')) {
      mediators = this.get('mediators');

      this.get('childViews').forEach((view) => {
        if (isChild(this, view)) {
          this._addMediatorForView(view);
        }

      });
      this._super();
      console.log('mediators.length', this.get('mediators.length'), this.get('mediators'))
    }


  },

  clearValidation() {
    this.get('mediators').slice().forEach((mediator) => { this.removeMediator(mediator); });
  },

  resetValidation() {
    this.clearValidation();
    this.initValidation();
  },

  resetErrors() {
    this.clearErrors();
    this.initErrors();
  },

  _onDidInsertElement : on('didInsertElement', function () {
    this.initValidation();
  }),

  /**
    Crete new errors and validation

    @method contextDidChange
    @observes validation-context
    @private
    @return undefined
  */
  _onContextDidChange: observer('validation-context', function () {
    this.resetErrors();
    this.resetValidation();
  }),

  _onMediatorDidCreate: on('mediatorDidCreate', function (mediator) {
    var view = get(mediator, 'view'),
        selector = get(mediator, 'options.selector');

    if (selector) {
      if (this.get('element')) {
        this._bindMediatorToElement(mediator, selector)
      } else {
        this.on('didInsertElement', () => { this._bindMediatorToElement(mediator, selector); })
      }
    }

    if (view || selector) {
      mediator
        .on('passed', this, this.triggerValidatePassed)
        .on('failed', this, this.triggerValidateFailed)
        .on('focusIn', this, this._hideErrors)
        .on('focusOut', this, this._runMediator);
    }

    if (view) {
      view
        .on('focusIn', mediator, onMediatorFocusIn)
        .on('focusOut', mediator, onMediatorFocusOut)
        .on('willDestroyElement', () => { get(mediator, 'view') && this.removeMediator(mediator); });
    }

  }),

  _onMediatorWillDestroy: on('mediatorWillRemove', function (mediator) {
    let view = get(mediator, 'view'),
        attribute = mediator.get('attribute');

    if (view) {
      mediator
        .on('passed', this, this.triggerValidatePassed)
        .on('failed', this, this.triggerValidateFailed)
        .on('focusIn', this, this._hideErrors)
        .on('focusOut', this, this._runMediator);

      view
        .off('focusIn', mediator, onMediatorFocusIn)
        .off('focusOut', mediator, onMediatorFocusOut);

      // let attribute = mediator.get('attribute');
      attribute && this.set('visibleErrors.' + attribute, false);

      mediator.set('view', null);
    }

  }),

  _bindMediatorToElement(mediator, selector) {
    var element = this.$(selector),
        view = this.get('container').lookup('-view-registry:main')[element.attr('id')];

    if (view) {
      view
        .on('focusIn', mediator, onMediatorFocusIn)
        .on('focusOut', mediator, onMediatorFocusOut);

      mediator.set('view', view);
    }
  },

  _hideErrors(mediator) {
    this.set('visibleErrors.' + get(mediator, 'attribute'), false);
  },

  _runMediator(mediator) {
    var attribute = get(mediator, 'attribute'),
        promise = mediator.validate();

    if (attribute) {
      if (mediator instanceof ElementProxyMediator) {
        promise.then(() => { this.get('errors').remove(attribute); }, () => {})
        promise.catch((error) => { this.get('errors').add(attribute, error); });

      }

      promise.finally(() => {
        this.set('visibleErrors.' + attribute, true);
        this.get('errors').notifyPropertyChange(attribute);
      });
    }

  },

  _createElementMediator(view) {
    var attribute = get(view, 'validate-path'),
        mediator;

    if (attribute) {
      mediator = ElementMediator.create({context : this.get('validation-context'), attribute, view});
    } else if (view.isValidatable) {
      mediator = ElementProxyMediator.create({view}); console.log('ElementProxyMediator')
    }

    return mediator;
  },


  _addMediatorForView(view) {
    var mediator;

    if (!this.get('mediators').findBy('view', view) && (mediator = this._createElementMediator(view))) {
      console.log('_addMediatorForView', view.element, 'isNested', this.get('isNested'))
      this.addMediator(mediator);
      return true;
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
          // this._addMediatorForView(view);
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
    Trigger 'passed' event for given path

    @method triggerValidatePassed
    @param String path
    @param Ember.View view
    @return undefined
    @private
  */
  triggerValidatePassed(mediator) { console.log('triggerValidatePassed', get(mediator, 'attribute'))
    this.trigger('passed', mediator);
  },

  /**
    Trigger 'failed' event for given path

    @method triggerValidatePassed
    @param Array error
    @param String path
    @param Ember.View view
    @return undefined
    @private
  */
  triggerValidateFailed(error, mediator) { console.log('triggerValidateFailed', get(mediator, 'attribute'), error)
    this.trigger('failed', error, mediator);
  }

});
