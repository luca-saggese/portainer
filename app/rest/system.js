angular.module('portainer.rest')
.factory('System', ['$resource', 'Settings', function ServiceFactory($resource, Settings) {
  'use strict';
  return $resource(Settings.url + '/system/:action', {}, {
    df: { method: 'GET', params: {action: 'df'} },
  });
}]);