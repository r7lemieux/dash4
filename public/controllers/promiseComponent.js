'use strict';

angular.module('dash').component('dashpromise', {
    controllerAs: 'vm',
    controller: promiseMemberCtr,
    transclude: true,
    templateUrl: './views/promiseMember.html'
});

function promiseMemberCtr1(Member, $stateParams) {
    var ctr = this,
        friendIds;

    Member.get({memberId: $stateParams.memberId}).$promise.then(function (member) {
        ctr.member = member;
        friendIds = member.friends;
        if (friendIds && friendIds.length) {
            member.friends.forEach(function (friendId, index) {
                Member.get({memberId: friendId}, function (friend) {
                    ctr.member.friends[index] = friend.name;
                });
            });
        }
    });
}

function promiseMemberCtr2(Member, $stateParams, $q) {
    var ctr = this, promises = [], friendIds;

    Member.get({memberId: $stateParams.memberId}).$promise
        .then(function (member) {
            ctr.member = member;
            friendIds = member.friends;
            if (friendIds && friendIds.length) {
                member.friends.forEach(function (friendId, index) {
                    promises.push(Member.get({memberId: friendId}).$promise);
                });
            }
            ctr.member.friends = [];
            $q.all(promises).then(function (friends) {
                friends.forEach(function (friend) {
                    ctr.member.friends.push(friend.name);
                });
            });
        });
}

function promiseMemberCtr3(Member, $stateParams, $q) {
    var ctr = this, friendIds, promises = [];

    Member.get({memberId: $stateParams.memberId}).$promise
        .then(function (member) {
            ctr.member = member;
            friendIds = member.friends;
            if (friendIds && friendIds.length) {
                member.friends.forEach(function (friendId) {
                    promises.push(Member.get({memberId: friendId}).$promise);
                });
                $q.all(promises).then(function (friends) {
                    ctr.member.friends = [];
                    friends.forEach(function (friend) {
                        ctr.member.friends.push(friend.name);
                    });
                });
            }
        });
}

function promiseMemberCtr4(Member, $stateParams, $q, lodash) {
    var ctr = this, friendIds, _ = lodash;
    Member.get({memberId: $stateParams.memberId}).$promise
        .then(function (member) {
            ctr.member = member;
            friendIds = member.friends;
            return _.map(friendIds, function (friendId) {
                return Member.get({memberId: friendId}).$promise;
            });
        })
        .then(function (promises) {
            $q.all(promises).then(function (friends) {
                ctr.member.friends = _.filter(friends, 'name');//_.map(friends, function (friend) {
                //  return friend.name;
                //});
            });
        });
}


function promiseMemberCtr6(Member, $stateParams, $q, lodash) {
    var ctr = this,
        friendIds,
        _ = lodash,
        getMember = function () {
            return Member.get({memberId: $stateParams.memberId}).$promise
                .then(
                    function (member) {
                        ctr.member = member;
                        friendIds = member.friends;
                        //return _.map(friendIds, function (friendId) {
                        //    return Member.get({memberId: 'aaa'}).$promise;
                        //});
                    }
                )
        },
        getFriends = function (promises) {
            $q.all(promises).then(
                function (friends) {
                    ctr.member.friends = _.filter(friends, 'name');
                    //function (friend) {
                    //  return friend.name;
                    //});
                }
            );
        },
        goodFct = function () {
            return $q.resolve();
        },
        badFct = function () {
            return $q.reject('Bad');
        }

    return goodFct()
        .then(getMember)
        .then(getFriends)
        .finally(function (err) {
            console.log('Final  ' + err);
        });

};

function promiseMemberCtr(Member, $stateParams, $q, lodash) {
    var ctr = this,
        friendIds,
        _ = lodash,
        getMember = function () {
            var defer = $q(function(resolve, reject) {
                Member.get({memberId: $stateParams.memberId}, function (member) {
                    ctr.member = member;
                    resolve(member);
                });
            });
            return defer;
        },
        getFriendIds = function (member) {
            friendIds = member.friends;
            var promises = _.map(friendIds, function (friendId) {
                return Member.get({memberId: friendId}).$promise;
            });
            return promises;
        },
        getFriends = function (promises) {
            return $q.all(promises).then(function (friends) {
                ctr.member.friends = _.map(friends, function (friend) {
                    return friend.name;
                });
            });
        };
    getMember()
        .then(getFriendIds, failureFct)
        .then(getFriends)
        .catch(function (err) {
            console.log('O no ! ' + err);
        })
        .finally(function(){}, notifyFct);
};
