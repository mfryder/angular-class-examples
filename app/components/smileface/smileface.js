'use strict';

angular.module('smileFace', [])
.directive('smileFace', function(){

    return {
        restrict: 'E',
        scope: {
            'max': '@'
        },
        controller: smileFaceController,
        templateUrl: "components/smileface/smile-face.html"
    };

    function smileFaceController($scope){
        $scope.size="small";
        $scope.count=1;
        $scope.sizeOptions = ["small", "medium", "large"];
        $scope.countArray = [0];
        $scope.changeSize = changeSize;
        $scope.changeCount = changeCount;
        if(!$scope.set){
            $scope.set = {size: "small", count: 1};
        }
        function changeSize(size){
            $scope.set.size = size
        }
        function changeCount(count){
            if(count){
                $scope.set.count = count;
                if(count > $scope.countArray.length){
                    while ($scope.countArray.length < count){
                        $scope.countArray.push($scope.countArray.length);
                    }
                }else if(count < $scope.countArray.length){
                    while ($scope.countArray.length > count){
                        $scope.countArray.splice($scope.countArray.length-1,1);
                    }
                }
            }
        }
    }
})