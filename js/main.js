var myApp = angular.module('tShirtApp', []);
var url = "http://sourabh22.kd.io:8080/tshirt/";
myApp.factory('Data', function($http) {
    return {
        getTshirts: function() {
            return $http.get(url);
        },
        addTshirts: function(tShirt) {
            return $http.post(url, tShirt);
        },
        deleteTshirt: function(tShirt) {
            return $http.delete(url + tShirt._id)
        },
        updateTshirt: function(tShirt) {
            return $http.put(url + tShirt._id, tShirt)
        }
    };
});
myApp.controller("tShirtController", function($scope, Data) {

    var tshirts = Data.getTshirts();
    tshirts.then(function(data) {
        $scope.tshirts = data.data
    });

    $scope.getTs = function() {
        var tshirts = Data.getTshirts();
        tshirts.then(function(data) {
            $scope.tshirts = data.data
        });
    }

    $scope.deleteTs = function(tshirt) {
        Data.deleteTshirt(tshirt).then(function() {
            $scope.getTs();
        });

    }

    $scope.saveTs = function(tshirtModel) {
        Data.addTshirts(tshirtModel).then(function() {
            $scope.tshirtModel = {};
            $scope.getTs();
        });
    }
    $scope.updateTs = function(tshirtModel) {
        Data.updateTshirt(tshirtModel).then(function() {
            $scope.updateFlag = false;
            $scope.tshirtModel = {};
            $scope.getTs();
        })

    }
    $scope.updateModel = function(tshirtModel) {
        $scope.updateFlag = true;
        $scope.tshirtModel = tshirtModel

    }
});