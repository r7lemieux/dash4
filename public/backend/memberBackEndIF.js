'use strict';

angular.module('dash').factory('Member',
  function ($resource) {
    return $resource('member/:memberId', {
        memberId: '@_id'
      }, {
        list: {
          method: 'GET',
          url: 'members',
          isArray: true
        },
        get: {
          method: 'GET',
          url: 'member'
        },
        update: {
           method: 'PUT'
        }
      }
    );
  }
);
