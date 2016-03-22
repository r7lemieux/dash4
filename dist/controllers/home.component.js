var app;
(function (app) {
    var directives;
    (function (directives) {
        var HomeCtr = (function () {
            function HomeCtr() {
                this.controllerAs = 'vm';
                this.controller = homeCtr;
                this.templateUrl = './views/home.html';
            }
            return HomeCtr;
        }());
        angular.module('app').component('home', new HomeCtr());
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
function homeCtr($location) {
    var vm = this;
    console.log('305');
    var init = function init() {
        vm.welcomeText = 'Welcome to DASH-4 workshop !';
        vm.path = function () {
            return $location.path();
        };
        vm.val = 7;
    };
    init();
}
