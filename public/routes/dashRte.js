'use strict';

angular.module('dash').config( function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("lost");

    //<a sref="member({memberId:member.id})"
    return $stateProvider
        .state('home', {
            url: '',
            templateUrl: 'views/home.html'
        })
        .state('lost', {
            url: '/lost',
            templateUrl: 'views/lost.html',
        })
        .state('member list', {
            url: '/memberEnumeration',
            templateUrl: 'views/memberList.html'
        })
        .state('member', {
            url: '/members/:memberId',
            templateUrl: 'views/memberView.html'
        })
        .state('member grid', {
            url: '/memberGrid',
            templateUrl: 'views/memberGrid.html'
        })
        .state('map', {
            url: '/map',
            templateUrl: 'views/map.html'
        })
        .state('promise member', {
            url: '/promise/:memberId',
            template:'<dashpromise><div ng-transclude>AAAAAA</div></dashpromise>'
        })

});