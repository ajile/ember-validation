'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    baseURL: process.env.BASE_URL || '1/',
    LOG_VALIDATION: true
  };
};
