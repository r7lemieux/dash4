// module app.services {
// import IResource = angular.resource.IResource;
// import IPromise = angular.IPromise;
// import IPromise = angular.IPromise;
// export class MemberBackEnd {
var MemberBackEnd = (function () {
    // public getMember:(string) => IPromise;
    function MemberBackEnd(memberResource) {
        this.memberResource = memberResource;
        this.getMember = getMember;
    }
    return MemberBackEnd;
}());
// }
angular.module('app').factory('memberBackEnd', function (Member) {
    return new MemberBackEnd(Member);
});
function getMember(memberId) {
    return this.memberResource.get({ memberId: memberId }).$promise;
}
