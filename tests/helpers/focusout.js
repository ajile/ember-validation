import { findElementWithAssert, findElement, buildSelector } from 'dummy/tests/page-object';
import Page from 'dummy/tests/page-object';

export default function focusOut(selector, options = {}) {
  return {
    isDescriptor: true,

    value() {
      findElementWithAssert(this, selector).blur();
      triggerEvent(selector, 'blur');
      triggerEvent(selector, 'focusout');
      return this;
    }
  }
}
