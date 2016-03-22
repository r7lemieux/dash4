angular.module('app').factory('memberBackEndSimple', function (Member) {
    return {
        getMember:getMember
    };

    function getMember(memberId) {
        return Member.get({memberId: memberId}).$promise;
    }
});


