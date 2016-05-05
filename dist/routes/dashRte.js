"use strict";
angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('lost');
    return $stateProvider
        .state('first', {
        url: '',
        templateUrl: 'views/home.html'
    })
        .state('home', {
        url: '/',
        // templateUrl: 'views/home.html'
        template: '<home></home>'
    })
        .state('lost', {
        url: '/lost',
        templateUrl: 'views/lost.html',
        controller: function ($scope, $state) {
            $scope.state = $state;
        }
    })
        .state('member list', {
        url: '/memberEnumeration',
        templateUrl: 'views/memberList.html'
    })
        .state('member', {
        url: '/members/:memberId',
        //             controller  : 'memberCtr',
        //             controllerAs: 'vm',
        //             templateUrl : 'views/memberView.html'
        template: '<member></member>'
    })
        .state('member grid', {
        url: '/memberGrid',
        templateUrl: 'views/memberGrid.html'
    })
        .state('map', {
        url: '/map',
        templateUrl: 'views/map.html'
    });
});
