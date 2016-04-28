import { test } from 'ember-qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';
// import hbs from 'htmlbars-inline-precompile';
import { viewValidationForm as page } from '../pages/forms';

moduleForAcceptance('Acceptance | Page | view validation form');

test('SHow errors on focusout', function (assert) {
  page.visit();

  andThen(() => {
    assert.equal(page.inputsCount, 3, '3 inputs');
    page.participants_number.click();
    page.contact_email.click();
    page.name.click();
  });

  andThen(() => {
    page.contact_email.click();
    page.click();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 3, '3 errors');

  });

});

test('validators', function (assert) {

  page.visit();

  andThen(() => {
    page.name.click().fillIn('va');

  });

  andThen(() => {
    page.participants_number.click();
  });

  andThen(() => {
    assert.equal(page.name.errors, 'must be at leat 3 symbols', 'name min length error');
    page.name.click().fillIn('vaaaaaaaaaaaaaaa');
  });

  andThen(() => {
    page.participants_number.click();
  });

  andThen(() => {
    assert.equal(page.name.errors, 'max length 15 symbols', 'name max length error');
    page.name.click().fillIn('Birthday party');
    page.participants_number.click();
  });

  andThen(() => {
    assert.equal(page.errorsCount, 0, 'no visible errors');
    page.participants_number.fillIn('1');
    page.name.click();
  });

  andThen(() => {
    assert.equal(page.participants_number.errors, 'must be from 2 till 100', 'participants_number range error');
    page.participants_number.click().fillIn('120');
    page.name.click();
  });

  andThen(() => {
    assert.equal(page.participants_number.errors, 'must be from 2 till 100', 'participants_number range error');
    page.participants_number.click().fillIn('20');
    page.name.click();
  });

  andThen(() => {
    assert.equal(page.participants_number.errorsCount, 0, 'no participants_number errors');
    page.contact_email.click().fillIn('qwert');
    page.name.click();
  });

  andThen(() => {
    assert.equal(page.contact_email.errors, 'must_be_valid_email', 'invalid email error');
    page.contact_email.click().fillIn('ivan@gmail.com');
  });

  andThen(() => {
    assert.equal(page.contact_email.errorsCount, 0, "no email error");
    page.submit();
  });

  andThen(() => {
    assert.equal(page.saved, 'The model is saved', 'All done');
  });


});
