'use strict';

angular.module('app').controller('MapCtr', function ($scope, $location) {

        var map;

        this.initMap = function() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 32.7, lng: -96.9},
                zoom: 10
            });
        }

    });

