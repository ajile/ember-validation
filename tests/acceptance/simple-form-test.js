import { test } from 'ember-qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';
import { simpleForm as page } from '../pages/forms';

moduleForAcceptance('Acceptance | Page | simple form');

test('it renders', function(assert) {

  page.visit();

  andThen(() => {
    assert.equal(page.inputsCount, 4, 'got 4 inputs');
    assert.equal(page.errorsCount, 0, 'no errors shown');
    page.togglePanel();
  });

  andThen(() => {
    assert.equal(page.inputsCount, 7, 'show additional inputs');
    page.togglePanel();
  });

  andThen(() => {
    assert.equal(page.inputsCount, 4, 'got 4 inputs');
  });

});

test('valid inputs one by one', function (assert) {

  page.visit();

  andThen(() => {
    page.first_name.click();
  });

  andThen(() => {
    page.last_name.click();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 1, '1 error');
    assert.equal(page.first_name.errorsCount, 1, 'first_name error');
    page.phone.click();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 2, '2 error');
    assert.equal(page.last_name.errorsCount, 1, 'last_name error');
    page.email.click();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 3, '3 error');
    assert.equal(page.phone.errorsCount, 1, 'phone error');
    page.first_name.click();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 3, '3 errors');
    assert.equal(page.email.errorsCount, 1, 'email error');
    assert.equal(page.first_name.errorsCount, 0, 'hide first_name error');
    page.first_name.fillIn('vasya');
    page.last_name.click();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 2, '2 errors');
    assert.equal(page.first_name.errorsCount, 0, 'no first_name error');
    assert.equal(page.last_name.errorsCount, 0, 'hide last_name error');
    page.last_name.fillIn('Ivanoff');
    page.phone.click();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 1, '1 error');
    assert.equal(page.last_name.errorsCount, 0, 'no last_name error');
    assert.equal(page.phone.errorsCount, 0, 'hide phone error');
    page.phone.fillIn('79104224113');
    page.email.click();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 0, '0 error');
    assert.equal(page.phone.errorsCount, 0, 'no phone error');
  });
});

test('validate additional fields', function (assert) {

  page.visit().togglePanel();

  andThen(() => {
    assert.equal(page.inputsCount, 7, 'additional inputs are shown');
    page.city.click().fillIn('moscow');
    page.street.click();
    page.house.click();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 1, '1 error');
    assert.equal(page.street.errorsCount, 1, 'street error');
    page.street.click().fillIn('Tverskaya');
    page.click();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 1, '1 error');
    assert.equal(page.house.errorsCount, 1, 'house error');

    page.togglePanel().togglePanel();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 0, 'no errors after remove/add inputs');
  });

});

test('submit form', function (assert) {
  page.visit().togglePanel();

  andThen(() => {
    page.city.fillIn('moscow');
    page.togglePanel();
  });

  andThen(() => {
    page.submit();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 5, '5 errors');
    assert.equal(page.inputsCount, 7, '7 inputs');

    page.first_name.fillIn('vasya');
    page.last_name.fillIn('ivanoff');
    page.phone.fillIn('71111111111');
    page.street.fillIn('tverskya');
    page.house.fillIn('1');

    page.last_name.click();
    page.phone.click();
    page.email.click();
    page.street.click();
    page.house.click();
    page.click();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 0, 'no errors');
    page.submit();
  });

  andThen(() => {
    assert.equal(page.saved, 'The model is saved', 'All done');
  });

});

test('chnage model', function (assert) {
  page.visit().submit();

  andThen(() => {
    assert.equal(page.errorsCount, 3, '3 errors');
    page.changeModel();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 0, 'no errors');
  });

});


