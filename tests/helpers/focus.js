import { findElementWithAssert } from 'dummy/tests/page-object';

export function focusIn(selector) {
  return {
    isDescriptor: true,
    value() {
      findElementWithAssert(this, selector).focus();
      triggerEvent(selector, 'focus');
      triggerEvent(selector, 'focusin');
      return this;
    }
  };
}

export function focusOut(selector) {
  return {
    isDescriptor: true,
    value() {
      findElementWithAssert(this, selector).blur();
      triggerEvent(selector, 'blur');
      triggerEvent(selector, 'focusout');
      return this;
    }
  };
}

export function hasFocus(selector, options = {}) {
  return {
    isDescriptor: true,
    get() {
      return findElementWithAssert(this, selector, options).is(':focus');
    }
  };
}
