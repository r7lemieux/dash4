'use strict';

angular.module('demo').controller('DemoCtr1', ['$scope',
  function ($scope) {

    $scope.title = 'Intro to Angular';

  }
])
  .directive('showUpperCase', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, controller) {
        controller.$formatters.push(function(value) {
          return value.toUpperCase();
        });
      }
    }
  })

  .directive('parseUpperCase', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, controller) {
        controller.$parsers.push(function(value) {
          return value.toUpperCase();
        });
      }
    }
  })
;
