'use strict';

angular.module('dash').factory('listSrv', [
  function () {

    return {

      // Filters Objects base on one field value
      // filter is of the form { fieldName : fieldValue }

      filter: function (allObjs, filters) {
        var filteredObjs, i, match, filter;
        if (!Array.isArray(filters)) {
          filters = [filters];
        }
        filteredObjs = [];
        angular.forEach(allObjs, function (obj) {
          for (i = match = 0; i < filters.length && !match; i++) {
            filter        = filters[i];
            var fieldname = Object.getOwnPropertyNames(filter)[0];
            if (obj[fieldname] === filter[fieldname]) {
              filteredObjs.push(obj);
              match = true;
            }
          }
        });
        return filteredObjs;
      },

      // Finds all the values for a given field name in objects.
      getUsedValues: function (objs, fieldname) {
        var values = [];
        angular.forEach(objs, function (obj) {
          if (values.indexOf(obj[fieldname]) === -1) {
            values.push(obj[fieldname]);
          }
        });
        values.sort();
        return values;
      },

      usStates: [
        {id: 'AL', value: 'AL'},
        {id: 'AK', value: 'AK'},
        {id: 'AZ', value: 'AZ'},
        {id: 'AR', value: 'AR'},
        {id: 'CA', value: 'CA'},
        {id: 'CO', value: 'CO'},
        {id: 'CT', value: 'CT'},
        {id: 'DC', value: 'DC'},
        {id: 'DE', value: 'DE'},
        {id: 'FL', value: 'FL'},
        {id: 'GA', value: 'GA'},
        {id: 'HI', value: 'HI'},
        {id: 'ID', value: 'ID'},
        {id: 'IL', value: 'IL'},
        {id: 'IN', value: 'IN'},
        {id: 'IA', value: 'IA'},
        {id: 'KS', value: 'KS'},
        {id: 'KY', value: 'KY'},
        {id: 'LA', value: 'LA'},
        {id: 'ME', value: 'ME'},
        {id: 'MD', value: 'MD'},
        {id: 'MA', value: 'MA'},
        {id: 'MI', value: 'MI'},
        {id: 'MN', value: 'MN'},
        {id: 'MS', value: 'MS'},
        {id: 'MO', value: 'MO'},
        {id: 'MT', value: 'MT'},
        {id: 'NE', value: 'NE'},
        {id: 'NV', value: 'NV'},
        {id: 'NH', value: 'NH'},
        {id: 'NJ', value: 'NJ'},
        {id: 'NM', value: 'NM'},
        {id: 'NY', value: 'NY'},
        {id: 'NC', value: 'NC'},
        {id: 'ND', value: 'ND'},
        {id: 'OH', value: 'OH'},
        {id: 'OK', value: 'OK'},
        {id: 'OR', value: 'OR'},
        {id: 'PA', value: 'PA'},
        {id: 'RI', value: 'RI'},
        {id: 'SC', value: 'SC'},
        {id: 'SD', value: 'SD'},
        {id: 'TN', value: 'TN'},
        {id: 'TX', value: 'TX'},
        {id: 'UT', value: 'UT'},
        {id: 'VT', value: 'VT'},
        {id: 'VA', value: 'VA'},
        {id: 'WA', value: 'WA'},
        {id: 'WV', value: 'WV'},
        {id: 'WI', value: 'WI'},
        {id: 'WY', value: 'WY'}
      ]
    }
  }]);