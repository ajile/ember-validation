export function initialize(app) {
  app.registerOptionsForType('validator', { instantiate: false });
}

export default {
  name: 'validators',
  initialize: initialize
};
