'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bindingExample', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.kiwis = 4;
  $scope.oranges = 5;
  $scope.addOneKiwi = addKiwis;

  function addKiwis(){
    $scope.kiwis +=1;
  }
}]);