'use strict';

angular.module('demo')

  .controller('demoCtr2', function ($scope) {

      $scope.page = {
        title: 'Intro to Angular',
        city: 'Addison',
        host: 'Improving Enterprises'
      };

      $scope.getValue = function (object, path) {
        var
          o = object,
          a = path.split('.');
        while (a.length) {
          o = o[a.shift()];
        }
        return o;
      };
      $scope.setValue = function (object, path, value) {
        var
          o = object,
          a = path.split('.'),
          mid
          ;
        while (a.length - 1) {
          mid = a.shift();
          o = o[mid] = o[mid] || {};
        }
        o[a.shift()] = value;
      };
    }
  )

  .directive('field1', function ($compile) {
    return {

      controller: 'demoCtr2',

      link: function (scope, element, attr) {
        var
          parent = element.parent(),

          elementText = angular.element('<span ng-bind="' + attr.name + '"></span> '),
          elementInput = angular.element('<input ng-model="' + attr.name + '"/>'),

          compiledText = $compile(elementText),
          compiledInput = $compile(elementInput);

        compiledText(scope);
        compiledInput(scope);

        elementText.on('click', function () {
          elementText.detach();
          parent.append(elementInput);
        });
        elementInput.on('mouseleave', function () {
          elementInput.detach();
          parent.append(elementText);
        });

        element.remove();
        parent.append(elementText);
      }
    };
  })




  .directive('field2', function () {
    return {
      scope: true,
      controller: 'demoCtr2',

      template: '<span ng-click="edit=true" ng-mouseleave="edit=false"><span ng-if="!edit">{{field.value}}</span><input ng-if="edit" ng-model="field.value"/></span>',
      //templateUrl: 'public/views/intro/templates/fieldTemplate.html',
      link: function (scope, element, attr) { /*jslint unparam:true*/
        scope.field = {value: scope.getValue(scope, attr.name)};
        scope.$watch("field.value", function (newVal, oldVal) {
          if (newVal !== oldVal) {
            scope.setValue(scope.$parent, attr.name, newVal);
          }
        });

      }
    };
  })



  .directive('field', function () {
    return {

      template: function (element, attr) { /*jslint unparam:true*/
        return '<div ng-click="edit=true" ng-mouseleave="edit=false"><span ng-if="!edit">{{' + attr.name + '}}</span><input ng-if="edit" ng-model="' + attr.name + '"/></div>';
      }

    };
  })


;
