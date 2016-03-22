module app.directives {

    class HomeCtr implements ng.IComponentOptions {
        
        public controllerAs:string;
        public controller:any;
        public templateUrl:string;

        constructor() {
            this.controllerAs = 'vm';
            this.controller = homeCtr;
            this.templateUrl = './views/home.html';
        }

    }
    angular.module('app').component('home', new HomeCtr());
}

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


