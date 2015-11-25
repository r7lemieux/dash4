'use strict';

exports.extends = function (browser) {

  browser.ensureUrlIs1 = function (path, done) {
    this.getLocationAbsUrl().then(function (url) {
      expect(url.split('/').pop()).toEqual(path);
      done();
    });
  };


  browser.testUrl = function (fct) {
    return this.getLocationAbsUrl().then(function (url) {
      var test = url.split('/').pop();
      fct(test);
    });
  };

  browser.ensureUrlIs = function (path) {
    //return new BPromise(function(resolve, reject) {
    return this.getLocationAbsUrl().then(function (url) {
      var test = url.split('/').pop();
      expect(test).toEqual(path);
    });
    //});
  };

  browser.waitForUrl = function (url) {
    var browser = this;
    return browser.wait(function () {
      return browser.driver.getCurrentUrl()
          .then(function (currentUrl) {
            return new RegExp(url).test(currentUrl);
          });
    }, 1500);
  };

  browser.getFocused = function(element){
    return this.driver.switchTo().activeElement().getInnerHtml();
  };

  //function writeScreenShot(data, filename) {
  //  var buf    = new Buffer(data, 'base64'),
  //      stream = fs.createWriteStream(filename);
  //
  //  stream.write(buf);
  //  stream.end();
  //}

  //browser.screenshot = function () {
  //  browser.takeScreenshot().then(function (png) {
  //    screenShotNum++;
  //    writeScreenShot(png, 'e2e-tests/screenshots/sh' + screenShotNum + '.png');
  //  });
  //}
};
