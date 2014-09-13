function syncRestored(unid){
			//alert(unid);
	alert("Contacting Server ...");
	  $('body').append('<div id="progress"><img align="middle" src="img/downloading.gif">&nbsp;&nbsp;&nbsp;&nbsp;Synching with Server</div>');
	

	  
	  
	  //Login after showing busy 
	  login();
	  
	
	reportDB.transaction(
	    function (transaction) {
	        transaction.executeSql('SELECT * from Reports where timestamp = "'+unid+'" ', [], dataHandlerServer, errorHandler);
	    }
	    
	);
} //end SyncData


//Called from the Sych button on the home page
function syncData2(){
            
    //alert("Contacting Server ...");
      $('body').append('<div id="progress"><img align="middle" src="img/downloading.gif">&nbsp;&nbsp;&nbsp;&nbsp;Synching with Server</div>');
    
      //Hide the Save Send Button
      //hide("SaveSendID");
      
      
      //Login after showing busy 
       //6-7-12 Login as eReport 
	  loginReport();
      
    	//alert(reportDB);
		
    reportDB.transaction(
        function (transaction) {
            transaction.executeSql('SELECT * from Reports where Status = "Completed" ', [], dataHandlerServer, errorHandler);
        }
        
    );
} //end SyncData2

function syncData(){
			
	
	  $('body').append('<div id="progress"><img align="middle" src="img/downloading.gif">&nbsp;&nbsp;&nbsp;&nbsp;Synching with Server</div>');
	
	  //Hide the Save Send Button
	  hide("SaveSendID");
	  
	  
	  //Login after showing busy 
	  //login();
	  
	  //6-7-12 Login as eReport 
	  loginReport();
	  
	//alert(reportDB);
	//alert("pre Send");
	reportDB.transaction(
	    function (transaction) {
	        transaction.executeSql('SELECT * from Reports where Status = "Completed" ', [], dataHandlerServer, errorHandler);
	    }
	    
	);
} //end SyncData


function errorHandler(transaction, error)
{
    // error.message is a human-readable string.
    // error.code is a numeric error code
    alert(' Error was '+error.message+' (Code '+error.code+')');
 
    // Handle errors here
    var we_think_this_error_is_fatal = true;
    if (we_think_this_error_is_fatal) return true;
    return false;
}



function dataHandlerServer(transaction, results)
	{


	//alert("Found Saved on device: "+ results.rows.length);
	if (results.rows.length==0)
	
	 {
			$('#progress').remove();
			alert("No Reports to Sync");
			show("SaveSendID");
		return;
	 }
	    for (var i=0; i<results.rows.length; i++) {     
	
	
	//regular expression to convert returns to ~ 
		 var regex = new RegExp("\n", "g");
		
		 var row = results.rows.item(i);
	      var CustID = row['custid'];
		 
	  //    alert("CustID: " + CustID);
		   var custid = row['custid'];
		//     alert("custid: " + custid);
			 
	  	 var name  = escape(row['name']);
	//	 alert("Name: " +name);
		 var timestamp = row['timestamp'];
		//  alert("timestamp: " + timestamp);
			var tech = unescape(row['tech']);
		 //alert("tech: " + tech);
			var ReportDate = escape(row['ReportDate']);
		//	 alert("ReportDate: " + ReportDate);
			 
			var Contact = escape(row['Contact']);
			//alert("Contact " + Contact );
			
			
			 var regex3 = new RegExp(" ", "g");
			//try replace the spaces with the semicolon
			var notify = escape(row['notify'].replace(regex3, "; ")); 
    
			var BillAddr2 = escape(row['BillAddr2']);
			var BillCity = escape(row['BillCity']);
			var BILLState = escape(row['BILLState']);
			var BillZip = escape(row['BillZip']);
			//
	
	var Conductivity = escape(row['Conductivity']);
			//alert("WebSQL: " + Conductivity);
			
			
			
			
			//var Conductivity = localStorage.getItem(custid+'Conductivity');
		//alert("Conductivity local Storage:"+Conductivity);
			
			
			var calciumHardness = escape(row['calciumHardness']);
			//var calciumHardness = localStorage.getItem(custid+'calciumHardness');
			//alert("Calcium " + calciumHardness );
			
			
			
			var alkalinity = escape(row['alkalinity']);
			//var alkalinity = localStorage.getItem(custid+'alkalinity');
			var chlorides = escape(row['chlorides']);
			//var chlorides = localStorage.getItem(custid+'chlorides');
			//var mileage = localStorage.getItem(custid+'mileage');
			var mileage = escape(row['mileage']);
		//	alert("mileage " + mileage);
			
		

			
			
			var EquipType = escape(row['EquipType']);
			var EquipType= escape(row['EquipType'].replace(regex, ";")); 
	//alert("EquipType "+ EquipType);
			var EquipName = escape(row['EquipName'].replace(regex, ";")); 
	//alert("Equipname "+ EquipName);
			var EquipTest = escape(row['EquipTest'].replace(regex, ";")); 
	//alert("EquipTest  "+ EquipTest);
			var EquipRange = escape(row['EquipRange'].replace(regex, ";")); 
	//alert("EquipRange  "+ EquipRange);
			
			
			var EquipDataCollection =  escape(row['EquipDataCollection'].replace(regex, ";")); 
			
			
		//	alert(EquipDataCollection);
			
			//EDC = localStorage.getItem(custid+'EquipDataCollection');
			
		
			var Actions = escape(row['ActionsList']);
	//alert("Actions  "+ Actions);
			
		
			//try to get rid of linebreaks
			// var regex2 = new RegExp("\n", "+");
	//use escape to normalize
			 var container = escape(row['container']);
		
			 
		//	alert("Sig data" + container);
			 
			 
			 
			var Status = row['Status'];
			//alert("Status "+ Status);
			
			if (Status ='Archived') {
			//alert('in if');
			var Status="Completed"
			}
			//alert("Status "+ Status);
			
			var AccessGivenTo = escape(row['AccessGivenTo'].replace(regex, ";"));
			//alert("AccessGivenTo "+ AccessGivenTo);
			
			 var regex4 = new RegExp("'", "g");
			
			
			var Comments = row['Comments']; // encode comments so they transfer via ajax ok
				//alert(Comments);
				
			Comments = escape(Comments);
			
			//alert("Value: " + Comments);
			var mileage = escape(row['mileage']);
		//	alert("mileage " + mileage);
			
		3-27-12
		//Photos - Limited to 6 per eReport	- This breaks when many photos on many Drafts on Phone Out of Memory
		/*
			var pic1 = escape(localStorage.getItem(custid+'Photo1'));  //encode photo 
			var pic2 = escape(localStorage.getItem(custid+'Photo2'));  //encode photo 
			var pic3 = escape(localStorage.getItem(custid+'Photo3'));  //encode photo 
			var pic4 = escape(localStorage.getItem(custid+'Photo4'));  //encode photo 
			var pic5 = escape(localStorage.getItem(custid+'Photo5'));  //encode photo 
			var pic6 = escape(localStorage.getItem(custid+'Photo6'));  //encode photo 
		*/	
			

			//Read Photos From WebSQL Database
			
			var pic1 = escape(row['Photo1']); 
			//alert("pic1 from SQL table " + pic1);
			var pic2 = escape(row['Photo2']); 
			
			var pic3 = escape( row['Photo3']); 
			var pic4 = escape( row['Photo4']); 
			var pic5 = escape( row['Photo5']); 
			var pic6 = escape( row['Photo6']); 
	
		
	
	
	//		var latitude = row['Latitude'];
		//	var longitude = row['Longitude'];

//   Set The Time Values
			var StartTime = row['StartTime'];
		//	alert("StartTime " + StartTime);
			
			var EndTime = row['EndTime'];
		//	alert("EndTime " + EndTime);
			// Determine the timestamp or elapsed time
			
		

			var stime = StartTime;
			var etime = EndTime;
			
			var startDate = new Date (stime); //create Date object for Start Time
			var endDate = new Date (etime); //create Date object for end Time

			var minutes = endDate.getMinutes() - startDate.getMinutes();
			//alert("minutes: " +minutes);

			if (minutes < 10){
			minutes = '0' + minutes;
			};

var timestamp = endDate.getHours() - startDate.getHours() +":" + minutes;



			//alert("timestamp: " + timestamp);

		
			
			var ListType = escape(row['ListType']);
			//alert("ListType from Report Table: "+ ListType);
		
			var exception = escape(row['exception']);
			//alert("exception = " + exception);
			
	//Call the Send Reports
			
			//alert("before createDoc");
 createDoc (CustID, name, timestamp, tech, ReportDate, Contact, notify, BillAddr2, BillCity, BILLState, BillZip, Conductivity, calciumHardness, alkalinity, chlorides, EquipType, EquipName, EquipTest,  EquipRange, EquipDataCollection,  Actions, container, Status, AccessGivenTo, Comments, mileage, pic1, pic2, pic3, pic4, pic5, pic6, StartTime, EndTime, ListType, exception);
			// createDoc (CustID, name, timestamp, tech, ReportDate, Contact, notify, BillAddr2, BillCity, BILLState, BillZip, Conductivity, calciumHardness, alkalinity, chlorides, EquipType, EquipName, EquipTest,  EquipRange, EquipDataCollection,  Actions, container, Status, AccessGivenTo, Comments, mileage, pic1, latitude, longitude);
						
	}






function createDoc (CustID, name, timestamp, tech, ReportDate, Contact, notify, BillAddr2, BillCity, BILLState, BillZip, Conductivity, calciumHardness, alkalinity, chlorides, EquipType, EquipName, EquipTest,  EquipRange, EquipDataCollection,  Actions, container, Status, AccessGivenTo, Comments, mileage, pic1, pic2, pic3, pic4, pic5, pic6, StartTime, EndTime, ListType, exception)
	//function createDoc (CustID, name, timestamp, tech, ReportDate, Contact, notify, BillAddr2, BillCity, BILLState, BillZip, Conductivity, calciumHardness, alkalinity, chlorides, EquipType, EquipName, EquipTest,  EquipRange, EquipDataCollection,  Actions, container, Status, AccessGivenTo, Comments, mileage, pic1, latitude, longitude)
	
	{
	//	alert("in CreateDoc");
	//alert("Pic1:  "+pic1);
	
	
	
	 /////////////////////////////////////////////////
	 //Added Version  Number
	 //////////////////////////////////////////////////////////
		   var Version = localStorage.getItem('Version');
		   //alert(Version);
		   
		
		//alert("Creating & Sending Doc "+ name); 
	var httpBU = createXMLHttpRequest();
	//alert("httpBU created");
	//var http = createXMLHttpRequest();


	function createXMLHttpRequest() {
	  try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
	  try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
	  try { return new XMLHttpRequest(); } catch(e) {}
	  alert("XMLHttpRequest not supported");
	  return null;
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Change when production

	
	
	//var backupURL = "http://www.chardonlabs.com/R2D2.nsf/prereport?createdocument";
	//var backupURL = "http://www.chardonlabs.com/eReportv4.nsf/iPhone?createdocument";
    

	// 9-5-12  - Moved to index.html  now stored in a local storage variable 
	var backupURL = localStorage.getItem('backupURL')
	//alert(backupURL);
	console.log('URL ' + backupURL);
	
//	http.open("post", URL, true);
	httpBU.open("post", backupURL, true);
	
	//4-27-12
	//Added Exception sent to the Key Field on R2D2
	//exceptionvalue = localStorage.getItem(CustID+'exception');
	exceptionvalue = exception; //Fixed for Sending from Archived Reports
	
	//alert(exceptionvalue);
	//   params = "ServicesPerformed="+Comments+"&Key="+exceptionvalue+"&photo1="+pic1+"&photo2="+pic2+"&photo3="+pic3+"&photo4="+pic4+"&photo5="+pic5+"&photo6="+pic6+"&custid="+CustID+"&billname="+name+"&ts="+timestamp + "&tech="+tech +"&ReportDate=" + ReportDate+"&BILLADDR1="+Contact+"&notify="+notify +"&BILLADDR2="+BillAddr2 +"&BillCity="+BillCity+"&BILLSTATE="+ BILLState+"&BillZip="+BillZip + "&Conductivity="+Conductivity + "&calciumHardness="+calciumHardness+"&alkalinity=" + alkalinity + "&chlorides="+ chlorides +"&parseEquipType=" + EquipType + "&parseEquipName="+ EquipName+ "&parseEquipTestNames="+ EquipTest+"&parseRange="+EquipRange +"&equipDataCollection="+ EquipDataCollection +"&actionslist="+ Actions + "&Storage=" +container+"&status="+Status+"&mileage="+mileage+"&StartTime="+StartTime+"&EndTime="+EndTime+"&Version="+Version+"&accessGivenTo=" + AccessGivenTo;
	//11-13-12 added list type
	//   params = "ServicesPerformed="+Comments+"&Key="+exceptionvalue+"&photo1="+pic1+"&photo2="+pic2+"&photo3="+pic3+"&photo4="+pic4+"&photo5="+pic5+"&photo6="+pic6+"&custid="+CustID+"&billname="+name+"&ts="+timestamp + "&tech="+tech +"&ReportDate=" + ReportDate+"&BILLADDR1="+Contact+"&notify="+notify +"&BILLADDR2="+BillAddr2 +"&BillCity="+BillCity+"&BILLSTATE="+ BILLState+"&BillZip="+BillZip + "&Conductivity="+Conductivity + "&calciumHardness="+calciumHardness+"&alkalinity=" + alkalinity + "&chlorides="+ chlorides +"&parseEquipType=" + EquipType + "&parseEquipName="+ EquipName+ "&parseEquipTestNames="+ EquipTest+"&parseRange="+EquipRange +"&equipDataCollection="+ EquipDataCollection +"&actionslist="+ Actions + "&Storage=" +container+"&status="+Status+"&mileage="+mileage+"&StartTime="+StartTime+"&EndTime="+EndTime+"&Version="+Version+"&accessGivenTo=" + AccessGivenTo+"&ListType="+ListType;
	// 10-13-13 added Signature Rotation Flag
	params = "RotateSig=No&ServicesPerformed="+Comments+"&Key="+exceptionvalue+"&photo1="+pic1+"&photo2="+pic2+"&photo3="+pic3+"&photo4="+pic4+"&photo5="+pic5+"&photo6="+pic6+"&custid="+CustID+"&billname="+name+"&ts="+timestamp + "&tech="+tech +"&ReportDate=" + ReportDate+"&BILLADDR1="+Contact+"&notify="+notify +"&BILLADDR2="+BillAddr2 +"&BillCity="+BillCity+"&BILLSTATE="+ BILLState+"&BillZip="+BillZip + "&Conductivity="+Conductivity + "&calciumHardness="+calciumHardness+"&alkalinity=" + alkalinity + "&chlorides="+ chlorides +"&parseEquipType=" + EquipType + "&parseEquipName="+ EquipName+ "&parseEquipTestNames="+ EquipTest+"&parseRange="+EquipRange +"&equipDataCollection="+ EquipDataCollection +"&actionslist="+ Actions + "&Storage=" +container+"&status="+Status+"&mileage="+mileage+"&StartTime="+StartTime+"&EndTime="+EndTime+"&Version="+Version+"&accessGivenTo=" + AccessGivenTo+"&ListType="+ListType;
	
	httpBU.send(params);
	


	httpBU.onreadystatechange =   function()
	    { 
		if(httpBU.readyState  == 2)
        {
		//		$('body').append('<div id="progress"><img align="middle" src="img/downloading.gif">&nbsp;&nbsp;&nbsp;&nbsp;Data Sent</div>');
        
        }
		
		if(httpBU.readyState  == 3)
        {
			//	$('body').append('<div id="progress"><img align="middle" src="img/downloading.gif">&nbsp;&nbsp;&nbsp;&nbsp;Data Received - OK</div>');
				$('#progress').remove();
        }
		
	         if(httpBU.readyState  == 4)
	         {
	              if(httpBU.status  == 200) {
	         //   	  $('body').append('<div id="progress"><img align="middle" src="img/downloading.gif">&nbsp;&nbsp;&nbsp;&nbsp;eReport Successfully Sent</div>');

	              alert("eReport Successfully sent to Chardon " + CustID +" "+ unescape(name));
	            
				//Scramble the unid to prevent a double submit
			var unid = Math.floor(Math.random()*111111);
			
				
				try{
				document.forms[0].DaUnid.value = unid;
				}
				catch(err){
				console.log("unable to clear daUnid - must be a restore");
				}
				 //alert("before clearCurrentReport");
	              $('#progress').remove();
	              
	              try{
	              clearCurrentReport();
	              }
	              catch (err){
	            	  //updateCounts();
	            	//  alert("no clearcurrentreport");
	              }
	              
	              
	             //alert("in Sync before RemoveReport");
	             //Shrink the Shrinking List
				
	//6-4-12 Remove from device with out asking - it will be in the Archived	
	removeReport(CustID, ListType);

			/*  Dont display
				   var r=confirm("Remove from Device?");
            if (r==true)
				 {
	              removeReport(CustID, ListType);
	              }
				  else
              {
              //alert("You pressed Cancel!");
              }
			  
			  */
			  
				  try{
				  //Unhide the Save Send Button
	              show("SaveSendID");
	              }
				  catch(err){
				  //alert("cant show cause it aint there");
				  }
	              
	              
	            //		$('#progress').remove();
	            	//	alert("Synch Completed");
	              } 
	              
			
	               //   alert("Received:"  + http.responseText); 
	              else 
	            	 $('#progress').remove();
	             // alert("success"+ httpBU.status);
	         
	              if (httpBU.status == 0){
	               alert("Report NOT SENT. Error Communicating with Server.  Please try again when you have a connection." );
	             
	               try{
				  //Unhide the Save Send Button
	              show("SaveSendID");
	              }
				  catch(err){
				  //alert("cant show cause it aint there");
				  }
	              }
	         
	         }
           
	    }; 




	


}

 


}
		

	function responseFunction(){
	//alert("response : "+ http.responseText);
	};

	

	function removeReport(CustID, ListType){
		
		//Grab the values before clearing cache
		
		//6-1-12 Fixed pw clearing bug by using the word password
		 var pw1 = localStorage.getItem('password');
		 var tech = localStorage.getItem('tech');
		 var Tech = localStorage.getItem('Tech');
		 var Roles = localStorage.getItem('Roles');
		 var listType = localStorage.getItem('listType');
		 var username = localStorage.getItem('username');
		 
		 var month1 = localStorage.getItem('month1');
		  var month2 = localStorage.getItem('month2');
		   var month3 = localStorage.getItem('month3');
		    var month4 = localStorage.getItem('month4');
			 var month5 = localStorage.getItem('month5');
			  var month6 = localStorage.getItem('month6');
			   var month7 = localStorage.getItem('month7');
			    var month8 = localStorage.getItem('month8');
				 var month9 = localStorage.getItem('month1');
				 
		 
		//Clear Local Storage
			
		localStorage.clear();
		
		//alert("local storage cleared");
		
		 localStorage.setItem('password', pw1);
		
			//alert(pw1);
		localStorage.setItem('tech', tech);
		 localStorage.setItem('Tech', Tech);
		 
		 localStorage.setItem('Roles', Roles);
		 localStorage.setItem('listType', listType);
		 localStorage.setItem('username', username);
		 
		 localStorage.setItem('month1', month1);
		 localStorage.setItem('month2', month2);
		 localStorage.setItem('month3', month3);
		 localStorage.setItem('month4', month4);
		localStorage.setItem('month5', month5);
		localStorage.setItem('month6', month6);
		localStorage.setItem('month7', month7);
		localStorage.setItem('month8', month8);
		localStorage.setItem('month9', month9);
	
		//alert("cache restored");
		
		
		
		//alert("Removing report from local db " + CustID + " " +ListType);

		//Set a Status Flag to  Archived to prevent it from being picked on BookView
		
		saveReport (CustID, "Status", "Archived");
		//To Do Remove Photo
		saveReport (CustID, "Photo1", '');
		saveReport (CustID, "Photo2", '');
		saveReport (CustID, "Photo3", '');
		saveReport (CustID, "Photo4", '');
		saveReport (CustID, "Photo5", '');
		saveReport (CustID, "Photo6", '');
		console.log("photos removed per vince");
		
		//Removed from Below
		// transaction.executeSql("Delete From Reports where custid = '"+CustID+"'");
		
		localDB.transaction(
		    function (transaction) {
		       
		    if (ListType=="shrinkingList"){    
		    //	alert("in remove report");
				//alert("ListType from Report Table: "+ ListType);
		             //transaction.executeSql("Delete From ShrinkingList where custid = '"+CustID+"'");
					 transaction.executeSql("Select * From ShrinkingList where custid = '"+CustID+"'", [], dataHandlerShrink, errorHandler)

		    };
		    
		    //If OnDevice
		    if (ListType=="onDevice"){    
		    //	alert("in remove report");
				//alert("ListType from Report Table: "+ ListType);
		             //transaction.executeSql("Delete From ShrinkingList where custid = '"+CustID+"'");
						 transaction.executeSql("Select * From ShrinkingList where custid = '"+CustID+"'", [], dataHandlerShrink, errorHandler)
		    };
		    
		    });
	}
	
	//Count the Reports on Phone
	/* Commented out
	document.getElementById('CompCount_s1').innerHTML =  "";

	reportDB.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT * from Reports", [], dataHandlerCompCount, errorHandler);
	    }
	    
	);
*/
	
	
	
		function dataHandlerShrink(transaction, results)
	    {
	
	        //Shrink the List on the Phone by 1 
	        //If there are multiple templates per customer it will delete only the 1st on it finds
	      
	        
	        //  for (var i=0; i<results.rows.length; i++) {
	            
	         //   alert(results.rows.length); 
	            
	        
	                // Each row is a standard JavaScript array indexed by     
					
				try{	
	            var row = results.rows.item(0);    
	           id  = row['id'];
	           //alert("id: "+id);
	           
	           transaction.executeSql("Delete From ShrinkingList where id = '"+id+"'");	           
	           }
			   catch(e){
			   console.log("List not Shrunk since Report was Restored from Device");
			   }
	           
	  
	         
	       
	        }
	
	
	function dataHandlerCompCount(transaction, results)
	{
	document.getElementById('CompCount_s1').innerHTML = "";
	  document.getElementById('CompCount_s1').innerHTML = results.rows.length; 
	   
	}
	
	
	//alert("return to main screen");
	//hide("SaveIT");
	//show("ChooseCustomer");show("Begin"); show("Home");
	//this needs re-written
	//setTimeout("window.updateCounts.click()", 2000);
	//alert("Synch Complete");


	function clearCurrentReport (){
		//alert("in Clear Report");
		//$('#progress').remove();
	
		
	//Erase Values from Fields		
		
	//var x=document.getElementById("customer_templates");
	//alert(x.selectedIndex);

	//x.remove(x.selectedIndex);
	//alert("Save Completed for: ");
	frm = document.forms[0];
	
	//alert(document.forms[0].Conductivity.value);
	frm.Conductivity.value="";
	frm.calciumHardness.value="";
	frm.alkalinity.value="";
	frm.chlorides.value="";
	frm.parseEquipType.value = "";
	frm.parseEquipName.value="";
	frm.parseEquipTestNames.value="";
	frm.parseRange.value="";
	
	frm.equipDataCollection.value = "";
	frm.LastMonthEquipDataCollection.value = "";
	frm.LastMonthEquipDataCollection2.value = "";
	frm.LastMonthEquipDataCollection3.value = "";
	frm.PDAEquipTest.value="";
	frm.PDAEquipRange.value="";
	frm.pdaDataCollection.value="";
	frm.Comments.value="";
	frm.mileage.value="";
	
	//Clear out previous Signature
	var storage = localStorage.setItem("canvas", "");
	//alert("Clear Current Report executed");

	//Reset the Photo Counter
	   localStorage.setItem('photocount', 0);
	
	
	
	
	}

