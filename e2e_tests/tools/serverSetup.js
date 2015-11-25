'use strict';
var BPromise = require('bluebird'),
    request  = require('superagent')
    //Kdomain = require('../../packages/custom/kdr/public/backend/kdomain-backendif'),
    //constants  = require('../../packages/custom/kdr/server/config/constants')
    //userObjs = require('../../packages/custom/kdr/server/test/dataGenerators/userObjs')
    ;

//http://www.ngroutes.com/questions/14af301/how-can-i-make-a-post-request-from-a-protractor-test.html
var post = function (url, data) {
  return new BPromise(function (resolve) {
    request
        .post(browser.baseUrl + url)
        .send(data)
        .end(resolve);
  });
};

//var get = function (url) {
//  return new BPromise(function (resolve) {
//    request
//        .post(browser.baseUrl + url)
//        .set('Accept', 'application/json')
//        .end(resolve);
//  });
//};

//http://stackoverflow.com/questions/26725104/how-to-send-a-post-using-protractor
//var post;
//post = function (url, data) {
//  var jsonStr = JSON.stringify({mos: data}),
//      options = {
//        method : 'POST',
//        url    : browser.baseUrl + url,
//        headers: {
//          'id': 'AQ8WHWC',
//          'sessionid': 'XnINW5KDQg=',
//          'Accept-Language': 'en-us',
//          'random': 'BS3P5Q',
//          'Accept'         : 'application/json',
//          'Content-Length' : Buffer.byteLength(jsonStr)
//        },
//        params : data,
//        body   : jsonStr
//        //body: '{"pay_load": ["AAA"]}'
//      };
//
//  return new BPromise(function (resolve, reject) {
//    function callback(error, response, body) {
//      console.log('371 error ' + JSON.stringify(error));
//      console.log('371 response ' + JSON.stringify(response));
//      console.log('371 body ' + JSON.stringify(body));
//      if (!error && response.statusCode === 200) {
//        var info = JSON.parse(body);
//        console.log(response);
//        console.log(info);
//        resolve(response);
//      } else {
//        reject(error);
//      }
//    }
//
//    console.log('812 call ' + browser.baseUrl + url + ' data ' + JSON.stringify(data));
//
//    request(options, callback);
//});
//};

//http://squirrel.pl/blog/2014/01/15/direct-server-http-calls-in-protractor/
//var jar = request.jar(),
//    req = request.defaults({
//      jar: jar
//    });

//var post = function (url, data) {
//  var defer = protractor.promise.defer();
//  //req.write(JSON.stringify({mos:data}));
//  console.log('810 calling  ' + browser.baseUrl + url + ' with data ' + JSON.stringify(data));
//    req.post(browser.baseUrl + url, {mos:data}, function (error, message) {
//      console.log('812 called ' + browser.baseUrl + url + ' error ' + error + ' message ' + JSON.stringify(message));
//      if (error || message.statusCode >= 400) {
//        defer.reject({
//          error : error,
//          message : message
//        });
//      } else {
//        defer.fulfill(message);
//      }
//    });
//  return defer.promise;
//}

//var post = function post(url, data) {
//  var defer = protractor.promise.defer();
//  console.log('711 data ' + JSON.stringify(data));
//  req.write(data);
//  req.post(browser.baseUrl + url, data, function (error, message) {
//    if (error || message.statusCode >= 400) {
//      console.log('812 error calling '  + browser.baseUrl + url + ' error ' + error + ' message ' + JSON.stringify(message));
//      defer.reject({
//        error  : error,
//        message: message
//      });
//    } else {
//      console.log('813 message ' + JSON.stringify(message));
//      defer.fulfill(message);
//    }
//  });
//  return defer.promise;
//};

//var post2 = function post(url, data) {
//  return new BPromise(function(resolve,reject) {
//    request
//        .post(url)
//        .send(data)
//        .end(resolve);
//  });
//}
//
//var post3 = function post(url, data) {
//  var jsonStr = JSON.stringify(data);
//  var options = {
//    host   : 'localhost',
//    port   : 3001,
//    path   : '/api/e2e/purge',
//    method : 'POST',
//    headers: {
//      'Content-Type'  : 'application/json',
//      'Content-Length': Buffer.byteLength(jsonStr)
//    }
//  };
//
//  var httpreq = http.request(options, function (response) {
//    response.setEncoding('utf8');
//    response.on('data', function (chunk) {
//      console.log('920 body: ' + chunk);
//    });
//    response.on('end', function () {
//    })
//  });
//  httpreq.write(jsonStr);
//  console.log('911  ' + JSON.stringify(jsonStr));
//  httpreq.end();
//};


//var post4 = function(url,data) {
//  return new BPromise(function(resolve) {
//    browser.executeAsyncScript(function() {
//      $.post(url, JSON.stringify(data), resolve);
//    }, url, JSON.stringify(data));
//});
//};

//var post5 = function(url, data) {
//  http.get(url, function(response) {
//    var bodyString = JSON.stringify(data);
//    response.setEncoding('utf8');
//
//    response.on('data', function(chunk) {
//      bodyString += chunk;
//    });
//
//    response.on('end', function() {
//      var json_data = bodyString;
//      // All the processing and Angular code should be here
//    });
//
//  }).on('error', function(err) {
//    console.log('There is an error in GET request ' + err);
//  });
//};

//var logout = function () {
//  return get('api/logout')
//      .catch(function () {
//        return BPromise.resolve();
//      });
//};
//
//var login = function () {
//  console.log('225  ' + JSON.stringify());
//  return post('api/login',
//      {
//        email   : 'aaa@publicTests.com',
//        password: 'password'
//      }
//  )
//      .then(function(res){
//        console.log('330 res ' + JSON.stringify(res));
//        return BPromise.resolve();
//      },
//      function (err) {
//        console.log('333 err ' + JSON.stringify(err));
//        return BPromise.resolve();
//      });
//};

var buildPostFct = function (fctName, data) {
  return function () {
    //console.log('415 fctName ' + fctName + ' data ' + JSON.stringify(data));
    return post('api/e2e/' + fctName, data);
  };
};

//var buildAuthFct = function (fctName, data) {
//  return function () {
//    return post('api/' + fctName, data);
//  };
//};

//exports.logout   = function () {
//  var flow = protractor.promise.controlFlow();
//  return flow.execute(logout);
//}
//exports.login    = function () {
//  var flow = protractor.promise.controlFlow();
//  return flow.execute(login);
//}

exports.purge    = function (data) {
  var flow = protractor.promise.controlFlow();
  return flow.execute(buildPostFct('purge', data));
};
exports.fill     = function (data) {
  var flow = protractor.promise.controlFlow();
  return flow.execute(buildPostFct('fill', data));
};
exports.purgeAll = function (data) {
  var flow = protractor.promise.controlFlow();
  return flow.execute(buildPostFct('purgeAll', data));
};
exports.purgeDb = function () {
  var flow = protractor.promise.controlFlow();
  return flow.execute(buildPostFct('purgeAll'));
  //return flow.execute(buildPostFct('purgeAll', {kdomain: {keep: constants.topkd._id.toString()}}));
  //return flow.execute(buildPostFct('purgeAll', {}))
  //.then(Kdomain.create(constants.topkd));
};
exports.purgeKdomains = function () {
  //var flow = protractor.promise.controlFlow();
  //return flow.execute(buildPostFct('purge', {kdomain: {keep: constants.topkd._id.toString()}}));
};
exports.fillAll  = function (data) {
  var flow = protractor.promise.controlFlow();
  return flow.execute(buildPostFct('fillAll', data));
};
exports.computeKdomains  = function (data) {
  var flow = protractor.promise.controlFlow();
  return flow.execute(buildPostFct('computeKdomains', data));
};
