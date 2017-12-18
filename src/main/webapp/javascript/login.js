$(function(){
	$( "#accedi" ).click(function() {
		var xml;

		var user= document.getElementById("username").value;
		var psw= document.getElementById("password").value;
		console.log(user);
		console.log(psw);

		var find=0;
		$.get('users.xml', function (data) {
			$(data).find('details').each(function(){
				var item = $(this);
				if(item.find('username').text()==user && item.find('password').text()==psw)
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
	});
});

