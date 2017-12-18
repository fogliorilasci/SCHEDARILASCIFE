angular.module('csv', [])
.controller('cercaController', function($scope, $http) {
	$scope.submit = function(idPolarion) {
		console.log("ci sono1");
		 $http.get('http://localhost:8080/SchedaRilasci/csvForIdPolarion?idPolarion='+idPolarion).
	        then(function(response) {
	        	console.log("ci sono");
	        	console.log(idPolarion);
	            $scope.csv= response.data;
	            console.log($scope.csv);
	            });
	        }
    
});

 