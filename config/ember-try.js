module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'wheely-projects-1',
      dependencies: {
        'ember': 'components/ember#1.13.13'
      },
      resolutions: {
        'ember': '1.13.13'
      }
    },
    {
      name: 'wheely-projects-2',
      dependencies: {
        'ember': 'components/ember#2.0.0'
      },
      resolutions: {
        'ember': '2.0.0'
      }
    }
  ]
};
