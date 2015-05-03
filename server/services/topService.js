'use strict';

var _ = require('lodash');

var TopService = function TopService() {
  console.log('topService ');
};


TopService.prototype.init = function (args) {
  var srv = this;
  args.forEach(function (arg, argName) {
    srv[argName] = arg;
  });
};

exports.class = TopService;
