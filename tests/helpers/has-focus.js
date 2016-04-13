import { findElement } from 'dummy/tests/page-object';

export default function hasFocus(selector, options = {}) {
  return {
    isDescriptor: true,

    get() {
      return findElement(this, selector, options).is(':focus');
    }
  }
}
