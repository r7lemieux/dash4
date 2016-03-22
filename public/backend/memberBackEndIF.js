angular.module('app').factory('Member', function ($resource) {
        'use strict';
        return $resource('member/:memberId', {
                memberId: '@_id'
            }, {
                list  : {
                    method : 'GET',
                    url    : 'members',
                    isArray: true
                },
                get   : {
                    method: 'GET',
                    url   : 'member'
                },
                update: {
                    method: 'PUT'
                }
            }
        );
    }
);
