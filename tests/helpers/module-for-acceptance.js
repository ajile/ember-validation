import Ember from "ember";
import { module } from 'qunit';
import startApp from './start-app';


export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      if (options.beforeEach) {
        options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      Ember.run(this.application, 'destroy');
    }
  });
}
