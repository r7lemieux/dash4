'use strict';

angular.module('dash').factory('Member', ['$resource',
    function ($resource) {

        return $resource(
            'member/:memberId',
            {memberId: '@id'},
            {
                list: {
                    method: 'GET',
                    url: 'members',
                    isArray: true
                },
                update: {
                    method: 'PUT'
                }
            }
        );
    }
]);
