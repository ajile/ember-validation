'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    baseURL: process.env.BASE_URL || '/',
    LOG_VALIDATION: process.env.LOG_VALIDATION
  };
};
