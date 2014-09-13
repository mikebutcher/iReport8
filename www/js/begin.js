function begin(){

	//init vars
	var previousRow="";
	var count =0;
	  document.getElementById('dspCust').innerHTML = "";
	  document.getElementById('dspCustHist').innerHTML = "";
	  document.getElementById('dspCustID').innerHTML = "";

	frm = document.forms[0];
	
	//Clear out last readings
	frm.mileage.value ="";
	frm.Conductivity.value ="";
	frm.calciumHardness.value ="";
	frm.alkalinity.value ="";
	frm.chlorides.value ="";
	
	frm.EquipList.length=0;
	frm.parseEquipType.value ="";
	frm.parseEquipName.value ="";
	frm.parseEquipTestNames.value ="";
	frm.parseRange.value ="";
	
	//Reset the Photo images
	//alert("Reseting images to default photo");
	console.log("Reseting images to default photo");
	document.getElementById('img1').src = "img/photo.png";
	document.getElementById('img2').src = "img/photo.png";
	document.getElementById('img3').src = "img/photo.png";
	document.getElementById('img4').src = "img/photo.png";
	document.getElementById('img5').src = "img/photo.png";
	document.getElementById('img6').src = "img/photo.png";
	
	
	
	///////////////////////////////////////////////////////////////////////////////////////////
	/// Check to see if there is a Draft in the Reports Table before reading from the Templates
	///////////////////////////////////////////////////////////////////////////////////////////
	 var custid = document.getElementById("customer_templates").value;
	 

	var x=document.getElementById("customer_templates");
	 


	 custname =  x.options[x.selectedIndex].text;
	 name =  x.options[x.selectedIndex].text;
	 document.getElementById('Client').innerHTML = name; 
	 //document.getElementById('Client1').innerHTML = name;
	 document.getElementById('Client2').innerHTML = name;  
	 document.getElementById('Client3').innerHTML = name;  
	 //document.getElementById('Client4').innerHTML = name;  
	 document.getElementById('dspCustID').innerHTML ="Cust ID: "+ custid ; 
	 document.getElementById('dspCust').innerHTML = custname;
	 document.getElementById('dspCustHist').innerHTML = custname;



	console.log("Calling CheckExisting");
	
	CheckExisting (custid);
	
	
	
	//Load the HISTORY
	try
		{	
		loadHistory (custid); 
			console.log("Loaded History");
		}

	catch(err)
		  {
		console.log("begin.js 64   loading history error: " + err);
		  }
	
	
	

	function loadHistory(custid)
	{

	//alert("check history table " + custid +" is the cust id");
	historyDB.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT * from History where custid='"+custid+"';", [], dataHandlerHistory, errorHandler);
	    }  
	);
	}
	
	function dataHandlerHistory(transaction, results)
	{
		//Reset the length of these lists
		ClearOptions('EquipHistList');
		ClearOptions('histList');
	
	
	var custid = document.getElementById("customer_templates").value;

			if (results.rows.length == 0) {
			console.log('hide history');
			var select = document.getElementById("histList");
			var select2 = document.getElementById("EquipHistList");
		  select.options[select.options.length] = new Option('No History', 1);   //use the No History and the make up as the value..genius!  
		  select2.options[select2.options.length] = new Option('No History', 1);   //use the No History and the make up as the value..genius!  
					
			}

	if (results.rows.length > 0) {
	
	   var row = results.rows.item(0);
	//alert("History Records found: "+ results.rows.length ); 

	//Format the Report Date from history
			
			dateString = row['ReportDate'];
			//alert(dateString);
			var curr_date =  dateString.substring(6, 9);
			//alert(curr_date);
			var curr_month = dateString.substring(4, 6);
			//alert(curr_month);
			var curr_year = dateString.substring(0, 4);
			//alert(curr_year);
			daDate =   curr_month  + '/' + curr_date  + '/' + curr_year;
			
			//document.forms[0].ReportDate2.value = daDate;
	
	
  	//frm.ReportDate2.value = row['ReportDate'];
	//alert("report date - " + row['ReportDate']);
	


	//alert("MakeUp -  " + row['MakeUp']);
	
	MakeUpArray = row['MakeUp'].split("~");
	
	//pre populate the equpment readindgs - field at bottom on ereport.html
	equipReadingsArray = row['equipDataCollection'].replace(/~/gi, "\r\n");
	frm.HistoryEquipDataCollection.value = equipReadingsArray;
	
	
	//alert(MakeUpArray[0]);
	// prepoulate makeup value in the history
	frm.Conductivity2.value = MakeUpArray[0];
	frm.calciumHardness2.value = MakeUpArray[1];
	frm.alkalinity2.value = MakeUpArray[2];
	frm.chlorides2.value = MakeUpArray[3];
	
	}
	
	var select = document.getElementById("histList");
	var select2 = document.getElementById("EquipHistList");
    //point to the field where the list will be populated
    
    for (var i = 0; i < results.rows.length; i++){
	 var row = results.rows.item(i);
	
		//alert("in for loop");
        //fill up the values
		
		dateString = row.ReportDate
		makeUpString = row.MakeUp
		
			var curr_date =  dateString.substring(6, 9);
			//alert(curr_date);
			var curr_month = dateString.substring(4, 6);
			//alert(curr_month);
			var curr_year = dateString.substring(0, 4);
			//alert(curr_year);
			daDate =   curr_month  + '/' + curr_date  + '/' + curr_year;
          select.options[select.options.length] = new Option(daDate, row.MakeUp);   //use the date and the make up as the value..genius!  
		  select2.options[select2.options.length] = new Option(daDate, row.equipDataCollection);   //use the date and the make up as the value..genius!  
		
       
    } //end For Loop
	
	
	
	}
	
	//used to dynamically change the makeup based on the dropdown date
	
	
	
	
	function CheckExisting (custid)
	{

	console.log("Checking for existing DRAFT " + custid +" is the Cust ID.");
	reportDB.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT * from Reports where custid='"+custid+"' and status !='Archived';", [], dataHandlerReports, errorHandlerCE);
	    });
	}	

			function errorHandlerCE(transaction, error)
			{
				// error.message is a human-readable string.
				// error.code is a numeric error code
			   alert(' Error was '+error.message+' (Code '+error.code+')');
			 
				// Handle errors here
				var we_think_this_error_is_fatal = true;
				if (we_think_this_error_is_fatal) return true;
				return false;
			}	
	

	
	
function dataHandlerReports(transaction, results)
	{
	console.log("line 215 dataHandlerReports found " + results.rows.length);
	
	var custid = document.getElementById("customer_templates").value;

	    if (results.rows.length > 0) {
//	      var row = results.rows.item(i);
	   var row = results.rows.item(0);
	//alert("Found a Draft on the Device - " + row['ListType']); 
	//alert(row['exception']);
	
	//Update the image for the Exception
	if (row['exception'] == "Yes") {
		
		document.forms[0].except.src='img/exChecked.png';
	} else {
	
		document.forms[0].except.src='img/exCheckedno.png';
	}
	
	
	
	//alert("mileage - " + row['mileage']);
     frm.mileage.value = row['mileage'];
	//alert("mileage  " + row['mileage']); 
   	frm.ReportDate.value = row['ReportDate'];
//	alert("report date - " + row['ReportDate']);


	//alert("timestamp-  " + row['timestamp']);
	
	//Set the UNID
	frm.DaUnid.value = row['timestamp'];

	//alert(" Conductivity :"+ row['Conductivity']);
	frm.Conductivity.value = row['Conductivity'];

	frm.calciumHardness.value = row['calciumHardness'];
//alert(" calciumHardness  :"+ row['calciumHardness']);


	frm.alkalinity.value = row['alkalinity'];
	frm.chlorides.value = row['chlorides'];
	
	
	// 11-1-12  Reload the equipment Readings & Ranges if there is a draft

//11-1-12 edits
	//Save the edited Ranges to a local Storage Var used when reloaded as Draft
	//alert('equip range' + row['EquipRange']);
	
	frm.parseRange.value = row['EquipRange'];
	localStorage.setItem('tempEquipRange', row['EquipRange'] );
//end 11-1 12 edits
	
	frm.equipDataCollection.value = row['EquipDataCollection'];

	frm.Comments.value = unescape(row['Comments']); // Make it plain characters
	frm.ActionsList.value = row['ActionsList'];

	//Code to populate Actions
	var ActionIndex = row['ActionNum'];

	//Create an Array to store all the values
	var checkedArray = new Array();
	checkedArray  = ActionIndex.split(';');
	//alert("ActionIndex "+ActionIndex );
	//alert("checkedArray.length " + checkedArray.length);
	//alert(checkedArray[0]);
	

	for (var i=0; i < checkedArray.length-1; i++)
	   { 
	 //  alert("in For Loop");
	//alert('in for loop');
	    //alert(checkedArray[i]);
	  //Code fixed on 6.6.11  converted to a number using the *
	    c = checkedArray[i]*1;
	   //alert("c "+c);
	   document.forms[0].ActionsList[c].checked = true;   
	}

	 //document.forms[0].ActionsList[0].checked = true;   
	//alert('past actions');
	//End Actions Population

	//2-18-11  Add Code to handle saved Photos to populate the thumbnails
	
	//photo1
	//alert("photo1: " +  row['Photo1']);  // alert the data from WebStorage 
	var photo1Temp = row['Photo1'];
	var photo2Temp = row['Photo2'];
	var photo3Temp = row['Photo3'];
	var photo4Temp = row['Photo4'];
	var photo5Temp = row['Photo5'];
	var photo6Temp = row['Photo6'];
	
	//alert(photo1Temp.length);
		
	if (photo1Temp.length >0){
	    document.getElementById('img1').src = "data:image/jpeg;base64," + row['Photo1'];
	 
	    }
	if (photo2Temp.length >0){
	    document.getElementById('img2').src = "data:image/jpeg;base64," +  row['Photo2'];
	}
	if (photo3Temp.length >0){
	    document.getElementById('img3').src =  "data:image/jpeg;base64," + row['Photo3'];
	}
	if (photo4Temp.length >0){ 
	    document.getElementById('img4').src = "data:image/jpeg;base64," + row['Photo4'];
	}
	if (photo5Temp.length >0){
	    document.getElementById('img5').src = "data:image/jpeg;base64," + row['Photo5'];
	}
	if (photo6Temp.length >0){
	    document.getElementById('img6').src = "data:image/jpeg;base64," + row['Photo6'];
	}
	//Regenerate Signature
	
	//alert("Sig Data" + row['container']);
	
		hide("container");
		show("signatureimage");
	
    document.getElementById("signatureimage").src =  row['container'];

	


	//foundDraft(custid);
//alert("begin.js starting new code line 312");
	var previousRow="";
	var count =0;
	frm = document.forms[0];
	frm.EquipList.length=0;
	frm.parseEquipType.value ="";
	frm.parseEquipName.value ="";
	frm.parseEquipTestNames.value ="";
	frm.parseRange.value ="";
	
	localDB.transaction(
	    function (transaction) {

	    	  
	  //  alert("SELECT * from BookView where custid="+custid);
	    	 
	        transaction.executeSql("SELECT * from BookView where custid='"+custid+"';",
	      
	            [], // array of values for the ? placeholders
	            dataHandlerFoundDraft, errorHandler);
	    }
	);

	
	function dataHandlerFoundDraft(transaction, results)
	{
	 // Handle the results
	  //alert( "In the Found Draft  Data Handler");
	    
	var orgMyString ="start";
//alert("number of rows"+ results.rows.length);
	    for (var i=0; i<results.rows.length; i++) {
	        // Each row is a standard JavaScript array indexed by     
	        var row = results.rows.item(i);
	        
	        //row['id'], row['custid'], row['timestamp'], row['Conductivity'], row['calciumHardness'], row['alk'], row['chlorides'], row['storage'], row['eRange'], row['eReadings']);      

		frm.custid.value = row['custid'];

		frm.BillName.value = row['BillName'];
//		Save
		var custid = document.getElementById("customer_templates").value;
//alert("contact" + frm.Contact.value);
		frm.Contact.value = row['BillADDR1'];
	saveReport (custid, "Contact", frm.Contact.value );

//6-18-12 fix the seperator for notify
//		frm.notify.value = row['Notify'].replace(/~/gi, "\r\n");
frm.notify.value = row['Notify'].replace(/~/gi, ", ");


	saveReport (custid, "notify",frm.notify.value );
		frm.BillAddr2.value = row['BillADDR2'];
	saveReport (custid, "BillAddr2",frm.BillAddr2.value);
		frm.BillCity.value = row['BillCity'];
	saveReport (custid, "BillCity",frm.BillCity.value);
		frm.BILLState.value = row['BillState'];
	saveReport (custid, "BILLState",frm.BILLState.value);
		frm.BillZip.value = row['BillZip'];
	saveReport (custid, "BillZip",frm.BillZip.value);
		frm.ShipPhone.value = row['ShipPhone'];
	saveReport (custid, "ShipPhone",frm.ShipPhone.value);
		frm.accessGivenTo.value = row['accessGivenTo'].replace(/~/gi, "\r\n");
	saveReport (custid, "accessGivenTo",frm.accessGivenTo.value);
	   	frm.CorporateName.value =  row['CorporateName'].replace(/~/gi, "\r\n");
	saveReport (custid, "CorporateName",frm.CorporateName.value);


			
	 

	

	
	      frm.parseEquipType.value = row['parseEquipType'].replace(/~/gi, "\r\n");
		//  alert("Equip Type " + frm.parseEquipType.value);
		  
		  
	saveReport (custid, "parseEquipType",frm.parseEquipType.value);
	      frm.parseEquipName.value = row['parseEquipname'].replace(/~/gi, "\r\n");
	saveReport (custid, "parseEquipName",frm.parseEquipName.value);   
	       frm.parseEquipTestNames.value = row['parseEquipTestNames'].replace(/~/gi, "\r\n");
	saveReport (custid, "parseEquipTestNames",frm.parseEquipTestNames.value);      
	
//11-1-12 Fix to read Ranges from Draft used a localStorage Var
	//alert('line 463 in begin.js '+ row['parseRange'].replace(/~/gi, "\r\n"));
	
	//frm.parseRange.value = row['parseRange'].replace(/~/gi, "\r\n");
	//alert(localStorage.getItem('tempEquipRange').replace(/~/gi, "\r\n"));
	frm.parseRange.value = localStorage.getItem('tempEquipRange').replace(/~/gi, "\r\n");
	
	saveReport (custid, "parseRange",frm.parseRange.value);        
//End 11-1-12

	       var cyclesLow = row['cyclesLow'];
	       var cyclesHigh= row['cyclesHigh'];
		   //9-7-12
		   console.log( "cycles Low  Cycles High" + cyclesLow +", "+ cyclesHigh);
		   
	       frm.cycles.value  = cyclesLow +", "+ cyclesHigh;

	//Set the Cust Name
	// var custName = row['BillName'];
	 //document.getElementById('status').innerHTML = row['BillName'];
	 document.getElementById('BillAddress').innerHTML = row['BillADDR2']; 
	  document.getElementById('CSZ').innerHTML = row['BillCity'] +", " + row['BillState'] + " " + row['BillZip']; 
	//  alert(row['parseEquipType']);

	var EquipArray = new Array();

	EquipArray = row['parseEquipname'].split('~');
	 //.replace(/~/gi, "\r\n");

	//alert(row['parseEquipType'].split(','));
	//EquipArray= row['parseEquipName'].split('~');

	//alert(EquipArray[0]);
	//alert("Equip array length: "+EquipArray.length);
	start = EquipArray[0];
	document.forms[0].breakpoints.value = "0,";

	//init the equip dropdown
	var oSelect = document.getElementById('EquipList');
	var oOption = document.createElement('OPTION');
	//alert(oSelect);
	// Add the option to the collection first, then set properties
	equipOption = start;
	//alert ("equipOption : " + equipOption);

	oSelect.options.add(oOption);
	oOption.innerHTML = equipOption;
	//oOption.value = equipOption;
	oOption.value = i;
	
	


	for(i = 0; i < EquipArray.length; i++){
	if (start !=EquipArray[i]) {

	//alert("loading Equip");
	start = EquipArray[i];
	document.forms[0].breakpoints.value =  document.forms[0].breakpoints.value + i + "," ;
	oOption.value = i;
	count= count+1; 

	////////////////////
	   document.getElementById('EquipList').innerHTML += 
	            '<option value ="'+i+'">'+ EquipArray[i].toString() +'</option>';
	//alert(   '<option value ="'+i+'">'+ EquipArray[i].toString()+'</option>');

	}
	}
	//End of the array

	document.forms[0].breakpoints.value =  document.forms[0].breakpoints.value + i;
	
	//9-21-13
	//Dynamically set the rows for the display
	document.getElementById('equipDisplayRows').rows = i;
	document.getElementById('parseEquipTestNames').rows = i;
	document.getElementById('parseRange').rows = i;
	document.getElementById('equipDataCollection').rows = i;
	
	

	
	console.log("end of array rowcount: " + i);
	//localStorage.setItem('rowcount', i);
	    }

	}
	 
	
	//document.forms[0].mileage.focus();
	document.getElementById("mileage").focus();


	   }
	   else 
	   
	   
	   //**************************  NO DRAFT FOUND  ****************************
	   
	   {
		   //Added List Type Code
		   var ListType = localStorage.getItem("listType");
	console.log(" line 492 No Draft Found - " + ListType);
		   
		   localStorage.setItem('photocount',1);  //initialize photocount
	
	//6-7-12  Generate a unique number for each report 
	var unid = Math.floor(Math.random()*111111);
	document.forms[0].DaUnid.value = unid;
	console.log("unid: " + unid);
	var Status = "Draft";
	//alert(timestamp);

	console.log("Creating Report Stub");
	//6-7-12  added exception field to table 
	
	reportDB.transaction(
	    function (transaction) {

	   transaction.executeSql('INSERT INTO Reports VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [null, custid, name, Status, unid, "", "", "",  "", "", "", "", "", "", "", "", "",  "", "", "", "", "", "", "", "", "", "","","","","","","","","","","","",ListType,""], dataHandler, errorHandler);
	
	    }
	);
  
  //alert("Report Stub Created!");
   
		 
	   var custid = document.getElementById("customer_templates").value;
	   
	       
       //call Set StartTime  Time.js
      //Start time is set on fresh reports only!
       SetStartTime(custid);
	   
	   localDB.transaction(
	    function (transaction) {
	    	
	    	 //alert("Bv or SL?  " +ListType);
	    	 if (ListType == "bookView"){
	    		 var Table = "BookView";
	    	 } else {
	    		 var Table = "Templates";
	    	 }
	    		 
	    	console.log("Selecting from the  " + Table + " Table" ); 
	    	  
	    	 
	        transaction.executeSql("SELECT * from "+Table+" where custid='"+custid+"';", [], dataHandlerFoundNoDraft, errorHandler);}
		); 
		
		}

	
	    
	    
	    
	    function dataHandlerFoundNoDraft(transaction, results)
	    {
		
		console.log("Found No Draft  - line 513  begin.js" );
		
	     // Handle the results
	        var string = "In the Data Handler";
	        
	    var orgMyString ="start";

	        for (var i=0; i<results.rows.length; i++) {
	          
	            var row = results.rows.item(i);
	            
	            //row['id'], row['custid'], row['timestamp'], row['Conductivity'], row['calciumHardness'], row['alk'], row['chlorides'], row['storage'], row['eRange'], row['eReadings']);      


	    	frm.custid.value = row['custid'];
	    	frm.BillName.value = row['BillName'];
//	    	Save
	    	var custid = document.getElementById("customer_templates").value;

	    //Tech
	    var daTech =localStorage.getItem("tech"); 
	 	//alert(daTech);

//7-10-12 Bug to allow for special chars in Tech name

	    saveReport (custid, "tech", escape(daTech));

	    saveReport (custid, "ReportDate",frm.ReportDate.value);




	    	frm.Contact.value = row['BillADDR1'];
//	    	alert(row['BillADDR1']);
	    saveReport (custid, "Contact", frm.Contact.value );
//	    	frm.notify.value = row['Notify'].replace(/~/gi, "\r\n");
// 6-18-12 Fix notify seperator
		frm.notify.value = row['Notify'].replace(/~/gi, ", ");

	    saveReport (custid, "notify",frm.notify.value );
	    	frm.BillAddr2.value = row['BillADDR2'];
	    saveReport (custid, "BillAddr2",frm.BillAddr2.value);
	    	frm.BillCity.value = row['BillCity'];
	    saveReport (custid, "BillCity",frm.BillCity.value);
	    	frm.BILLState.value = row['BillState'];
	    saveReport (custid, "BILLState",frm.BILLState.value);
	    	frm.BillZip.value = row['BillZip'];
	    saveReport (custid, "BillZip",frm.BillZip.value);
	    	frm.ShipPhone.value = row['ShipPhone'];
	    saveReport (custid, "ShipPhone",frm.ShipPhone.value);
	    	frm.accessGivenTo.value = row['accessGivenTo'].replace(/~/gi, "\r\n");
	    saveReport (custid, "accessGivenTo",frm.accessGivenTo.value);
	       	frm.CorporateName.value =  row['CorporateName'].replace(/~/gi, "\r\n");
	    saveReport (custid, "CorporateName",frm.CorporateName.value);
	     	
	    
	    
	    //alert("parseEquipType before " + row['parseEquipType']);
	          frm.parseEquipType.value = row['parseEquipType'].replace(/~/gi, "\r\n");
	          
	    //alert("parseEquipType after  " + row['parseEquipType'].replace(/~/gi, "\r\n"));  
	    saveReport (custid, "EquipType",frm.parseEquipType.value);
	    
	          frm.parseEquipName.value = row['parseEquipname'].replace(/~/gi, "\r\n");
	  //alert("parseEquipName "+ frm.parseEquipName.value.length);
	   
	   
	   
	    saveReport (custid, "EquipName",frm.parseEquipName.value);   
	           frm.parseEquipTestNames.value = row['parseEquipTestNames'].replace(/~/gi, "\r\n");
	    saveReport (custid, "EquipTest",frm.parseEquipTestNames.value);        
	           frm.parseRange.value = row['parseRange'].replace(/~/gi, "\r\n");
	    saveReport (custid, "EquipRange",frm.parseRange.value);        
	    
		//This was a bug that was replacing loaded equip readings with the default values !!
		
		var listType = localStorage.getItem('listType');
		//alert(listType);
		console.log("line 604" + listType);
		if (listType =='bookView' | listType=="shrinkingList"){
		console.log("line 607");
		frm.equipDataCollection.value = row['equipDataCollection'].replace(/~/gi, "\r\n");
		console.log("line 607 " + frm.equipDataCollection.value );
		
		
	    saveReport (custid, "equipDataCollection",frm.equipDataCollection.value);  
	    }
	           var cyclesLow = row['cyclesLow'];
	           var cyclesHigh= row['cyclesHigh'];
	           frm.cycles.value  = cyclesLow +", "+ cyclesHigh;

			   console.log("659 begin.js - Cycles Low + cycles High " +cyclesLow +", "+ cyclesHigh);
			   
	    //Set the Cust Name
	    // var custName = row['BillName'];
	     //document.getElementById('status').innerHTML = row['BillName'];
	     document.getElementById('BillAddress').innerHTML = row['BillADDR2']; 
	      document.getElementById('CSZ').innerHTML = row['BillCity'] +", " + row['BillState'] + " " + row['BillZip']; 
	    //  alert(row['parseEquipType']);

	    var EquipArray = new Array();

	    EquipArray = row['parseEquipname'].split('~');
	     //.replace(/~/gi, "\r\n");

	    //alert(row['parseEquipType'].split(','));
	    //EquipArray= row['parseEquipName'].split('~');

	    //alert(EquipArray[0]);
	    //alert("Equip array length: "+EquipArray.length);
	    start = EquipArray[0];
	    document.forms[0].breakpoints.value = "0,";

	    //init the equip dropdown
	    var oSelect = document.getElementById('EquipList');
	    var oOption = document.createElement('OPTION');
	    //alert(oSelect);
	    // Add the option to the collection first, then set properties
	    equipOption = start;
	    //alert ("equipOption : " + equipOption);

	    oSelect.options.add(oOption);
	    oOption.innerHTML = equipOption;
	    //oOption.value = equipOption;
	    oOption.value = i;

	    for(i = 0; i < EquipArray.length; i++){
	    if (start !=EquipArray[i]) {

	    //alert("loading Equip");
	    start =EquipArray[i];
	    document.forms[0].breakpoints.value =  document.forms[0].breakpoints.value + i + "," ;
	    oOption.value = i;
	    count= count+1; 

	    ////////////////////
	       document.getElementById('EquipList').innerHTML += 
	                '<option value ="'+i+'">'+ EquipArray[i].toString() +'</option>';
	  //  alert(   '<option value ="'+i+'">'+ EquipArray[i].toString()+'</option>');

	    }
	    }
	    //End of the array

	    document.forms[0].breakpoints.value =  document.forms[0].breakpoints.value + i;
		
		document.getElementById('equipDisplayRows').rows = i;
		document.getElementById('parseEquipTestNames').rows = i;
		document.getElementById('parseRange').rows = i;
		document.getElementById('equipDataCollection').rows = i;
		
	console.log("end of array rowcount: " + i);
	localStorage.setItem('rowcount', i);
	        }

	    }	    
////////////////////////////////////////////////////////////////////////////////////////////

	}
	




	//Found a Draft,  get Static Data from Templates Database, get Readings from Reports Database  WTH
function foundDraft(custid) {
	alert("Found Draft -  Loading Values from local db.");
	var previousRow="";
	var count =0;
	frm = document.forms[0];
	frm.EquipList.length=0;
	frm.parseEquipType.value ="";
	frm.parseEquipName.value ="";
	frm.parseEquipTestNames.value ="";
	frm.parseRange.value ="";
	//frm.equipDataCollection.value="";
//alert("ListType in Found Draft  "+ ListType );


	localDB.transaction(
	    function (transaction) {
//	    alert("custid  " + custid);
	    	
	   	 //alert("Bv or SL?  " +ListType);
	    	
	
	    	if (ListType == "shrinkingList"){
	    		 var Table = "Templates";
	    	 } else {
	    		 //OnDevice and BookView Types
	    		 var Table = "BookView";
	    	 }
	    	
	    	 //alert("Selecting from the  " + Table + " Table" ); 
	    	  
	    	 alert("SELECT * from BookView where custid="+custid);
	    	 
	        transaction.executeSql("SELECT * from BookView where custid='"+custid+"';",
	      
	            [], // array of values for the ? placeholders
	            dataHandlerFoundDraft, errorHandler);
	    }
	);

	//document.forms[0].mileage.focus();
	document.getElementById("mileage").focus();

	
	

	}
	document.getElementById("mileage").select();


	//alert("End begin.js");

}

//Called from the Begin button
function dataHandler(transaction, results)
{
console.log ( "line 917  data Handler" );
var count =0;
 // Handle the results
   var string = "In the Data Handler";

var orgMyString ="start";
//alert("number of rows"+ results.rows.length);
    for (var i=0; i<results.rows.length; i++) {
        // Each row is a standard JavaScript array indexed by     
        var row = results.rows.item(i);
        
        //row['id'], row['custid'], row['timestamp'], row['Conductivity'], row['calciumHardness'], row['alk'], row['chlorides'], row['storage'], row['eRange'], row['eReadings']);      

	frm.custid.value = row['custid'];
	frm.BillName.value = row['BillName'];
	frm.Contact.value = row['BillADDR1'];
//6-18-12 fix notify seperator
	frm.notify.value = row['Notify'].replace(/~/gi, ", ");
	frm.BillAddr2.value = row['BillADDR2'];
	frm.BillCity.value = row['BillCity'];
	frm.BILLState.value = row['BillState'];
	frm.BillZip.value = row['BillZip'];
	frm.ShipPhone.value = row['ShipPhone'];
	frm.accessGivenTo.value = row['accessGivenTo'].replace(/~/gi, "\r\n");
   	frm.CorporateName.value =  row['CorporateName'].replace(/~/gi, "\r\n");
 	 frm.LastMonthEquipDataCollection2 = row['LastMonthEquipDataCollection2'].replace(/~/gi, "\r\n");
 	 frm.LastMonthEquipDataCollection3 = row['LastMonthEquipDataCollection3'].replace(/~/gi, "\r\n");
      frm.parseEquipType.value = row['parseEquipType'].replace(/~/gi, "\r\n");
       frm.parseEquipName.value = row['parseEquipname'].replace(/~/gi, "\r\n");
       frm.parseEquipTestNames.value = row['parseEquipTestNames'].replace(/~/gi, "\r\n");
       frm.parseRange.value = row['parseRange'].replace(/~/gi, "\r\n");
       frm.equipDataCollection.value = row['equipDataCollection'].replace(/~/gi, "\r\n");

	   
       var cyclesLow = row['cyclesLow'];
       var cyclesHigh= row['cyclesHigh'];
       frm.cycles.value  = cyclesLow +", "+ cyclesHigh

//Set the Cust Name
// var custName = row['BillName'];
 //document.getElementById('status').innerHTML = row['BillName'];
 document.getElementById('BillAddress').innerHTML = row['BillADDR2']; 
  document.getElementById('CSZ').innerHTML = row['BillCity'] +", " + row['BillState'] + " " + row['BillZip']; 
//  alert(row['parseEquipType']);

var EquipArray = new Array();

EquipArray = row['parseEquipname'].split('~');

start = EquipArray[0];
document.forms[0].breakpoints.value = "0,";

//init the equip dropdown
var oSelect = document.getElementById('EquipList');
var oOption = document.createElement('OPTION');
//alert(oSelect);
// Add the option to the collection first, then set properties
equipOption = start;


oSelect.options.add(oOption);
oOption.innerHTML = equipOption;
//oOption.value = equipOption;
oOption.value = i;

for(i = 0; i < EquipArray.length; i++){
if (start !=EquipArray[i]) {
start =EquipArray[i];
document.forms[0].breakpoints.value =  document.forms[0].breakpoints.value + i + "," ;
oOption.value = i;
count= count+1; 

////////////////////

   document.getElementById('EquipList').innerHTML += 
            '<option value ="'+i+'">'+ EquipArray[i].toString() +'</option>'
//alert(   '<option value ="'+i+'">'+ EquipArray[i].toString()+'</option>');

}
}
//End of the array

document.forms[0].breakpoints.value =  document.forms[0].breakpoints.value + i;
    }

}


//added to populate the History Dropdown
function populateReadings(readingslist)
	{
	  //alert('populate equip readings' + readingslist);
	  
	
	//writes vales to the bottom of the form..
	//figures out how much of it to display by slicing it!
	frm.HistoryEquipDataCollection.value = readingslist.replace(/~/gi, "\r\n");
		
	
	var tempDataHist101 = new Array();
	tempDataHist101 = document.forms[0].HistoryEquipDataCollection.value.split('\n');
	//alert("s1 " + s1);
	history101 = tempDataHist101.slice(s1, e1);
	//populate the values up top
	frm.pdaDataHist.value = history101.join('\n');

	
	
	
	  
	  
	}
	
function populateMakeup(makeuplist)
	{
	
	MakeUpArray = makeuplist.split("~");
	
	//alert(MakeUpArray[0]);
	
	frm.Conductivity2.value = MakeUpArray[0];
	frm.calciumHardness2.value = MakeUpArray[1];
	frm.alkalinity2.value = MakeUpArray[2];
	frm.chlorides2.value = MakeUpArray[3];
	
	

	
	}
