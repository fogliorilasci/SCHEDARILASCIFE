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
		templateUrl: 'batchManager.html'
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
		templateUrl: 'infoReleaseIT.html', controller: 'infoReleaseIT'
	}).
	when('/infoReleaseIT/:idReleaseIt', {
		resolve:{
			"check" : function ($cookies,$location) {
				if(!$cookies.get('IsLogin')){
					$location.path('/');
				}
			}
		},
		templateUrl: 'infoReleaseIT.html', controller: 'infoReleaseITDue'
	}).
	when('/infoReleaseProgetto', {
		resolve:{
			"check" : function ($cookies,$location) {
				if(!$cookies.get('IsLogin')){
					$location.path('/');
				}
			}
		},
		templateUrl: 'infoReleaseProgetto.html', controller: 'infoReleaseProgetto'
	}).
	when('/infoReleaseProgetto/:idReleaseProgetto', {
		resolve:{
			"check" : function ($cookies,$location) {
				if(!$cookies.get('IsLogin')){
					$location.path('/');
				}
			}
		},
		templateUrl: 'infoReleaseProgetto.html', controller: 'infoReleaseProgettoDue'
	}).
	when('/infoReleaseFiltri', {
		resolve:{
			"check" : function ($cookies,$location) {
				if(!$cookies.get('IsLogin')){
					$location.path('/');
				}
			}
		},
		templateUrl: 'infoReleaseFiltri.html', controller: 'infoReleaseFiltri'
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
				var result = JSON.parse(data);
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

//app.controller('batchManagerCtrl', function ($scope, $http) {
//then(function(response) {
//$scope.ElencoBatch= response.data;
//});
//});

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

//	var datas=response.data;
//	console.log("Dati Release: "+datas[0]+";"+datas[1]+";"+datas[2]+";"+datas[3]);

//	$scope.dataSireTot=datas[0];
//	$scope.dataSissTot=datas[1];
//	$scope.dataSireDerogheTot=datas[2];
//	$scope.dataSissDerogheTot=datas[3];
//	$scope.dataTot=datas[0]+datas[1]+datas[2]+datas[3];

//	});

//	// RELEASE IT

//	$.getJSON('http://localhost:8080/SchedaRilasci/graphReleaseIt', function (result) {
//	var label = [];
//	var data=[];
//	for(var item in result){
//	data.push(result[item].slice(0,1).toString());
//	label.push(result[item].slice(1,2).toString());
//	}
//	var ctx = document.getElementById('myChartReleaseIt').getContext('2d');
//	var myChart = new Chart(ctx, {
//	type: 'line',
//	data: {
//	labels: label,
//	datasets: [{
//	label: 'Release It',
//	//backgroundColor: "rgba(77,156,53,1)",
//	borderColor: "rgba(255,0,0,1)",
//	data: data
//	}]
//	}
//	});
//	});

//	$http.get('http://localhost:8080/SchedaRilasci/countReleaseIt').
//	then(function(response) {

//	var datas=response.data;
//	console.log("Dati Release IT: "+datas[0]+";"+datas[1]);

//	$scope.dataSireTotReleaseIt=datas[0];
//	$scope.dataSissTotReleaseIt=datas[1];
//	$scope.dataSireDerogheTotReleaseIt=datas[2];
//	$scope.dataSissDerogheTotReleaseIt=datas[3];
//	$scope.dataTotReleaseIt=datas[0]+datas[1]+datas[2]+datas[3];

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


//app.controller('infoReleaseProgettoCtrl', function($scope, $http,$route) {
//var chartPie1 = new Chart(document.getElementById("chartPie1"), {
//type: 'doughnut',
//data: {
//labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
//datasets: [{
//label: "Population (millions)",
//backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//data: [2478,5267,734,784,433]
//}]
//},
//options: {
//title: {
//display: true,
//text: 'Predicted world population (millions) in 2050'
//}
//}
//});

//var chartPie2 = new Chart(document.getElementById("chartPie2"), {
//type: 'doughnut',
//data: {
//labels: ["M", "T", "W", "T", "F", "S", "S"],
//datasets: [{
//backgroundColor: [
//"#2ecc71",
//"#3498db",
//"#95a5a6",
//"#9b59b6",
//"#f1c40f",
//"#e74c3c",
//"#34495e"
//],
//data: [12, 19, 3, 17, 28, 24, 7]
//}]
//}
//});

//var chartPie3 = new Chart(document.getElementById("chartPie3"), {
//type: 'pie',
//data: {
//labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
//datasets: [{
//label: "Population (millions)",
//backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//data: [2478,5267,734,784,433]
//}]
//},
//options: {
//title: {
//display: true,
//text: 'Predicted world population (millions) in 2050'
//}
//}
//});

//var chartPie4 = new Chart(document.getElementById("chartPie4"), {
//type: 'pie',
//data: {
//labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
//datasets: [{
//label: "Population (millions)",
//backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//data: [2478,5267,734,784,433]
//}]
//},
//options: {
//title: {
//display: true,
//text: 'Predicted world population (millions) in 2050'
//}
//}
//});

//var chartPie5 = new Chart(document.getElementById("chartPie5"), {
//type: 'doughnut',
//data: {
//labels: ["M", "T", "W", "T", "F", "S", "S"],
//datasets: [{
//backgroundColor: [
//"#2ecc71",
//"#3498db",
//"#95a5a6",
//"#9b59b6",
//"#f1c40f",
//"#e74c3c",
//"#34495e"
//],
//data: [12, 19, 3, 17, 28, 24, 7]
//}]
//}
//});

//var chartPie6 = new Chart(document.getElementById("chartPie6"), {
//type: 'pie',
//data: {
//labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
//datasets: [{
//label: "Population (millions)",
//backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//data: [2478,5267,734,784,433]
//}]
//},
//options: {
//title: {
//display: true,
//text: 'Predicted world population (millions) in 2050'
//}
//}
//});


//});

app.controller('infoReleaseIT', function($scope, $http,$route) {

//	var responseFinal={"general":{"infoGenerali":["IT-COMUNICAZIONE-1934","SW-{SCDRL}-Portale Istituzionale Regione Lombardia","SCDRL","SIRE","GSA - Rilascio revisione Stazione Editoriale R2-R3-R4 ad integrazione rdp 630","medium","normal","14-07-2016 00:00:00","25-07-2016 00:00:00","14-07-2016 11:17:14","SCDRL-639",0,"0 minutes."]},"task":{"infoTaskDataPrep":[],"infoTaskDeploy":["in_sviluppo","14-07-2016 11:22:55","15-07-2016 12:18:49","0 days, 9 hours and 55 minutes.","ddecillis","chiuso","15-07-2016 12:18:49","15-07-2016 12:19:58","10 minutes.","ddecillis","chiuso","15-07-2016 12:19:58","27-07-2016 17:10:50","4 days, 3 hours and 50 minutes.","ddecillis"],"infoTaskContrDoc":[],"infoTaskDBA":["in_sviluppo","14-07-2016 11:22:55","14-07-2016 11:38:25","15 minutes.","amarchegiani","in_sviluppo","14-07-2016 11:38:25","14-07-2016 11:38:34","10 minutes.","amarchegiani","in_sviluppo","14-07-2016 11:38:34","14-07-2016 11:40:31","10 minutes.","amarchegiani","in_sviluppo","14-07-2016 11:40:31","14-07-2016 11:40:53","10 minutes.","amarchegiani","chiuso","14-07-2016 11:40:53","14-07-2016 11:45:28","10 minutes.","amarchegiani","chiuso","14-07-2016 11:45:28","14-07-2016 11:45:44","10 minutes.","amarchegiani","sospeso","14-07-2016 11:45:44","14-07-2016 15:39:55","0 days, 2 hours and 54 minutes.","amarchegiani","sospeso","14-07-2016 15:39:55","14-07-2016 15:42:28","10 minutes.","amarchegiani","sospeso","14-07-2016 15:42:28","14-07-2016 15:42:42","10 minutes.","amarchegiani"],"infoTaskTest":["nuovo","14-07-2016 11:19:29","14-07-2016 11:19:29","10 minutes.","acaovilla","nuovo","14-07-2016 11:19:29","14-07-2016 11:22:55","10 minutes.","acaovilla","nuovo","14-07-2016 11:22:55","14-07-2016 11:23:45","10 minutes.","acaovilla","nuovo","14-07-2016 11:23:45","14-07-2016 11:24:06","10 minutes.","acaovilla","nuovo","14-07-2016 11:24:06","15-07-2016 08:49:24","0 days, 6 hours and 35 minutes.","acaovilla","nuovo","15-07-2016 08:49:24","15-07-2016 08:51:19","10 minutes.","acaovilla","chiuso","15-07-2016 08:51:19","15-07-2016 08:57:44","10 minutes.","acaovilla","nuovo","15-07-2016 08:57:44","15-07-2016 09:04:51","10 minutes.","acaovilla","nuovo","15-07-2016 09:04:51","22-07-2016 11:58:02","2 days, 10 hours and 113 minutes.","mpuorro","nuovo","22-07-2016 11:58:02","22-07-2016 12:12:04","14 minutes.","mpuorro","nuovo","22-07-2016 12:12:04","22-07-2016 12:22:15","10 minutes.","mpuorro","nuovo","22-07-2016 12:22:15","22-07-2016 13:03:52","41 minutes.","mpuorro","nuovo","22-07-2016 13:03:52","22-07-2016 14:21:01","21 minutes.","mpuorro","nuovo","22-07-2016 14:21:01","22-07-2016 14:46:25","25 minutes.","fminniti","nuovo","22-07-2016 14:46:25","22-07-2016 14:49:56","10 minutes.","fminniti","nuovo","22-07-2016 14:49:56","22-07-2016 14:54:51","10 minutes.","vsalvatore","nuovo","22-07-2016 14:54:51","22-07-2016 15:57:33","0 days, 1 hours and 2 minutes.","vsalvatore","nuovo","22-07-2016 15:57:33","22-07-2016 15:57:41","10 minutes.","smascaretti","nuovo","22-07-2016 15:57:41","22-07-2016 16:00:54","10 minutes.","apennisi","nuovo","22-07-2016 16:00:54","22-07-2016 16:05:02","10 minutes.","apennisi","nuovo","22-07-2016 16:05:02","22-07-2016 16:15:18","10 minutes.","acaovilla","nuovo","22-07-2016 16:15:18","22-07-2016 16:44:24","29 minutes.","omarcacci","nuovo","22-07-2016 16:44:24","22-07-2016 16:53:00","10 minutes.","fminniti","nuovo","22-07-2016 16:53:00","22-07-2016 17:56:41","0 days, 1 hours and 3 minutes.","vsalvatore","nuovo","22-07-2016 17:56:41","25-07-2016 09:49:04","0 days, 16 hours and 52 minutes.","fminniti","nuovo","25-07-2016 09:49:04","25-07-2016 10:03:01","13 minutes.","smascaretti","nuovo","25-07-2016 10:03:01","25-07-2016 14:05:23","0 days, 3 hours and 2 minutes.","apennisi","nuovo","25-07-2016 14:05:23","25-07-2016 14:06:33","10 minutes.","acaovilla","nuovo","25-07-2016 14:06:33","25-07-2016 14:06:50","10 minutes.","apennisi","nuovo","25-07-2016 14:06:50","25-07-2016 14:07:10","10 minutes.","acaovilla","nuovo","25-07-2016 14:07:10","25-07-2016 14:07:52","10 minutes.","fminniti","nuovo","25-07-2016 14:07:52","25-07-2016 14:11:39","10 minutes.","acaovilla","nuovo","25-07-2016 14:11:39","25-07-2016 14:13:01","10 minutes.","apennisi","nuovo","25-07-2016 14:13:01","25-07-2016 14:17:12","10 minutes.","acaovilla","nuovo","25-07-2016 14:17:12","25-07-2016 14:18:46","10 minutes.","acaovilla","nuovo","25-07-2016 14:18:46","25-07-2016 14:18:57","10 minutes.","fminniti","nuovo","25-07-2016 14:18:57","25-07-2016 14:22:18","10 minutes.","vsalvatore","nuovo","25-07-2016 14:22:18","25-07-2016 14:22:50","10 minutes.","vsalvatore","nuovo","25-07-2016 14:22:50","25-07-2016 14:23:05","10 minutes.","apennisi","nuovo","25-07-2016 14:23:05","25-07-2016 14:23:50","10 minutes.","apennisi","nuovo","25-07-2016 14:23:50","25-07-2016 14:29:52","10 minutes.","vsalvatore","nuovo","25-07-2016 14:29:52","25-07-2016 14:30:14","10 minutes.","vsalvatore","nuovo","25-07-2016 14:30:14","25-07-2016 14:35:30","10 minutes.","acaovilla","nuovo","25-07-2016 14:35:30","25-07-2016 14:38:44","10 minutes.","vsalvatore","nuovo","25-07-2016 14:38:44","25-07-2016 14:46:43","10 minutes.","fminniti","nuovo","25-07-2016 14:46:43","25-07-2016 14:48:58","10 minutes.","acaovilla","nuovo","25-07-2016 14:48:58","25-07-2016 14:54:15","10 minutes.","acaovilla","nuovo","25-07-2016 14:54:15","25-07-2016 14:55:12","10 minutes.","fminniti","nuovo","25-07-2016 14:55:12","25-07-2016 14:57:27","10 minutes.","acaovilla","nuovo","25-07-2016 14:57:27","25-07-2016 15:09:35","12 minutes.","vsalvatore","nuovo","25-07-2016 15:09:35","25-07-2016 15:10:27","10 minutes.","vsalvatore","nuovo","25-07-2016 15:10:27","25-07-2016 15:11:04","10 minutes.","fminniti","nuovo","25-07-2016 15:11:04","25-07-2016 15:15:15","10 minutes.","vsalvatore","nuovo","25-07-2016 15:15:15","25-07-2016 15:16:50","10 minutes.","apennisi","nuovo","25-07-2016 15:16:50","25-07-2016 15:18:16","10 minutes.","fminniti","nuovo","25-07-2016 15:18:16","25-07-2016 15:19:17","10 minutes.","apennisi","nuovo","25-07-2016 15:19:17","25-07-2016 15:34:20","15 minutes.","fminniti","nuovo","25-07-2016 15:34:20","25-07-2016 15:47:13","12 minutes.","fminniti","nuovo","25-07-2016 15:47:13","25-07-2016 15:52:45","10 minutes.","fminniti","nuovo","25-07-2016 15:52:45","25-07-2016 15:53:33","10 minutes.","fminniti","nuovo","25-07-2016 15:53:33","25-07-2016 15:56:33","10 minutes.","fminniti","nuovo","25-07-2016 15:56:33","27-07-2016 11:27:34","0 days, 12 hours and 30 minutes.","apennisi","chiuso","27-07-2016 11:27:34","29-07-2016 11:36:24","0 days, 16 hours and 68 minutes.","acaovilla"]},"numRows":1,"timing":{"releaseit":["14-07-2016 00:00:00","25-07-2016 00:00:00","264","98"],"deploydba_qf_test":["317","108","0","0","360","120"]},"cl":{"cl_tc":["CLIT1468566000998",8,7,7,0,0,0,1,"CL1469181039168",9,9,7,2,0,0,0,"CL1469182018716",8,8,8,0,0,0,0,"CL1469184880951",8,8,8,0,0,0,0,"CL1469191948818",14,14,14,0,0,0,0,"CL1468919016947",14,14,14,0,0,0,0,"CL1469195757815",16,16,16,0,0,0,0,"CL1469196001612",9,9,4,5,0,0,0,"CL1469195651750",9,9,4,5,0,0,0,"CL1469189605306",17,17,15,2,0,0,0,"CL1469198314619",14,14,14,0,0,0,0,"CL1468919551801",9,9,7,2,0,0,0,"CL1469433602377",5,5,1,4,0,0,0,"CL1469448130455",16,16,12,4,0,0,0,"CL1469448618162",16,16,12,4,0,0,0,"CL1469449097060",14,14,13,1,0,0,0,"CL1469448293681",16,16,13,3,0,0,0,"CL1469449194669",14,14,14,0,0,0,0,"CL1469448110889",14,14,14,0,0,0,0,"CL1469449686821",0,0,0,0,0,0,0,"CL1469450043541",0,0,0,0,0,0,0,"CL1469450616260",14,14,14,0,0,0,0,"CL1469450827208",16,16,12,4,0,0,0,"CL1469451089897",16,16,11,5,0,0,0,"CL1469452396052",10,10,6,4,0,0,0,"CL1469452473234",10,10,6,4,0,0,0,"CL1469453492168",0,0,0,0,0,0,0,"CL1469448927796",14,14,14,0,0,0,0,"CL1469538545856",12,12,8,4,0,0,0],"cl_size":[29],"cl_users":["fminniti","acaovilla","apennisi","omarcacci","vsalvatore","smascaretti","mpuorro","cmautone","vferrara"]},"testcase":{"testcase":[2,2,2,0,0,4]},"status":{"rifiutati":[0],"stati":["nuovo","14-07-2016 11:17:14","14-07-2016 11:17:14","0 minutes.","10 minutes.","nuovo","14-07-2016 11:17:14","14-07-2016 11:17:29","0 minutes.","10 minutes.","pianificato","14-07-2016 11:17:29","14-07-2016 11:40:15","22 minutes.","22 minutes.","in_integrazione","14-07-2016 11:40:15","14-07-2016 11:43:31","3 minutes.","10 minutes.","in_integrazione","14-07-2016 11:43:31","14-07-2016 11:44:13","0 minutes.","10 minutes.","in_integrazione","14-07-2016 11:44:13","14-07-2016 17:18:37","0 days, 5 hours and 34 minutes.","0 days, 4 hours and 34 minutes.","in_integrazione","14-07-2016 17:18:37","14-07-2016 17:35:28","16 minutes.","16 minutes.","in_integrazione","14-07-2016 17:35:28","15-07-2016 09:05:37","0 days, 15 hours and 30 minutes.","29 minutes.","in_integrazione","15-07-2016 09:05:37","15-07-2016 12:21:08","0 days, 3 hours and 15 minutes.","0 days, 3 hours and 15 minutes.","in_integrazione","15-07-2016 12:21:08","20-07-2016 12:18:58","4 days, 23 hours and 57 minutes.","1 days, 16 hours and 56 minutes.","in_integrazione","20-07-2016 12:18:58","22-07-2016 12:01:38","1 days, 23 hours and 42 minutes.","0 days, 16 hours and 42 minutes.","in_integrazione","22-07-2016 12:01:38","22-07-2016 12:23:27","21 minutes.","21 minutes.","in_integrazione","22-07-2016 12:23:27","22-07-2016 13:05:20","41 minutes.","41 minutes.","in_integrazione","22-07-2016 13:05:20","22-07-2016 14:23:24","0 days, 1 hours and 18 minutes.","23 minutes.","in_integrazione","22-07-2016 14:23:24","22-07-2016 14:48:18","24 minutes.","24 minutes.","in_integrazione","22-07-2016 14:48:18","22-07-2016 14:57:21","9 minutes.","10 minutes.","in_integrazione","22-07-2016 14:57:21","22-07-2016 15:02:24","5 minutes.","10 minutes.","in_integrazione","22-07-2016 15:02:24","22-07-2016 15:58:24","56 minutes.","56 minutes.","in_integrazione","22-07-2016 15:58:24","22-07-2016 15:58:36","0 minutes.","10 minutes.","in_integrazione","22-07-2016 15:58:36","22-07-2016 16:02:14","3 minutes.","10 minutes.","in_integrazione","22-07-2016 16:02:14","22-07-2016 16:07:52","5 minutes.","10 minutes.","in_integrazione","22-07-2016 16:07:52","22-07-2016 16:08:35","0 minutes.","10 minutes.","in_integrazione","22-07-2016 16:08:35","22-07-2016 16:45:37","37 minutes.","37 minutes.","in_integrazione","22-07-2016 16:45:37","22-07-2016 16:54:14","8 minutes.","10 minutes.","in_integrazione","22-07-2016 16:54:14","22-07-2016 17:19:09","24 minutes.","24 minutes.","in_integrazione","22-07-2016 17:19:09","25-07-2016 09:50:07","2 days, 16 hours and 30 minutes.","0 days, 16 hours and 90 minutes.","in_integrazione","25-07-2016 09:50:07","25-07-2016 10:04:51","14 minutes.","14 minutes.","in_integrazione","25-07-2016 10:04:51","25-07-2016 14:08:05","0 days, 4 hours and 3 minutes.","0 days, 3 hours and 3 minutes.","in_integrazione","25-07-2016 14:08:05","25-07-2016 14:16:43","8 minutes.","10 minutes.","in_integrazione","25-07-2016 14:16:43","25-07-2016 14:17:18","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:17:18","25-07-2016 14:20:31","3 minutes.","10 minutes.","in_integrazione","25-07-2016 14:20:31","25-07-2016 14:20:42","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:20:42","25-07-2016 14:21:10","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:21:10","25-07-2016 14:21:41","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:21:41","25-07-2016 14:25:30","3 minutes.","10 minutes.","in_integrazione","25-07-2016 14:25:30","25-07-2016 14:27:43","2 minutes.","10 minutes.","in_integrazione","25-07-2016 14:27:43","25-07-2016 14:28:57","1 minutes.","10 minutes.","in_integrazione","25-07-2016 14:28:57","25-07-2016 14:37:36","8 minutes.","10 minutes.","in_integrazione","25-07-2016 14:37:36","25-07-2016 14:48:05","10 minutes.","10 minutes.","in_integrazione","25-07-2016 14:48:05","25-07-2016 14:49:59","1 minutes.","10 minutes.","in_integrazione","25-07-2016 14:49:59","25-07-2016 14:53:19","3 minutes.","10 minutes.","in_integrazione","25-07-2016 14:53:19","25-07-2016 15:04:00","10 minutes.","10 minutes.","in_integrazione","25-07-2016 15:04:00","25-07-2016 15:14:01","10 minutes.","10 minutes.","in_integrazione","25-07-2016 15:14:01","25-07-2016 15:17:37","3 minutes.","10 minutes.","in_integrazione","25-07-2016 15:17:37","25-07-2016 15:38:10","20 minutes.","20 minutes.","in_integrazione","25-07-2016 15:38:10","25-07-2016 15:38:40","0 minutes.","10 minutes.","in_integrazione","25-07-2016 15:38:40","25-07-2016 16:03:54","25 minutes.","25 minutes.","in_integrazione","25-07-2016 16:03:54","27-07-2016 11:28:58","1 days, 19 hours and 25 minutes.","0 days, 11 hours and 84 minutes.","integrazione_ok","27-07-2016 11:28:58","27-07-2016 16:59:09","0 days, 5 hours and 30 minutes.","0 days, 4 hours and 30 minutes."]},"authors":{"author_size":[0],"author":[]}};

	$scope.submitRelease = function(idPolarion) {

		if(typeof idPolarion == "undefined"){ 
			alert("Campo id polarion obbligatorio")
		}

		else{

			$scope.taskDataPreplength = 0;
			$scope.taskDeploylength = 0;
			$scope.taskContrDoclength = 0;
			$scope.taskDbalength = 0;
			$scope.taskTestlength = 0;

			$scope.testerslength = 0;
			$scope.CLSizelength = 0;

			var responseFinal;

			$("#overlay2").show();
			$("#overlayback2").show();
			$('html, body').animate({scrollTop: '0px'}, 0);

			$http.get('http://localhost:8080/SchedaRilasci/infoReleaseIT?idPolarion='+idPolarion).
			then(function(response) {
				console.log("Entri??");
				responseFinal = response.data;

				console.log(responseFinal["task"]);

				$scope.numRows=responseFinal["numRows"];

				console.log("Righe: "+$scope.numRows);
				if($scope.numRows !== 0){

					$scope.infoGen=responseFinal["general"]["infoGenerali"];
					$scope.stati=responseFinal["status"]["stati"];
					$scope.numeroRifiutati=responseFinal["status"]["rifiutati"];
					$scope.taskDataPrep=responseFinal["task"]["infoTaskDataPrep"];
					$scope.taskDeploy=responseFinal["task"]["infoTaskDeploy"];
					$scope.taskContrDoc=responseFinal["task"]["infoTaskContrDoc"];
					$scope.taskDba=responseFinal["task"]["infoTaskDBA"];
					$scope.taskTest=responseFinal["task"]["infoTaskTest"];
					$scope.TC=responseFinal["testcase"]["testcase"];
					$scope.numeroTesterImpiegati=responseFinal["authors"]["author_size"];
					$scope.testers=responseFinal["authors"]["author"];
					$scope.CL=responseFinal["cl"]["cl_tc"];
					$scope.CLUsers=responseFinal["cl"]["cl_users"];
					$scope.CLSize=responseFinal["cl"]["cl_size"];
					$scope.numRows=responseFinal["numRows"];
					$scope.timingReleaseIT=responseFinal["timing"]["releaseit"];
					$scope.timingTask=responseFinal["timing"]["deploydba_qf_test"];

					$scope.infoTaskId = responseFinal["task"]["infoTaskId"];

					$scope.taskDataPreplength = $scope.taskDataPrep.length;
					$scope.taskDeploylength = $scope.taskDeploy.length;
					$scope.taskContrDoclength = $scope.taskContrDoc.length;
					$scope.taskDbalength = $scope.taskDba.length;
					$scope.taskTestlength = $scope.taskTest.length;

					$scope.testerslength = $scope.testers.length;

					$scope.CLSizelength = $scope.CLSize[0];

					if($scope.TC == null) $scope.TC = 0;
					console.log("TC: "+$scope.TC);

//					var chartTiming = new Chart(document.getElementById("chartTiming"), {
//					type: 'bar',
//					data: {
//					labels: ["Release IT Timing", "Deploy/DBA Timing", "Test Timing", "Quick Fix Timing"],
//					datasets: [
//					{
//					label: "Time (hours)",
//					backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//					data:
//					[$scope.timingReleaseIT[2],$scope.timingTask[0],$scope.timingTask[4],$scope.timingTask[2]]

//					}
//					]
//					},
//					options: {
//					legend: { display: false },
//					title: {
//					display: true,
//					text: ''
//					}
//					}
//					});

					console.log("Timing: "+$scope.timingReleaseIT[2]+";"+$scope.timingTask[0]+";"+$scope.timingTask[4]+";"+$scope.timingTask[2]);

					var barOptions_stacked = {
							tooltips: {
								enabled: false
							},
							hover :{
								animationDuration:0
							},
							scales: {
								xAxes: [{
									ticks: {
										beginAtZero:true,
										fontFamily: "'Open Sans Bold', sans-serif",
										fontSize:11
									},
									scaleLabel:{
										display:false
									},
									gridLines: {
									}, 
									stacked: true
								}],
								yAxes: [{
									gridLines: {
										display:false,
										color: "#fff",
										zeroLineColor: "#fff",
										zeroLineWidth: 0
									},
									ticks: {
										fontFamily: "'Open Sans Bold', sans-serif",
										fontSize:11
									},
									stacked: true
								}]
							},
							legend:{
								display:false
							},

							animation: {
								onComplete: function () {
									var chartInstance = this.chart;
									var ctx = chartInstance.ctx;
									ctx.textAlign = "left";
									ctx.font = "20px Open Sans";
									ctx.fillStyle = "#fff";

									Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
										var meta = chartInstance.controller.getDatasetMeta(i);
										Chart.helpers.each(meta.data.forEach(function (bar, index) {
											data = dataset.data[index];
											if(i==0){
												ctx.fillText(data, 50, bar._model.y+4);
											} else {
												ctx.fillText(data, bar._model.x-25, bar._model.y+4);
											}
										}),this)
									}),this);
								}
							},
							pointLabelFontFamily : "Quadon Extra Bold",
							scaleFontFamily : "Quadon Extra Bold",
					};

					var chartTiming = new Chart(document.getElementById("chartTiming"), {
						type: 'horizontalBar',
						data: {
							labels: ["", ""],

							datasets: [{
								data: [$scope.timingReleaseIT[2], 0],
								backgroundColor: "rgba(63,103,126,1)",
								hoverBackgroundColor: "rgba(50,90,100,1)"
							},{
								data: [, $scope.timingTask[0]],
								backgroundColor: "rgba(163,103,126,1)",
								hoverBackgroundColor: "rgba(140,85,100,1)"
							},{
								data: [, $scope.timingTask[4]],
								backgroundColor: "rgba(63,203,226,1)",
								hoverBackgroundColor: "rgba(46,185,235,1)"
							},{
								data: [, $scope.timingTask[2]],
								backgroundColor: "rgba(3,223,236,1)",
								hoverBackgroundColor: "rgba(36,85,235,1)"
							}]
						},

						options: barOptions_stacked,
					});

					var chartTimingWorking = new Chart(document.getElementById("chartTimingWorking"), {
						type: 'horizontalBar',
						data: {
							labels: ["", ""],

							datasets: [{
								data: [$scope.timingReleaseIT[3], 0, , , ],
								backgroundColor: "rgba(63,103,126,1)",
								hoverBackgroundColor: "rgba(50,90,100,1)"
							},{
								data: [, $scope.timingTask[1], , , ],
								backgroundColor: "rgba(163,103,126,1)",
								hoverBackgroundColor: "rgba(140,85,100,1)"
							},{
								data: [, $scope.timingTask[5], , , ],
								backgroundColor: "rgba(63,203,226,1)",
								hoverBackgroundColor: "rgba(46,185,235,1)"
							},{
								data: [, $scope.timingTask[3], , , ],
								backgroundColor: "rgba(3,223,236,1)",
								hoverBackgroundColor: "rgba(36,85,235,1)"
							}]
						},

						options: barOptions_stacked,
					});

//					var chartTimingWorking = new Chart(document.getElementById("chartTimingWorking"), {
//					type: 'bar',
//					data: {
//					labels: ["Release IT Timing Working", "Deploy/DBA Timing Working", "Test Timing Working", "Quick Fix Timing Working"],
//					datasets: [
//					{
//					label: "Time working (hours)",
//					backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//					data: [$scope.timingReleaseIT[3],$scope.timingTask[1],$scope.timingTask[5],$scope.timingTask[3]]
//					}
//					]
//					},
//					options: {
//					legend: { display: false },
//					title: {
//					display: true,
//					text: ''
//					}
//					}
//					});

					$("#overlay2").hide("fast");
					$("#overlayback2").hide("fast");
				}
				else{
					alert("Nessun rilascio trovato con l'id indicato");
					$("#overlay2").hide("fast");
					$("#overlayback2").hide("fast");

				}
			});
		}
		$scope.range = function(max, step) {
			step = step || 1;
			var input = [];
			for (var i = 0; i <= max; i += step) {
				input.push(i);
			}
			return input;
		};

	}
});

app.controller('infoReleaseITDue', function($scope, $http, $route, $routeParams) {

//	var responseFinal={"general":{"infoGenerali":["IT-COMUNICAZIONE-1934","SW-{SCDRL}-Portale Istituzionale Regione Lombardia","SCDRL","SIRE","GSA - Rilascio revisione Stazione Editoriale R2-R3-R4 ad integrazione rdp 630","medium","normal","14-07-2016 00:00:00","25-07-2016 00:00:00","14-07-2016 11:17:14","SCDRL-639",0,"0 minutes."]},"task":{"infoTaskDataPrep":[],"infoTaskDeploy":["in_sviluppo","14-07-2016 11:22:55","15-07-2016 12:18:49","0 days, 9 hours and 55 minutes.","ddecillis","chiuso","15-07-2016 12:18:49","15-07-2016 12:19:58","10 minutes.","ddecillis","chiuso","15-07-2016 12:19:58","27-07-2016 17:10:50","4 days, 3 hours and 50 minutes.","ddecillis"],"infoTaskContrDoc":[],"infoTaskDBA":["in_sviluppo","14-07-2016 11:22:55","14-07-2016 11:38:25","15 minutes.","amarchegiani","in_sviluppo","14-07-2016 11:38:25","14-07-2016 11:38:34","10 minutes.","amarchegiani","in_sviluppo","14-07-2016 11:38:34","14-07-2016 11:40:31","10 minutes.","amarchegiani","in_sviluppo","14-07-2016 11:40:31","14-07-2016 11:40:53","10 minutes.","amarchegiani","chiuso","14-07-2016 11:40:53","14-07-2016 11:45:28","10 minutes.","amarchegiani","chiuso","14-07-2016 11:45:28","14-07-2016 11:45:44","10 minutes.","amarchegiani","sospeso","14-07-2016 11:45:44","14-07-2016 15:39:55","0 days, 2 hours and 54 minutes.","amarchegiani","sospeso","14-07-2016 15:39:55","14-07-2016 15:42:28","10 minutes.","amarchegiani","sospeso","14-07-2016 15:42:28","14-07-2016 15:42:42","10 minutes.","amarchegiani"],"infoTaskTest":["nuovo","14-07-2016 11:19:29","14-07-2016 11:19:29","10 minutes.","acaovilla","nuovo","14-07-2016 11:19:29","14-07-2016 11:22:55","10 minutes.","acaovilla","nuovo","14-07-2016 11:22:55","14-07-2016 11:23:45","10 minutes.","acaovilla","nuovo","14-07-2016 11:23:45","14-07-2016 11:24:06","10 minutes.","acaovilla","nuovo","14-07-2016 11:24:06","15-07-2016 08:49:24","0 days, 6 hours and 35 minutes.","acaovilla","nuovo","15-07-2016 08:49:24","15-07-2016 08:51:19","10 minutes.","acaovilla","chiuso","15-07-2016 08:51:19","15-07-2016 08:57:44","10 minutes.","acaovilla","nuovo","15-07-2016 08:57:44","15-07-2016 09:04:51","10 minutes.","acaovilla","nuovo","15-07-2016 09:04:51","22-07-2016 11:58:02","2 days, 10 hours and 113 minutes.","mpuorro","nuovo","22-07-2016 11:58:02","22-07-2016 12:12:04","14 minutes.","mpuorro","nuovo","22-07-2016 12:12:04","22-07-2016 12:22:15","10 minutes.","mpuorro","nuovo","22-07-2016 12:22:15","22-07-2016 13:03:52","41 minutes.","mpuorro","nuovo","22-07-2016 13:03:52","22-07-2016 14:21:01","21 minutes.","mpuorro","nuovo","22-07-2016 14:21:01","22-07-2016 14:46:25","25 minutes.","fminniti","nuovo","22-07-2016 14:46:25","22-07-2016 14:49:56","10 minutes.","fminniti","nuovo","22-07-2016 14:49:56","22-07-2016 14:54:51","10 minutes.","vsalvatore","nuovo","22-07-2016 14:54:51","22-07-2016 15:57:33","0 days, 1 hours and 2 minutes.","vsalvatore","nuovo","22-07-2016 15:57:33","22-07-2016 15:57:41","10 minutes.","smascaretti","nuovo","22-07-2016 15:57:41","22-07-2016 16:00:54","10 minutes.","apennisi","nuovo","22-07-2016 16:00:54","22-07-2016 16:05:02","10 minutes.","apennisi","nuovo","22-07-2016 16:05:02","22-07-2016 16:15:18","10 minutes.","acaovilla","nuovo","22-07-2016 16:15:18","22-07-2016 16:44:24","29 minutes.","omarcacci","nuovo","22-07-2016 16:44:24","22-07-2016 16:53:00","10 minutes.","fminniti","nuovo","22-07-2016 16:53:00","22-07-2016 17:56:41","0 days, 1 hours and 3 minutes.","vsalvatore","nuovo","22-07-2016 17:56:41","25-07-2016 09:49:04","0 days, 16 hours and 52 minutes.","fminniti","nuovo","25-07-2016 09:49:04","25-07-2016 10:03:01","13 minutes.","smascaretti","nuovo","25-07-2016 10:03:01","25-07-2016 14:05:23","0 days, 3 hours and 2 minutes.","apennisi","nuovo","25-07-2016 14:05:23","25-07-2016 14:06:33","10 minutes.","acaovilla","nuovo","25-07-2016 14:06:33","25-07-2016 14:06:50","10 minutes.","apennisi","nuovo","25-07-2016 14:06:50","25-07-2016 14:07:10","10 minutes.","acaovilla","nuovo","25-07-2016 14:07:10","25-07-2016 14:07:52","10 minutes.","fminniti","nuovo","25-07-2016 14:07:52","25-07-2016 14:11:39","10 minutes.","acaovilla","nuovo","25-07-2016 14:11:39","25-07-2016 14:13:01","10 minutes.","apennisi","nuovo","25-07-2016 14:13:01","25-07-2016 14:17:12","10 minutes.","acaovilla","nuovo","25-07-2016 14:17:12","25-07-2016 14:18:46","10 minutes.","acaovilla","nuovo","25-07-2016 14:18:46","25-07-2016 14:18:57","10 minutes.","fminniti","nuovo","25-07-2016 14:18:57","25-07-2016 14:22:18","10 minutes.","vsalvatore","nuovo","25-07-2016 14:22:18","25-07-2016 14:22:50","10 minutes.","vsalvatore","nuovo","25-07-2016 14:22:50","25-07-2016 14:23:05","10 minutes.","apennisi","nuovo","25-07-2016 14:23:05","25-07-2016 14:23:50","10 minutes.","apennisi","nuovo","25-07-2016 14:23:50","25-07-2016 14:29:52","10 minutes.","vsalvatore","nuovo","25-07-2016 14:29:52","25-07-2016 14:30:14","10 minutes.","vsalvatore","nuovo","25-07-2016 14:30:14","25-07-2016 14:35:30","10 minutes.","acaovilla","nuovo","25-07-2016 14:35:30","25-07-2016 14:38:44","10 minutes.","vsalvatore","nuovo","25-07-2016 14:38:44","25-07-2016 14:46:43","10 minutes.","fminniti","nuovo","25-07-2016 14:46:43","25-07-2016 14:48:58","10 minutes.","acaovilla","nuovo","25-07-2016 14:48:58","25-07-2016 14:54:15","10 minutes.","acaovilla","nuovo","25-07-2016 14:54:15","25-07-2016 14:55:12","10 minutes.","fminniti","nuovo","25-07-2016 14:55:12","25-07-2016 14:57:27","10 minutes.","acaovilla","nuovo","25-07-2016 14:57:27","25-07-2016 15:09:35","12 minutes.","vsalvatore","nuovo","25-07-2016 15:09:35","25-07-2016 15:10:27","10 minutes.","vsalvatore","nuovo","25-07-2016 15:10:27","25-07-2016 15:11:04","10 minutes.","fminniti","nuovo","25-07-2016 15:11:04","25-07-2016 15:15:15","10 minutes.","vsalvatore","nuovo","25-07-2016 15:15:15","25-07-2016 15:16:50","10 minutes.","apennisi","nuovo","25-07-2016 15:16:50","25-07-2016 15:18:16","10 minutes.","fminniti","nuovo","25-07-2016 15:18:16","25-07-2016 15:19:17","10 minutes.","apennisi","nuovo","25-07-2016 15:19:17","25-07-2016 15:34:20","15 minutes.","fminniti","nuovo","25-07-2016 15:34:20","25-07-2016 15:47:13","12 minutes.","fminniti","nuovo","25-07-2016 15:47:13","25-07-2016 15:52:45","10 minutes.","fminniti","nuovo","25-07-2016 15:52:45","25-07-2016 15:53:33","10 minutes.","fminniti","nuovo","25-07-2016 15:53:33","25-07-2016 15:56:33","10 minutes.","fminniti","nuovo","25-07-2016 15:56:33","27-07-2016 11:27:34","0 days, 12 hours and 30 minutes.","apennisi","chiuso","27-07-2016 11:27:34","29-07-2016 11:36:24","0 days, 16 hours and 68 minutes.","acaovilla"]},"numRows":1,"timing":{"releaseit":["14-07-2016 00:00:00","25-07-2016 00:00:00","264","98"],"deploydba_qf_test":["317","108","0","0","360","120"]},"cl":{"cl_tc":["CLIT1468566000998",8,7,7,0,0,0,1,"CL1469181039168",9,9,7,2,0,0,0,"CL1469182018716",8,8,8,0,0,0,0,"CL1469184880951",8,8,8,0,0,0,0,"CL1469191948818",14,14,14,0,0,0,0,"CL1468919016947",14,14,14,0,0,0,0,"CL1469195757815",16,16,16,0,0,0,0,"CL1469196001612",9,9,4,5,0,0,0,"CL1469195651750",9,9,4,5,0,0,0,"CL1469189605306",17,17,15,2,0,0,0,"CL1469198314619",14,14,14,0,0,0,0,"CL1468919551801",9,9,7,2,0,0,0,"CL1469433602377",5,5,1,4,0,0,0,"CL1469448130455",16,16,12,4,0,0,0,"CL1469448618162",16,16,12,4,0,0,0,"CL1469449097060",14,14,13,1,0,0,0,"CL1469448293681",16,16,13,3,0,0,0,"CL1469449194669",14,14,14,0,0,0,0,"CL1469448110889",14,14,14,0,0,0,0,"CL1469449686821",0,0,0,0,0,0,0,"CL1469450043541",0,0,0,0,0,0,0,"CL1469450616260",14,14,14,0,0,0,0,"CL1469450827208",16,16,12,4,0,0,0,"CL1469451089897",16,16,11,5,0,0,0,"CL1469452396052",10,10,6,4,0,0,0,"CL1469452473234",10,10,6,4,0,0,0,"CL1469453492168",0,0,0,0,0,0,0,"CL1469448927796",14,14,14,0,0,0,0,"CL1469538545856",12,12,8,4,0,0,0],"cl_size":[29],"cl_users":["fminniti","acaovilla","apennisi","omarcacci","vsalvatore","smascaretti","mpuorro","cmautone","vferrara"]},"testcase":{"testcase":[2,2,2,0,0,4]},"status":{"rifiutati":[0],"stati":["nuovo","14-07-2016 11:17:14","14-07-2016 11:17:14","0 minutes.","10 minutes.","nuovo","14-07-2016 11:17:14","14-07-2016 11:17:29","0 minutes.","10 minutes.","pianificato","14-07-2016 11:17:29","14-07-2016 11:40:15","22 minutes.","22 minutes.","in_integrazione","14-07-2016 11:40:15","14-07-2016 11:43:31","3 minutes.","10 minutes.","in_integrazione","14-07-2016 11:43:31","14-07-2016 11:44:13","0 minutes.","10 minutes.","in_integrazione","14-07-2016 11:44:13","14-07-2016 17:18:37","0 days, 5 hours and 34 minutes.","0 days, 4 hours and 34 minutes.","in_integrazione","14-07-2016 17:18:37","14-07-2016 17:35:28","16 minutes.","16 minutes.","in_integrazione","14-07-2016 17:35:28","15-07-2016 09:05:37","0 days, 15 hours and 30 minutes.","29 minutes.","in_integrazione","15-07-2016 09:05:37","15-07-2016 12:21:08","0 days, 3 hours and 15 minutes.","0 days, 3 hours and 15 minutes.","in_integrazione","15-07-2016 12:21:08","20-07-2016 12:18:58","4 days, 23 hours and 57 minutes.","1 days, 16 hours and 56 minutes.","in_integrazione","20-07-2016 12:18:58","22-07-2016 12:01:38","1 days, 23 hours and 42 minutes.","0 days, 16 hours and 42 minutes.","in_integrazione","22-07-2016 12:01:38","22-07-2016 12:23:27","21 minutes.","21 minutes.","in_integrazione","22-07-2016 12:23:27","22-07-2016 13:05:20","41 minutes.","41 minutes.","in_integrazione","22-07-2016 13:05:20","22-07-2016 14:23:24","0 days, 1 hours and 18 minutes.","23 minutes.","in_integrazione","22-07-2016 14:23:24","22-07-2016 14:48:18","24 minutes.","24 minutes.","in_integrazione","22-07-2016 14:48:18","22-07-2016 14:57:21","9 minutes.","10 minutes.","in_integrazione","22-07-2016 14:57:21","22-07-2016 15:02:24","5 minutes.","10 minutes.","in_integrazione","22-07-2016 15:02:24","22-07-2016 15:58:24","56 minutes.","56 minutes.","in_integrazione","22-07-2016 15:58:24","22-07-2016 15:58:36","0 minutes.","10 minutes.","in_integrazione","22-07-2016 15:58:36","22-07-2016 16:02:14","3 minutes.","10 minutes.","in_integrazione","22-07-2016 16:02:14","22-07-2016 16:07:52","5 minutes.","10 minutes.","in_integrazione","22-07-2016 16:07:52","22-07-2016 16:08:35","0 minutes.","10 minutes.","in_integrazione","22-07-2016 16:08:35","22-07-2016 16:45:37","37 minutes.","37 minutes.","in_integrazione","22-07-2016 16:45:37","22-07-2016 16:54:14","8 minutes.","10 minutes.","in_integrazione","22-07-2016 16:54:14","22-07-2016 17:19:09","24 minutes.","24 minutes.","in_integrazione","22-07-2016 17:19:09","25-07-2016 09:50:07","2 days, 16 hours and 30 minutes.","0 days, 16 hours and 90 minutes.","in_integrazione","25-07-2016 09:50:07","25-07-2016 10:04:51","14 minutes.","14 minutes.","in_integrazione","25-07-2016 10:04:51","25-07-2016 14:08:05","0 days, 4 hours and 3 minutes.","0 days, 3 hours and 3 minutes.","in_integrazione","25-07-2016 14:08:05","25-07-2016 14:16:43","8 minutes.","10 minutes.","in_integrazione","25-07-2016 14:16:43","25-07-2016 14:17:18","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:17:18","25-07-2016 14:20:31","3 minutes.","10 minutes.","in_integrazione","25-07-2016 14:20:31","25-07-2016 14:20:42","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:20:42","25-07-2016 14:21:10","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:21:10","25-07-2016 14:21:41","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:21:41","25-07-2016 14:25:30","3 minutes.","10 minutes.","in_integrazione","25-07-2016 14:25:30","25-07-2016 14:27:43","2 minutes.","10 minutes.","in_integrazione","25-07-2016 14:27:43","25-07-2016 14:28:57","1 minutes.","10 minutes.","in_integrazione","25-07-2016 14:28:57","25-07-2016 14:37:36","8 minutes.","10 minutes.","in_integrazione","25-07-2016 14:37:36","25-07-2016 14:48:05","10 minutes.","10 minutes.","in_integrazione","25-07-2016 14:48:05","25-07-2016 14:49:59","1 minutes.","10 minutes.","in_integrazione","25-07-2016 14:49:59","25-07-2016 14:53:19","3 minutes.","10 minutes.","in_integrazione","25-07-2016 14:53:19","25-07-2016 15:04:00","10 minutes.","10 minutes.","in_integrazione","25-07-2016 15:04:00","25-07-2016 15:14:01","10 minutes.","10 minutes.","in_integrazione","25-07-2016 15:14:01","25-07-2016 15:17:37","3 minutes.","10 minutes.","in_integrazione","25-07-2016 15:17:37","25-07-2016 15:38:10","20 minutes.","20 minutes.","in_integrazione","25-07-2016 15:38:10","25-07-2016 15:38:40","0 minutes.","10 minutes.","in_integrazione","25-07-2016 15:38:40","25-07-2016 16:03:54","25 minutes.","25 minutes.","in_integrazione","25-07-2016 16:03:54","27-07-2016 11:28:58","1 days, 19 hours and 25 minutes.","0 days, 11 hours and 84 minutes.","integrazione_ok","27-07-2016 11:28:58","27-07-2016 16:59:09","0 days, 5 hours and 30 minutes.","0 days, 4 hours and 30 minutes."]},"authors":{"author_size":[0],"author":[]}};

	console.log("sono nel 2");
	$scope.idReleaseIt = $routeParams.idReleaseIt;
	console.log($scope.idReleaseIt);

	$scope.numRows = 1;

	//angular.element('#bottoneCerca').triggerHandler('click'); 
	$scope.submitRelease = submitRelease($scope.idReleaseIt);
	function submitRelease(idReleaseIt) {
//		$scope.submitRelease = function(idPolarion) {

		if(typeof idPolarion == "undefined"){ 
			alert("Campo id polarion obbligatorio")
		}

		else{

			$scope.taskDataPreplength = 0;
			$scope.taskDeploylength = 0;
			$scope.taskContrDoclength = 0;
			$scope.taskDbalength = 0;
			$scope.taskTestlength = 0;

			$scope.testerslength = 0;
			$scope.CLSizelength = 0;

			var responseFinal;

			$("#overlay2").show();
			$("#overlayback2").show();
			$('html, body').animate({scrollTop: '0px'}, 0);

			$http.get('http://localhost:8080/SchedaRilasci/infoReleaseIT?idPolarion='+$scope.idReleaseIt).
			then(function(response) {
				console.log("Entri??");
				responseFinal = response.data;

				console.log(responseFinal["task"]);

				$scope.numRows=responseFinal["numRows"];

				console.log("Righe: "+$scope.numRows);
				if($scope.numRows !== 0){

					$scope.infoGen=responseFinal["general"]["infoGenerali"];
					$scope.stati=responseFinal["status"]["stati"];
					$scope.numeroRifiutati=responseFinal["status"]["rifiutati"];
					$scope.taskDataPrep=responseFinal["task"]["infoTaskDataPrep"];
					$scope.taskDeploy=responseFinal["task"]["infoTaskDeploy"];
					$scope.taskContrDoc=responseFinal["task"]["infoTaskContrDoc"];
					$scope.taskDba=responseFinal["task"]["infoTaskDBA"];
					$scope.taskTest=responseFinal["task"]["infoTaskTest"];
					$scope.TC=responseFinal["testcase"]["testcase"];
					$scope.numeroTesterImpiegati=responseFinal["authors"]["author_size"];
					$scope.testers=responseFinal["authors"]["author"];
					$scope.CL=responseFinal["cl"]["cl_tc"];
					$scope.CLUsers=responseFinal["cl"]["cl_users"];
					$scope.CLSize=responseFinal["cl"]["cl_size"];
					$scope.numRows=responseFinal["numRows"];
					$scope.timingReleaseIT=responseFinal["timing"]["releaseit"];
					$scope.timingTask=responseFinal["timing"]["deploydba_qf_test"];

					$scope.infoTaskId = responseFinal["task"]["infoTaskId"];

					$scope.taskDataPreplength = $scope.taskDataPrep.length;
					$scope.taskDeploylength = $scope.taskDeploy.length;
					$scope.taskContrDoclength = $scope.taskContrDoc.length;
					$scope.taskDbalength = $scope.taskDba.length;
					$scope.taskTestlength = $scope.taskTest.length;

					$scope.testerslength = $scope.testers.length;

					$scope.CLSizelength = $scope.CLSize[0];

					if($scope.TC == null) $scope.TC = 0;
					console.log("TC: "+$scope.TC);

//					var chartTiming = new Chart(document.getElementById("chartTiming"), {
//					type: 'bar',
//					data: {
//					labels: ["Release IT Timing", "Deploy/DBA Timing", "Test Timing", "Quick Fix Timing"],
//					datasets: [
//					{
//					label: "Time (hours)",
//					backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//					data:
//					[$scope.timingReleaseIT[2],$scope.timingTask[0],$scope.timingTask[4],$scope.timingTask[2]]

//					}
//					]
//					},
//					options: {
//					legend: { display: false },
//					title: {
//					display: true,
//					text: ''
//					}
//					}
//					});

					console.log("Timing: "+$scope.timingReleaseIT[2]+";"+$scope.timingTask[0]+";"+$scope.timingTask[4]+";"+$scope.timingTask[2]);

					var barOptions_stacked = {
							tooltips: {
								enabled: false
							},
							hover :{
								animationDuration:0
							},
							scales: {
								xAxes: [{
									ticks: {
										beginAtZero:true,
										fontFamily: "'Open Sans Bold', sans-serif",
										fontSize:11
									},
									scaleLabel:{
										display:false
									},
									gridLines: {
									}, 
									stacked: true
								}],
								yAxes: [{
									gridLines: {
										display:false,
										color: "#fff",
										zeroLineColor: "#fff",
										zeroLineWidth: 0
									},
									ticks: {
										fontFamily: "'Open Sans Bold', sans-serif",
										fontSize:11
									},
									stacked: true
								}]
							},
							legend:{
								display:false
							},

							animation: {
								onComplete: function () {
									var chartInstance = this.chart;
									var ctx = chartInstance.ctx;
									ctx.textAlign = "left";
									ctx.font = "20px Open Sans";
									ctx.fillStyle = "#fff";

									Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
										var meta = chartInstance.controller.getDatasetMeta(i);
										Chart.helpers.each(meta.data.forEach(function (bar, index) {
											data = dataset.data[index];
											if(i==0){
												ctx.fillText(data, 50, bar._model.y+4);
											} else {
												ctx.fillText(data, bar._model.x-25, bar._model.y+4);
											}
										}),this)
									}),this);
								}
							},
							pointLabelFontFamily : "Quadon Extra Bold",
							scaleFontFamily : "Quadon Extra Bold",
					};

					var chartTiming = new Chart(document.getElementById("chartTiming"), {
						type: 'horizontalBar',
						data: {
							labels: ["", ""],

							datasets: [{
								data: [$scope.timingReleaseIT[2], 0],
								backgroundColor: "rgba(63,103,126,1)",
								hoverBackgroundColor: "rgba(50,90,100,1)"
							},{
								data: [, $scope.timingTask[0]],
								backgroundColor: "rgba(163,103,126,1)",
								hoverBackgroundColor: "rgba(140,85,100,1)"
							},{
								data: [, $scope.timingTask[4]],
								backgroundColor: "rgba(63,203,226,1)",
								hoverBackgroundColor: "rgba(46,185,235,1)"
							},{
								data: [, $scope.timingTask[2]],
								backgroundColor: "rgba(3,223,236,1)",
								hoverBackgroundColor: "rgba(36,85,235,1)"
							}]
						},

						options: barOptions_stacked,
					});

					var chartTimingWorking = new Chart(document.getElementById("chartTimingWorking"), {
						type: 'horizontalBar',
						data: {
							labels: ["", ""],

							datasets: [{
								data: [$scope.timingReleaseIT[3], 0, , , ],
								backgroundColor: "rgba(63,103,126,1)",
								hoverBackgroundColor: "rgba(50,90,100,1)"
							},{
								data: [, $scope.timingTask[1], , , ],
								backgroundColor: "rgba(163,103,126,1)",
								hoverBackgroundColor: "rgba(140,85,100,1)"
							},{
								data: [, $scope.timingTask[5], , , ],
								backgroundColor: "rgba(63,203,226,1)",
								hoverBackgroundColor: "rgba(46,185,235,1)"
							},{
								data: [, $scope.timingTask[3], , , ],
								backgroundColor: "rgba(3,223,236,1)",
								hoverBackgroundColor: "rgba(36,85,235,1)"
							}]
						},

						options: barOptions_stacked,
					});

//					var chartTimingWorking = new Chart(document.getElementById("chartTimingWorking"), {
//					type: 'bar',
//					data: {
//					labels: ["Release IT Timing Working", "Deploy/DBA Timing Working", "Test Timing Working", "Quick Fix Timing Working"],
//					datasets: [
//					{
//					label: "Time working (hours)",
//					backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//					data: [$scope.timingReleaseIT[3],$scope.timingTask[1],$scope.timingTask[5],$scope.timingTask[3]]
//					}
//					]
//					},
//					options: {
//					legend: { display: false },
//					title: {
//					display: true,
//					text: ''
//					}
//					}
//					});

					$("#overlay2").hide("fast");
					$("#overlayback2").hide("fast");
				}
				else{
					alert("Nessun rilascio trovato con l'id indicato");
					$("#overlay2").hide("fast");
					$("#overlayback2").hide("fast");

				}
			});
		}
		$scope.range = function(max, step) {
			step = step || 1;
			var input = [];
			for (var i = 0; i <= max; i += step) {
				input.push(i);
			}
			return input;
		};

	}
});

app.controller('infoReleaseProgetto', function($scope, $http,$route) {

//	var responseFinal={"general":{"infoGenerali":["IT-COMUNICAZIONE-1934","SW-{SCDRL}-Portale Istituzionale Regione Lombardia","SCDRL","SIRE","GSA - Rilascio revisione Stazione Editoriale R2-R3-R4 ad integrazione rdp 630","medium","normal","14-07-2016 00:00:00","25-07-2016 00:00:00","14-07-2016 11:17:14","SCDRL-639",0,"0 minutes."]},"task":{"infoTaskDataPrep":[],"infoTaskDeploy":["in_sviluppo","14-07-2016 11:22:55","15-07-2016 12:18:49","0 days, 9 hours and 55 minutes.","ddecillis","chiuso","15-07-2016 12:18:49","15-07-2016 12:19:58","10 minutes.","ddecillis","chiuso","15-07-2016 12:19:58","27-07-2016 17:10:50","4 days, 3 hours and 50 minutes.","ddecillis"],"infoTaskContrDoc":[],"infoTaskDBA":["in_sviluppo","14-07-2016 11:22:55","14-07-2016 11:38:25","15 minutes.","amarchegiani","in_sviluppo","14-07-2016 11:38:25","14-07-2016 11:38:34","10 minutes.","amarchegiani","in_sviluppo","14-07-2016 11:38:34","14-07-2016 11:40:31","10 minutes.","amarchegiani","in_sviluppo","14-07-2016 11:40:31","14-07-2016 11:40:53","10 minutes.","amarchegiani","chiuso","14-07-2016 11:40:53","14-07-2016 11:45:28","10 minutes.","amarchegiani","chiuso","14-07-2016 11:45:28","14-07-2016 11:45:44","10 minutes.","amarchegiani","sospeso","14-07-2016 11:45:44","14-07-2016 15:39:55","0 days, 2 hours and 54 minutes.","amarchegiani","sospeso","14-07-2016 15:39:55","14-07-2016 15:42:28","10 minutes.","amarchegiani","sospeso","14-07-2016 15:42:28","14-07-2016 15:42:42","10 minutes.","amarchegiani"],"infoTaskTest":["nuovo","14-07-2016 11:19:29","14-07-2016 11:19:29","10 minutes.","acaovilla","nuovo","14-07-2016 11:19:29","14-07-2016 11:22:55","10 minutes.","acaovilla","nuovo","14-07-2016 11:22:55","14-07-2016 11:23:45","10 minutes.","acaovilla","nuovo","14-07-2016 11:23:45","14-07-2016 11:24:06","10 minutes.","acaovilla","nuovo","14-07-2016 11:24:06","15-07-2016 08:49:24","0 days, 6 hours and 35 minutes.","acaovilla","nuovo","15-07-2016 08:49:24","15-07-2016 08:51:19","10 minutes.","acaovilla","chiuso","15-07-2016 08:51:19","15-07-2016 08:57:44","10 minutes.","acaovilla","nuovo","15-07-2016 08:57:44","15-07-2016 09:04:51","10 minutes.","acaovilla","nuovo","15-07-2016 09:04:51","22-07-2016 11:58:02","2 days, 10 hours and 113 minutes.","mpuorro","nuovo","22-07-2016 11:58:02","22-07-2016 12:12:04","14 minutes.","mpuorro","nuovo","22-07-2016 12:12:04","22-07-2016 12:22:15","10 minutes.","mpuorro","nuovo","22-07-2016 12:22:15","22-07-2016 13:03:52","41 minutes.","mpuorro","nuovo","22-07-2016 13:03:52","22-07-2016 14:21:01","21 minutes.","mpuorro","nuovo","22-07-2016 14:21:01","22-07-2016 14:46:25","25 minutes.","fminniti","nuovo","22-07-2016 14:46:25","22-07-2016 14:49:56","10 minutes.","fminniti","nuovo","22-07-2016 14:49:56","22-07-2016 14:54:51","10 minutes.","vsalvatore","nuovo","22-07-2016 14:54:51","22-07-2016 15:57:33","0 days, 1 hours and 2 minutes.","vsalvatore","nuovo","22-07-2016 15:57:33","22-07-2016 15:57:41","10 minutes.","smascaretti","nuovo","22-07-2016 15:57:41","22-07-2016 16:00:54","10 minutes.","apennisi","nuovo","22-07-2016 16:00:54","22-07-2016 16:05:02","10 minutes.","apennisi","nuovo","22-07-2016 16:05:02","22-07-2016 16:15:18","10 minutes.","acaovilla","nuovo","22-07-2016 16:15:18","22-07-2016 16:44:24","29 minutes.","omarcacci","nuovo","22-07-2016 16:44:24","22-07-2016 16:53:00","10 minutes.","fminniti","nuovo","22-07-2016 16:53:00","22-07-2016 17:56:41","0 days, 1 hours and 3 minutes.","vsalvatore","nuovo","22-07-2016 17:56:41","25-07-2016 09:49:04","0 days, 16 hours and 52 minutes.","fminniti","nuovo","25-07-2016 09:49:04","25-07-2016 10:03:01","13 minutes.","smascaretti","nuovo","25-07-2016 10:03:01","25-07-2016 14:05:23","0 days, 3 hours and 2 minutes.","apennisi","nuovo","25-07-2016 14:05:23","25-07-2016 14:06:33","10 minutes.","acaovilla","nuovo","25-07-2016 14:06:33","25-07-2016 14:06:50","10 minutes.","apennisi","nuovo","25-07-2016 14:06:50","25-07-2016 14:07:10","10 minutes.","acaovilla","nuovo","25-07-2016 14:07:10","25-07-2016 14:07:52","10 minutes.","fminniti","nuovo","25-07-2016 14:07:52","25-07-2016 14:11:39","10 minutes.","acaovilla","nuovo","25-07-2016 14:11:39","25-07-2016 14:13:01","10 minutes.","apennisi","nuovo","25-07-2016 14:13:01","25-07-2016 14:17:12","10 minutes.","acaovilla","nuovo","25-07-2016 14:17:12","25-07-2016 14:18:46","10 minutes.","acaovilla","nuovo","25-07-2016 14:18:46","25-07-2016 14:18:57","10 minutes.","fminniti","nuovo","25-07-2016 14:18:57","25-07-2016 14:22:18","10 minutes.","vsalvatore","nuovo","25-07-2016 14:22:18","25-07-2016 14:22:50","10 minutes.","vsalvatore","nuovo","25-07-2016 14:22:50","25-07-2016 14:23:05","10 minutes.","apennisi","nuovo","25-07-2016 14:23:05","25-07-2016 14:23:50","10 minutes.","apennisi","nuovo","25-07-2016 14:23:50","25-07-2016 14:29:52","10 minutes.","vsalvatore","nuovo","25-07-2016 14:29:52","25-07-2016 14:30:14","10 minutes.","vsalvatore","nuovo","25-07-2016 14:30:14","25-07-2016 14:35:30","10 minutes.","acaovilla","nuovo","25-07-2016 14:35:30","25-07-2016 14:38:44","10 minutes.","vsalvatore","nuovo","25-07-2016 14:38:44","25-07-2016 14:46:43","10 minutes.","fminniti","nuovo","25-07-2016 14:46:43","25-07-2016 14:48:58","10 minutes.","acaovilla","nuovo","25-07-2016 14:48:58","25-07-2016 14:54:15","10 minutes.","acaovilla","nuovo","25-07-2016 14:54:15","25-07-2016 14:55:12","10 minutes.","fminniti","nuovo","25-07-2016 14:55:12","25-07-2016 14:57:27","10 minutes.","acaovilla","nuovo","25-07-2016 14:57:27","25-07-2016 15:09:35","12 minutes.","vsalvatore","nuovo","25-07-2016 15:09:35","25-07-2016 15:10:27","10 minutes.","vsalvatore","nuovo","25-07-2016 15:10:27","25-07-2016 15:11:04","10 minutes.","fminniti","nuovo","25-07-2016 15:11:04","25-07-2016 15:15:15","10 minutes.","vsalvatore","nuovo","25-07-2016 15:15:15","25-07-2016 15:16:50","10 minutes.","apennisi","nuovo","25-07-2016 15:16:50","25-07-2016 15:18:16","10 minutes.","fminniti","nuovo","25-07-2016 15:18:16","25-07-2016 15:19:17","10 minutes.","apennisi","nuovo","25-07-2016 15:19:17","25-07-2016 15:34:20","15 minutes.","fminniti","nuovo","25-07-2016 15:34:20","25-07-2016 15:47:13","12 minutes.","fminniti","nuovo","25-07-2016 15:47:13","25-07-2016 15:52:45","10 minutes.","fminniti","nuovo","25-07-2016 15:52:45","25-07-2016 15:53:33","10 minutes.","fminniti","nuovo","25-07-2016 15:53:33","25-07-2016 15:56:33","10 minutes.","fminniti","nuovo","25-07-2016 15:56:33","27-07-2016 11:27:34","0 days, 12 hours and 30 minutes.","apennisi","chiuso","27-07-2016 11:27:34","29-07-2016 11:36:24","0 days, 16 hours and 68 minutes.","acaovilla"]},"numRows":1,"timing":{"releaseit":["14-07-2016 00:00:00","25-07-2016 00:00:00","264","98"],"deploydba_qf_test":["317","108","0","0","360","120"]},"cl":{"cl_tc":["CLIT1468566000998",8,7,7,0,0,0,1,"CL1469181039168",9,9,7,2,0,0,0,"CL1469182018716",8,8,8,0,0,0,0,"CL1469184880951",8,8,8,0,0,0,0,"CL1469191948818",14,14,14,0,0,0,0,"CL1468919016947",14,14,14,0,0,0,0,"CL1469195757815",16,16,16,0,0,0,0,"CL1469196001612",9,9,4,5,0,0,0,"CL1469195651750",9,9,4,5,0,0,0,"CL1469189605306",17,17,15,2,0,0,0,"CL1469198314619",14,14,14,0,0,0,0,"CL1468919551801",9,9,7,2,0,0,0,"CL1469433602377",5,5,1,4,0,0,0,"CL1469448130455",16,16,12,4,0,0,0,"CL1469448618162",16,16,12,4,0,0,0,"CL1469449097060",14,14,13,1,0,0,0,"CL1469448293681",16,16,13,3,0,0,0,"CL1469449194669",14,14,14,0,0,0,0,"CL1469448110889",14,14,14,0,0,0,0,"CL1469449686821",0,0,0,0,0,0,0,"CL1469450043541",0,0,0,0,0,0,0,"CL1469450616260",14,14,14,0,0,0,0,"CL1469450827208",16,16,12,4,0,0,0,"CL1469451089897",16,16,11,5,0,0,0,"CL1469452396052",10,10,6,4,0,0,0,"CL1469452473234",10,10,6,4,0,0,0,"CL1469453492168",0,0,0,0,0,0,0,"CL1469448927796",14,14,14,0,0,0,0,"CL1469538545856",12,12,8,4,0,0,0],"cl_size":[29],"cl_users":["fminniti","acaovilla","apennisi","omarcacci","vsalvatore","smascaretti","mpuorro","cmautone","vferrara"]},"testcase":{"testcase":[2,2,2,0,0,4]},"status":{"rifiutati":[0],"stati":["nuovo","14-07-2016 11:17:14","14-07-2016 11:17:14","0 minutes.","10 minutes.","nuovo","14-07-2016 11:17:14","14-07-2016 11:17:29","0 minutes.","10 minutes.","pianificato","14-07-2016 11:17:29","14-07-2016 11:40:15","22 minutes.","22 minutes.","in_integrazione","14-07-2016 11:40:15","14-07-2016 11:43:31","3 minutes.","10 minutes.","in_integrazione","14-07-2016 11:43:31","14-07-2016 11:44:13","0 minutes.","10 minutes.","in_integrazione","14-07-2016 11:44:13","14-07-2016 17:18:37","0 days, 5 hours and 34 minutes.","0 days, 4 hours and 34 minutes.","in_integrazione","14-07-2016 17:18:37","14-07-2016 17:35:28","16 minutes.","16 minutes.","in_integrazione","14-07-2016 17:35:28","15-07-2016 09:05:37","0 days, 15 hours and 30 minutes.","29 minutes.","in_integrazione","15-07-2016 09:05:37","15-07-2016 12:21:08","0 days, 3 hours and 15 minutes.","0 days, 3 hours and 15 minutes.","in_integrazione","15-07-2016 12:21:08","20-07-2016 12:18:58","4 days, 23 hours and 57 minutes.","1 days, 16 hours and 56 minutes.","in_integrazione","20-07-2016 12:18:58","22-07-2016 12:01:38","1 days, 23 hours and 42 minutes.","0 days, 16 hours and 42 minutes.","in_integrazione","22-07-2016 12:01:38","22-07-2016 12:23:27","21 minutes.","21 minutes.","in_integrazione","22-07-2016 12:23:27","22-07-2016 13:05:20","41 minutes.","41 minutes.","in_integrazione","22-07-2016 13:05:20","22-07-2016 14:23:24","0 days, 1 hours and 18 minutes.","23 minutes.","in_integrazione","22-07-2016 14:23:24","22-07-2016 14:48:18","24 minutes.","24 minutes.","in_integrazione","22-07-2016 14:48:18","22-07-2016 14:57:21","9 minutes.","10 minutes.","in_integrazione","22-07-2016 14:57:21","22-07-2016 15:02:24","5 minutes.","10 minutes.","in_integrazione","22-07-2016 15:02:24","22-07-2016 15:58:24","56 minutes.","56 minutes.","in_integrazione","22-07-2016 15:58:24","22-07-2016 15:58:36","0 minutes.","10 minutes.","in_integrazione","22-07-2016 15:58:36","22-07-2016 16:02:14","3 minutes.","10 minutes.","in_integrazione","22-07-2016 16:02:14","22-07-2016 16:07:52","5 minutes.","10 minutes.","in_integrazione","22-07-2016 16:07:52","22-07-2016 16:08:35","0 minutes.","10 minutes.","in_integrazione","22-07-2016 16:08:35","22-07-2016 16:45:37","37 minutes.","37 minutes.","in_integrazione","22-07-2016 16:45:37","22-07-2016 16:54:14","8 minutes.","10 minutes.","in_integrazione","22-07-2016 16:54:14","22-07-2016 17:19:09","24 minutes.","24 minutes.","in_integrazione","22-07-2016 17:19:09","25-07-2016 09:50:07","2 days, 16 hours and 30 minutes.","0 days, 16 hours and 90 minutes.","in_integrazione","25-07-2016 09:50:07","25-07-2016 10:04:51","14 minutes.","14 minutes.","in_integrazione","25-07-2016 10:04:51","25-07-2016 14:08:05","0 days, 4 hours and 3 minutes.","0 days, 3 hours and 3 minutes.","in_integrazione","25-07-2016 14:08:05","25-07-2016 14:16:43","8 minutes.","10 minutes.","in_integrazione","25-07-2016 14:16:43","25-07-2016 14:17:18","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:17:18","25-07-2016 14:20:31","3 minutes.","10 minutes.","in_integrazione","25-07-2016 14:20:31","25-07-2016 14:20:42","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:20:42","25-07-2016 14:21:10","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:21:10","25-07-2016 14:21:41","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:21:41","25-07-2016 14:25:30","3 minutes.","10 minutes.","in_integrazione","25-07-2016 14:25:30","25-07-2016 14:27:43","2 minutes.","10 minutes.","in_integrazione","25-07-2016 14:27:43","25-07-2016 14:28:57","1 minutes.","10 minutes.","in_integrazione","25-07-2016 14:28:57","25-07-2016 14:37:36","8 minutes.","10 minutes.","in_integrazione","25-07-2016 14:37:36","25-07-2016 14:48:05","10 minutes.","10 minutes.","in_integrazione","25-07-2016 14:48:05","25-07-2016 14:49:59","1 minutes.","10 minutes.","in_integrazione","25-07-2016 14:49:59","25-07-2016 14:53:19","3 minutes.","10 minutes.","in_integrazione","25-07-2016 14:53:19","25-07-2016 15:04:00","10 minutes.","10 minutes.","in_integrazione","25-07-2016 15:04:00","25-07-2016 15:14:01","10 minutes.","10 minutes.","in_integrazione","25-07-2016 15:14:01","25-07-2016 15:17:37","3 minutes.","10 minutes.","in_integrazione","25-07-2016 15:17:37","25-07-2016 15:38:10","20 minutes.","20 minutes.","in_integrazione","25-07-2016 15:38:10","25-07-2016 15:38:40","0 minutes.","10 minutes.","in_integrazione","25-07-2016 15:38:40","25-07-2016 16:03:54","25 minutes.","25 minutes.","in_integrazione","25-07-2016 16:03:54","27-07-2016 11:28:58","1 days, 19 hours and 25 minutes.","0 days, 11 hours and 84 minutes.","integrazione_ok","27-07-2016 11:28:58","27-07-2016 16:59:09","0 days, 5 hours and 30 minutes.","0 days, 4 hours and 30 minutes."]},"authors":{"author_size":[0],"author":[]}};

	$scope.numRows = 1;

	$scope.submitRelease = function(idPolarion) {

		if(typeof idPolarion == "undefined"){ 
			alert("Campo id polarion obbligatorio")
		}

		else{

			$scope.infoSviluppolength = 0;
			$scope.infoMevlength = 0;
			$scope.infoDefectlength = 0;
			$scope.infoAnomalialength = 0;

			var responseFinal;

			$("#overlay2").show();
			$("#overlayback2").show();
			$('html, body').animate({scrollTop: '0px'}, 0);

			console.log()

			$http.get('http://localhost:8080/SchedaRilasci/infoReleaseProgetto?idPolarion='+idPolarion).
			then(function(response) {

				responseFinal = response.data;

				console.log("Id Polarion: "+idPolarion);

				$scope.numRows=responseFinal["numRows"];

				console.log("Righe: "+$scope.numRows);
				if($scope.numRows !== 0){

					$scope.infoGen=responseFinal["infoGenerali"];
					$scope.infoStati=responseFinal["infoStati"];
					$scope.infoDocumenti=responseFinal["infoDocumenti"];
					$scope.infoSviluppo=responseFinal["infoProgettoSviluppo"];
					$scope.infoMev=responseFinal["infoMev"];
					$scope.infoDefect=responseFinal["infoDefect"];
					$scope.infoDefectLength=$scope.infoDefect.length;
					$scope.infoAnomalia=responseFinal["infoAnomalia"];

					$scope.infoTotDefect = responseFinal["infoTotDefect"];
					$scope.infoTotAnomalie = responseFinal["infoTotAnomalie"];

					$scope.infoSviluppolength = $scope.infoSviluppo.length;
					$scope.infoMevlength = $scope.infoMev.length;

					$scope.idReleaseIt = responseFinal["idReleaseIt"];

					for(var i = 0; i <= $scope.infoDefectlength; i ++){
						$scope.infoDefectlength += $scope.infoDefect[i];
					}

					for(var i = 0; i <= $scope.infoAnomalialength; i ++){
						$scope.infoAnomalialength += $scope.infoAnomalia[i];
					}

					var severityDefectRelease = new Chart(document.getElementById("severityDefectRelease"), {
						type: 'doughnut',
						data: {
							labels: ["Critica", "Alta", "Media", "Bassa"],
							datasets: [{
								backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
								data: [$scope.infoDefect[0],$scope.infoDefect[1],$scope.infoDefect[2],$scope.infoDefect[3]]
							}]
						},
						options: {
							title: {
								display: true,
								text: 'Defect in Severity'
							}
						}
					});

					var priorityDefectRelease = new Chart(document.getElementById("priorityDefectRelease"), {
						type: 'doughnut',
						data: {
							labels: ["Critica", "Alta", "Media", "Bassa", "Bassissima"],
							datasets: [{
								backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
								data: [$scope.infoDefect[4],$scope.infoDefect[5],$scope.infoDefect[6],$scope.infoDefect[7],$scope.infoDefect[8]]
							}]
						},
						options: {
							title: {
								display: true,
								text: 'Defect in Priority'
							}
						}
					});

					var resolutionDefectRelease = new Chart(document.getElementById("resolutionDefectRelease"), {
						type: 'doughnut',
						data: {
							labels: ["Limiti Noti", "Risolti In It", "Riaperti", "Invalidi"],
							datasets: [{
								backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
								data: [$scope.infoDefect[9],$scope.infoDefect[10],$scope.infoDefect[11],$scope.infoDefect[12]]
							}]
						},
						options: {
							title: {
								display: true,
								text: 'Defect in Resolution'
							}
						}
					});

					var authorDefectRelease = new Chart(document.getElementById("authorDefectRelease"), {
						type: 'doughnut',
						data: {
							labels: ["Tester", "Deploy", "DBA", "CM"],
							datasets: [{
								backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
								data: [$scope.infoDefect[13],$scope.infoDefect[14],$scope.infoDefect[15],$scope.infoDefect[16]]
							}]
						},
						options: {
							title: {
								display: true,
								text: 'Defect in Author'
							}
						}
					});

					var severityAnomaliaRelease = new Chart(document.getElementById("severityAnomaliaRelease"), {
						type: 'doughnut',
						data: {
							labels: ["Critica", "Alta", "Media", "Bassa"],
							datasets: [{
								backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
								data: [$scope.infoAnomalia[0],$scope.infoAnomalia[1],$scope.infoAnomalia[2],$scope.infoAnomalia[3]]
							}]
						},
						options: {
							title: {
								display: true,
								text: 'Anomalia in Severity'
							}
						}
					});

					var priorityAnomaliaRelease = new Chart(document.getElementById("priorityAnomaliaRelease"), {
						type: 'doughnut',
						data: {
							labels: ["Critica", "Alta", "Media", "Bassa", "Bassissima"],
							datasets: [{
								backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
								data: [$scope.infoAnomalia[4],$scope.infoAnomalia[5],$scope.infoAnomalia[6],$scope.infoAnomalia[7],$scope.infoAnomalia[8]]
							}]
						},
						options: {
							title: {
								display: true,
								text: 'Anomalia in Priority'
							}
						}
					});


					$("#overlay2").hide("fast");
					$("#overlayback2").hide("fast");
				}
				else{
					alert("Nessun rilascio trovato con l'id indicato");
					$("#overlay2").hide("fast");
					$("#overlayback2").hide("fast");
				}


			});

		}
		$scope.range = function(max, step) {
			step = step || 1;
			var input = [];
			for (var i = 0; i <= max; i += step) {
				input.push(i);
			}
			return input;
		};

	}
});

app.controller('infoReleaseProgettoDue' ,function($scope, $http, $route, $routeParams) {
	console.log("sono nel 2");
	$scope.idReleaseProgetto = $routeParams.idReleaseProgetto;
	console.log($scope.idReleaseProgetto);

	$scope.numRows = 1;

	//angular.element('#bottoneCerca').triggerHandler('click'); 
	$scope.submitRelease = submitRelease($scope.idReleaseProgetto);
	function submitRelease(idReleaseProgetto) {

		if(typeof $scope.idReleaseProgetto == "undefined"){ 
			alert("Campo id polarion obbligatorio");
		}
		else{
			console.log("sono dentro else");
			$scope.infoSviluppolength = 0;
			$scope.infoMevlength = 0;
			$scope.infoDefectlength = 0;
			$scope.infoAnomalialength = 0;

			var responseFinal;

			$("#overlay2").show();
			$("#overlayback2").show();
			$('html, body').animate({scrollTop: '0px'}, 0);

			$http.get('http://localhost:8080/SchedaRilasci/infoReleaseProgetto?idPolarion='+idReleaseProgetto).
			then(function(response) {

				responseFinal = response.data;
				console.log("ciao: "+response.data);

				$scope.numRows=responseFinal["numRows"];

				console.log("Righe: "+$scope.numRows);
				if($scope.numRows !== 0){

					$scope.infoGen=responseFinal["infoGenerali"];
					$scope.infoStati=responseFinal["infoStati"];
					$scope.infoDocumenti=responseFinal["infoDocumenti"];
					$scope.infoSviluppo=responseFinal["infoProgettoSviluppo"];
					$scope.infoMev=responseFinal["infoMev"];
					$scope.infoDefect=responseFinal["infoDefect"];
					$scope.infoDefectLength=$scope.infoDefect.length;
					$scope.infoAnomalia=responseFinal["infoAnomalia"];

					$scope.infoTotDefect = responseFinal["infoTotDefect"];
					$scope.infoTotAnomalie = responseFinal["infoTotAnomalie"];

					$scope.infoSviluppolength = $scope.infoSviluppo.length;
					$scope.infoMevlength = $scope.infoMev.length;

					$scope.idReleaseIt = responseFinal["idReleaseIt"];

					for(var i = 0; i <= $scope.infoDefectlength; i ++){
						$scope.infoDefectlength += $scope.infoDefect[i];
					}

					for(var i = 0; i <= $scope.infoAnomalialength; i ++){
						$scope.infoAnomalialength += $scope.infoAnomalia[i];
					}
					console.log("Tot anom: "+$scope.infoAnomalialength);

					var severityDefectRelease = new Chart(document.getElementById("severityDefectRelease"), {
						type: 'doughnut',
						data: {
							labels: ["Critica", "Alta", "Media", "Bassa"],
							datasets: [{
								backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
								data: [$scope.infoDefect[0],$scope.infoDefect[1],$scope.infoDefect[2],$scope.infoDefect[3]]
							}]
						},
						options: {
							title: {
								display: true,
								text: 'Defect in Severity'
							}
						}
					});

					var priorityDefectRelease = new Chart(document.getElementById("priorityDefectRelease"), {
						type: 'doughnut',
						data: {
							labels: ["Critica", "Alta", "Media", "Bassa", "Bassissima"],
							datasets: [{
								backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
								data: [$scope.infoDefect[4],$scope.infoDefect[5],$scope.infoDefect[6],$scope.infoDefect[7],$scope.infoDefect[8]]
							}]
						},
						options: {
							title: {
								display: true,
								text: 'Defect in Priority'
							}
						}
					});

					var resolutionDefectRelease = new Chart(document.getElementById("resolutionDefectRelease"), {
						type: 'doughnut',
						data: {
							labels: ["Limiti Noti", "Risolti In It", "Riaperti", "Invalidi"],
							datasets: [{
								backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
								data: [$scope.infoDefect[9],$scope.infoDefect[10],$scope.infoDefect[11],$scope.infoDefect[12]]
							}]
						},
						options: {
							title: {
								display: true,
								text: 'Defect in Resolution'
							}
						}
					});

					var authorDefectRelease = new Chart(document.getElementById("authorDefectRelease"), {
						type: 'doughnut',
						data: {
							labels: ["Tester", "Deploy", "DBA", "CM"],
							datasets: [{
								backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
								data: [$scope.infoDefect[13],$scope.infoDefect[14],$scope.infoDefect[15],$scope.infoDefect[16]]
							}]
						},
						options: {
							title: {
								display: true,
								text: 'Defect in Author'
							}
						}
					});

					var severityAnomaliaRelease = new Chart(document.getElementById("severityAnomaliaRelease"), {
						type: 'doughnut',
						data: {
							labels: ["Critica", "Alta", "Media", "Bassa"],
							datasets: [{
								backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
								data: [$scope.infoAnomalia[0],$scope.infoAnomalia[1],$scope.infoAnomalia[2],$scope.infoAnomalia[3]]
							}]
						},
						options: {
							title: {
								display: true,
								text: 'Anomalia in Severity'
							}
						}
					});

					var priorityAnomaliaRelease = new Chart(document.getElementById("priorityAnomaliaRelease"), {
						type: 'doughnut',
						data: {
							labels: ["Critica", "Alta", "Media", "Bassa", "Bassissima"],
							datasets: [{
								backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
								data: [$scope.infoAnomalia[4],$scope.infoAnomalia[5],$scope.infoAnomalia[6],$scope.infoAnomalia[7],$scope.infoAnomalia[8]]
							}]
						},
						options: {
							title: {
								display: true,
								text: 'Anomalia in Priority'
							}
						}
					});


					$("#overlay2").hide("fast");
					$("#overlayback2").hide("fast");
				}
				else{
					alert("Nessun rilascio trovato con l'id indicato");
					$("#overlay2").hide("fast");
					$("#overlayback2").hide("fast");
				}


			});

		}
		$scope.range = function(max, step) {
			step = step || 1;
			var input = [];
			for (var i = 0; i <= max; i += step) {
				input.push(i);
			}
			return input;
		};

	};
});

app.controller('infoReleaseFiltri', function($scope, $http, $route, $filter) {

	$scope.sizeAree = 0;

//	var responseFinal={"general":{"infoGenerali":["IT-COMUNICAZIONE-1934","SW-{SCDRL}-Portale Istituzionale Regione Lombardia","SCDRL","SIRE","GSA - Rilascio revisione Stazione Editoriale R2-R3-R4 ad integrazione rdp 630","medium","normal","14-07-2016 00:00:00","25-07-2016 00:00:00","14-07-2016 11:17:14","SCDRL-639",0,"0 minutes."]},"task":{"infoTaskDataPrep":[],"infoTaskDeploy":["in_sviluppo","14-07-2016 11:22:55","15-07-2016 12:18:49","0 days, 9 hours and 55 minutes.","ddecillis","chiuso","15-07-2016 12:18:49","15-07-2016 12:19:58","10 minutes.","ddecillis","chiuso","15-07-2016 12:19:58","27-07-2016 17:10:50","4 days, 3 hours and 50 minutes.","ddecillis"],"infoTaskContrDoc":[],"infoTaskDBA":["in_sviluppo","14-07-2016 11:22:55","14-07-2016 11:38:25","15 minutes.","amarchegiani","in_sviluppo","14-07-2016 11:38:25","14-07-2016 11:38:34","10 minutes.","amarchegiani","in_sviluppo","14-07-2016 11:38:34","14-07-2016 11:40:31","10 minutes.","amarchegiani","in_sviluppo","14-07-2016 11:40:31","14-07-2016 11:40:53","10 minutes.","amarchegiani","chiuso","14-07-2016 11:40:53","14-07-2016 11:45:28","10 minutes.","amarchegiani","chiuso","14-07-2016 11:45:28","14-07-2016 11:45:44","10 minutes.","amarchegiani","sospeso","14-07-2016 11:45:44","14-07-2016 15:39:55","0 days, 2 hours and 54 minutes.","amarchegiani","sospeso","14-07-2016 15:39:55","14-07-2016 15:42:28","10 minutes.","amarchegiani","sospeso","14-07-2016 15:42:28","14-07-2016 15:42:42","10 minutes.","amarchegiani"],"infoTaskTest":["nuovo","14-07-2016 11:19:29","14-07-2016 11:19:29","10 minutes.","acaovilla","nuovo","14-07-2016 11:19:29","14-07-2016 11:22:55","10 minutes.","acaovilla","nuovo","14-07-2016 11:22:55","14-07-2016 11:23:45","10 minutes.","acaovilla","nuovo","14-07-2016 11:23:45","14-07-2016 11:24:06","10 minutes.","acaovilla","nuovo","14-07-2016 11:24:06","15-07-2016 08:49:24","0 days, 6 hours and 35 minutes.","acaovilla","nuovo","15-07-2016 08:49:24","15-07-2016 08:51:19","10 minutes.","acaovilla","chiuso","15-07-2016 08:51:19","15-07-2016 08:57:44","10 minutes.","acaovilla","nuovo","15-07-2016 08:57:44","15-07-2016 09:04:51","10 minutes.","acaovilla","nuovo","15-07-2016 09:04:51","22-07-2016 11:58:02","2 days, 10 hours and 113 minutes.","mpuorro","nuovo","22-07-2016 11:58:02","22-07-2016 12:12:04","14 minutes.","mpuorro","nuovo","22-07-2016 12:12:04","22-07-2016 12:22:15","10 minutes.","mpuorro","nuovo","22-07-2016 12:22:15","22-07-2016 13:03:52","41 minutes.","mpuorro","nuovo","22-07-2016 13:03:52","22-07-2016 14:21:01","21 minutes.","mpuorro","nuovo","22-07-2016 14:21:01","22-07-2016 14:46:25","25 minutes.","fminniti","nuovo","22-07-2016 14:46:25","22-07-2016 14:49:56","10 minutes.","fminniti","nuovo","22-07-2016 14:49:56","22-07-2016 14:54:51","10 minutes.","vsalvatore","nuovo","22-07-2016 14:54:51","22-07-2016 15:57:33","0 days, 1 hours and 2 minutes.","vsalvatore","nuovo","22-07-2016 15:57:33","22-07-2016 15:57:41","10 minutes.","smascaretti","nuovo","22-07-2016 15:57:41","22-07-2016 16:00:54","10 minutes.","apennisi","nuovo","22-07-2016 16:00:54","22-07-2016 16:05:02","10 minutes.","apennisi","nuovo","22-07-2016 16:05:02","22-07-2016 16:15:18","10 minutes.","acaovilla","nuovo","22-07-2016 16:15:18","22-07-2016 16:44:24","29 minutes.","omarcacci","nuovo","22-07-2016 16:44:24","22-07-2016 16:53:00","10 minutes.","fminniti","nuovo","22-07-2016 16:53:00","22-07-2016 17:56:41","0 days, 1 hours and 3 minutes.","vsalvatore","nuovo","22-07-2016 17:56:41","25-07-2016 09:49:04","0 days, 16 hours and 52 minutes.","fminniti","nuovo","25-07-2016 09:49:04","25-07-2016 10:03:01","13 minutes.","smascaretti","nuovo","25-07-2016 10:03:01","25-07-2016 14:05:23","0 days, 3 hours and 2 minutes.","apennisi","nuovo","25-07-2016 14:05:23","25-07-2016 14:06:33","10 minutes.","acaovilla","nuovo","25-07-2016 14:06:33","25-07-2016 14:06:50","10 minutes.","apennisi","nuovo","25-07-2016 14:06:50","25-07-2016 14:07:10","10 minutes.","acaovilla","nuovo","25-07-2016 14:07:10","25-07-2016 14:07:52","10 minutes.","fminniti","nuovo","25-07-2016 14:07:52","25-07-2016 14:11:39","10 minutes.","acaovilla","nuovo","25-07-2016 14:11:39","25-07-2016 14:13:01","10 minutes.","apennisi","nuovo","25-07-2016 14:13:01","25-07-2016 14:17:12","10 minutes.","acaovilla","nuovo","25-07-2016 14:17:12","25-07-2016 14:18:46","10 minutes.","acaovilla","nuovo","25-07-2016 14:18:46","25-07-2016 14:18:57","10 minutes.","fminniti","nuovo","25-07-2016 14:18:57","25-07-2016 14:22:18","10 minutes.","vsalvatore","nuovo","25-07-2016 14:22:18","25-07-2016 14:22:50","10 minutes.","vsalvatore","nuovo","25-07-2016 14:22:50","25-07-2016 14:23:05","10 minutes.","apennisi","nuovo","25-07-2016 14:23:05","25-07-2016 14:23:50","10 minutes.","apennisi","nuovo","25-07-2016 14:23:50","25-07-2016 14:29:52","10 minutes.","vsalvatore","nuovo","25-07-2016 14:29:52","25-07-2016 14:30:14","10 minutes.","vsalvatore","nuovo","25-07-2016 14:30:14","25-07-2016 14:35:30","10 minutes.","acaovilla","nuovo","25-07-2016 14:35:30","25-07-2016 14:38:44","10 minutes.","vsalvatore","nuovo","25-07-2016 14:38:44","25-07-2016 14:46:43","10 minutes.","fminniti","nuovo","25-07-2016 14:46:43","25-07-2016 14:48:58","10 minutes.","acaovilla","nuovo","25-07-2016 14:48:58","25-07-2016 14:54:15","10 minutes.","acaovilla","nuovo","25-07-2016 14:54:15","25-07-2016 14:55:12","10 minutes.","fminniti","nuovo","25-07-2016 14:55:12","25-07-2016 14:57:27","10 minutes.","acaovilla","nuovo","25-07-2016 14:57:27","25-07-2016 15:09:35","12 minutes.","vsalvatore","nuovo","25-07-2016 15:09:35","25-07-2016 15:10:27","10 minutes.","vsalvatore","nuovo","25-07-2016 15:10:27","25-07-2016 15:11:04","10 minutes.","fminniti","nuovo","25-07-2016 15:11:04","25-07-2016 15:15:15","10 minutes.","vsalvatore","nuovo","25-07-2016 15:15:15","25-07-2016 15:16:50","10 minutes.","apennisi","nuovo","25-07-2016 15:16:50","25-07-2016 15:18:16","10 minutes.","fminniti","nuovo","25-07-2016 15:18:16","25-07-2016 15:19:17","10 minutes.","apennisi","nuovo","25-07-2016 15:19:17","25-07-2016 15:34:20","15 minutes.","fminniti","nuovo","25-07-2016 15:34:20","25-07-2016 15:47:13","12 minutes.","fminniti","nuovo","25-07-2016 15:47:13","25-07-2016 15:52:45","10 minutes.","fminniti","nuovo","25-07-2016 15:52:45","25-07-2016 15:53:33","10 minutes.","fminniti","nuovo","25-07-2016 15:53:33","25-07-2016 15:56:33","10 minutes.","fminniti","nuovo","25-07-2016 15:56:33","27-07-2016 11:27:34","0 days, 12 hours and 30 minutes.","apennisi","chiuso","27-07-2016 11:27:34","29-07-2016 11:36:24","0 days, 16 hours and 68 minutes.","acaovilla"]},"numRows":1,"timing":{"releaseit":["14-07-2016 00:00:00","25-07-2016 00:00:00","264","98"],"deploydba_qf_test":["317","108","0","0","360","120"]},"cl":{"cl_tc":["CLIT1468566000998",8,7,7,0,0,0,1,"CL1469181039168",9,9,7,2,0,0,0,"CL1469182018716",8,8,8,0,0,0,0,"CL1469184880951",8,8,8,0,0,0,0,"CL1469191948818",14,14,14,0,0,0,0,"CL1468919016947",14,14,14,0,0,0,0,"CL1469195757815",16,16,16,0,0,0,0,"CL1469196001612",9,9,4,5,0,0,0,"CL1469195651750",9,9,4,5,0,0,0,"CL1469189605306",17,17,15,2,0,0,0,"CL1469198314619",14,14,14,0,0,0,0,"CL1468919551801",9,9,7,2,0,0,0,"CL1469433602377",5,5,1,4,0,0,0,"CL1469448130455",16,16,12,4,0,0,0,"CL1469448618162",16,16,12,4,0,0,0,"CL1469449097060",14,14,13,1,0,0,0,"CL1469448293681",16,16,13,3,0,0,0,"CL1469449194669",14,14,14,0,0,0,0,"CL1469448110889",14,14,14,0,0,0,0,"CL1469449686821",0,0,0,0,0,0,0,"CL1469450043541",0,0,0,0,0,0,0,"CL1469450616260",14,14,14,0,0,0,0,"CL1469450827208",16,16,12,4,0,0,0,"CL1469451089897",16,16,11,5,0,0,0,"CL1469452396052",10,10,6,4,0,0,0,"CL1469452473234",10,10,6,4,0,0,0,"CL1469453492168",0,0,0,0,0,0,0,"CL1469448927796",14,14,14,0,0,0,0,"CL1469538545856",12,12,8,4,0,0,0],"cl_size":[29],"cl_users":["fminniti","acaovilla","apennisi","omarcacci","vsalvatore","smascaretti","mpuorro","cmautone","vferrara"]},"testcase":{"testcase":[2,2,2,0,0,4]},"status":{"rifiutati":[0],"stati":["nuovo","14-07-2016 11:17:14","14-07-2016 11:17:14","0 minutes.","10 minutes.","nuovo","14-07-2016 11:17:14","14-07-2016 11:17:29","0 minutes.","10 minutes.","pianificato","14-07-2016 11:17:29","14-07-2016 11:40:15","22 minutes.","22 minutes.","in_integrazione","14-07-2016 11:40:15","14-07-2016 11:43:31","3 minutes.","10 minutes.","in_integrazione","14-07-2016 11:43:31","14-07-2016 11:44:13","0 minutes.","10 minutes.","in_integrazione","14-07-2016 11:44:13","14-07-2016 17:18:37","0 days, 5 hours and 34 minutes.","0 days, 4 hours and 34 minutes.","in_integrazione","14-07-2016 17:18:37","14-07-2016 17:35:28","16 minutes.","16 minutes.","in_integrazione","14-07-2016 17:35:28","15-07-2016 09:05:37","0 days, 15 hours and 30 minutes.","29 minutes.","in_integrazione","15-07-2016 09:05:37","15-07-2016 12:21:08","0 days, 3 hours and 15 minutes.","0 days, 3 hours and 15 minutes.","in_integrazione","15-07-2016 12:21:08","20-07-2016 12:18:58","4 days, 23 hours and 57 minutes.","1 days, 16 hours and 56 minutes.","in_integrazione","20-07-2016 12:18:58","22-07-2016 12:01:38","1 days, 23 hours and 42 minutes.","0 days, 16 hours and 42 minutes.","in_integrazione","22-07-2016 12:01:38","22-07-2016 12:23:27","21 minutes.","21 minutes.","in_integrazione","22-07-2016 12:23:27","22-07-2016 13:05:20","41 minutes.","41 minutes.","in_integrazione","22-07-2016 13:05:20","22-07-2016 14:23:24","0 days, 1 hours and 18 minutes.","23 minutes.","in_integrazione","22-07-2016 14:23:24","22-07-2016 14:48:18","24 minutes.","24 minutes.","in_integrazione","22-07-2016 14:48:18","22-07-2016 14:57:21","9 minutes.","10 minutes.","in_integrazione","22-07-2016 14:57:21","22-07-2016 15:02:24","5 minutes.","10 minutes.","in_integrazione","22-07-2016 15:02:24","22-07-2016 15:58:24","56 minutes.","56 minutes.","in_integrazione","22-07-2016 15:58:24","22-07-2016 15:58:36","0 minutes.","10 minutes.","in_integrazione","22-07-2016 15:58:36","22-07-2016 16:02:14","3 minutes.","10 minutes.","in_integrazione","22-07-2016 16:02:14","22-07-2016 16:07:52","5 minutes.","10 minutes.","in_integrazione","22-07-2016 16:07:52","22-07-2016 16:08:35","0 minutes.","10 minutes.","in_integrazione","22-07-2016 16:08:35","22-07-2016 16:45:37","37 minutes.","37 minutes.","in_integrazione","22-07-2016 16:45:37","22-07-2016 16:54:14","8 minutes.","10 minutes.","in_integrazione","22-07-2016 16:54:14","22-07-2016 17:19:09","24 minutes.","24 minutes.","in_integrazione","22-07-2016 17:19:09","25-07-2016 09:50:07","2 days, 16 hours and 30 minutes.","0 days, 16 hours and 90 minutes.","in_integrazione","25-07-2016 09:50:07","25-07-2016 10:04:51","14 minutes.","14 minutes.","in_integrazione","25-07-2016 10:04:51","25-07-2016 14:08:05","0 days, 4 hours and 3 minutes.","0 days, 3 hours and 3 minutes.","in_integrazione","25-07-2016 14:08:05","25-07-2016 14:16:43","8 minutes.","10 minutes.","in_integrazione","25-07-2016 14:16:43","25-07-2016 14:17:18","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:17:18","25-07-2016 14:20:31","3 minutes.","10 minutes.","in_integrazione","25-07-2016 14:20:31","25-07-2016 14:20:42","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:20:42","25-07-2016 14:21:10","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:21:10","25-07-2016 14:21:41","0 minutes.","10 minutes.","in_integrazione","25-07-2016 14:21:41","25-07-2016 14:25:30","3 minutes.","10 minutes.","in_integrazione","25-07-2016 14:25:30","25-07-2016 14:27:43","2 minutes.","10 minutes.","in_integrazione","25-07-2016 14:27:43","25-07-2016 14:28:57","1 minutes.","10 minutes.","in_integrazione","25-07-2016 14:28:57","25-07-2016 14:37:36","8 minutes.","10 minutes.","in_integrazione","25-07-2016 14:37:36","25-07-2016 14:48:05","10 minutes.","10 minutes.","in_integrazione","25-07-2016 14:48:05","25-07-2016 14:49:59","1 minutes.","10 minutes.","in_integrazione","25-07-2016 14:49:59","25-07-2016 14:53:19","3 minutes.","10 minutes.","in_integrazione","25-07-2016 14:53:19","25-07-2016 15:04:00","10 minutes.","10 minutes.","in_integrazione","25-07-2016 15:04:00","25-07-2016 15:14:01","10 minutes.","10 minutes.","in_integrazione","25-07-2016 15:14:01","25-07-2016 15:17:37","3 minutes.","10 minutes.","in_integrazione","25-07-2016 15:17:37","25-07-2016 15:38:10","20 minutes.","20 minutes.","in_integrazione","25-07-2016 15:38:10","25-07-2016 15:38:40","0 minutes.","10 minutes.","in_integrazione","25-07-2016 15:38:40","25-07-2016 16:03:54","25 minutes.","25 minutes.","in_integrazione","25-07-2016 16:03:54","27-07-2016 11:28:58","1 days, 19 hours and 25 minutes.","0 days, 11 hours and 84 minutes.","integrazione_ok","27-07-2016 11:28:58","27-07-2016 16:59:09","0 days, 5 hours and 30 minutes.","0 days, 4 hours and 30 minutes."]},"authors":{"author_size":[0],"author":[]}};

	$scope.submitReleaseArea = function(codiceArea) {

		var responseFinal;

		$("#overlay2").show();
		$("#overlayback2").show();
		$('html, body').animate({scrollTop: '0px'}, 0);

		$http.get('http://localhost:8080/SchedaRilasci/getArea?codiceArea='+codiceArea).
		then(function(response) {
			responseFinal = response.data;

			$scope.aree=responseFinal["aree"];
			console.log("Aree: "+$scope.aree);

			$scope.sizeAree=$scope.aree.length;
			console.log("SizeAree2: "+$scope.sizeAree);

			$("#overlay2").hide("fast");
			$("#overlayback2").hide("fast");
		});
	}

	$scope.submitRelease = function(applicativo) {

		console.log("Applicativo: "+applicativo);

		var responseFinal;

		$scope.IsVisible = false;

		$scope.rilasciApplicativolength = 0;

		$("#overlay2").show();
		$("#overlayback2").show();
		$('html, body').animate({scrollTop: '0px'}, 0);

//		$http.get('http://localhost:8080/SchedaRilasci/getRilasciApplicativo?applicativo='+applicativo).
//		then(function(response) {
//		responseFinal = response.data;

//		$scope.IsVisible = $scope.IsVisible ? false : true;

//		console.log("Applicativo: "+applicativo);
//		$scope.rilasciApplicativo=responseFinal["rilasciApplicativo"];
//		$scope.rilasciApplicativolength = $scope.rilasciApplicativo.length;
//		console.log("Size:"+$scope.rilasciApplicativolength);

//		$("#overlay2").hide("fast");
//		$("#overlayback2").hide("fast");

//		});

		$scope.IsVisible = $scope.IsVisible ? false : true;

		$(document).ready(function() {

			var value = $.get( "http://localhost:8080/SchedaRilasci/getRilasciApplicativo?applicativo="+applicativo, function( response ) {

				console.log(response);
				console.log("Visibility: "+$scope.IsVisible);

				$('#tableApplicativo').DataTable({
					"bProcessing": true,
					"bLengthChange": false,
					"data": response, // <-- your array of objects
					"columns": 
						[
						 {"data": "ID Polarion"}, // <-- which values to use inside object
						 {"data": "Titolo"},
						 {"data": "Data Creazione"},
						 {"data": "Data Aggiornamento"}
						 ],
						 "paging":   true,
						 "ordering": false,
						 "pageLength": 10,

				});

				$("#overlay2").hide("fast");
				$("#overlayback2").hide("fast");

			});
		});


	}

	$scope.submitReleaseCtx = function(contesto) {

		console.log("Ctx: "+contesto);

		var responseFinal;

		$scope.IsVisible2 = false;

		$("#overlay2").show();
		$("#overlayback2").show();
		$('html, body').animate({scrollTop: '0px'}, 0);

//		$http.get('http://localhost:8080/SchedaRilasci/getRilasciContesto?contesto='+contesto).
//		then(function(response) {
//		responseFinal = response.data;

//		$scope.IsVisible2 = $scope.IsVisible2 ? false : true;

//		console.log("contesto: "+contesto);
//		$scope.rilasciContesto=responseFinal["rilasciContesto"];

//		$("#overlay2").hide("fast");
//		$("#overlayback2").hide("fast");
//		});

		$scope.IsVisible2 = $scope.IsVisible2 ? false : true;

		$(document).ready(function() {

			var value = $.get( "http://localhost:8080/SchedaRilasci/getRilasciContesto?contesto="+contesto, function( response ) {

				console.log(response);
				console.log("Visibility: "+$scope.IsVisible2);

				$('#tableContesto').DataTable({
					"bProcessing": true,
					"bLengthChange": false,
					"data": response, // <-- your array of objects
					"columns": 
						[
						 {"data": "ID Polarion"}, // <-- which values to use inside object
						 {"data": "Titolo"},
						 {"data": "Data Creazione"},
						 {"data": "Data Aggiornamento"}
						 ],
						 "paging":   true,
						 "ordering": false,
						 "pageLength": 10,

				});

				$("#overlay2").hide("fast");
				$("#overlayback2").hide("fast");

			});
		});

	}

	$scope.submitReleaseSoloArea = function(codiceArea) {

		var responseFinal;

		$scope.IsVisible3 = false;

		console.log("IsVisbile before: "+$scope.IsVisible3);

		$("#overlay2").show();
		$("#overlayback2").show();
		$('html, body').animate({scrollTop: '0px'}, 0);

//		$http.get('http://localhost:8080/SchedaRilasci/getRilasciFromArea?codiceArea='+codiceArea).
//		then(function(response) {
//		responseFinal = response.data;

//		$scope.IsVisible3 = $scope.IsVisible3 ? false : true;

//		console.log("IsVisbile after: "+$scope.IsVisible3);

//		$scope.rilasciPerAree=responseFinal["rilasciAree"];

//		$("#overlay2").hide("fast");
//		$("#overlayback2").hide("fast");
//		});

		$scope.IsVisible3 = $scope.IsVisible3 ? false : true;

		$(document).ready(function() {

			var value = $.get( "http://localhost:8080/SchedaRilasci/getRilasciFromArea?codiceArea="+codiceArea, function( response ) {

				console.log(response);
				console.log("Visibility: "+$scope.IsVisible3);

				$('#tableArea').DataTable({
					"bProcessing": true,
					"bLengthChange": false,
					"data": response, // <-- your array of objects
					"columns": 
						[
						 {"data": "ID Polarion"}, // <-- which values to use inside object
						 {"data": "Titolo"},
						 {"data": "Data Creazione"},
						 {"data": "Data Aggiornamento"}
						 ],
						 "paging":   true,
						 "ordering": false,
						 "pageLength": 10,

				});

				$("#overlay2").hide("fast");
				$("#overlayback2").hide("fast");

			});
		});

	}

	$scope.range = function(max, step) {
		step = step || 1;
		var input = [];
		for (var i = 0; i <= max; i += step) {
			input.push(i);
		}
		return input;
	};

	$scope.refresh = function runPublicationBatch(){
		$window.location.reload();
		var invoice = new Array();
		if (vm.validInvoiceList) {
			vm.validInvoiceList.forEach(function(inv) {
				if (inv.selected) {
					invoice.push(inv);
				}
			});
		}
		ManualBatch.runPublicationBatch(invoice);       
	}

});


$(document).ready(function(){
	console.log("1");
	$("#search-area").keyup(function(){
		console.log("2");
		_this = this;
		$.each($("#table_area.areaId").find("tr.dati"), function() {
			console.log("3");
			if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) == -1)
				$(this).hide();
			else
				$(this).show();                
		});
	});
});
