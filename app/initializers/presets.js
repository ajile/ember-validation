export function initialize(container, application) {
  container.optionsForType('preset', { instantiate: false });
}

export default {
  name: 'presets',
  initialize: initialize
};
