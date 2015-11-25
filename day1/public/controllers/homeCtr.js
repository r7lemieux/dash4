'use strict';

angular.module('dash').controller('HomeCtr', function ($scope, $location) {
      $scope.welcomeText = 'Welcome to DASH-4 workshop !';
        $scope.path = function() {
            return $location.path;
        }
    }
)

