angular.module('schedarilasci', [])
.controller('controllerProva', function($scope, $http) {
    $http.get('http://localhost:8080/SchedaRilasci/user').
        then(function(response) {
            $scope.utente = response.data;
            });
});

