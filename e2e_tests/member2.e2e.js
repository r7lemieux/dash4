'use strict';
/**
 * Created by r7lemieux on 11/23/15.
 */

var MemberPage = require('./pages/MemberPage');


describe('DASH member page', function () {

    it('load the page', function () {
        let page = new MemberPage('8970895');
        expect(page.city()).toEqual('Allen');

        expect(page.countryIn()).toBe('us');

    });
});