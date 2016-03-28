"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('dummy/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'dummy/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('dummy/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'dummy/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('dummy/components/form-validation', ['exports', 'ember-validation/components/form-validation'], function (exports, form_validation) {

	'use strict';



	exports['default'] = form_validation['default'];

});
define('dummy/controllers/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend();

});
define('dummy/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('dummy/controllers/examples/conditional', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({

    actions: {

      validateModel1: function validateModel1() {
        this.get("model.model_1").validate();
      },

      validateModel2: function validateModel2() {
        this.get("model.model_2").validate();
      },

      setGender: function setGender(gender) {
        this.set("model.model_2.gender", gender);
      }

    }

  });

});
define('dummy/controllers/examples/form', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({

    emailAndPhoneOpened: false,

    actions: {
      toggleEmailAndPhone: function toggleEmailAndPhone() {
        this.toggleProperty('emailAndPhoneOpened');
      }
    }
  });

});
define('dummy/controllers/examples/simple', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({

    validationResult: "Unknown",

    user: Ember['default'].computed(function () {
      return this.store.createRecord("user");
    }),

    actions: {

      validate: function validate() {
        var _this = this;

        var promise = Ember['default'].tryInvoke(this.get("user"), "validate");
        promise.then(function () {
          _this.set("validationResult", "Model is validated - it's valid");
        });
        promise["catch"](function () {
          _this.set("validationResult", "Model is validated - it's invalid");
        });
      },

      validateField: function validateField(name) {
        this.get("user").validateByName(name);
      },

      check: function check() {
        var _this2 = this;

        var promise = Ember['default'].tryInvoke(this.get("user"), "check");
        promise.then(function () {
          _this2.set("validationResult", "Model is checked it's valid");
        });
        promise["catch"](function () {
          _this2.set("validationResult", "Model is checked it's invalid");
        });
      },

      setGender: function setGender(gender) {
        this.set("user.gender", gender);
      }

    }

  });

});
define('dummy/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('dummy/ember-validation/tests/modules/ember-validation/components/form-validation.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/components/form-validation.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/components/form-validation.js should pass jshint.');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/core/errors.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/core/errors.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/core/errors.js should pass jshint.');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/core/mediator.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/core/mediator.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/core/mediator.js should pass jshint.');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/core/validator.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/core/validator.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/core/validator.js should pass jshint.');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/mediators/attribute.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/mediators/attribute.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/mediators/attribute.js should pass jshint.');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/mediators/element.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/mediators/element.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'modules/ember-validation/mediators/element.js should pass jshint.\nmodules/ember-validation/mediators/element.js: line 4, col 15, \'run\' is defined but never used.\n\n1 error');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/mediators/model-validator.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/mediators/model-validator.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/mediators/model-validator.js should pass jshint.');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/mediators/validator.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/mediators/validator.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/mediators/validator.js should pass jshint.');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/mixins/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/mixins/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'modules/ember-validation/mixins/component.js should pass jshint.\nmodules/ember-validation/mixins/component.js: line 105, col 43, Missing semicolon.\n\n1 error');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/mixins/model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/mixins/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/mixins/model.js should pass jshint.');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/mixins/validatable.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/mixins/validatable.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/mixins/validatable.js should pass jshint.');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/mixins/validation.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/mixins/validation.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/mixins/validation.js should pass jshint.');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/utils/lookup.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/utils/lookup.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/utils/lookup.js should pass jshint.');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/validators/email.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/validators/email.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/validators/email.js should pass jshint.');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/validators/number.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/validators/number.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/validators/number.js should pass jshint.');
  });

});
define('dummy/ember-validation/tests/modules/ember-validation/validators/required.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-validation/validators/required.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'modules/ember-validation/validators/required.js should pass jshint.');
  });

});
define('dummy/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, Ember, and) {

  'use strict';

  var forExport = null;

  if (Ember['default'].Helper) {
    forExport = Ember['default'].Helper.helper(and.andHelper);
  } else if (Ember['default'].HTMLBars.makeBoundHelper) {
    forExport = Ember['default'].HTMLBars.makeBoundHelper(and.andHelper);
  }

  exports['default'] = forExport;

});
define('dummy/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, Ember, equal) {

  'use strict';

  var forExport = null;

  if (Ember['default'].Helper) {
    forExport = Ember['default'].Helper.helper(equal.equalHelper);
  } else if (Ember['default'].HTMLBars.makeBoundHelper) {
    forExport = Ember['default'].HTMLBars.makeBoundHelper(equal.equalHelper);
  }

  exports['default'] = forExport;

});
define('dummy/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, Ember, gt) {

  'use strict';

  var forExport = null;

  if (Ember['default'].Helper) {
    forExport = Ember['default'].Helper.helper(gt.gtHelper);
  } else if (Ember['default'].HTMLBars.makeBoundHelper) {
    forExport = Ember['default'].HTMLBars.makeBoundHelper(gt.gtHelper);
  }

  exports['default'] = forExport;

});
define('dummy/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, Ember, gte) {

  'use strict';

  var forExport = null;

  if (Ember['default'].Helper) {
    forExport = Ember['default'].Helper.helper(gte.gteHelper);
  } else if (Ember['default'].HTMLBars.makeBoundHelper) {
    forExport = Ember['default'].HTMLBars.makeBoundHelper(gte.gteHelper);
  }

  exports['default'] = forExport;

});
define('dummy/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, Ember, is_array) {

  'use strict';

  var forExport = null;

  if (Ember['default'].Helper) {
    forExport = Ember['default'].Helper.helper(is_array.isArrayHelper);
  } else if (Ember['default'].HTMLBars.makeBoundHelper) {
    forExport = Ember['default'].HTMLBars.makeBoundHelper(is_array.isArrayHelper);
  }

  exports['default'] = forExport;

});
define('dummy/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, Ember, lt) {

  'use strict';

  var forExport = null;

  if (Ember['default'].Helper) {
    forExport = Ember['default'].Helper.helper(lt.ltHelper);
  } else if (Ember['default'].HTMLBars.makeBoundHelper) {
    forExport = Ember['default'].HTMLBars.makeBoundHelper(lt.ltHelper);
  }

  exports['default'] = forExport;

});
define('dummy/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, Ember, lte) {

  'use strict';

  var forExport = null;

  if (Ember['default'].Helper) {
    forExport = Ember['default'].Helper.helper(lte.lteHelper);
  } else if (Ember['default'].HTMLBars.makeBoundHelper) {
    forExport = Ember['default'].HTMLBars.makeBoundHelper(lte.lteHelper);
  }

  exports['default'] = forExport;

});
define('dummy/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, Ember, not_equal) {

  'use strict';

  var forExport = null;

  if (Ember['default'].Helper) {
    forExport = Ember['default'].Helper.helper(not_equal.notEqualHelper);
  } else if (Ember['default'].HTMLBars.makeBoundHelper) {
    forExport = Ember['default'].HTMLBars.makeBoundHelper(not_equal.notEqualHelper);
  }

  exports['default'] = forExport;

});
define('dummy/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, Ember, not) {

  'use strict';

  var forExport = null;

  if (Ember['default'].Helper) {
    forExport = Ember['default'].Helper.helper(not.notHelper);
  } else if (Ember['default'].HTMLBars.makeBoundHelper) {
    forExport = Ember['default'].HTMLBars.makeBoundHelper(not.notHelper);
  }

  exports['default'] = forExport;

});
define('dummy/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, Ember, or) {

  'use strict';

  var forExport = null;

  if (Ember['default'].Helper) {
    forExport = Ember['default'].Helper.helper(or.orHelper);
  } else if (Ember['default'].HTMLBars.makeBoundHelper) {
    forExport = Ember['default'].HTMLBars.makeBoundHelper(or.orHelper);
  }

  exports['default'] = forExport;

});
define('dummy/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, Ember, xor) {

  'use strict';

  var forExport = null;

  if (Ember['default'].Helper) {
    forExport = Ember['default'].Helper.helper(xor.xorHelper);
  } else if (Ember['default'].HTMLBars.makeBoundHelper) {
    forExport = Ember['default'].HTMLBars.makeBoundHelper(xor.xorHelper);
  }

  exports['default'] = forExport;

});
define('dummy/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'dummy/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('dummy/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, Ember, register_helper, and, or, equal, not, is_array, not_equal, gt, gte, lt, lte) {

  'use strict';

  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (Ember['default'].Helper) {
      return;
    }

    register_helper.registerHelper('and', and.andHelper);
    register_helper.registerHelper('or', or.orHelper);
    register_helper.registerHelper('eq', equal.equalHelper);
    register_helper.registerHelper('not', not.notHelper);
    register_helper.registerHelper('is-array', is_array.isArrayHelper);
    register_helper.registerHelper('not-eq', not_equal.notEqualHelper);
    register_helper.registerHelper('gt', gt.gtHelper);
    register_helper.registerHelper('gte', gte.gteHelper);
    register_helper.registerHelper('lt', lt.ltHelper);
    register_helper.registerHelper('lte', lte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
  };

});
define('dummy/models/user', ['exports', 'ember', 'ember-data', 'ember-validation/mixins/model'], function (exports, Ember, DS, ValidationMixin) {

  'use strict';

  var computed = Ember['default'].computed;
  var attr = DS['default'].attr;

  var GENDERS = {
    MALE: "male",
    FEMALE: "female",
    UNKNOWN: ""
  };

  exports['default'] = DS['default'].Model.extend(ValidationMixin['default'], {

    /**
      @property _validationScheme
      @type Object
      @protected
      @final
    */
    validationScheme: {

      first_name: {
        validators: [{ name: "required", options: { messages: { "default": "first_name_required" } } }]
      },

      last_name: {
        validators: [{ name: "required", options: { messages: { "default": "last_name_required" } } }]
      },

      full_name: {
        validators: [{ name: "required", options: { messages: { "default": "full_name_required" } } }]
      },

      gender: {
        validators: [{ name: "required", options: { messages: { "default": "gender_is_required" } } }]
      },

      age: {
        options: {
          isUnknown: computed.equal("context.gender", GENDERS.UNKNOWN),
          condition: computed.not("isUnknown")
        },
        validators: [{ name: "number", options: { min: 21, max: 65, messages: { "default": "age_is_wrong_for_male" }, condition: computed.equal("context.gender", GENDERS.MALE) } }, { name: "number", options: { min: 18, max: 55, messages: { "default": "age_is_wrong_for_female" }, condition: computed.equal("context.gender", GENDERS.FEMALE) } }]
      },

      phone: {
        options: { condition: computed.not('context.email') },
        validators: [{ name: 'required' }]
      },
      email: {
        options: { condition: computed.not('context.phone') },
        validators: [{ name: 'required' }]
      }

    },

    first_name: attr("string", { defaultValue: '' }),
    last_name: attr("string", { defaultValue: '' }),
    gender: attr("string", { defaultValue: GENDERS.UNKNOWN }),
    age: attr("number"),
    email: attr("string", { defaultValue: '' }),
    phone: attr("string", { defaultValue: '' }),
    full_name: computed("first_name", "last_name", function () {
      return [this.get("first_name"), this.get("last_name")].join(" ");
    }),

    _t: Ember['default'].observer('first_name', function () {
      console.log('first_name did change', this.get('first_name'));
    })

  });

});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('examples', function () {
      this.route('simple');
      this.route('conditional');
      this.route('composition');
      this.route('form');
    });
  });

  exports['default'] = Router;

});
define('dummy/routes/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('dummy/routes/examples/conditional', ['exports', 'ember', 'ember-data', 'ember-validation/mixins/model'], function (exports, Ember, DS, ValidationMixin) {

  'use strict';

  var computed = Ember['default'].computed;
  var attr = DS['default'].attr;
  var Model1 = DS['default'].Model.extend(ValidationMixin['default'], {
    validationScheme: {
      age: {
        options: {
          condition: computed.bool("context.validateAge")
        },
        validators: [{ name: "required" }, { name: "number" }]
      }
    },
    age: attr("number"),
    validateAge: attr('boolean', { defaultValue: false })
  });

  var Model2 = DS['default'].Model.extend(ValidationMixin['default'], {
    validationScheme: {
      age: {
        validators: [{ name: "required" }, { name: "number", options: { condition: computed.equal("context.gender", "male"), min: 10, max: 20 } }, { name: "number", options: { condition: computed.equal("context.gender", "female"), min: 15, max: 25 } }]
      }
    },
    age: attr("number", { defaultValue: 12 }),
    gender: attr("string", { defaultValue: "male" })
  });

  exports['default'] = Ember['default'].Route.extend({

    beforeModel: function beforeModel() {
      this.container._registry.register("model:model-1", Model1);
      this.container._registry.register("model:model-2", Model2);
    },

    model: function model() {
      return {
        "model_1": this.store.createRecord("model-1"),
        "model_2": this.store.createRecord("model-2")
      };
    },

    exit: function exit() {
      this.container._registry.unregister("model:model-1");
      this.container._registry.unregister("model:model-2");
    }

  });

  exports.Model1 = Model1;
  exports.Model2 = Model2;

});
define('dummy/routes/examples/form', ['exports', 'ember', 'ember-data', 'ember-validation/mixins/model'], function (exports, Ember, DS, ValidationMixin) {

  'use strict';

  var computed = Ember['default'].computed;
  var attr = DS['default'].attr;
  var User = DS['default'].Model.extend(ValidationMixin['default'], {
    validationScheme: {
      name: {
        validators: [{ name: 'required' }]
      },
      phone: {
        options: computed.not('context.email'),
        validators: [{ name: 'required' }]
      },
      email: {
        options: computed.not('context.phone'),
        validators: [{ name: 'required' }]
      }
    },
    name: attr("string"),
    phone: attr("string"),
    email: attr("string")
  });

  exports['default'] = Ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      // this.container._registry.register("model:user", User);
    },

    model: function model() {
      var model = this.get('_model');

      if (!model) {
        model = this.store.createRecord("user");
        this.set('_model', model);
      }
      return model;
    },

    exit: function exit() {
      // this.container._registry.unregister("model:user");
    },

    actions: {
      setUser: function setUser(type) {
        var user = this.store.createRecord("user");

        if (type === 'edit') {
          user.setProperties({
            id: 1,
            first_name: 'Ivan',
            last_name: 'Ivanov',
            email: 'bla@gmail.com',
            phone: '+79231231212',
            gender: 'man',
            age: 40
          });
        }

        this.set('_model', user);

        this.refresh();
      }
    }
  });

  exports.User = User;

});
define('dummy/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container container-fluid");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1]),1,1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","partial",["partials/navigation"],[],["loc",[null,[1,0],[1,33]]]],
        ["content","outlet",["loc",[null,[5,2],[5,12]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/components/error-list', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 5,
                "column": 4
              }
            },
            "moduleName": "dummy/templates/components/error-list.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1,"class","validation-error");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["content","error.message",["loc",[null,[4,35],[4,52]]]]
          ],
          locals: ["error"],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "dummy/templates/components/error-list.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          dom.setAttribute(el1,"class","validation-error-list");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["block","each",[["get","errors",["loc",[null,[3,12],[3,18]]]]],[],0,null,["loc",[null,[3,4],[5,13]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/components/error-list.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","errors.length",["loc",[null,[1,6],[1,19]]]]],[],0,null,["loc",[null,[1,0],[7,7]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/templates/components/errors-list', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.7",
              "loc": {
                "source": null,
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 6,
                  "column": 6
                }
              },
              "moduleName": "dummy/templates/components/errors-list.hbs"
            },
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("li");
              dom.setAttribute(el1,"class","validation-error");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
              return morphs;
            },
            statements: [
              ["content","error.message",["loc",[null,[5,37],[5,54]]]]
            ],
            locals: ["error"],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 8,
                "column": 2
              }
            },
            "moduleName": "dummy/templates/components/errors-list.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("ul");
            dom.setAttribute(el1,"class","validation-error-list");
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
            return morphs;
          },
          statements: [
            ["block","each",[["get","errors",["loc",[null,[4,14],[4,20]]]]],[],0,null,["loc",[null,[4,6],[6,15]]]]
          ],
          locals: [],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 0
            }
          },
          "moduleName": "dummy/templates/components/errors-list.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","if",[["get","errors.length",["loc",[null,[2,8],[2,21]]]]],[],0,null,["loc",[null,[2,2],[8,9]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/components/errors-list.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["block","if",[["get","show",["loc",[null,[1,6],[1,10]]]]],[],0,null,["loc",[null,[1,0],[9,7]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/templates/examples/conditional', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 12
            },
            "end": {
              "line": 12,
              "column": 12
            }
          },
          "moduleName": "dummy/templates/examples/conditional.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("              ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","alert alert-success");
          var el2 = dom.createTextNode("\n                ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2,"class","glyphicon glyphicon-ok-sign");
          dom.setAttribute(el2,"aria-hidden","true");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                The model is valid\n              ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 12
            },
            "end": {
              "line": 17,
              "column": 12
            }
          },
          "moduleName": "dummy/templates/examples/conditional.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("              ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","alert alert-danger");
          var el2 = dom.createTextNode("\n                ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2,"class","glyphicon glyphicon-exclamation-sign");
          dom.setAttribute(el2,"aria-hidden","true");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                Some fields of the model invalid\n              ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 38,
              "column": 12
            },
            "end": {
              "line": 43,
              "column": 12
            }
          },
          "moduleName": "dummy/templates/examples/conditional.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("              ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","alert alert-success");
          var el2 = dom.createTextNode("\n                ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2,"class","glyphicon glyphicon-ok-sign");
          dom.setAttribute(el2,"aria-hidden","true");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                The model is valid\n              ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 43,
              "column": 12
            },
            "end": {
              "line": 48,
              "column": 12
            }
          },
          "moduleName": "dummy/templates/examples/conditional.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("              ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","alert alert-danger");
          var el2 = dom.createTextNode("\n                ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2,"class","glyphicon glyphicon-exclamation-sign");
          dom.setAttribute(el2,"aria-hidden","true");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                Some fields of the model invalid\n              ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 75,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/examples/conditional.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Conditional validation");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-xs-6");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("formset");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("legend");
        var el5 = dom.createTextNode("Condition on attribute");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","control-label");
        var el7 = dom.createTextNode("Age");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","form-group");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","control-label");
        var el7 = dom.createTextNode("Validate age");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"type","submit");
        dom.setAttribute(el5,"class","btn btn-default");
        var el6 = dom.createTextNode("Validate");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-xs-6");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("formset");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("legend");
        var el5 = dom.createTextNode("Condition on validator");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","control-label");
        var el7 = dom.createTextNode("Gender");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("select");
        dom.setAttribute(el6,"class","form-control");
        var el7 = dom.createTextNode("\n                ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("option");
        dom.setAttribute(el7,"value","male");
        var el8 = dom.createTextNode("Male");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("option");
        dom.setAttribute(el7,"value","female");
        var el8 = dom.createTextNode("Female");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"class","control-label");
        var el7 = dom.createTextNode("Age");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"id","helpBlock2");
        dom.setAttribute(el6,"class","help-block");
        var el7 = dom.createTextNode("For men range is: [10, 20]. For women range is: [15, 25].");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"type","submit");
        dom.setAttribute(el5,"class","btn btn-default");
        var el6 = dom.createTextNode("Validate");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1, 1, 3]);
        var element2 = dom.childAt(element1, [3]);
        var element3 = dom.childAt(element0, [3, 1, 3]);
        var element4 = dom.childAt(element3, [3]);
        var element5 = dom.childAt(element4, [3]);
        var element6 = dom.childAt(element3, [5]);
        var morphs = new Array(14);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createMorphAt(element1,1,1);
        morphs[2] = dom.createAttrMorph(element2, 'class');
        morphs[3] = dom.createMorphAt(element2,3,3);
        morphs[4] = dom.createMorphAt(element2,5,5);
        morphs[5] = dom.createMorphAt(dom.childAt(element1, [5]),3,3);
        morphs[6] = dom.createElementMorph(element3);
        morphs[7] = dom.createMorphAt(element3,1,1);
        morphs[8] = dom.createAttrMorph(element4, 'class');
        morphs[9] = dom.createAttrMorph(element5, 'onchange');
        morphs[10] = dom.createMorphAt(element4,5,5);
        morphs[11] = dom.createAttrMorph(element6, 'class');
        morphs[12] = dom.createMorphAt(element6,3,3);
        morphs[13] = dom.createMorphAt(element6,7,7);
        return morphs;
      },
      statements: [
        ["element","action",["validateModel1"],["on","submit"],["loc",[null,[6,16],[6,55]]]],
        ["block","if",[["get","model.model_1.isValid",["loc",[null,[7,18],[7,39]]]]],[],0,1,["loc",[null,[7,12],[17,19]]]],
        ["attribute","class",["concat",["form-group ",["subexpr","if",[["get","model.model_1.errors.age",["loc",[null,[19,40],[19,64]]]],"has-error","has-success"],[],["loc",[null,[19,35],[19,92]]]]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.model_1.age",["loc",[null,[21,28],[21,45]]]]],[],[]],"class","form-control"],["loc",[null,[21,14],[21,68]]]],
        ["inline","error-list",[],["errors",["subexpr","@mut",[["get","model.model_1.errors.age",["loc",[null,[22,34],[22,58]]]]],[],[]]],["loc",[null,[22,14],[22,60]]]],
        ["inline","input",[],["type","checkbox","checked",["subexpr","@mut",[["get","model.model_1.validateAge",["loc",[null,[27,46],[27,71]]]]],[],[]]],["loc",[null,[27,14],[27,73]]]],
        ["element","action",["validateModel2"],["on","submit"],["loc",[null,[37,16],[37,55]]]],
        ["block","if",[["get","model.model_2.isValid",["loc",[null,[38,18],[38,39]]]]],[],2,3,["loc",[null,[38,12],[48,19]]]],
        ["attribute","class",["concat",["form-group ",["subexpr","if",[["get","model.model_2.errors.gender",["loc",[null,[50,40],[50,67]]]],"has-error","has-success"],[],["loc",[null,[50,35],[50,95]]]]]]],
        ["attribute","onchange",["subexpr","action",["setGender"],["value","target.value"],["loc",[null,[52,52],[52,95]]]]],
        ["inline","error-list",[],["errors",["subexpr","@mut",[["get","model.model_2.errors.gender",["loc",[null,[56,34],[56,61]]]]],[],[]]],["loc",[null,[56,14],[56,63]]]],
        ["attribute","class",["concat",["form-group ",["subexpr","if",[["get","model.model_2.errors.age",["loc",[null,[59,40],[59,64]]]],"has-error","has-success"],[],["loc",[null,[59,35],[59,92]]]]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.model_2.age",["loc",[null,[61,28],[61,45]]]]],[],[]],"class","form-control"],["loc",[null,[61,14],[61,68]]]],
        ["inline","error-list",[],["errors",["subexpr","@mut",[["get","model.model_2.errors.age",["loc",[null,[63,34],[63,58]]]]],[],[]]],["loc",[null,[63,14],[63,60]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  }()));

});
define('dummy/templates/examples/form', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 30,
                "column": 10
              },
              "end": {
                "line": 46,
                "column": 10
              }
            },
            "moduleName": "dummy/templates/examples/form.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","panel-body");
            var el2 = dom.createTextNode("\n\n              ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            var el3 = dom.createTextNode("\n                ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("label");
            dom.setAttribute(el3,"class","control-label");
            var el4 = dom.createTextNode("Phone");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n              ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n\n              ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            var el3 = dom.createTextNode("\n                ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("label");
            dom.setAttribute(el3,"class","control-label");
            var el4 = dom.createTextNode("Email");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n              ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n\n            ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(element0, [1]);
            var element2 = dom.childAt(element0, [3]);
            var morphs = new Array(6);
            morphs[0] = dom.createAttrMorph(element1, 'class');
            morphs[1] = dom.createMorphAt(element1,3,3);
            morphs[2] = dom.createMorphAt(element1,5,5);
            morphs[3] = dom.createAttrMorph(element2, 'class');
            morphs[4] = dom.createMorphAt(element2,3,3);
            morphs[5] = dom.createMorphAt(element2,5,5);
            return morphs;
          },
          statements: [
            ["attribute","class",["concat",["form-group ",["subexpr","if",[["subexpr","and",[["get","model.errors.phone",["loc",[null,[33,47],[33,65]]]],["get","formView.visibleErrors.phone",["loc",[null,[33,66],[33,94]]]]],[],["loc",[null,[33,42],[33,95]]]],"has-error"],[],["loc",[null,[33,37],[33,109]]]]]]],
            ["inline","input",[],["value",["subexpr","@mut",[["get","model.phone",["loc",[null,[35,30],[35,41]]]]],[],[]],"class","form-control","validate-path","phone"],["loc",[null,[35,16],[35,86]]]],
            ["inline","errors-list",[],["errors",["subexpr","@mut",[["get","model.errors.phone",["loc",[null,[36,37],[36,55]]]]],[],[]],"show",["subexpr","@mut",[["get","formView.visibleErrors.phone",["loc",[null,[36,61],[36,89]]]]],[],[]]],["loc",[null,[36,16],[36,91]]]],
            ["attribute","class",["concat",["form-group ",["subexpr","if",[["subexpr","and",[["get","model.errors.email",["loc",[null,[39,47],[39,65]]]],["get","formView.visibleErrors.email",["loc",[null,[39,66],[39,94]]]]],[],["loc",[null,[39,42],[39,95]]]],"has-error"],[],["loc",[null,[39,37],[39,109]]]]]]],
            ["inline","input",[],["value",["subexpr","@mut",[["get","model.email",["loc",[null,[41,30],[41,41]]]]],[],[]],"class","form-control","validate-path","email"],["loc",[null,[41,16],[41,86]]]],
            ["inline","errors-list",[],["errors",["subexpr","@mut",[["get","model.errors.email",["loc",[null,[42,37],[42,55]]]]],[],[]],"show",["subexpr","@mut",[["get","formView.visibleErrors.email",["loc",[null,[42,61],[42,89]]]]],[],[]]],["loc",[null,[42,16],[42,91]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 4
            },
            "end": {
              "line": 51,
              "column": 4
            }
          },
          "moduleName": "dummy/templates/examples/form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      isValid: ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      errors.length: ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          dom.setAttribute(el2,"class","control-label");
          var el3 = dom.createTextNode("First name");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          dom.setAttribute(el2,"class","control-label");
          var el3 = dom.createTextNode("Last name");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","form-group");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","panel panel-default");
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","panel-heading");
          var el4 = dom.createTextNode("Email and phone");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [8]);
          var element4 = dom.childAt(fragment, [10]);
          var element5 = dom.childAt(fragment, [12, 1]);
          var element6 = dom.childAt(element5, [1]);
          var morphs = new Array(11);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,4,4,contextualElement);
          morphs[2] = dom.createMorphAt(fragment,6,6,contextualElement);
          morphs[3] = dom.createAttrMorph(element3, 'class');
          morphs[4] = dom.createMorphAt(element3,3,3);
          morphs[5] = dom.createMorphAt(element3,5,5);
          morphs[6] = dom.createAttrMorph(element4, 'class');
          morphs[7] = dom.createMorphAt(element4,3,3);
          morphs[8] = dom.createMorphAt(element4,5,5);
          morphs[9] = dom.createElementMorph(element6);
          morphs[10] = dom.createMorphAt(element5,3,3);
          return morphs;
        },
        statements: [
          ["content","formView.isValid",["loc",[null,[13,15],[13,35]]]],
          ["content","formView.errors.length",["loc",[null,[14,21],[14,47]]]],
          ["content","formView.validation-context",["loc",[null,[14,51],[14,82]]]],
          ["attribute","class",["concat",["form-group ",["subexpr","if",[["subexpr","and",[["get","model.errors.first_name",["loc",[null,[15,39],[15,62]]]],["get","formView.visibleErrors.first_name",["loc",[null,[15,63],[15,96]]]]],[],["loc",[null,[15,34],[15,97]]]],"has-error"],[],["loc",[null,[15,29],[15,111]]]]]]],
          ["inline","input",[],["value",["subexpr","@mut",[["get","model.first_name",["loc",[null,[17,22],[17,38]]]]],[],[]],"class","form-control","validate-path","first_name"],["loc",[null,[17,8],[17,88]]]],
          ["inline","errors-list",[],["errors",["subexpr","@mut",[["get","model.errors.first_name",["loc",[null,[18,29],[18,52]]]]],[],[]],"show",["subexpr","@mut",[["get","formView.visibleErrors.first_name",["loc",[null,[18,58],[18,91]]]]],[],[]]],["loc",[null,[18,8],[18,93]]]],
          ["attribute","class",["concat",["form-group ",["subexpr","if",[["subexpr","and",[["get","model.errors.last_name",["loc",[null,[21,39],[21,61]]]],["get","formView.visibleErrors.last_name",["loc",[null,[21,62],[21,94]]]]],[],["loc",[null,[21,34],[21,95]]]],"has-error"],[],["loc",[null,[21,29],[21,109]]]]]]],
          ["inline","input",[],["value",["subexpr","@mut",[["get","model.last_name",["loc",[null,[23,22],[23,37]]]]],[],[]],"class","form-control","validate-path","last_name"],["loc",[null,[23,8],[23,86]]]],
          ["inline","errors-list",[],["errors",["subexpr","@mut",[["get","model.errors.last_name",["loc",[null,[24,29],[24,51]]]]],[],[]],"show",["subexpr","@mut",[["get","formView.visibleErrors.last_name",["loc",[null,[24,57],[24,89]]]]],[],[]]],["loc",[null,[24,8],[24,91]]]],
          ["element","action",["toggleEmailAndPhone"],[],["loc",[null,[29,37],[29,69]]]],
          ["block","if",[["get","emailAndPhoneOpened",["loc",[null,[30,16],[30,35]]]]],[],0,null,["loc",[null,[30,10],[46,17]]]]
        ],
        locals: ["formView"],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 54,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/examples/form.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Form-validation component");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-xs-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","btn-group btn-group-lg");
        dom.setAttribute(el3,"role","group");
        dom.setAttribute(el3,"aria-label","...");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"type","button");
        dom.setAttribute(el4,"class","btn btn-success");
        var el5 = dom.createTextNode("New user");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"type","button");
        dom.setAttribute(el4,"class","btn btn-info");
        var el5 = dom.createTextNode("Edit user");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-xs-6");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element7 = dom.childAt(fragment, [2, 1, 1]);
        var element8 = dom.childAt(element7, [1]);
        var element9 = dom.childAt(element7, [3]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element8);
        morphs[1] = dom.createElementMorph(element9);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4, 1]),1,1);
        return morphs;
      },
      statements: [
        ["element","action",["setUser","new"],[],["loc",[null,[5,52],[5,78]]]],
        ["element","action",["setUser","edit"],[],["loc",[null,[6,49],[6,76]]]],
        ["block","form-validation",[],["validation-context",["subexpr","@mut",[["get","model",["loc",[null,[12,42],[12,47]]]]],[],[]]],0,null,["loc",[null,[12,4],[51,24]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/templates/examples/simple', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 4
            },
            "end": {
              "line": 9,
              "column": 4
            }
          },
          "moduleName": "dummy/templates/examples/simple.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","alert alert-info");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["content","validationResult",["loc",[null,[7,8],[7,28]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 4
            },
            "end": {
              "line": 16,
              "column": 4
            }
          },
          "moduleName": "dummy/templates/examples/simple.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","alert alert-success");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2,"class","glyphicon glyphicon-ok-sign");
          dom.setAttribute(el2,"aria-hidden","true");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        The model is valid\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 4
            },
            "end": {
              "line": 21,
              "column": 4
            }
          },
          "moduleName": "dummy/templates/examples/simple.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","alert alert-danger");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2,"class","glyphicon glyphicon-exclamation-sign");
          dom.setAttribute(el2,"aria-hidden","true");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        Some fields of the model invalid\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 58,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/examples/simple.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Simple model");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("formset");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("legend");
        var el3 = dom.createTextNode("On demand");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"class","control-label");
        var el5 = dom.createTextNode("First name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","javascript: void 0;");
        dom.setAttribute(el4,"class","pseudo");
        var el5 = dom.createTextNode("Validate field");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"class","control-label");
        var el5 = dom.createTextNode("Last name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","javascript: void 0;");
        dom.setAttribute(el4,"class","pseudo");
        var el5 = dom.createTextNode("Validate field");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"class","control-label");
        var el5 = dom.createTextNode("Full name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","javascript: void 0;");
        dom.setAttribute(el4,"class","pseudo");
        var el5 = dom.createTextNode("Validate field");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"class","control-label");
        var el5 = dom.createTextNode("Gender");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("select");
        dom.setAttribute(el4,"class","form-control");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("option");
        dom.setAttribute(el5,"value","");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("option");
        dom.setAttribute(el5,"value","male");
        var el6 = dom.createTextNode("Male");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("option");
        dom.setAttribute(el5,"value","female");
        var el6 = dom.createTextNode("Female");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","javascript: void 0;");
        dom.setAttribute(el4,"class","pseudo");
        var el5 = dom.createTextNode("Validate field");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"type","submit");
        dom.setAttribute(el3,"class","btn btn-default");
        var el4 = dom.createTextNode("Validate");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"type","button");
        dom.setAttribute(el3,"class","btn btn-default");
        var el4 = dom.createTextNode("Check");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 3]);
        var element1 = dom.childAt(element0, [5]);
        var element2 = dom.childAt(element1, [7]);
        var element3 = dom.childAt(element0, [7]);
        var element4 = dom.childAt(element3, [7]);
        var element5 = dom.childAt(element0, [9]);
        var element6 = dom.childAt(element5, [7]);
        var element7 = dom.childAt(element0, [11]);
        var element8 = dom.childAt(element7, [3]);
        var element9 = dom.childAt(element7, [7]);
        var element10 = dom.childAt(element0, [15]);
        var morphs = new Array(20);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(element0,1,1);
        morphs[2] = dom.createMorphAt(element0,3,3);
        morphs[3] = dom.createAttrMorph(element1, 'class');
        morphs[4] = dom.createMorphAt(element1,3,3);
        morphs[5] = dom.createMorphAt(element1,5,5);
        morphs[6] = dom.createElementMorph(element2);
        morphs[7] = dom.createAttrMorph(element3, 'class');
        morphs[8] = dom.createMorphAt(element3,3,3);
        morphs[9] = dom.createMorphAt(element3,5,5);
        morphs[10] = dom.createElementMorph(element4);
        morphs[11] = dom.createAttrMorph(element5, 'class');
        morphs[12] = dom.createMorphAt(element5,3,3);
        morphs[13] = dom.createMorphAt(element5,5,5);
        morphs[14] = dom.createElementMorph(element6);
        morphs[15] = dom.createAttrMorph(element7, 'class');
        morphs[16] = dom.createAttrMorph(element8, 'onchange');
        morphs[17] = dom.createMorphAt(element7,5,5);
        morphs[18] = dom.createElementMorph(element9);
        morphs[19] = dom.createElementMorph(element10);
        return morphs;
      },
      statements: [
        ["element","action",["validate"],["on","submit"],["loc",[null,[4,8],[4,41]]]],
        ["block","if",[["get","validationResult",["loc",[null,[5,10],[5,26]]]]],[],0,null,["loc",[null,[5,4],[9,11]]]],
        ["block","if",[["get","user.isValid",["loc",[null,[11,10],[11,22]]]]],[],1,2,["loc",[null,[11,4],[21,11]]]],
        ["attribute","class",["concat",["form-group ",["subexpr","if",[["get","user.errors.first_name",["loc",[null,[23,32],[23,54]]]],"has-error"],[],["loc",[null,[23,27],[23,68]]]]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","user.first_name",["loc",[null,[25,20],[25,35]]]]],[],[]],"class","form-control"],["loc",[null,[25,6],[25,58]]]],
        ["inline","error-list",[],["errors",["subexpr","@mut",[["get","user.errors.first_name",["loc",[null,[26,26],[26,48]]]]],[],[]]],["loc",[null,[26,6],[26,50]]]],
        ["element","action",["validateField","first_name"],[],["loc",[null,[27,51],[27,90]]]],
        ["attribute","class",["concat",["form-group ",["subexpr","if",[["get","user.errors.last_name",["loc",[null,[30,32],[30,53]]]],"has-error"],[],["loc",[null,[30,27],[30,67]]]]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","user.last_name",["loc",[null,[32,20],[32,34]]]]],[],[]],"class","form-control"],["loc",[null,[32,6],[32,57]]]],
        ["inline","error-list",[],["errors",["subexpr","@mut",[["get","user.errors.last_name",["loc",[null,[33,26],[33,47]]]]],[],[]]],["loc",[null,[33,6],[33,49]]]],
        ["element","action",["validateField","last_name"],[],["loc",[null,[34,51],[34,89]]]],
        ["attribute","class",["concat",["form-group ",["subexpr","if",[["get","user.errors.full_name",["loc",[null,[36,32],[36,53]]]],"has-error"],[],["loc",[null,[36,27],[36,67]]]]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","user.full_name",["loc",[null,[38,20],[38,34]]]]],[],[]],"class","form-control","disabled",true],["loc",[null,[38,6],[38,71]]]],
        ["inline","error-list",[],["errors",["subexpr","@mut",[["get","user.errors.full_name",["loc",[null,[39,26],[39,47]]]]],[],[]]],["loc",[null,[39,6],[39,49]]]],
        ["element","action",["validateField","full_name"],[],["loc",[null,[40,51],[40,89]]]],
        ["attribute","class",["concat",["form-group ",["subexpr","if",[["get","user.errors.gender",["loc",[null,[43,32],[43,50]]]],"has-error"],[],["loc",[null,[43,27],[43,64]]]]]]],
        ["attribute","onchange",["subexpr","action",["setGender"],["value","target.value"],["loc",[null,[45,44],[45,87]]]]],
        ["inline","error-list",[],["errors",["subexpr","@mut",[["get","user.errors.gender",["loc",[null,[50,26],[50,44]]]]],[],[]]],["loc",[null,[50,6],[50,46]]]],
        ["element","action",["validateField","gender"],[],["loc",[null,[51,51],[51,86]]]],
        ["element","action",["check"],[],["loc",[null,[55,50],[55,68]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('dummy/templates/partials/navigation', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 16
            },
            "end": {
              "line": 20,
              "column": 63
            }
          },
          "moduleName": "dummy/templates/partials/navigation.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Simple validation");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 16
            },
            "end": {
              "line": 21,
              "column": 81
            }
          },
          "moduleName": "dummy/templates/partials/navigation.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Partial/Conditional validation");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 22,
              "column": 16
            },
            "end": {
              "line": 22,
              "column": 75
            }
          },
          "moduleName": "dummy/templates/partials/navigation.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Композиционная валидация");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 30,
              "column": 16
            },
            "end": {
              "line": 30,
              "column": 49
            }
          },
          "moduleName": "dummy/templates/partials/navigation.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Форма");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 37,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/partials/navigation.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1,"class","navbar navbar-default");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container-fluid");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Brand and toggle get grouped for better mobile display ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","navbar-header");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"type","button");
        dom.setAttribute(el4,"class","navbar-toggle collapsed");
        dom.setAttribute(el4,"data-toggle","collapse");
        dom.setAttribute(el4,"data-target","#bs-example-navbar-collapse-1");
        dom.setAttribute(el4,"aria-expanded","false");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","sr-only");
        var el6 = dom.createTextNode("Validation");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"class","navbar-brand");
        dom.setAttribute(el4,"href","#");
        var el5 = dom.createTextNode("Ember Validation");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Collect the nav links, forms, and other content for toggling ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","collapse navbar-collapse");
        dom.setAttribute(el3,"id","bs-example-navbar-collapse-1");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","nav navbar-nav");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5,"class","dropdown");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","#");
        dom.setAttribute(el6,"class","dropdown-toggle");
        dom.setAttribute(el6,"data-toggle","dropdown");
        dom.setAttribute(el6,"role","button");
        dom.setAttribute(el6,"aria-haspopup","true");
        dom.setAttribute(el6,"aria-expanded","false");
        var el7 = dom.createTextNode("Examples ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"class","caret");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        dom.setAttribute(el6,"class","dropdown-menu");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        var el9 = dom.createTextNode("Добавление и удаление валидаторов на лету");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"role","separator");
        dom.setAttribute(el7,"class","divider");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        var el9 = dom.createTextNode("Валидация связанной модели");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        var el9 = dom.createTextNode("Собственная валидация");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        var el9 = dom.createTextNode("Смешанная валидация");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        var el9 = dom.createTextNode("Рекурсивный вызов вылидации");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        var el9 = dom.createTextNode("Эскалация и аккумуляция ошибок");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" /.navbar-collapse ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" /.container-fluid ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 7, 1, 1, 3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [21]),0,0);
        return morphs;
      },
      statements: [
        ["block","link-to",["examples.simple"],[],0,null,["loc",[null,[20,16],[20,75]]]],
        ["block","link-to",["examples.conditional"],[],1,null,["loc",[null,[21,16],[21,93]]]],
        ["block","link-to",["examples.composition"],[],2,null,["loc",[null,[22,16],[22,87]]]],
        ["block","link-to",["examples.form"],[],3,null,["loc",[null,[30,16],[30,61]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  }()));

});
define('dummy/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });

});
define('dummy/tests/controllers/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/application.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass jshint.');
  });

});
define('dummy/tests/controllers/examples/conditional.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/examples/conditional.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/examples/conditional.js should pass jshint.');
  });

});
define('dummy/tests/controllers/examples/form.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/examples/form.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/examples/form.js should pass jshint.');
  });

});
define('dummy/tests/controllers/examples/simple.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/examples/simple.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/examples/simple.js should pass jshint.');
  });

});
define('dummy/tests/helpers/resolver', ['exports', 'ember/resolver', 'dummy/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('dummy/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });

});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('dummy/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });

});
define('dummy/tests/helpers/validators', ['exports', 'ember', 'ember-validation/core/validator'], function (exports, Ember, BaseValidator) {

  'use strict';

  var RSVP = Ember['default'].RSVP;
  var FailValidator = BaseValidator['default'].extend({

    messages: {
      'default': "failed"
    },

    _validate: function _validate() {
      this.trigger("failed");
      return RSVP.reject();
    }

  });

  exports.FailValidator = FailValidator;

});
define('dummy/tests/helpers/validators.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers/validators.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/validators.js should pass jshint.');
  });

});
define('dummy/tests/integration/components/form-validation-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('form-validation', 'Integration | Component | form validation', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 19
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'form-validation', ['loc', [null, [1, 0], [1, 19]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@1.13.7',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'form-validation', [], [], 0, null, ['loc', [null, [2, 4], [4, 24]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('dummy/tests/integration/components/form-validation-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/form-validation-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/form-validation-test.js should pass jshint.');
  });

});
define('dummy/tests/integration/utils/lookup-test', ['ember', 'qunit', 'dummy/utils/lookup', 'dummy/tests/helpers/start-app'], function (Ember, qunit, lookup, startApp) {

  'use strict';

  qunit.module('Integration | Utility | lookup', {
    integration: true,
    setup: function setup() {
      this.app = startApp['default']();
    },
    teardown: function teardown() {
      Ember['default'].run(this.app, 'destroy');
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {

    var app = this.app;
    var container = app.__container__;

    assert.throws(function () {
      return lookup['default']();
    }, "Throws an error when no name nor container");
    assert.throws(function () {
      return lookup['default']("", container);
    }, "Throws an error when name wrong");
    assert.throws(function () {
      return lookup['default'](null, container);
    }, "Throws an error when name wrong");
    assert.throws(function () {
      return lookup['default'](undefined, container);
    }, "Throws an error when name wrong");
    assert.throws(function () {
      return lookup['default']("aaaa", "Throws an error when name wrong and no container");
    });
    assert.throws(function () {
      return lookup['default']("imaginary-validator", container);
    }, "Throws an error when validator not found");

    var name = "test";
    var ValidatorClass = Ember['default'].Object.extend({ name: "TEST_VALIDATOR" });
    container._registry.register('validator:' + name, ValidatorClass);
    var Validator = lookup['default'](name, container);

    assert.ok(Validator.create() instanceof ValidatorClass, "Function returns validator from registry by name");
  });

});
define('dummy/tests/integration/utils/lookup-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/utils/lookup-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'integration/utils/lookup-test.js should pass jshint.');
  });

});
define('dummy/tests/models/user.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/user.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass jshint.');
  });

});
define('dummy/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });

});
define('dummy/tests/routes/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/application.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });

});
define('dummy/tests/routes/examples/conditional.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/examples/conditional.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'routes/examples/conditional.js should pass jshint.');
  });

});
define('dummy/tests/routes/examples/form.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/examples/form.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'routes/examples/form.js should pass jshint.');
  });

});
define('dummy/tests/test-helper', ['dummy/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('dummy/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });

});
define('dummy/tests/unit/mediators/base-test', ['ember', 'qunit', 'ember-validation/core/mediator'], function (Ember, qunit, BaseMediator) {

  'use strict';

  var RSVP = Ember['default'].RSVP;

  qunit.module('Unit | Mediators | Base', {
    setup: function setup() {}
  });

  qunit.test('it has interface', function (assert) {

    var Mediator = BaseMediator['default'].extend();
    var mediator = Mediator.create();

    assert.ok(mediator.get("isValidatable"), "Mediators are validatable");
    assert.ok(Ember['default'].typeOf(mediator.trigger) === "function", "Mediators are evented");
    assert.ok(Ember['default'].typeOf(mediator.check) === "function", "Mediators has check method");
    assert.ok(mediator.hasObserverFor("condition"), "Mediators has observer for condition");
    assert.ok(mediator.options, "Mediators has options");
    assert.ok(mediator.context, "Mediators has context");
  });

  qunit.test('it fires events', function (assert) {

    expect(3);

    Ember['default'].run(function () {
      var Mediator = BaseMediator['default'].extend();
      var mediator = Mediator.create();
      mediator.on("passed", function () {
        assert.ok(true, "Mediators triggers `passed` event when validation passed");
      });
      mediator.validate();
    });

    Ember['default'].run(function () {
      var Mediator = BaseMediator['default'].extend({ _validate: function _validate() {
          return RSVP.reject();
        } });
      var mediator = Mediator.create();
      mediator.on("failed", function () {
        assert.ok(true, "Mediators triggers `failed` event when validation failed");
      });
      mediator.validate();
    });

    Ember['default'].run(function () {
      var Mediator = BaseMediator['default'].extend();
      var mediator = Mediator.create();
      mediator.on("conditionChanged", function () {
        assert.ok(true, "Mediators triggers `conditionChanged` event when condition changed");
      });
      mediator.set("condition", true);
    });
  });

  qunit.test('it returns promise', function (assert) {

    expect(5);

    assert.ok(BaseMediator['default'].create().validate() instanceof Ember['default'].RSVP.Promise, "Mediators returns a promise");
    assert.ok(BaseMediator['default'].create().validate()._state === 1, "The validate method returns resolved promise as default");

    Ember['default'].run(function () {
      var Mediator = BaseMediator['default'].extend({ _validate: function _validate() {
          return RSVP.resolve();
        } });
      var mediator = Mediator.create();
      mediator.validate().then(function () {
        assert.ok(true, "Promise resolves when mediator passed validation");
      });
    });

    Ember['default'].run(function () {
      var Mediator = BaseMediator['default'].extend({ condition: false, _validate: function _validate() {
          return RSVP.reject();
        } });
      var mediator = Mediator.create();
      mediator.validate().then(function () {
        assert.ok(true, "Promise resolves when mediator's condition false");
      });
    });

    Ember['default'].run(function () {
      var Mediator = BaseMediator['default'].extend({ _validate: function _validate() {
          return RSVP.reject();
        } });
      var mediator = Mediator.create();
      mediator.validate()['catch'](function () {
        assert.ok(true, "Promise rejects with error when mediator failed");
      });
    });
  });

});
define('dummy/tests/unit/mediators/base-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mediators/base-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mediators/base-test.js should pass jshint.');
  });

});
define('dummy/tests/unit/mediators/element-test', ['dummy/mediators/element', 'qunit'], function (Mediator, qunit) {

  'use strict';

  qunit.module('Unit | Mediator | Element');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var subject = Mediator['default'].create();
    assert.ok(subject);
  });

});
define('dummy/tests/unit/mediators/element-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mediators/element-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mediators/element-test.js should pass jshint.');
  });

});
define('dummy/tests/unit/mixins/component-test', ['ember', 'dummy/mixins/component', 'qunit'], function (Ember, ComponentMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | component');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var ComponentObject = Ember['default'].Object.extend(ComponentMixin['default']);
    var subject = ComponentObject.create();
    assert.ok(subject);
  });

});
define('dummy/tests/unit/mixins/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins/component-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/component-test.js should pass jshint.');
  });

});
define('dummy/tests/unit/mixins/form-test', ['ember', 'dummy/mixins/form', 'qunit'], function (Ember, FormMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | form');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var FormObject = Ember['default'].Object.extend(FormMixin['default']);
    var subject = FormObject.create();
    assert.ok(subject);
  });

});
define('dummy/tests/unit/mixins/form-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins/form-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/form-test.js should pass jshint.');
  });

});
define('dummy/tests/unit/mixins/validation-test', ['ember', 'ember-validation/mixins/validation', 'ember-validation/mediators/attribute', 'ember-validation/mediators/validator', 'ember-validation/validators/required', 'ember-validation/core/errors', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/validators', 'qunit'], function (Ember, ValidationMixin, AttributeMediator, ValidatorMediator, RequiredValidator, Errors, startApp, validators, qunit) {

  'use strict';

  var RSVP = Ember['default'].RSVP;

  qunit.module('Unit | Mixin | validation', {
    integration: true,
    setup: function setup() {
      this.app = startApp['default']();
      this.app.__container__._registry.register("validator:fail", validators.FailValidator);
    },
    teardown: function teardown() {
      Ember['default'].run(this.app, 'destroy');
    }
  });

  qunit.test('it works', function (assert) {
    var ValidationObject = Ember['default'].Object.extend(ValidationMixin['default']);
    var subject = ValidationObject.create();
    assert.ok(subject);
  });

  qunit.test('it has interface', function (assert) {
    var ValidationObject = Ember['default'].Object.extend(ValidationMixin['default']);
    var subject = ValidationObject.create();

    assert.ok(subject.get("isValidatable"), "It's validatable");
    assert.ok(Ember['default'].typeOf(subject.validateByName) === "function", "It can run validation on attribute");
    assert.ok(Ember['default'].typeOf(subject.check) === "function", "It can run check on object");
    assert.ok(Ember['default'].typeOf(subject.checkByName) === "function", "It can run check on attribute");
  });

  qunit.test('is can run validation on attribute', function (assert) {
    var ValidationObject = Ember['default'].Object.extend(ValidationMixin['default']);
    var subject = ValidationObject.create();

    assert.throws(function () {
      return subject.validateByName();
    }, "Throws an error when attribute name is not provided");
    assert.throws(function () {
      return subject.validateByName("attrName");
    }, "Throws an error when mediator not found");
  });

  qunit.test('is creates mediators', function (assert) {
    var app = this.app;
    var container = app.__container__;
    var ValidationObject = Ember['default'].Object.extend(ValidationMixin['default'], {
      container: container,
      validationScheme: {
        number: {
          options: {
            testOption: true
          },
          validators: [{ "name": "required", options: { testOption: true } }, { "name": "number", options: { testOption: true } }]
        }
      }
    });
    var subject = ValidationObject.create();
    var mediators = subject.get("mediators");

    assert.equal(mediators.length, 1, "Should be exactly 1 attribute mediator");

    var attributeMediator = mediators.get("firstObject");
    assert.ok(attributeMediator instanceof AttributeMediator['default'], "Object contains in validation object's mediator collection is a AttributeMediator");
    assert.ok(attributeMediator.get("options"), "Attribute mediator should have options the same as they were declared");
    assert.ok(attributeMediator.get("context"), "Attribute mediator should have context");
    assert.equal(attributeMediator.get("context"), subject, "Attribute mediator's context should be object self");
    assert.ok(attributeMediator.get("attribute"), "Attribute mediator should have attribute name");

    assert.ok(attributeMediator.get("testOption"), "The object declared in the attr `options` of the validationScheme should be mixed into the attribute mediator");
    assert.equal(Ember['default'].typeOf(attributeMediator.pushObject), "function", "Attribute mediator should be enum object");
    assert.ok(attributeMediator.get("content"), "Attribute mediator should have content");
    assert.equal(attributeMediator.get("length"), 2, "Attribute mediator should contain exactly 2 validators");

    var validatorMediator = attributeMediator.get("firstObject");
    assert.ok(validatorMediator instanceof ValidatorMediator['default'], "Object contains in validation object's mediator collection is a AttributeMediator");
    assert.ok(validatorMediator.get("options"), "Validator mediator should have options the same as they were declared");
    assert.ok(validatorMediator.get("context"), "Validator mediator should have context");
    assert.equal(validatorMediator.get("context"), subject, "Validator mediator's context should be object self");
    assert.ok(validatorMediator.get("attribute"), "Validator mediator should have attribute name");

    assert.ok(validatorMediator.get("testOption"), "The object declared in the validator `options` of the validationScheme should be mixed into the validator mediator");
    assert.ok(validatorMediator.get("validator") instanceof RequiredValidator['default'], "First validator mediator should contain `required` validator");

    var ValidationObject_1 = Ember['default'].Object.extend(ValidationMixin['default'], {
      container: container
    });

    var subject_1 = ValidationObject_1.create();
    var mediators_1 = subject_1.get("mediators");

    assert.equal(mediators_1.length, 0, "Object without validationScheme doesn't have mediators");
  });

  qunit.test('it works with object\'s errors', function (assert) {
    var _this = this;

    expect(8);

    var app = this.app;
    var container = app.__container__;

    var ValidationObject = Ember['default'].Object.extend(ValidationMixin['default'], {
      container: container,
      validationScheme: {
        someAttributeName: {
          validators: [{ "name": "required" }, { "name": "fail" }]
        }
      },
      attribute: ""
    });

    var subject = ValidationObject.create();

    assert.ok(subject.get("errors") instanceof Errors['default'], "Error collection should be added if object doesn't have its own");

    assert.equal(subject.get("errors").get("length"), 0, "Subject doesn't have errors before validation");

    subject.validate()['catch'](function () {
      assert.equal(subject.get("errors.length"), 1, "If validation failed object should get errors");
      subject.clearErrors();
      assert.equal(subject.get("errors.length"), 0, "Errors length equal 0 after clearErrors");
      assert.ok(subject.get("isValid"), "Object become valid after clearErrors");

      subject.validate()['catch'](function () {
        assert.equal(subject.get("errors.someAttributeName.length"), 1, "Attribute someAttributeName has errors");
        subject.clearErrorsByName("someAttributeName");
        assert.ok(!subject.get("errors.someAttributeName.length"), "Errors length of someAttributeName attr equal 0 after clearErrorsByName");
      });
    });

    var mediators = subject.get("mediators");
    var attributeMediator = mediators.get("firstObject");

    subject.validate()['catch'](function () {
      assert.equal(subject.get("errors.length"), 1, "The object should contain only 1 error");
      attributeMediator.on("conditionChanged", function () {
        Ember['default'].run.scheduleOnce("actions", _this, function () {
          assert.equal(subject.get("errors.length"), 0, "When attribute validation condition changes it flushed field's errors");
        });
      });
    });
  });

  qunit.test('it validates', function (assert) {
    expect(3);
    var app = this.app;
    var container = app.__container__;
    // let validationCounter = 0;
    // const ValidationObjectFails = Ember.Object.extend(ValidationMixin, {
    //   container: container,
    //   validationScheme: {
    //     name: {
    //       validators: [
    //         { "name": "required" },
    //       ]
    //     },
    //     number: {
    //       validators: [
    //         { "name": "required" },
    //         { "name": "number" }
    //       ]
    //     }
    //   },
    //   _createAttributeMediator() {
    //     const mediator = this._super(...arguments);
    //     mediator.reopen({
    //       _validate() {
    //         validationCounter++;
    //         return this._super(...arguments);
    //       }
    //     });
    //     return mediator;
    //   },
    // });

    // const subjectFails = ValidationObjectFails.create();
    // var resultFailed = subjectFails.validate();

    // resultFailed.catch(() => {
    //   assert.ok(true, "Validating promise rejects if some validators failed");
    //   assert.ok(subjectFails.get("isInvalid"), "Object become invalid if validation failed");
    // });

    // resultFailed.finally(() => {
    //   assert.equal(validationCounter, 2, "Validate on object calls validate on every attribute mediator");
    // });

    var ValidationObjectPasses = Ember['default'].Object.extend(ValidationMixin['default'], {
      container: container,
      validationScheme: {
        name: {
          validators: [{ "name": "required" }]
        },
        number: {
          validators: [{ "name": "required" }]
        }
      },
      name: "Has value",
      number: "Has value"
    });

    var subjectPasses = ValidationObjectPasses.create();
    var resultPassed = subjectPasses.validate();

    assert.ok(resultPassed instanceof RSVP.Promise, "Validate method returns promise");

    resultPassed.then(function () {
      assert.ok(true, "Validating promise resolves if all validators passes");
      assert.ok(subjectPasses.get("isValid"), "Object become valid if validation passed");
    });
  });

  // test('it checks', function(assert) {
  //   assert.ok(false, "Check on object calls validate on every mediator");
  //   assert.ok(false, "Check doesn't occures an error on a field");
  //   assert.ok(false, "Check method returns promise");
  //   assert.ok(false, "Check promise resolves if all validators passes");
  //   assert.ok(false, "Check promise rejects if some validators failed");
  //   assert.ok(false, "Object do not become invalid if checking failed");
  //   assert.ok(false, "Object do not become valid if checking passed");
  // });

  qunit.test('it\'s inheritable', function (assert) {
    var app = this.app;
    var container = app.__container__;
    var User = Ember['default'].Object.extend(ValidationMixin['default'], {
      container: container,
      validationScheme: {
        name: {
          validators: [{ "name": "required" }]
        },
        age: {
          validators: [{ "name": "required" }]
        }
      },
      name: ""
    });

    var Driver = User.extend(ValidationMixin['default'], {
      container: container,
      validationScheme: {
        phone: {
          validators: [{ "name": "required" }]
        }
      },
      phone: ""
    });

    var Kid = User.extend(ValidationMixin['default'], {
      container: container,
      validationScheme: {
        age: {
          validators: [{ "name": "number", "options": { max: 18 } }]
        }
      }
    });

    var Employee = User.extend(ValidationMixin['default'], {
      container: container,
      validationScheme: {
        age: {
          validators: [{ "name": "number", "options": { min: 18 } }]
        }
      }
    });

    var user = User.create();
    var driver = Driver.create();
    var employee = Employee.create();
    var kid = Kid.create();

    var userMediators = user.get("mediators");
    var driverMediators = driver.get("mediators");
    var employeeMediators = employee.get("mediators");
    var kidMediators = kid.get("mediators");

    assert.equal(userMediators.get("length"), 2, "The user has 2 mediators");
    assert.equal(driverMediators.get("length"), 3, "The driver has 2 mediators from user and 1 its own, in total 3");
    assert.equal(employeeMediators.get("length"), 2, "The employee has 2 mediators");
    assert.equal(kidMediators.get("length"), 2, "The kid has 2 mediators");
  });

});
define('dummy/tests/unit/mixins/validation-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins/validation-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/validation-test.js should pass jshint.');
  });

});
define('dummy/tests/unit/utils/lookup-test', ['dummy/utils/lookup', 'qunit'], function (lookup, qunit) {

  'use strict';

  qunit.module('Unit | Utility | lookup');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    assert.throws(function () {
      return lookup['default']();
    });
  });

});
define('dummy/tests/unit/utils/lookup-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/utils/lookup-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/lookup-test.js should pass jshint.');
  });

});
define('dummy/tests/unit/validators/base-test', ['ember', 'qunit', 'ember-validation/core/validator'], function (Ember, qunit, BaseValidator) {

  'use strict';

  var RSVP = Ember['default'].RSVP;

  var ResolvesValidator = BaseValidator['default'].extend({ _validate: function _validate() {
      return RSVP.resolve();
    } });
  var RejectsValidator = BaseValidator['default'].extend({ _validate: function _validate() {
      return RSVP.reject("ERROR");
    } });

  var resolvesValidator = undefined;
  var rejectsValidator = undefined;

  qunit.module('Unit | Validator | Base');

  qunit.test('it has interface', function (assert) {

    expect(6);

    resolvesValidator = ResolvesValidator.create();
    rejectsValidator = RejectsValidator.create();

    assert.throws(function () {
      return BaseValidator['default'].create().validate("attribute");
    }, "Throws an error when _validate method is not defined");

    assert.throws(function () {
      return resolvesValidator.validate();
    }, "Throws an error when attributeName is not provided");
    assert.throws(function () {
      return resolvesValidator.validate("a");
    }, "Throws an error when context is not provided");

    assert.ok(resolvesValidator.get("isValidatable"), "Validators are validatable");
    assert.ok(Ember['default'].typeOf(resolvesValidator.trigger) === "function", "Validators are evented");

    assert.ok(resolvesValidator.validate("a", { a: 1 }) instanceof Ember['default'].RSVP.Promise, "Validators returns a promise object");
  });

  qunit.test('it fires events', function (assert) {

    expect(2);

    resolvesValidator = ResolvesValidator.create();
    Ember['default'].run(function () {
      resolvesValidator.on("passed", function () {
        assert.ok(true, "Validators sends passed events when they're valid");
      });
      resolvesValidator.validate("a", { a: 1 });
    });

    rejectsValidator = RejectsValidator.create();
    Ember['default'].run(function () {
      rejectsValidator.on("failed", function () {
        assert.ok(true, "Validators sends failed events when they're failed");
      });
      rejectsValidator.validate("a", { a: 1 });
    });
  });

  qunit.test('it returns a promise', function (assert) {

    expect(2);

    resolvesValidator = ResolvesValidator.create();
    Ember['default'].run(function () {
      resolvesValidator.validate("a", { a: 1 }).then(function () {
        assert.ok(true, "A promise reolved when the validator succeed");
      });
    });

    rejectsValidator = RejectsValidator.create();
    Ember['default'].run(function () {
      rejectsValidator.validate("a", { a: 1 })['catch'](function () {
        assert.ok(true, "A promise rejected when the validator failed");
      });
    });
  });

});
define('dummy/tests/unit/validators/base-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/validators/base-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/validators/base-test.js should pass jshint.');
  });

});
define('dummy/tests/unit/validators/number-test', ['ember', 'qunit', 'ember-validation/validators/number'], function (Ember, qunit, NumberValidator) {

  'use strict';

  qunit.module('Unit | Validator | number');

  qunit.test('it works', function (assert) {

    expect(6);

    var user = Ember['default'].Object.create({
      empty: "",
      firstName: "Vladimir",
      lastName: "Milkov",
      age: 0
    });

    var messages = {
      "not_number": "not_number"
    };

    var validator = NumberValidator['default'].create({ messages: messages });

    assert.throws(function () {
      return validator.validate();
    }, "Throws an error when attribute name not provided");
    assert.throws(function () {
      return validator.validate("attribute");
    }, "Throws an error when context not provided");

    Ember['default'].run(function () {

      validator.validate("empty", user).then(function () {
        assert.ok(true, "Empty value passed validation");
      });

      validator.validate("firstName", user)['catch'](function (message) {
        assert.equal(message, messages.not_number, "The string value is not passed validation");
      });

      validator.validate("age", user).then(function () {
        assert.ok(true, "Number validation passed");
      });

      validator.validate("age", user, { min: 5 })['catch'](function () {
        assert.ok(true, "User age greater then 5");
      });
    });
  });

});
define('dummy/tests/unit/validators/number-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/validators/number-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/validators/number-test.js should pass jshint.');
  });

});
define('dummy/utils/lookup', ['exports', 'ember-validation/utils/lookup'], function (exports, lookup) {

	'use strict';



	exports['default'] = lookup['default'];

});
define('dummy/validators/email', ['exports', 'ember-validation/validators/email'], function (exports, email) {

	'use strict';



	exports['default'] = email['default'];

});
define('dummy/validators/number', ['exports', 'ember-validation/validators/number'], function (exports, number) {

	'use strict';



	exports['default'] = number['default'];

});
define('dummy/validators/required', ['exports', 'ember-validation/validators/required'], function (exports, required) {

	'use strict';



	exports['default'] = required['default'];

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("dummy/tests/test-helper");
} else {
  require("dummy/app")["default"].create({"name":"ember-validation","version":"0.0.0+e82e0d82"});
}

/* jshint ignore:end */
//# sourceMappingURL=dummy.map