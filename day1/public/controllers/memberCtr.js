'use strict';

angular.module('dash').controller('MemberCtr', function ($scope, $stateParams, Member) {


        $scope.initMemberList = function() {
           Member.list(function(members){
               $scope.members = members;
           })
        };

        $scope.initMember = function() {
            Member.get({memberId: $stateParams.memberId}, function(member){
                $scope.member = member;
            })
        };
    }
)

