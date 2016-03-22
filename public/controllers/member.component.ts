
import IQService = angular.IQService;
module app.directives {

    class MemberCtr implements ng.IComponentOptions {

        public controllerAs:string;
        public controller:any;
        public templateUrl:string;

        constructor() {
            this.controllerAs = 'vm';
            this.controller = memberCtr;
            this.templateUrl = './views/memberView.html';
        }
    }

    angular.module('app').component('member', new MemberCtr());
}

function memberCtr(memberBackEnd:MemberBackEnd, $stateParams, $q:IQService) {
    var vm = this;
    var init = function init() {
        return memberBackEnd.getMember($stateParams.memberId)
            .then(function (member) {
                vm.member = member;
                return $q.when(member);
            });
    };

    init();
}

