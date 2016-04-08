import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  didTransition() {
    this._super(...arguments);
    Ember.run.scheduleOnce("afterRender", Prism, () => {
      try {
        Prism.highlightAll();
        Prism.fileHighlight();
      } catch(e) {}
    });
  }
});

Router.map(function() {
  this.route('quick-start');
  this.route('tutorial', function() {
    this.route('mixins');
    this.route('mediators');
    this.route('validators', function() {
      this.route('creating');
    });
    this.route('components');
  });
  this.route('examples', function() {
    this.route('simple');
    this.route('conditional');
    this.route('composition');
    this.route('form');
    this.route('form-view-validation');
    this.route('form-nested-validation');
  });
});

export default Router;
