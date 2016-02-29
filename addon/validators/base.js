import Ember from 'ember';

const { observer } = Ember;

export default Ember.Object.extend({

  conditionDidChange: observer("condition", function() {
    this.get('condition') || this.clearErrors();
  })

});
