import IPromise = angular.IPromise;
// module app.services {

    // import IResource = angular.resource.IResource;
    // import IPromise = angular.IPromise;
    // import IPromise = angular.IPromise;
    // export class MemberBackEnd {
    class MemberBackEnd {

        public memberResource;
        public getMember;
        // public getMember:(string) => IPromise;

        constructor(memberResource:any) {
            this.memberResource = memberResource;
            this.getMember = getMember;
        }
    }
// }

angular.module('app').factory('memberBackEnd', function (Member) {
    return new MemberBackEnd(Member);
});

function getMember(memberId:string) {
    return this.memberResource.get({memberId: memberId}).$promise;
}

