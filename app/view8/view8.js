
'use strict';

angular.module('myApp.view8', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/promiseExample', {
    templateUrl: 'view8/view8.html',
    controller: 'View8Ctrl'
  });
}])
.factory('View8Service', ["$http", '$q',function($http, $q){
    var urlBase = "https://api.edmunds.com/api/vehicle/v2/"
    var urlEnd = "/models?fmt=json&api_key=3rbenfs9rbnqjjsc8mt8gfga"
    return {
        queryItem: queryItem,
    }

    function queryItem(type, finished){
        var deferred = $q.defer();
        $http({
            url: urlBase+type+urlEnd,
            method: 'GET',
        })
        .then(function(response){
            finished.value = true;
            deferred.resolve(response);
        },function(err){
            deferred.reject(err);
        });
        return deferred.promise
    }
}])
.controller('View8Ctrl', ['$scope', '$q', 'View8Service',function($scope, $q, View8Service) {
    $scope.dataAysnc  = [];
    
    $scope.finishedasynchonda = {value: false};
    $scope.finishedasyncacura = {value: false};
    $scope.finishedasynctoyota = {value: false};
    $scope.finishedsynchonda = {value: false};
    $scope.finishedsyncacura = {value: false};
    $scope.finishedsynctoyota = {value: false};

    $scope.dataSync = [];
    $scope.getDataAsync = getDataAsync;
    $scope.getDataSync = getDataSync;

    function getDataAsync(){
        var promises = [];
        $scope.dataAsync = [];
        promises.push(View8Service.queryItem("honda", $scope.finishedasynchonda));
        promises.push(View8Service.queryItem("acura", $scope.finishedasyncacura));
        promises.push(View8Service.queryItem("toyota", $scope.finishedasynctoyota))
        $q.all(promises)
            .then(function success(response){
                for(var res in response){
                    $scope.dataAsync.push(response[res].data);
                }
                console.log($scope.dataAsync);
            })
            .catch(function failure(error){
                console.log(error);
            });
    }
    
    function getDataSync(){
        View8Service.queryItem("honda", $scope.finishedsynchonda)
        .then(function stepOne(res){
            console.log("firstStep!");
            $scope.dataSync.push(res.data);
            return View8Service.queryItem("acura", $scope.finishedsyncacura);
        })
        .then(function stepTwo(res){
            console.log("secondStep!");
             $scope.dataSync.push(res.data);
            return View8Service.queryItem("toyota", $scope.finishedsynctoyota);
        })
        .then(function stepThree(res){
            console.log("thirdStep!")
             $scope.dataSync.push(res.data);
        })
        .catch(function(err){
            console.log(err)
        })
    }
    $scope.$on('roll-call', function(){
        console.log("View8Ctrl Reporting!!!");
    });
}]);