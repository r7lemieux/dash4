'use strict';

angular.module('dash').controller('HomeCtr', function ($scope, $location) {
      $scope.welcomeText = 'Welcome to DASH-4 workshop !';
        $scope.path = function() {
            return $location.path();
        }

        $scope.val = 7;
    }


)

.directive('dir1', function () {
    return {
        template: '<div transclude>First Directive with value {{val}} </div>',
        transclude: true
    };
});

