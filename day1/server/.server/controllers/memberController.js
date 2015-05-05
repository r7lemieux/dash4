/**
 * Member Controller
 *
 * Created by r7lemieux on 12/2/14.
 */
'use strict';

/**
 * Module dependencies.
 */
var
  Member = require('../model/member'),
  _ = require('lodash'),
  meetupService = require('../services/meetupService')
  ;

exports.getAll = function (req, res) {
  meetupService.getAllMembers(function (members) {
    //res.status(200);
    res.send(members);
  });
};

exports.get = function (req, res) {
  var
    id = req.query.memberId;

  meetupService.getMemberById(id, function (member) {
    res.jsonp(member);

  });
};

exports.update = function(req, res) {
  meetupService.getMemberById(req.body.id, function(member) {
    var newMember = req.body;
    _.forEach(newMember, function(val, key) {
      console.log('101 key ' + key + ' val ' + val);
      member[key] = val;
    });
    meetupService.persistMembers();
    res.send(member);
  });
};



