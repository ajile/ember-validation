/* jshint node: true */
'use strict';

module.exports = {

  name: 'ember-validation',

  isDevelopingAddon: function() {
    return true;
  },

  // @see https://github.com/ember-cli/ember-cli/issues/4918
  hintingEnabled: function() {
    return false;
  }

};
