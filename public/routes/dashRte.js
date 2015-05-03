'use strict';

angular.module('dash').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /lost
  $urlRouterProvider.otherwise("/lost");

  return $stateProvider
      .state('home', {
        //controller:'HomeCtr1',
        url        : '',
        templateUrl: 'views/home.html'
      })
      .state('member list', {
        url        : '/members',
        templateUrl: 'views/memberList1.html'
      })
      .state('member', {
        url        : '/members/:memberId',
        templateUrl: 'views/memberView.html'
      })
      .state('lost', {
        url        : '/lost',
        templateUrl: 'views/lost.html'
      });
}
]);
