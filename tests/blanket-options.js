/* globals blanket, module */

var options = {
  modulePrefix: 'ember-validation',
  filter: '//.*ember-validation/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ["json", "html", "lcov"],
    autostart: true
  }
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
