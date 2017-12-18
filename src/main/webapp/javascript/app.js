var app = angular.module('schedaRilasci', [
                                           'ngRoute'
                                           ]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	// Login
	.when("/", {templateUrl: "login.html", controller: "login"})
	// Scelta Ruolo
	.when("/sceltaRuolo", {templateUrl: "sceltaRuolo.html", controller: "login"})
	//FO
	.when("/frontoffice", {templateUrl: "frontoffice.html", controller: "controllerCSV"})
	//BO
	.when("/backoffice", {templateUrl: "backoffice.html", controller: "controllerCSV"})
	//STATO
	.when("/stato", {templateUrl: "stato.html", controller: "stato"})
	//STATO
	.when("/prova", {templateUrl: "prova.html", controller: "stato"})
	//batch
	.when("/batchManager", {templateUrl: "batchManager.html", controller: ""})
	//PRIMAPAGINA
	.when("/primapagina", {templateUrl: "primapagina.html", controller: "chartRelease"})
	// else 404
	.otherwise("/", {templateUrl: "login.html", controller: ""});
}]);

/**
 * Controls
 */
app.controller('controllerCsv', function($scope, $http) {	
	$http.get('http://localhost:8080/SchedaRilasci/csvForIdPolarion?idPolarion=AGORA-6564').
	then(function(response) {
		$scope.csv= response.data;
		$scope.dataEstrazione= $scope.csv[0].fileDate;		
	});
});


app.controller('stato', function($scope, $http) {
	$scope.submitRelease = function(idPolarion,status) {
		console.log("idPolarion"+idPolarion);
		console.log("status"+status);
		$http.get('http://localhost:8080/SchedaRilasci/getTimeReleaseInStatus?idPolarion='+idPolarion+'&status='+status).
		then(function(response) {
			$scope.time= response.data;
		});
	}
	
	$scope.submitReleaseIt = function(idPolarion,status) {
		console.log("idPolarion"+idPolarion);
		console.log("status"+status);
		$http.get('http://localhost:8080/SchedaRilasci/getTimeReleaseItInStatus?idPolarion='+idPolarion+'&status='+status).
		then(function(response) {
			$scope.time= response.data;
		});
	}
	
	$(document).ready(function(){
	    $("#release").click(function(){
	        document.getElementById("releaseDiv").style = 'display: block !important;';
	        document.getElementById("releaseItDiv").style = 'display: none !important;';
	    });
	    $("#releaseIt").click(function(){
	    	 document.getElementById("releaseDiv").style = 'display: none !important;';
	         document.getElementById("releaseItDiv").style = 'display: block !important;'; 
	    });
	});
});

app.controller('statoReleaseIt', function($scope, $http) {
	$scope.submit = function(idPolarion,status) {
		console.log("idPolarion"+idPolarion);
		console.log("status"+status);
		$http.get('http://localhost:8080/SchedaRilasci/getTimeReleaseItInStatus?idPolarion='+idPolarion+'&status='+status).
		then(function(response) {
			$scope.time= response.data;
		});
	}
});

app.controller('batchManagerController', function ($scope, $http) {
	then(function(response) {
		$scope.ElencoBatch= response.data;
	});
});

app.controller('chartRelease', function($scope, $http) {
	// RELEASE
	
	$.getJSON('http://localhost:8080/SchedaRilasci/graphRelease', function (result) {
		var label = [];
		var data=[];
		for(var item in result){
			data.push(result[item].slice(0,1).toString());
			label.push(result[item].slice(1,2).toString());
		}
		var ctx = document.getElementById('myChartRelease').getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: label,
				datasets: [{
					label: 'Release',
					//backgroundColor: "rgba(77,156,53,1)",
					borderColor: "rgba(77,156,53,1)",
					data: data
				}]
			}
		});
	});
	
	$http.get('http://localhost:8080/SchedaRilasci/countRelease').
	then(function(response) {
		
		var datas=response.data;
		console.log("Dati Release: "+datas[0]+";"+datas[1]);
		
		   $scope.dataSireTot=datas[0];
		   $scope.dataSissTot=datas[1];
		   $scope.dataTot=datas[0]+datas[1];
		
	});
	
	// RELEASE IT
	
	$.getJSON('http://localhost:8080/SchedaRilasci/graphReleaseIt', function (result) {
		var label = [];
		var data=[];
		for(var item in result){
			data.push(result[item].slice(0,1).toString());
			label.push(result[item].slice(1,2).toString());
		}
		var ctx = document.getElementById('myChartReleaseIt').getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: label,
				datasets: [{
					label: 'Release It',
					//backgroundColor: "rgba(77,156,53,1)",
					borderColor: "rgba(255,0,0,1)",
					data: data
				}]
			}
		});
	});
	
	$http.get('http://localhost:8080/SchedaRilasci/countReleaseIt').
	then(function(response) {
		
		var datas=response.data;
		console.log("Dati Release IT: "+datas[0]+";"+datas[1]);
		
		   $scope.dataSireTotReleaseIt=datas[0];
		   $scope.dataSissTotReleaseIt=datas[1];
		   $scope.dataSireDerogheTotReleaseIt=datas[2];
		   $scope.dataSissDerogheTotReleaseIt=datas[3];
		   $scope.dataTotReleaseIt=datas[0]+datas[1]+datas[2]+datas[3];
		
	});
});

//app.controller('stato', function($scope, $http) {
//$(document).ready(function(){
//    $("#release").click(function(){
//        document.getElementById("releaseDiv").style = 'display: block !important;';
//        document.getElementById("releaseItDiv").style = 'display: none !important;';
//    });
//    $("#releaseIt").click(function(){
//    	 document.getElementById("releaseDiv").style = 'display: none !important;';
//         document.getElementById("releaseItDiv").style = 'display: block !important;'; 
//    });
//});
//});
app.controller('login', function($scope,$http) {
	$scope.login = function(Username,Password) {
		var find=0;
		$.get('users.xml', function (data) {
			$(data).find('details').each(function(){
				var item = $(this);
				if(item.find('username').text()==Username && item.find('password').text()==Password)
				{
					find =1;
				}
			});
			if(find==1){
				window.location.href = '#!/sceltaRuolo';
				
			}else{
				$('#message').addClass("alert alert-danger alert-dismissible fade show");
				$('#message').html('<strong>Username</strong> o <strong>password</strong> errati</strong>');
			    
			}
		});
	}
});


app.controller('elencoScheduler', function ($scope, $http,$route) {
	  $http.get('http://localhost:8080/SchedaRilasci/scheduler/elenco').
	  then(function(response) {
	      $scope.listaBatch= response.data;
	      console.log("ciao");
	     });
	  
	  $scope.idScheduler= null;
		$scope.stop = function(idScheduler) {
			console.log("L'id Scheduler Selezionato è " + idScheduler);
			$http.get('http://localhost:8080/SchedaRilasci/scheduler/stop?idScheduler='+idScheduler).
			then(function(response) {
				$route.reload();
			});
		}
	});

app.controller('avviaScheduler', function($scope, $http,$route) {
	$scope.submit = function(tempoEsecuzione,tipoEsecuzione,secondi,data,time) {
	
		$http.get('http://localhost:8080/SchedaRilasci/scheduler/avvia?tipoEsecuzione='+tipoEsecuzione+'&data='+data+'&time='+time+'&secondi='+secondi+'&tempoEsecuzione='+tempoEsecuzione).
		then(function(response) {
		console.log("Batch avviato");
		$route.reload();
		});
		console.log("I valori passati dalla funzione avvia sono"+"tempoEsecuzione"+tempoEsecuzione+"tipoEsecuzione"+tipoEsecuzione+"secondi"+secondi+"data"+data+"time"+time);

	}
});
