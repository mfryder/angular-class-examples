'use strict';

angular.module('myApp.view9', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/rootScopeEventing', {
    templateUrl: 'view9/view9.html',
    controller: 'View9Ctrl'
  });
}])
.controller('View9Ctrl', ['$scope', '$rootScope',function($scope, $rootScope) {
    $scope.rollCall =  rollCall;
    $scope.max = 5;
    function rollCall(){
        $rootScope.$broadcast('roll-call')
    }

    $scope.$on('roll-call', function(){
        console.log("View9Ctrl Reporting!!!");
    });

    $rootScope.$on('roll-call', function(){
        console.log("TopCtrl Reporting!!!");
    });
    $scope.$on("reporting", function(){
        console.log("Reported by ViewCtrl9");
    })
    $rootScope.$on("reporting", function(){
        console.log("Reported by top");
    })
}]);