import ErrorClass from 'ember-validation/core/error';

export function createError(key, value, validatorName, extra={}) {
  return ErrorClass.create({ key, value, validatorName, extra });
}
