import Ember from 'ember';
import Config from '../config/environment';
import Configuration from 'ember-validation/configuration';

export function initialize() {
  Configuration.load(Config);
}

export default {
  name: 'ember-validation',
  initialize: initialize
};
