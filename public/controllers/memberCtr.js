'use strict';

angular.module('dash').controller('MemberCtr',
    function ($scope, $q, $stateParams, $location, uiGridConstants, Member, listSrv) {

        var ctr = $scope;
        ctr.title = 'Intro to Angular';

        // ====
        // Init
        // ====

        ctr.hi = 'hello';

        var filterMembers = function (members) {
            var search = $location.search(),
                membersReady = $q.defer();
            if (search) {
                angular.forEach(search, function (val, key) {
                    ctr.filter.fieldName = key;
                    ctr.filter.fieldValue = val;
                    ctr.members = listSrv.filter(ctr.allMembers, search);
                });
            }
            angular.forEach(members, function (member) {
                member.date = new Date(member.joined);
            });
            membersReady.resolve(members);
            return membersReady.promise;
        }

        ctr.initMemberList1 = function () {
            $q.all([
                Member.list().$promise
            ])
                .then(function (results) {
                    var members = results[0];
                    ctr.allMembers = members;
                    return members
                })
                .then(function (members) {
                    filterMembers(members);
                })
                .catch(function(err) {

                });
        };

        ctr.initMemberList = function () {
            Member.list().$promise
                //.then(filterMembers)
                .then(function (members) {
                    ctr.allMembers = ctr.members = members;
                });
        };

        ctr.initMemberList();

        var columnDefs = [
            {
                name: 'photo1',
                width: 100,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText photo"><a ui-sref="member({memberId:row.entity.id})">' +
                '<img ng-src="{{row.entity.photo.photo_link}}"/></a></div>'
            },
            {
                name: 'name',
                width: 300,
                enableCellEdit: false,
                filter: {
                condition: function(searchTerm, cellValue) {
                    var cond = new RegExp(searchTerm);
                    return cond.exec(cellValue);
                  }
                },
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
                filter: {
                    type: uiGridConstants.filter.SELECT
                },
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

        ctr.initMemberGrid = function () {
            ctr.initMemberList();
            ctr.gridOptions = {
                columnDefs: columnDefs,
                enableFiltering: true,
                data: 'members'
            };

            ctr.$on('uiGridEventEndCellEdit', function (event) {
                var member = event.targetScope.row.entity;
                Member.update(member);
            });
        };

        ctr.initMember = function () {

            Member.get({memberId: $stateParams.memberId}, function (member) {
                ctr.member = member;
            });
        };

        // ======
        // Filter
        // ======

        ctr.filter = {
            fieldName: null,
            fieldValue: null,
            fieldNames: ['name', 'city', 'state', 'id', 'status'],
            fieldValues: []
        };

        ctr.filterMembers = function () {
            var filter = {};
            filter[ctr.filter.fieldName] = ctr.filter.fieldValue;
            $location.search(filter);
            ctr.members = listSrv.filter(ctr.allMembers, filter);
        };

        ctr.$watch('filter.fieldName', function (newVal, oldVal) {
            if (!newVal) {
                ctr.filter.fieldValues = [];
            } else if (newVal !== oldVal) {
                ctr.filter.fieldValues = listSrv.getUsedValues(ctr.allMembers, newVal);
            }
        });

        ctr.$watch('filter.fieldValue', function (newVal, oldVal) {
            if (newVal != oldVal) {
                if (newVal) {
                    ctr.filterMembers();
                } else {
                    ctr.members = ctr.allMembers;
                }
            }
        });

        ctr.buildCommonTopics = function () {
            ctr.commonTopics = listSrv.buildCommonTopics(ctr.members);
        };

        // ======
        // Modify
        // ======

        ctr.update = function (member) {
            if (!member) {
                member = ctr.member;
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
