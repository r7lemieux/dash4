/// <reference path="../typings/browser/ambient/jquery/index.d.ts" />
/// <reference path="../typings/browser/ambient/angular/index.d.ts" />
// <reference path="./controllers/memberCtr.ts" />
// import * as MemberCtr from './controllers/memberCtr';
// import * as angular from 'angular';
angular.module('app', ['ngAnimate', 'ui.bootstrap', 'ui.router', 'ngResource', 'ui.grid', 'ui.grid.edit', 'ngLodash']);
angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});