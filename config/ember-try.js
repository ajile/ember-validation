module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release-1-13'
      },
      resolutions: {
        'ember': 'release-1-13'
      }
    }
  ]
};
