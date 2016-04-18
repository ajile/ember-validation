import PageObject from 'dummy/tests/page-object';
import Ember from 'ember';

const {
  clickable,
  fillable,
  text,
  visitable,
  value,
  count
} = PageObject;


function createPage(route, elements, config={}) {
  config = Ember.merge(elements, config);
  return PageObject.create(Ember.merge({
    visit: visitable(route),
    scope: 'form',
    errors: text('.validation-error-list', {multiple: true}),
    errorsCount: count('.validation-error-list'),
    inputs: count('input'),
    inputsCount: count('input'),
    submit: clickable('button'),
    click: clickable(),

    togglePanel: clickable('#panel-head'),
    saved: text('.alert-success'),
  }, config));
}

function createElement(selector) {
  return {
    scope : selector,
    fillIn: fillable('input'),
    click: clickable('input'),
    value: value('input'),
    errors: text('.validation-error-list'),
    errorsCount: count('.validation-error-list'),
    // focusIn: focusIn('input'),
    // focusOut: focusOut('input'),
    // hasFocus: hasFocus('input')
  };
}


let elements = {};
Ember.A(['first_name', 'last_name', 'phone', 'email', 'city', 'street', 'house']).forEach(name => { elements[name] = createElement('#' + name); });

export var simpleForm = createPage('/examples/form', elements, {
  togglePanel: clickable('#panel-head'),
  changeModel: clickable('#set-user', {resetScope:true})
});

elements = {};
Ember.A(['name', 'participants_number', 'contact_email']).map(name => { elements[name] = createElement('#' + name); });

export var viewValidationForm = createPage('/examples/form-view-validation', elements);

elements = {};
Ember.A(['name', 'email', 'city', 'street', 'house']).map(name => { elements[name] = createElement('#' + name); });
Ember.A(['login', 'password']).map(name => { elements[name] = createElement('#' + name); });
export var nestedValidationForm = createPage('/examples/form-nested-validation', elements, {
  address: {
    scope: '#address',
    errors: text('.validation-error-list', {multiple: true}),
    errorsCount: count('.validation-error-list'),
  },
  credentials: {
    scope: '#credentials',
    errors: text('.validation-error-list', {multiple: true}),
    errorsCount: count('.validation-error-list'),
  }
});

