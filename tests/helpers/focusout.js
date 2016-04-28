import { findElementWithAssert } from 'dummy/tests/page-object';

export default function focusOut(selector) {
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
