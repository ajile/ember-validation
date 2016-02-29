import Ember from 'ember';

const { get, getWithDefault, getProperties } = Ember;
const { RSVP, computed, keys } = Ember;
const { observer } = Ember;

export var lookupValidator = function(name) {
  var validator = get(this, 'container').lookupFactory('validator:' + name);
  Ember.assert("Validator named '" + name + "' is not found", validator);
  return validator
};

export var ValidatorMediator = Ember.Object.extend(Ember.Evented, {

  conditionDidChange: observer("condition", function() {
    this.validate();
  }),

  validate() {
    if (!Ember.isNone(this.condition) && !this.get('condition')) {
      this.trigger("passed")
      return;
    }
    let promise = this.get("validator").validate(this.get("attribute"), this);
    promise.catch((message) => this.trigger("failed", message));
    promise.then(() => this.trigger("passed"));
  }

});

export default Ember.Mixin.create({

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
    Method creates validators from the `validationScheme`. Validator age gets
    from the registry by name. Default name space for them is `validator:`, that
    means that they are should be placed in the `validators/` directory.
    @method initValidation
    @private
  */
  initValidation() {

    const validationScheme = this.get("validationScheme");
    const mediators = this.get("mediators");

    Ember.assert("You should define `validationScheme` property", validationScheme);

    var attributes = [];

    // Getting object's properties that should have validation.
    attributes = Ember.A(keys(validationScheme));
    attributes.forEach((attribute) => {

      let validation = get(validationScheme, attribute);

      // Attribute validators list.
      let validatorObjects = this._createValidators(attribute, validation);

      let Mediator = ValidatorMediator.extend(getWithDefault(validation, "options", {}));

      validatorObjects.forEach((validator) => {
        let mediator = Mediator.create({ context: this, attribute, validator });
        mediator.on("failed", (message) => {
          console.log("failed");
          this.get("errors").add(attribute, message);
        });
        mediator.on("passed", () => {
          console.log("passed");
          this.get("errors").remove(attribute);
        });
        mediators.pushObject(mediator)
      });
    });

  },

  /**
    @method _createValidators
    @param {String} attribute
    @param {Object} validation
    @return Ember.Array
  */
  _createValidators(attribute, validation) {
    Ember.assert("Every validation should contain validators", validation);

    let validators = get(validation, "validators");

    return Ember.A(validators).map((description) => {
      let { name, options } = getProperties(description, ["name", "options"]);
      let Validator = lookupValidator.call(this, name);
      return Validator.create({ context: this, attribute: attribute }).reopen(options);
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
      // let { validator, attribute } = mediator;
      // let validationPromise = validator.validate(attribute, this);
      // validationPromise.catch((message) => {
      //   this.get("errors").add(attribute, message);
      // });
      // return validationPromise;
    });
    return RSVP.all(promises);
  },

});
