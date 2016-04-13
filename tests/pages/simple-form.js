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

function getElement(selector) {
  return {
    scope : selector,
    fillIn: fillable('input'),
    click: clickable('input'),
    value: value('input'),
    errors: text('.validation-error-list'),
    errorsCount: count('.validation-error-list'),
    focusIn: focusIn('input'),
    focusOut: focusOut('input'),
    hasFocus: hasFocus('input')
  };
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

  togglePanel: clickable('#panel-head'),
  saved: text('.alert-success'),
  changeModel: clickable('#set-user', {resetScope:true})
};


Ember.A(['first_name', 'last_name', 'phone', 'email', 'city', 'street', 'house']).forEach((name, index) => { console.log(name); config[name] = getElement('#' + name, index); });


var page = PageObject.create(config);

export default page;
