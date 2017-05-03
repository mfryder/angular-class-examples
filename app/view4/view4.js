'use strict';

angular.module('myApp.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/serviceFilterExample', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl'
  });
}])
.filter('View4Filter', [function(){
    return function(input){
        var output = angular.copy(input);
        for(var i in output){
            if(output[i].type !== "football"){
                output[i].type = "football";
            }
        }
        return output;
    }
}])
.factory('View4Service', ["$filter",function($filter){
    return {
        determineSportsLikes: determineSportsLikes,
        determineSportsLikesFilter: determineSportsLikesFilter
    }

    function determineSportsLikes(input){
        var counts = {
            "football": 0,
            "baseball": 0,
            "hockey": 0
        };
        for(var i in input){
            switch(input[i].type){
                case "football":
                counts.football +=1;
                break;
                case "baseball":
                counts.baseball +=1;
                break;
                case "hockey":
                counts.hockey += 1;
                break;
                default:
            } 
        }
        return counts;
    }
    function determineSportsLikesFilter(input){
        var item = $filter("View4Filter")(input);
        return determineSportsLikes(item)
    }
}])
.controller('View4Ctrl', ['$scope', 'View4Service',function($scope, View4Service) {
    $scope.items = [];
    $scope.count = {};
    $scope.filteredCount = {};
    $scope.addItem = addItem;

    function addItem(type){
        $scope.items.push({type: type});

    }

    $scope.$watchCollection("items", function(newVal){
        if(newVal){
            $scope.count = View4Service.determineSportsLikes($scope.items);
            $scope.filteredCount = View4Service.determineSportsLikesFilter($scope.items);
        }
    })
}]);

