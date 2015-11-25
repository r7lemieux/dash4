'use strict';

angular.module('dash').controller('MemberCtr',
    function ($scope, $q, $stateParams, $location, Member, listSrv) {

        $scope.title = 'Intro to Angular';

        // ====
        // Init
        // ====

        var filterMembers = function (members) {
            var search = $location.search(),
                membersReady = $q.defer();
            if (search) {
                angular.forEach(search, function (val, key) {
                    $scope.filter.fieldName = key;
                    $scope.filter.fieldValue = val;
                    members = listSrv.filter($scope.allMembers, search);
                });
            }
            angular.forEach(members, function (member) {
                member.date = new Date(member.joined);
            });
            membersReady.resolve(members);
            return memberReady.promise;
        }

        $scope.initMemberList1 = function () {
            Member.list()
                .then(function (members) {
                    $scope.allMembers = members;
                })
                .then(function () {
                    filterMembers(members);
                });
        };

        $scope.initMemberList = function () {
            Member.list()
                .then(filterMembers)
                .then(function (members) {
                    $scope.allMembers = members;
                    console.log('843 members ' + JSON.stringify(members));
                });
        };

        var columnDefs = [
            {
                name: 'photo',
                width: 100,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText photo"><a ng-href="#/members/{{row.entity.id}}">' +
                '<img ng-src="{{row.entity.photo.photo_link}}"/></a></div>'
            },

            {
                name: 'name',
                width: 300,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText"><a ng-href="#/members/{{row.entity.id}}">' +
                '{{row.entity.name}}</a></div>'
            },
            {
                name: 'Date Joined',
                field: 'date',
                type: 'date',
                cellFilter: 'date:"yyyy-MM-dd EEE"',
                enableCellEdit: true,
                width: 150
            },

            {
                field: 'hometown',
                width: 200
            },
            {
                name: 'city',
                width: 150
            },
            {
                field: 'state',
                editableCellTemplate: 'ui-grid/dropdownEditor',
                editDropdownOptionsArray: listSrv.usStates,
                width: 70
            },
            {
                field: 'notes'
            }
        ];

        $scope.initMemberGrid = function () {
            $scope.initMemberList();
            $scope.gridOptions = {
                columnDefs: columnDefs,
                data: 'members'
            };

            $scope.$on('uiGridEventEndCellEdit', function (event) {
                var member = event.targetScope.row.entity;
                Member.update(member);
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

        $scope.update = function (member) {
            if (!member) {
                member = $scope.member;
            }
            Member.update(member, function (err, newMember) {
                console.log('201 err ' + JSON.stringify(err));
                console.log('201 member ' + JSON.stringify(newMember));
            });
        };
    }
)
    .directive('field', function () {
        return {
            template: function (element, attr) { /*jslint unparam:true*/
                return '<span ng-click="edit=true" ng-mouseleave="edit=false"><span ng-if="!edit">{{' + attr.name + '}}' +
                    '</span><input ng-if="edit" ng-model="' + attr.name + '"/></span>';
            }

        };
    })

;
