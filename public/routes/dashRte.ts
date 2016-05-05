

// routing.$inject = ['$urlRouterProvider', '$locationProvider'];
// export default function routing($stateProvider: IStateProvider , $urlRouterProvider: IUrlRouterProvider) {
// import {IStateProvider}
//
import {IStateProvider} from "angular-ui-router";
import {IUrlRouterProvider} from "angular-ui-router";

angular.module('app').config(function ($stateProvider: IStateProvider , $urlRouterProvider: IUrlRouterProvider) {

    $urlRouterProvider.otherwise('lost');

    return $stateProvider
        .state('first', {
            url     : '',
            templateUrl: 'views/home.html'
        })
        .state('home', {
            url     : '/',
            // templateUrl: 'views/home.html'
            template: '<home></home>'
        })
        .state('lost', {
            url        : '/lost',
            templateUrl: 'views/lost.html',
            controller: function($scope, $state) {
                $scope.state = $state;
            }
        })
        .state('member list', {
            url        : '/memberEnumeration',
            templateUrl: 'views/memberList.html'
        })
        .state('member', {
            url         : '/members/:memberId',
//             controller  : 'memberCtr',
//             controllerAs: 'vm',
//             templateUrl : 'views/memberView.html'
            template: '<member></member>'
        })
        .state('member grid', {
            url        : '/memberGrid',
            templateUrl: 'views/memberGrid.html'
        })
        .state('map', {
            url        : '/map',
            templateUrl: 'views/map.html'
        });

});