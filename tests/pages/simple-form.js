import PageObject from 'dummy/tests/page-object';
import { focusIn, focusOut, hasFocus }from '../helpers/focus';

let {
  clickable,
    fillable,
    text,
    visitable,
    value,
    count
} = PageObject;

function getElement(selector, index) {
  return {
    scope : selector,
    fillIn: fillable('input'),
    click: clickable('input'),
    value: value('input'),
    errors: text('.validation-error-list'),
    focusin: focusIn('input'),
    focusOut: focusIn('input'),
    hasFocus: hasFocus('input')
  }
}

export default PageObject.create({
  visit: visitable('/examples/form'),
  scope: 'form',
  // first_name: fillable('#first_name'),
  errors: text('.validation-error-list', {multiple: true}),
  errorsCount: count('.validation-error-list'),
  inputs: count('input'),

  first_name: {
    scope : '#first_name',
    fillIn: fillable('input'),
    click: clickable('input'),
    value: value('input'),
    errors: text('.validation-error-list'),
    focusin: focus('input'),
    hasFocus: hasFocus('input')
  },

  last_name: {
    scope : '#last_name',
    fillIn: fillable('input'),
    click: clickable('input'),
    value: value('input'),
    errors: text('.validation-error-list'),
    focus: focus('input'),
    hasFocus: hasFocus('input')
  },

  phone: {
    scope : '#phone',
    fillIn: fillable('input'),
    click: clickable('input'),
    value: value('input'),
    errors: text('.validation-error-list'),
    focus: focus('input'),
    hasFocus: hasFocus('input')
  },

  email: {
    scope : '#email',
    fillIn: fillable('input'),
    click: clickable('input'),
    value: value('input'),
    errors: text('.validation-error-list'),
    focus: focus('input'),
    hasFocus: hasFocus('input')
  },

  submit: clickable('button'),

  click: clickable(),

  checkInputs() {

  }
});
