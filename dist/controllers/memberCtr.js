var app;
(function (app) {
    var controllers;
    (function (controllers) {
        angular.module('app').controller('memberCtr', memberCtrSimple);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
function memberCtrSimple(memberBackEnd, $stateParams, $q) {
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
