import ErrorClass from 'ember-validation/core/error';

export function createError(key, value) {
  return ErrorClass.create({ key, value });
}
