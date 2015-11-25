'use strict';
/**
 * Created by r7lemieux on 11/24/15.
 */

var EC = protractor.ExpectedConditions;

let MemberPage = function (memberId) {
    //browser.get('http://localhost:3000/#/members/' + memberId);
    browser.get(`http://localhost:3000/#/members/${memberId}`);
    browser.wait(EC.presenceOf($('.memberPage')));
}

MemberPage.prototype = Object.create({}, {
    city: {
        value: function () {
            return element(by.binding('member.city')).getText();
        }
    },
    country: {
        get: function() {
            return element(by.name('member.country'));
        }
    },
    countryInput: {
        value: function () {
            let countryElement = element(by.name('member.country'));

            countryElement.click();
            return countryElement.element(by.tagName('input')).getAttribute('value');
        }
    }
});


module.exports = MemberPage;