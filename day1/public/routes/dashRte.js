'use strict';

angular.module('dash').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/lost");

//<a sref="member({memberId:member.id})"
    return $stateProvider
        .state('home', {
            url: '',
            templateUrl: 'views/home.html'
        })
        .state('lost', {
            url: '/lost',
            templateUrl: 'views/lost.html'
        })
        .state('member list', {
            url: '/memberList',
            templateUrl: 'views/memberList.html'
        })
        .state('member', {
            url: '/members/:memberId',
            templateUrl: 'views/memberView.html'
        })
        ;

});