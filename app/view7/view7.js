
'use strict';

angular.module('myApp.view7', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/httpExample', {
    templateUrl: 'view7/view7.html',
    controller: 'View7Ctrl'
  });
}])
.factory('View7Service', ["$http",function($http){
    var url = "http://api.apixu.com/v1/current.json?key=4e18b78866654ab29fe25119170305&q=Paris"
    return {
        queryWeatherApi: queryWeatherApi,
    }

    function queryWeatherApi(){
        return $http.get(url);
    }
}])
.controller('View7Ctrl', ['$scope', 'View7Service',function($scope, View7Service) {
    $scope.wxObj  = {};
    $scope.getUpdatedWeather = getUpdatedWeather;

    function getUpdatedWeather(){
        View7Service.queryWeatherApi()
            .then(function success(response){
                console.log(response);
                $scope.wxObj = response.data;
            })
            .catch(function failure(error){
                console.log(error);
            });
    }
    $scope.$on('roll-call', function(){
        console.log("View7Ctrl Reporting!!!");
    });
}]);