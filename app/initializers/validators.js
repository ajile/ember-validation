export function initialize(container, application) {
  container.optionsForType('validator', { instantiate: false });
}

export default {
  name: 'validators',
  initialize: initialize
};
