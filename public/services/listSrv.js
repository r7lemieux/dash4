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
            filter = filters[i];
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
        angular.forEach(objs, function(obj) {
           if (values.indexOf(obj[fieldname]) === -1) {
              values.push(obj[fieldname]);
           }
        });
        values.sort();
        return values;
      }
    };
  }]);