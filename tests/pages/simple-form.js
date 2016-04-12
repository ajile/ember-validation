import PageObject from 'dummy/tests/page-object';
import { focusIn, focusOut, hasFocus }from '../helpers/focus';
import Ember from 'ember';

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
    errorsCount: count('.validation-error-list'),
    focusIn: focusIn('input'),
    focusOut: focusIn('input'),
    hasFocus: hasFocus('input')
  }
}

var config = {
  visit: visitable('/examples/form'),
  scope: 'form',
  errors: text('.validation-error-list', {multiple: true}),
  errorsCount: count('.validation-error-list'),
  inputs: count('input'),
  inputsCount: count('input'),
  submit: clickable('button'),
  click: clickable(),

  togglePanel: clickable('#panel-head')
};

// console.log('---->', config)

Ember.A(['first_name', 'last_name', 'phone', 'email', 'city', 'street', 'house']).forEach((name, index) => { console.log(name); config[name] = getElement('#' + name, index); })

console.log(config)

var page = PageObject.create(config);


export default page;
// export default PageObject.create({
//   visit: visitable('/examples/form'),
//   scope: 'form',
//   errors: text('.validation-error-list', {multiple: true}),
//   errorsCount: count('.validation-error-list'),
//   inputsCount: count('input'),

//   first_name: {
//     scope : '#first_name',
//     fillIn: fillable('input'),
//     click: clickable('input'),
//     value: value('input'),
//     errors: text('.validation-error-list'),
//     focusIn: focusIn('input'),
//     focusOut: focusOut('input'),
//     hasFocus: hasFocus('input')
//   },

//   last_name: {
//     scope : '#last_name',
//     fillIn: fillable('input'),
//     click: clickable('input'),
//     value: value('input'),
//     errors: text('.validation-error-list'),
//     focusIn: focusIn('input'),
//     focusOut: focusOut('input'),
//     hasFocus: hasFocus('input')
//   },

//   phone: {
//     scope : '#phone',
//     fillIn: fillable('input'),
//     click: clickable('input'),
//     value: value('input'),
//     errors: text('.validation-error-list'),
//     focusIn: focusIn('input'),
//     focusOut: focusOut('input'),
//     hasFocus: hasFocus('input')
//   },

//   email: {
//     scope : '#email',
//     fillIn: fillable('input'),
//     click: clickable('input'),
//     value: value('input'),
//     errors: text('.validation-error-list'),
//     focusIn: focusIn('input'),
//     focusOut: focusOut('input'),
//     hasFocus: hasFocus('input')
//   },

//   submit: clickable('button'),

//   click: clickable(),

// });
