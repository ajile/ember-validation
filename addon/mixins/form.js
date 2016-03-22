import Ember from 'ember';
import ValidationMixin from 'ember-validation/mixins/validation';
import ElementMediator from 'ember-validation/mediators/element';
import lookup from 'ember-validation/utils/lookup';

const { get, computed, A, isArray } = Ember;

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

export default Ember.Mixin.create(ValidationMixin, {

  context : computed(function () {
    return {};
  }),

  initValidation() {},

  // initErrors() {},

  _initValidation: Ember.on('didInsertElement', function () {
      var childs = this.get('childViews'),
          mediators = A(),
          context = this.get('context');

      console.log('context', context)

      this.get('mediators').forEach(function (mediator) {
        mediator.destroy();
      });

      childs.filterBy('valid-path').map((element) => {
        // console.log(element)
        let mediator = ElementMediator.create({context, element, validPath: get(element, 'valid-path')});

        // console.log(mediators)
        mediators.addObject(mediator);
      })
      this.set('mediators', mediators);
  }),

  _t : Ember.on('init', Ember.observer('context', function () {
    console.log('context id change', this.get('context'))
  })),

  reinitErroes: Ember.observer('context', function () {
    this.initErrors(); console.log(this.get('context'))
    this._initValidation();
  }),

  initErrors() {
    this.set('errors', ErrorsProxy.create({content: this.get('context.errors') || []}));

    this.get('context').validate().then(function () {

    }, () => {

    });
  },

  validate() {
    console.log('not impelemented yet')
  }
});
