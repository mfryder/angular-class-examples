'use strict';

angular.module('myApp.view5', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/directiveExample', {
    templateUrl: 'view5/view5.html',
    controller: 'View5Ctrl'
  });
}])

.controller('View5Ctrl', ['$scope',function($scope) {
    $scope.max = 20;
    $scope.max2 = 10;
    $scope.max3 = 5;
}]);