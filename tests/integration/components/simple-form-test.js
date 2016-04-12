import { moduleForComponent, test } from 'ember-qunit';
import moduleForAcceptance from '../../helpers/module-for-acceptance';
import hbs from 'htmlbars-inline-precompile';
import page from '../../pages/simple-form';

moduleForAcceptance('Acceptance | Page | simple form');

test('it renders', function(assert) {

  console.log(page)

  page.visit();


  // andThen(() => {
  //   assert.equal(page.inputsCount, 4, 'got 4 inputs');
  //   assert.equal(page.errorsCount, 0, 'no errors shown');
  //   page.togglePanel();
  // });

  // andThen(() => {
  //   assert.equal(page.inputsCount, 7, 'show additional inputs');
  //   page.togglePanel();
  // });

  // focus first_name
  andThen(() => {
    assert.equal(page.inputsCount, 4, 'got 4 inputs');
    page.first_name.click()//.fillIn('a')//.then(() => { page.first_name.fillIn('a').then(() => {page.first_name.fillIn('')}); });
    // page.last_name.click();
  });

  // andThen(() => {
  //   Ember.run.sync()
  //   page.first_name.fillIn('')
  //   Ember.run.sync()
  //   // Ember.run.later(() => {})
  // });

  andThen(() => {
    page.last_name.click();
  })


  andThen(() => {
    assert.equal(page.errorsCount, 1, 'form has 1 error');
    assert.equal(page.first_name.errorsCount, 1, 'first_name has 1 error');
    page.phone.click();
  })
  // focus first_name
  andThen(() => {
    // debugger
    assert.equal(page.errorsCount, 2, 'form has 2 error');
    assert.equal(page.last_name.errorsCount, 1, 'last_name has error');
    page.email.click();
  });

  andThen(() => {
    // debugger
    assert.equal(page.errorsCount, 3, 'form has 3 error');
    assert.equal(page.phone.errorsCount, 1, 'phone has error');
    page.click();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 4, 'form has 4 error');
    assert.equal(page.email.errorsCount, 1, 'email has error');
  })

  // andThen(() => {
  //   assert.equal(page.first_name.errorsCount, 0, "valid last_name has't' error");
  //   page.togglePanel();
  // });

  // andThen(() => {
  //   assert.equal(page.inputsCount, 7, 'show additional inputs');
  //   page.city.click().fillIn('moscow').then(() => { page.street.click(); });
  // });

  // andThen(() => {
  //   page.house.click();
  // })

  // andThen(() => {
  //   console.log(page.errorsCount)
  //   // debugger
  // })


});
