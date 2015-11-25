'use strict';
/**
 * Created by r7lemieux on 11/23/15.
 */

describe('DASH Protractor tests', function () {
    describe('DASH member page', function () {

        it('load the page', function () {
            let values = element(by.className('objValues'));
            browser.get('http://localhost:3000/#/members/8970895');
            expect(element(by.css('.memberPage')).isPresent()).toBe(true);
            expect(element.all(by.binding('member')).count()).toBe(6);
            expect(element(by.binding('member.name')).getText()).toBe('Richard Lemieux');
            expect(element(by.binding('city')).getText()).toBe('Allen');

            expect(element(by.exactBinding('member.city')).getText()).toBe('Allen');
            expect(element(by.repeater('topic in member.topics')).getText()).toBe('Raw Food,');
            expect(values.element(by.name('member.state')).getText()).toBe('TX');

            //let countryElement = element(by.css('form section div:nth-of-type(2) span.value'));
            let countryElement = element(by.name('member.country'));
            //let countryElement = element(by.css('.field-country span:nth-of-type(2)'));
            expect(countryElement.getText()).toBe('us');
            //
            countryElement.click();
            expect(countryElement.element(by.model('member.country')).getAttribute('value')).toBe('us');

        });
    });
});