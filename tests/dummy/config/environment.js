/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    baseURL: process.env.BASE_URL || '/',
    locationType: process.env.LOCATION_TYPE || 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 127.0.0.1:33730 maxcdn.bootstrapcdn.com",
      'font-src': "'self' maxcdn.bootstrapcdn.com",
      'connect-src': "'self' ws://127.0.0.1:33730/",
      'img-src': "'self'",
      'style-src': "'self' maxcdn.bootstrapcdn.com",
      'media-src': "'self'"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    RAISE_ON_DEPRECATION: false
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }



  return ENV;
};
