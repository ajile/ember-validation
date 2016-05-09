import ErrorClass from 'ember-validation/core/error';

export function createError(key, value, validatorName) {
  return ErrorClass.create({ key, value, validatorName });
}
