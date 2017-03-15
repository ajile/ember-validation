import ErrorClass from 'ember-validation/core/error';

/**
 * @module ember-validation/utils/error
 */

/**
 * @function
 * @param {String} key
 * @param {String} value
 * @param {String} validatorName
 * @param {String} extra
 * @return {module:ember-validation/core/error}
 */
export function createError(key, value, validatorName, extra={}) {
  return ErrorClass.create({ key, value, validatorName, extra });
}
