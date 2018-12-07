import EmberRouter from '@ember/routing/router';
import { scheduleOnce } from '@ember/runloop';
import config from './config/environment';

var Router = EmberRouter.extend({
  location: config.locationType,
  didTransition() {
    this._super(...arguments);

    if (window.Prism) {
      scheduleOnce("afterRender", window.Prism, () => {
        try {
          window.Prism.highlightAll();
          window.Prism.fileHighlight();
        } catch(e) {}  // eslint-disable-line no-empty
      });
    }
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
    this.route('presets');
    this.route('errors');
    this.route('components');
    this.route('presets');
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
