'use strict';

angular.module('dash').factory('memberSrv', [
  function () {

    return {

      buildCommonTopics: function (_members) {
        var
          topics = {},
          members = {},
          membersByTopic = {},
          idMatches = {},
          key,
          memberAid,
          match,
          matches = {}
          ;

        // build a hash of topics by Id
        angular.forEach(_members, function (member) {
          angular.forEach(member.topics, function (topic) {
            if (!topics[topic.id]) {
              topics[topic.id] = [];
            }
            topics[topic.id].push(member.id);
          });
        });

        // build hash of members by topics
        angular.forEach(_members, function (member) {
          members[member.id] = member;
          angular.forEach(member.topics, function (topic) {
            if (!topics[topic.id]) {
              topics[topic.id] = topic;
            }
            if (!membersByTopic[topic.id]) {
              membersByTopic[topic.id] = [];
            }
            membersByTopic[topic.id].push(member.id);
          });
        });

        // count the idMatches for each member-member pair
        angular.forEach(_members, function (memberA) {
          memberAid = memberA.id;
          angular.forEach(memberA.topics, function (topic) {
            angular.forEach(membersByTopic[topic.id], function (memberBid) {
              if (memberAid !== memberBid) {
                key = (memberAid < memberBid) ? [memberAid, memberBid] : [memberBid, memberAid];
                if (!idMatches[key]) {
                  idMatches[key] = [];
                }
                if (idMatches[key].indexOf(topic.id) !== -1) {
                  idMatches[key].push(topic.id);
                }
              }
            });
            if (!topics[topic.name]) {
              topics[topic.name] = [];
            }
            topics[topic.name].push(memberA);
          });
        });

        angular.forEach(idMatches, function (topicIds, key) {
          match = {
            members: [
              members[idMatches[key[0]]],
              members[idMatches[key[1]]]
            ],
            topics: [],
            topicCount: topicIds.length
          };

          angular.forEach(topicIds, function (topicId) {
            match.topics.push(topics[topicId]);
          });
          if (!matches[match.topicCount]) {
            matches[match.topicCount] = [];
          }
          matches[match.topicCount].push(match);
        });

        return matches;
      }
    };
  }]);