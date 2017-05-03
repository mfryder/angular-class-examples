'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/watchExample', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope',function($scope) {
    $scope.reference = {"test": "testData"};
    $scope.collection = ["apples", "oranges", "kiwis"];
    $scope.value = {"type": "baseball"};
    $scope.oldCollection = [];
    $scope.oldReference = {};
    $scope.oldValue = {};
    $scope.updateReference = updateReference;
    $scope.clearReference = clearReference;
    $scope.updateCollection = updateCollection;
    $scope.updateValue = updateValue;

    function updateReference(){
        $scope.reference = {"updated": "newTestData"};
    }

    function clearReference(){
        $scope.reference = {"test": "testData"};
    }

    function updateCollection(){
        $scope.collection.push("banannas");
    }

    function updateValue(){
        if($scope.value.type === "baseball"){
            $scope.value.type = "football";
        }else{
            $scope.value.type = "baseball";
        }
    }

    $scope.$watch("reference", function(newVal, oldVal){
        if(oldVal !== newVal){
            console.log(oldVal);
            console.log(newVal);
            $scope.oldReference = oldVal;
            $scope.changed = true;
        }
    });

    $scope.$watchCollection("collection", function(newVal, oldVal){
        if(oldVal !== newVal){
            console.log(oldVal);
            console.log(newVal);
            $scope.oldCollection = oldVal;
            $scope.collectionChanged = true;
        }
    })

    $scope.$watch("value", function(newVal, oldVal){
        if(oldVal !== newVal){
            console.log(oldVal);
            console.log(newVal);
            $scope.oldValue = oldVal;
            $scope.valueChanged = true;
        }
    }, true);
}])

.controller('GoodCtrl', ['$scope, GoodService',function($scope, GoodService) {
    $scope.goodInteraction = [];
    $scope.addGoodInteraction = addGoodInteraction;
    $scope.displayInteractionCount = 0;

    function addGoodInteraction(input){
        $scope.goodInteraction.push(input);
        GoodService.updateInteractionCount();
        $scope.displayInteractionCount = GoodService.getInteractionCount();
    }
}])

.service('GoodService', [function(){
    var interactionCount = 0;
    return {
        getInteractionCount: getInteractionCount,
        updateInteractionCount: updateInteractionCount
    }

    function getInteractionCount(){
        return interactionCount;
    }
    function updateInteractionCount(){
        interactionCount +=1;
    }
}])
.controller('BadCtrl', ['$scope',function($scope) {
    $scope.badInteraction = [];
    $scope.addBadInteraction = badInteraction;

    function addBadInteraction(input){
        checkValidityOfInput(input);
        $scope.badInteraction.push(input)
    }
    function checkValidityOfInput(input){
        if(input){
            filterInputIfItDoesntMatches(output, input);
        }
    }
    function filterInputIfItDoesntMatches(output, input){
        if(input.type === 'baseball'){
            addSomePropertyCauseIWantTo(output);
        }
    }
    function addSomePropertyCauseIWantTo(output){
        input.cool = "yes";
    }
}]);