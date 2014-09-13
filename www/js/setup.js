//alert("setup.js Loaded");

window.onload= function () {


$("#initial_setup").click(function() {
  //alert("Handler for .click() called.");
  

	
	
   initial_setup_new();
});


}
  


		
		function initial_setup_new()
		{


  
			//	 $('body').append("<div id='progress'> <img align='middle' src='img/downloading.gif'>&nbsp;&nbsp;&nbsp;&nbsp;Authenticating</div>");
					
//				setTimeout(a,1500);

		
	//2/1/12 Commented out Authenticating
	
	//alert('Athenticating ...'); 
		 $('body').append('<div id="progress"><img align="middle" src="img/downloading.gif">&nbsp;&nbsp;Authenticating</div>');

		
	
		//alert(document.getElementById('Username').value);
		 //alert(document.getElementById('Password').value);
		
			name = document.getElementById('Username').value;
			//alert("name:" + name);
			pw = document.getElementById('Password').value;
			//alert("pw: " + pw);
		
		
		if (name!=null && name!="" && pw!="")
		  {
						
			daLogin = doDominoLogin(name, pw); // ajaxLogin.js
			
			if (daLogin){
			
			roles = localStorage.getItem("Roles");
			//$("#progress").remove();
			//alert("Login succeeded: " + roles);
			 $('body').append('<div id="progress"><img align="middle" src="img/downloading.gif">&nbsp;&nbsp;Authenticating</div>');

			 setTimeout("$('#progress').remove()",500);
			
        //localStorage.setItem("Tech", username);			
		tech = localStorage.getItem("Tech");
		
		document.getElementById('TechNameOptions').innerHTML = tech;
		
		localStorage.setItem("tech", tech);
		//Set as current logged in user	
			
		lastposition = roles.indexOf("[DroidAdmin]");
		
		//alert(lastposition);
		if (lastposition > -1){
			//alert("Your Admin");
			
			//alert(lastposition);
		
		//	if (lastposition <> -1){
			//alert("Your Admin");
			
			document.getElementById('userSetup').style.display = "none";
		}
			document.getElementById('actAs').style.display = "";
			getTechnicianTemplates(); //fill the list of Techs added 7-29-11
		}
			
		
		
			
			
			
			//Set the tech name based on who is logged in
			localStorage.setItem("username", name);
			localStorage.setItem("password", pw);
			
			
			
	

			}
			
			$("#progress").remove();

		  }	
		
			
			<!-- End Initial Setup Function -->	
		
	
  