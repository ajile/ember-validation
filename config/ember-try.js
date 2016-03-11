module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#1.13.13'
      },
      resolutions: {
        'ember': '1.13.13'
      }
    },
    {
      name: 'wheely-partners',
      dependencies: {
        'ember': 'components/ember#1.11.1'
      },
      resolutions: {
        'ember': '1.11.1'
      }
    },
    {
      name: 'wheely-business',
      dependencies: {
        'ember': 'components/ember#1.13.7'
      },
      resolutions: {
        'ember': '1.13.7'
      }
    }
  ]
};
