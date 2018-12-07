export function initialize(app) {
  app.registerOptionsForType('preset', { instantiate: false });
}

export default {
  name: 'presets',
  initialize: initialize
};
