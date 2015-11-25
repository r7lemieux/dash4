'use strict';
var
      EC       = protractor.ExpectedConditions,
      userObjs = require('../../packages/custom/kdr/server/test/dataGenerators/userObjs'),
      userData = userObjs.userData
      ;

exports.login = function (userParam) {
    var user = (Number.isInteger(userParam)) ? userData[userParam] : userParam;
    browser.get('/auth/login');
    browser.wait(EC.presenceOf($('.email-field input')), 2000);
    // login
    element(by.css('.email-field input')).sendKeys(user.email);
    element(by.css('.password-field input')).sendKeys(user.password);
    element(by.css('.button_login button')).click();
    // land on welcome page
    return browser.wait(EC.presenceOf($('.glyphicon-star-empty')), 1000);
};

exports.logout = function () {
    element(by.css('.dropdown')).click();
    element(by.css('.dropdown-menu a')).click();
    return browser.wait(EC.presenceOf($('a.nav-login'), 'Log In'), 1000);
};

exports.ensureLogin = function (userParam) {
    if (!Number.isInteger(userParam)) {
        userParam = 1;
    }
    var user = userObjs.userData[userParam];
    browser.get('/auth/login');
    browser.wait(EC.presenceOf($('.basePage')), 1000);
    return element(by.css('.loginPage')).isPresent()
          .then(function (isPresent) {
              if (isPresent) {
                  return exports.login(userParam);
              } else {
                  element(by.css('.navbar-nav ul[ng-show="hdrctr.hdrvars.authenticated"]>li>a')).getText()
                        .then(function (text) {
                            if (text === user.name) {
                                return;
                            } else {
                                return exports.logout()
                                      .then(exports.login(userParam));
                            }
                        });
              }
          });
};

exports.ensureLogout = function () {
    browser.get('/auth/login');
    browser.wait(EC.presenceOf($('.basePage')), 1000);
    return element(by.css('.loginPage')).isPresent()
          .then(function (isPresent) {
              if (!isPresent) {
                  return exports.logout();
              }
          });
};
