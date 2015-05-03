'use strict';

angular.module('dash').controller('MemberCtr', function ($scope, $stateParams, $location, Member, listSrv) {

      $scope.title = 'Intro to Angular';

      // ====
      // Init
      // ====

      $scope.initMemberList = function () {
        Member.list(function (members) {
          $scope.members = members;
          $scope.allMembers = members;
          var search = $location.search();
          if (search) {
            angular.forEach(search, function(val, key) {
              $scope.filter.fieldName = key;
              $scope.filter.fieldValue = val;
              $scope.members = listSrv.filter($scope.allMembers, search);
            });
          }
        });
      };

      $scope.initMember = function () {

        Member.get({memberId: $stateParams.memberId}, function (member) {
          $scope.member = member;
        });
      };


      // ======
      // Filter
      // ======

      $scope.filter = {
        fieldName: null,
        fieldValue: null,
        fieldNames: ['name', 'city', 'state', 'id', 'status'],
        fieldValues: []
      };

      $scope.filterMembers = function () {
        var filter = {};
        filter[$scope.filter.fieldName] = $scope.filter.fieldValue;
        $location.search(filter);
        $scope.members = listSrv.filter($scope.allMembers, filter);
      };

      $scope.$watch('filter.fieldName', function (newVal, oldVal) {
        if (!newVal) {
          $scope.filter.fieldValues = [];
        } else if (newVal !== oldVal) {
          $scope.filter.fieldValues = listSrv.getUsedValues($scope.allMembers, newVal);
        }
      });

      $scope.$watch('filter.fieldValue', function (newVal, oldVal) {
        if (newVal != oldVal) {
          if (newVal) {
            $scope.filterMembers();
          } else {
            $scope.members = $scope.allMembers;
          }
        }
      });

      $scope.buildCommonTopics = function () {
        $scope.commonTopics = listSrv.buildCommonTopics($scope.members);
      };

      // ======
      // Modify
      // ======

      $scope.update = function() {
        Member.update($scope.member, function(err, member) {
          console.log('201 err ' + JSON.stringify(err));
          console.log('201 member ' + JSON.stringify(member));
        });
      }
    }
)
    .directive('field', function () {
      return {
        template: function (element, attr) { /*jslint unparam:true*/
          return '<span ng-click="edit=true" ng-mouseleave="edit=false"><span ng-if="!edit">{{' + attr.name + '}}</span><input ng-if="edit" ng-model="' + attr.name + '"/></span>';
        }

      };
    })

;
