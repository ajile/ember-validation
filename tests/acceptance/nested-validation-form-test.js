import { test } from 'ember-qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';
import { nestedValidationForm as page } from '../pages/forms';

moduleForAcceptance('Acceptance | Page | nested validation form');

test("validation", function(assert) {

  page.visit();


  andThen(() => {
    assert.equal(page.inputsCount, 7, "7 inputs");
    page.name.click().fillIn('vasya');
    page.email.click().fillIn('vasya@gmail.com');
    page.city.click();
  });

  andThen(() => {
    page.email.click();
  });

  andThen(() => {
    assert.equal(page.city.errorsCount, 1, 'city has error');
    assert.equal(page.address.errorsCount, 4, 'address has 4 error');
    assert.equal(page.city.errors, 'city_required', "city error");
    assert.equal(page.address.errors[0], 'Valid address required', "address error");

    page.city.click().fillIn('moscow');
    page.street.click().fillIn('tverskaya');
    page.house.click().fillIn('42');
  });

  andThen(() => {
    page.login.click();
  });

  andThen(() => {
    assert.equal(page.address.errorsCount, 0, "no address errors");
    page.house.click();
  });

  andThen(() => {
    assert.equal(page.credentials.errorsCount, 3, "credentials has 3 errors");
    assert.equal(page.login.errorsCount, 1, "login has error");
    assert.equal(page.credentials.errors[0], 'Login and password required', "credentials error");
    page.login.click().fillIn('aaa');
    page.password.click();
  });

  andThen(() => {
    assert.equal(page.login.errorsCount, 1, "login has error");
    assert.equal(page.login.errors, 'login must contains from 4 till 12 alphanum symbols', "login error");
    page.login.click().fillIn('123aaa');
    page.password.click();
  });

  andThen(() => {
    assert.equal(page.login.errorsCount, 0, "no login errors");
    page.password.fillIn('123');
    page.login.click();
  });

  andThen(() => {
    assert.equal(page.password.errorsCount, 1, "password has error");
    assert.equal(page.password.errors, 'pasword must contains from 8 till 24 alphanum symbols', "password error");
    page.password.click().fillIn('123qwe098');
    page.name.click();
  });

  andThen(() => {
    assert.equal(page.credentials.errorsCount, 0, "credentials has not errors");
    assert.equal(page.password.errorsCount, 0, "password has not errors");
    page.submit();
  });

  andThen(() => {
    assert.equal(page.saved, 'The model is saved', "The model is saved");
  });

});
