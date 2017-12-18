angular.module('csv', [])
.controller('controllerCsv', function($scope, $http) {	
    $http.get('http://localhost:8080/SchedaRilasci/getTimeInStatus?idPolarion=IT-TEST-200&status=chiuso_falso').
        then(function(response) {
            $scope.csv= response.data;
           
            });
});




