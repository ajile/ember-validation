import ErrorClass from 'ember-validation/core/error';

export function createError(key, value, options) {
  return ErrorClass.create({ key, value });
}
