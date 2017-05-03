'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/scopeHeirarchExample', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope',function($scope) {
    $scope.typesOfFruits = ["Apple", "Orange", "Kiwi", "Bannana"];
}]);