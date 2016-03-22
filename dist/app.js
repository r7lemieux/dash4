/// <reference path="../typings/browser/ambient/jquery/index.d.ts" />
/// <reference path="../typings/browser/ambient/angular/index.d.ts" />
// <reference path="./controllers/memberCtr.ts" />
// import * as MemberCtr from './controllers/memberCtr';
// import * as angular from 'angular';
angular.module('app', ['ui.bootstrap', 'ui.router', 'ngResource', 'ui.grid', 'ui.grid.edit', 'ngLodash']);
// app.controller('MemberCtr', MemberCtr);
angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
});
