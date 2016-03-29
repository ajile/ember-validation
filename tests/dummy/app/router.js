import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  didTransition() {
    this._super(...arguments);
    Ember.run.scheduleOnce("afterRender", Prism, Prism.highlightAll);
  }
});

Router.map(function() {
  this.route('quick-start');
  this.route('tutorial');
  this.route('examples', function() {
    this.route('simple');
    this.route('conditional');
    this.route('composition');
    this.route('form');
  });
});

export default Router;
