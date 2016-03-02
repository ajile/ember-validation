import Ember from 'ember';
import ValidatableMixin from 'ember-validation/mixins/validatable';
import AttributeMediator from 'ember-validation/mediators/attribute';
import ValidatorMediator from 'ember-validation/mediators/validator';
import lookup from 'ember-validation/utils/lookup';

const { get, getWithDefault, getProperties } = Ember;
const { RSVP, computed, keys } = Ember;

export default Ember.Mixin.create(ValidatableMixin, {

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
    @private
  */
  validationScheme: {},

  /**
    @constructor
  */
  init() {
    this.initValidation();
    return this._super(...arguments);
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
        console.log("Validator %s has failed", attribute, message, arguments);
        this.get("errors").add(attribute, message);
      });

      attributeMediator.on("passed", () => {
        console.log("Validator %s has passed", attribute);
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

    // Iterating over the validators in collection and calling validate method
    // each of them to fill object by errors.
    var promises = this.get("mediators").map((mediator) => {
      return mediator.validate();
    });

    promises = promises.reduce((previousValue, item) => {
      previousValue = previousValue.concat(item);
      return previousValue;
    }, Ember.A());

    return RSVP.all(promises);
  },

  /**
    @method _createValidators
    @param {String} attribute
    @param {Object} validation
    @return Ember.Array
  */
  _createValidators(attribute, validation) {
    return Ember.A( get(validation, "validators") ).map((description) => {
      let { name, options } = getProperties(description, ["name", "options"]);
      let Validator = lookup(name, get(this, "container"));
      let validator = Validator.extend(options || {}).create();
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
    return AttributeMediator.extend(options).create({ context, attribute });
  },

  /**
    @method _createValidatorMediator
    @param {Validator} validator
    @param {Object} options
    @param {Object} context
    @return Ember.Array
  */
  _createValidatorMediator(attribute, validator, options={}, context=this) {
    return ValidatorMediator.extend(options).create({ context, attribute, validator });
  },

});
