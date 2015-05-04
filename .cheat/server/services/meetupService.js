'use strict';

/**
 * Created by r7lemieux on 12/6/14.
 */
var
    fs              = require('fs'),
    http            = require('http'),
    meetupSigId     = '',
    meetupSig       = '',
    filename        = 'data/meetupMembers.json',
    meetupServer    = {
      host: 'api.meetup.com',
      path: '/2/members?sig_id=' + meetupSigId +
      '&order=name&group_urlname=DallasAngularJS&sig=' + meetupSig +
      '&offset=0&format=json&page=500'
    },

    MeetupCbFactory = function (cb) {
      return function (response) {
        var str = '';

        //another chunk of data has been received, so append it to `str`
        response.on('data', function (chunk) {
          str += chunk;
        });

        //the whole response has been received, so we just print it out here
        response.on('end', function () {
          cb(str);
        });
      };
    };

exports.persistMembers = function () {
  fs.writeFileSync(filename, JSON.stringify({results:this.members}));
};

exports.fetchMembers = function (cb) {
  var srv          = this;
  var httpCallback = new MeetupCbFactory(function (dataText) {
    if (dataText && dataText.substring(0, 12) !== '{"details":"') {
      fs.writeFileSync(filename, dataText);
    } else {
      dataText = fs.readFileSync(filename);
    }
    srv.members = JSON.parse(dataText).results;
    //members = global.data;
    srv.members = JSON.parse(dataText).results;

    cb(srv.members);
  });

  http.request(meetupServer, httpCallback).end();
};

exports.init = function (cb) {
  var srv = this;
  if (!srv.members) {
    srv.fetchMembers(function () {
      srv.membersById = {};
      srv.members.forEach(function (member) {
        srv.membersById[member.id] = member;
      });
      cb(srv.members);
    });
  } else {
    cb(srv.members);
  }
};

exports.getAllMembers = function (cb) {
  exports.init(cb);
  return this.members;
};

exports.getMemberById = function (id, cb) {
  var srv = this;
  this.init(function () {
    var member = srv.membersById[id];
    cb(member);
  });

};

exports.saveAll = function (members, cb) {
  var json = JSON.stringify(members);
  fs.writeFile(filename, json, cb);
};

