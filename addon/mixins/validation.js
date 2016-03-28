import Ember from 'ember';
import ValidatableMixin from 'ember-validation/mixins/validatable';
import AttributeMediator from 'ember-validation/mediators/attribute';
import ValidatorMediator from 'ember-validation/mediators/validator';
import Errors from 'ember-validation/core/errors';
import lookup from 'ember-validation/utils/lookup';

const { get, getWithDefault, getProperties, tryInvoke } = Ember;
const { RSVP, computed, keys } = Ember;

var findMediators = function(...names) {
    Ember.assert("You should provide at least one attribute name", !Ember.isEmpty(names));

    // Iterating over the names (of attributes) and getting mediators.
    const mediators = Ember.A(names).map((name) => {
      let mediator = this.get("mediators").findBy("attribute", name);
      Ember.assert("Mediator for attribute named `" + name + "` not found", mediator);
      return mediator;
    });

    return mediators;
};


export default Ember.Mixin.create(ValidatableMixin, {

  /**
    Defines the properties that will be merged from the superclass
    (instead of overridden).
    @property mergedProperties
    @type Array
    @default null
    @public
  */
  mergedProperties: ["validationScheme"],

  /**
    A collection that contains all validators of the class instance that
    implements current mixin. The property fills up by the `initValidation`
    method from `validationScheme` (contains instruction to create validators).
    @property validators
    @type Ember.Array
  */
  mediators: computed(() => Ember.A()),

  /**
    This is an instruction for creating validators for an object that implements
    current mixin. The structure of it is following:

    @example:
      validationScheme
        attribute
          options: ATTRIBUTE_VALIDATION_OPTIONS,
          validators[]
            { name: VALIDATOR_NAME, options: VALIDATOR_OPTIONS }

    The method fills `validators` collection by validators and invoke each of
    them on `validate` method.

    @property validationScheme
    @type Object
    @protected
  */
  validationScheme: {},

  /**
    @constructor
  */
  init() {
    this.initErrors();
    this.initValidation();
    this.initStates();
    return this._super(...arguments);
  },

  initStates() {
      // The class already has a state, it means that the class has isValid and
      // isInvalid states as well.
      if (this.get("currentState")) {
          return;
      }

      Ember.defineProperty(this, "isValid", computed("errors.length", () => {
        return this.get("errors.length") === 0;
      }));

      Ember.defineProperty(this, "isInvalid", computed.not("isValid"));
  },

  initErrors() {
    Ember.isArray(this.get("errors")) || this.set("errors", Errors.create());
  },

  /**
    Method creates validators for every object's attribute from the
    `validationScheme`. Validators are gets from the registry by names. Default
    namespace for them is `validator:`, that means that they are should be
    placed in the `validators/` project directory.

    Validators creates and wrappes by an attribute mediator. It has the same
    interface as they are. The mediators triggers events every time when they
    called.

    @method initValidation
    @private
  */
  initValidation() {

    const validationScheme = this.get("validationScheme"),
          mediators = this.get("mediators");

    Ember.assert("You should define `validationScheme` property", validationScheme);

    // Getting the object's properties that should have validation.
    const attributes = Ember.A(keys(validationScheme));

    attributes.forEach((attribute) => {

      // Instruction to create validators for the attribute
      let validation = get(validationScheme, attribute);

      Ember.assert("Every validation should contain validators", validation);

      // A list of the validator instances
      let validatorObjects = this._createValidators(attribute, validation);

      let options = getWithDefault(validation, "options", {});
      let attributeMediator = this._createAttributeMediator(attribute, options);

      // Iterating over the attribute's validators and wrap each of them by a
      // mediator, that has the same interface then they are.
      validatorObjects.forEach((validator) => {
        let options = Ember.getMeta(validator, "options");
        let validatorMediator = this._createValidatorMediator(attribute, validator, options);
        attributeMediator.pushObject(validatorMediator);
      });


      attributeMediator.on("failed", (message) => {
        console.log("Attribute '%s' is invalid with message '%s'", attribute, message);
        console.log("    " + attribute);
        console.log("    " + message);
        this.get("errors").add(attribute, message);
      });

      attributeMediator.on("passed", () => {
        console.log("Attribute %s is valid", attribute);
        this.get("errors").remove(attribute);
      });

      attributeMediator.on("conditionChanged", () => {
        // console.log("Condition of attribute %s changed", attribute);
        this.get("errors").remove(attribute);
      });

      mediators.pushObject(attributeMediator);

    });

  },

  /**
    Iterates over the elements of a validation collection, calls `validate` on
    each them, collect result of evaluation and put it into the `errors`
    property of the object.
    @method validate
    @return {Ember.RSVP.Promise}
  */
  validate() {
    if (Ember.isEmpty(arguments)) {
      return this._runMediators("validate", this.get("mediators"));
    } else {
      Ember.warn('You probably want to call `validateByName`', Ember.isEmpty(arguments));
      return this.validateByName(...arguments);
    }
  },

  /**
    This method the same as `validate`, only difference is that the `validate`
    fills errors of the object. This method may be helpful to you, if you want
    to check the object validation, but do not want fill it with errors.
    @method check
    @return {Ember.RSVP.Promise}
  */
  check() {
    if (Ember.isEmpty(arguments)) {
      return this._runMediators("check", this.get("mediators"));
    } else {
      Ember.warn('You probably want to call `checkByName`', Ember.isEmpty(arguments));
      return this.validateByName(...arguments);
    }
  },

  /**
    Method searching mediators by name and executes validation on each of them.
    May be helpful if you'd like to validate just few attributes of the object,
    not all of them.

    @example:
      // Validate only one field
      var promise = user.validateByName("firstName");

      // Validate few fields
      var promise = user.validateByName("firstName", "lastName", "birthday");

    @method validateByName
    @param {String[]} names
    @return {Ember.RSVP.Promise}
  */
  validateByName(...names) {
    return this._runMediators("validate", findMediators.call(this, ...names));
  },

  /**
    Method searching mediators by name and executes check method on each of them.
    May be helpful if you'd like to check just few attributes of the object,
    not all of them.

    @example:
      // Validate field
      var promise = user.checkByName("firstName", "lastName");

    @method checkByName
    @param {String[]} names
    @return {Ember.RSVP.Promise}
  */
  checkByName(...names) {
    return this._runMediators("check", findMediators.call(this, ...names));
  },

  /**
    @method clearErrors
  */
  clearErrors() {
    this.get("errors").clear();
  },

  /**
    @method clearErrorsByName
    @param {String} name
  */
  clearErrorsByName(name) {
    const attributeErrors = this.get("errors").filterBy("attribute", name);
    var errors = this.get("errors");
    attributeErrors.forEach((attr) => {
      errors = errors.without(attr);
    });
    this.set("errors", errors);
  },

  /**
    Iterating over the validators in collection and calling validate method
    each of them to fill object by errors.
    @method _runMediators
    @params {Array} mediators
    @private
    @return {Ember.RSVP.Promise}
  */
  _runMediators(method, mediators) {
    let promises = mediators.map((mediator) => tryInvoke(mediator, method));
    promises = promises.reduce((previousValue, item) => {
      previousValue = previousValue.concat(item);
      return previousValue;
    }, Ember.A());
    const result = RSVP.all(promises);
    // result.then(() => console.log("✓ Validation has been passed"));
    // result.catch(() => console.log("✘ Validation has been failed"));
    return result;
  },

  /**
    @method _createValidators
    @param {String} attribute
    @param {Object} validation
    @return Ember.Array
  */
  _createValidators(attribute, validation) {
    return Ember.A( get(validation, "validators") ).map((description) => {
      const { name, options } = getProperties(description, ["name", "options"]);
      const Validator = lookup(name, get(this, "container"));
      const validator = Validator.extend(options || {}).create();
      Ember.setMeta(validator, "options", options || {});
      return validator;
    });
  },

  /**
    @method _createAttributeMediator
    @param {String} attribute
    @param {Object} options
    @param {Object} context
    @return Ember.Array
  */
  _createAttributeMediator(attribute, options={}, context=this) {
    return AttributeMediator.extend(options).create({ context, attribute, options });
  },

  /**
    @method _createValidatorMediator
    @param {Validator} validator
    @param {Object} options
    @param {Object} context
    @return Ember.Array
  */
  _createValidatorMediator(attribute, validator, options={}, context=this) {
    return ValidatorMediator.extend(options).create({ context, attribute, validator, options });
  },

});
