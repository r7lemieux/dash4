var app;
(function (app) {
    var directives;
    (function (directives) {
        var MemberCtr = (function () {
            function MemberCtr() {
                this.controllerAs = 'vm';
                this.controller = memberCtr;
                this.templateUrl = './views/memberView.html';
            }
            return MemberCtr;
        }());
        angular.module('app').component('member', new MemberCtr());
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
function memberCtr(memberBackEnd, $stateParams, $q) {
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
