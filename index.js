/* jshint node: true */
'use strict';

module.exports = {

  name: 'ember-validation',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app) {
    this._super.included(app);
    app.import('vendor/ember-validation/register-version.js');
  },

  // @see https://github.com/ember-cli/ember-cli/issues/4918
  hintingEnabled: function() {
    return false;
  }

};
