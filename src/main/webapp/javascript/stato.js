angular.module('schedarilasci', [])
.controller('statoRelease', function($scope, $http) {	
    $http.get('http://localhost:8080/SchedaRilasci/getTimeReleaseInStatus?idPolarion='+idPolarion+'&status='+status).
        then(function(response) {
            $scope.time= response.data;
            console.log(time);
            });
});

angular.module('schedarilasci', [])
.controller('statoReleaseIt', function($scope, $http) {	
    $http.get('http://localhost:8080/SchedaRilasci/getTimeReleaseItInStatus?idPolarion='+idPolarion+'&status='+status).
        then(function(response) {
            $scope.time= response.data;
            console.log(time);
            });
});