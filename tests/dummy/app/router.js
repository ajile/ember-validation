import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('examples', function() {
    this.route('simple');
    this.route('conditional');
    this.route('composition');
  });
});

export default Router;
