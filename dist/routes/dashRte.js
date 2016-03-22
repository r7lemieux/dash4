// routing.$inject = ['$urlRouterProvider', '$locationProvider'];
// export default function routing($stateProvider: IStateProvider , $urlRouterProvider: IUrlRouterProvider) {
"use strict";
angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('lost');
    return $stateProvider
        .state('home', {
        url: '/',
        //             templateUrl: 'views/home.html'
        template: '<home></home>'
    })
        .state('lost', {
        url: '/lost',
        templateUrl: 'views/lost.html'
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
