'use strict'

beforeEach(function () {
  jasmine.addMatchers({
    toHaveClass: function () {
      return {
        compare: function (actual, expected) {
          return {
            pass: actual.getAttribute('class').then(function (classes) {
              return classes.split(' ').indexOf(expected) !== -1;
            })
          };
        }
      };
    },
    toEqualSort: function () {
      return {
        compare: function (actual, expected) {
          if (!Array.isArray(actual)) {
            return {
              pass   : false,
              message: 'Expected ' + actual + ' to be an array.'
            };
          }
          if (actual.length !== expected.length) {
            return {
              pass   : false,
              message: 'Expected length ' + expected.length + ' to be ' + actual.length
            };
          }
          let actualSort   = actual.sort();
          let expectedSort = expected.sort();
          for (let i = 0; i < expected.length; i++) {
            if (actualSort[i] !== expectedSort[i]) {
              return {
                pass   : false,
                message: 'Expected item [' + i + '] ' + actualSort[i] + ' to be ' + expectedSort[i]
              }
            }
          }
          return {
            pass   : true,
            message: 'Expected ' + actualSort + ' to differ from ' + expectedSort
          }
        }
      };
    }
  });
});