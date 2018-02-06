var app = angular.module('myApp', ['ngRoute','ngCookies']);

app.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider.
	when('/', {
		resolve:{
			"check" : function ($cookies,$location) {
				if($cookies.get('IsLogin') != null){
					console.log($cookies.get('IsLogin'));
					$location.path('/sceltaRuolo');
				}
			}
		},
		templateUrl: 'login.html', controller: 'login'
	}).
	when('/dashboard', {
		resolve:{
			"check" : function ($cookies,$location) {
				if(!$cookies.get('IsLogin')){
					$location.path('/');
				}
			}
		},
		templateUrl: 'dashboard.html', controller: 'dashCtrl'
	}).
	when('/backoffice', {
		resolve:{
			"check" : function ($cookies,$location) {
				if(!$cookies.get('IsLogin')){
					$location.path('/');
				}
			}
		},
		templateUrl: 'backoffice.html', controller: 'backofficeCtrl'
	}).
	when('/batchManager', {
		resolve:{
			"check" : function ($cookies,$location) {
				if(!$cookies.get('IsLogin')){
					$location.path('/');
				}
			}
		},
		templateUrl: 'batchManager.html', controller: 'batchManagerCtrl'
	}).
	when('/frontoffice', {
		resolve:{
			"check" : function ($cookies,$location) {
				if(!$cookies.get('IsLogin')){
					$location.path('/');
				}
			}
		},
		templateUrl: 'frontoffice.html', controller: 'chartRelease'
	}).
	when('/primapagina', {
		resolve:{
			"check" : function ($cookies,$location) {
				if(!$cookies.get('IsLogin')){
					$location.path('/');
				}
			}
		},
		templateUrl: 'primapagina.html', controller: 'chartRelease'
	}).
	when('/stato', {
		resolve:{
			"check" : function ($cookies,$location) {
				if(!$cookies.get('IsLogin')){
					$location.path('/');
				}
			}
		},
		templateUrl: 'stato.html', controller: 'statoCtrl'
	}).
	when('/sceltaRuolo', {
		resolve:{
			"check" : function ($cookies,$location) {
				if(!$cookies.get('IsLogin')){
					$location.path('/');
				}
			}
		},
		templateUrl: 'sceltaRuolo.html', controller: 'sceltaRuoloCtrl'
	}).
	when('/infoReleaseIT', {
		resolve:{
			"check" : function ($cookies,$location) {
				if(!$cookies.get('IsLogin')){
					$location.path('/');
				}
			}
		},
		templateUrl: 'infoReleaseIT.html'
	}).
	when('/infoReleaseProgetto', {
		resolve:{
			"check" : function ($cookies,$location) {
				if(!$cookies.get('IsLogin')){
					$location.path('/');
				}
			}
		},
		templateUrl: 'infoReleaseProgetto.html', controller: 'infoReleaseProgettoCtrl'
	}).
	when('/logout', {
		templateUrl: 'logout.html', controller: 'logoutCtrl'
	}).
	when('/404', {
		templateUrl: '404.html'
	}).
	otherwise({redirectTo:'/404'});
}]);


app.controller('login', ['$scope','$location','$cookies','$http', function($scope,$location,$cookies,$http) {

	$scope.loginRequest = function () {
		$.ajax('http://localhost:8080/SchedaRilasci/checklogin', {
			method: 'POST',
			data: {
				user:  $scope.username,
				psw:  $scope.password
			},
			success : function (data) {
				var result =JSON.parse(data);
				if(result.username != "null" && result.found != false){
					var expireDate = new Date();
					expireDate.setDate(expireDate.getDate()+1);
					expireDate.setHours(1);  
					expireDate.setMinutes(0);
					expireDate.setSeconds(0);                	  

					$cookies.put('username',$scope.username,{expires: expireDate});
					$cookies.put('IsLogin',true,{expires: expireDate});
					$location.path('/sceltaRuolo');
					window.location.reload();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if(XMLHttpRequest.status == 404){
					document.getElementById("message").innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
						'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
						' <span aria-hidden="true">&times;</span>'+
						' </button> <strong>Connessione Fallita.</strong> In questo momento non è possibile contattare i servizi. </div>';
				}
				if(XMLHttpRequest.status == 400){
					document.getElementById("message").innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
					'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
					' <span aria-hidden="true">&times;</span>'+
					' </button> <strong>Errore.</strong> Username o password non validi</div>';
				}
			}
		});
	};
}]);


app.controller('dashCtrl', ['$scope','$cookies', function($scope,$cookies) {
	$scope.user = $cookies.get('username');
	console.log("ScopeUsername:"+$scope.user)
	console.log("ScopeCookie:"+$cookies.get('username'));
}]);

app.controller('logoutCtrl', ['$cookies','$location', function($cookies,$location) {

	var listCookies = $cookies.getAll();
	angular.forEach(listCookies, function (v, k) {
		$cookies.remove(k);
	});

	window.setTimeout(function(){
		window.location.href = "/SchedaRilasciFE/";
	}, 3000);
}]);

app.controller('sceltaRuoloCtrl', ['$scope','$cookies', function($scope,$cookies){

	$scope.user = $cookies.get('username');
	console.log("sceltaRuoloCtrlScopeUsername:"+$scope.user)
	console.log("sceltaRuoloCtrlScopeCookie:"+$cookies.get('username'));
}]);



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

app.controller('chartRelease', ['$scope','$cookies', function($scope, $http) {
	// RELEASE
	console.log("ci sono");
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

//	$http.get('http://localhost:8080/SchedaRilasci/countRelease').
//	then(function(response) {
//
//		var datas=response.data;
//		console.log("Dati Release: "+datas[0]+";"+datas[1]+";"+datas[2]+";"+datas[3]);
//
//		$scope.dataSireTot=datas[0];
//		$scope.dataSissTot=datas[1];
//		$scope.dataSireDerogheTot=datas[2];
//		$scope.dataSissDerogheTot=datas[3];
//		$scope.dataTot=datas[0]+datas[1]+datas[2]+datas[3];
//
//	});
//
//	// RELEASE IT
//
//	$.getJSON('http://localhost:8080/SchedaRilasci/graphReleaseIt', function (result) {
//		var label = [];
//		var data=[];
//		for(var item in result){
//			data.push(result[item].slice(0,1).toString());
//			label.push(result[item].slice(1,2).toString());
//		}
//		var ctx = document.getElementById('myChartReleaseIt').getContext('2d');
//		var myChart = new Chart(ctx, {
//			type: 'line',
//			data: {
//				labels: label,
//				datasets: [{
//					label: 'Release It',
//					//backgroundColor: "rgba(77,156,53,1)",
//					borderColor: "rgba(255,0,0,1)",
//					data: data
//				}]
//			}
//		});
//	});
//
//	$http.get('http://localhost:8080/SchedaRilasci/countReleaseIt').
//	then(function(response) {
//
//		var datas=response.data;
//		console.log("Dati Release IT: "+datas[0]+";"+datas[1]);
//
//		$scope.dataSireTotReleaseIt=datas[0];
//		$scope.dataSissTotReleaseIt=datas[1];
//		$scope.dataSireDerogheTotReleaseIt=datas[2];
//		$scope.dataSissDerogheTotReleaseIt=datas[3];
//		$scope.dataTotReleaseIt=datas[0]+datas[1]+datas[2]+datas[3];
//
//	});
}]);



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


app.controller('infoReleaseProgettoCtrl', function($scope, $http,$route) {
	var chartPie1 = new Chart(document.getElementById("chartPie1"), {
	    type: 'doughnut',
	    data: {
	      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
	      datasets: [{
	        label: "Population (millions)",
	        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
	        data: [2478,5267,734,784,433]
	      }]
	    },
	    options: {
	      title: {
	        display: true,
	        text: 'Predicted world population (millions) in 2050'
	      }
	    }
	});
	
	var chartPie2 = new Chart(document.getElementById("chartPie2"), {
	  type: 'doughnut',
	  data: {
	    labels: ["M", "T", "W", "T", "F", "S", "S"],
	    datasets: [{
	      backgroundColor: [
	        "#2ecc71",
	        "#3498db",
	        "#95a5a6",
	        "#9b59b6",
	        "#f1c40f",
	        "#e74c3c",
	        "#34495e"
	      ],
	      data: [12, 19, 3, 17, 28, 24, 7]
	    }]
	  }
	});
	
	var chartPie3 = new Chart(document.getElementById("chartPie3"), {
	    type: 'pie',
	    data: {
	      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
	      datasets: [{
	        label: "Population (millions)",
	        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
	        data: [2478,5267,734,784,433]
	      }]
	    },
	    options: {
	      title: {
	        display: true,
	        text: 'Predicted world population (millions) in 2050'
	      }
	    }
	});
	
	var chartPie4 = new Chart(document.getElementById("chartPie4"), {
	    type: 'pie',
	    data: {
	      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
	      datasets: [{
	        label: "Population (millions)",
	        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
	        data: [2478,5267,734,784,433]
	      }]
	    },
	    options: {
	      title: {
	        display: true,
	        text: 'Predicted world population (millions) in 2050'
	      }
	    }
	});
	
	var chartPie5 = new Chart(document.getElementById("chartPie5"), {
		 type: 'doughnut',
		  data: {
		    labels: ["M", "T", "W", "T", "F", "S", "S"],
		    datasets: [{
		      backgroundColor: [
		        "#2ecc71",
		        "#3498db",
		        "#95a5a6",
		        "#9b59b6",
		        "#f1c40f",
		        "#e74c3c",
		        "#34495e"
		      ],
		      data: [12, 19, 3, 17, 28, 24, 7]
		    }]
		  }
		});
	
	var chartPie6 = new Chart(document.getElementById("chartPie6"), {
	    type: 'pie',
	    data: {
	      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
	      datasets: [{
	        label: "Population (millions)",
	        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
	        data: [2478,5267,734,784,433]
	      }]
	    },
	    options: {
	      title: {
	        display: true,
	        text: 'Predicted world population (millions) in 2050'
	      }
	    }
	});
	
	
});


