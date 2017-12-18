angular.module('csv', [])
.controller('controllerCsv', function($scope, $http) {
    $http.get('http://localhost:8080/SchedaRilasci/csvRelease/{idPolarion}').
        then(function(response) {
            $scope.csv= response.data;
            });
});

