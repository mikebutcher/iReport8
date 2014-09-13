function doCalcsSilent(){
//alert("Calculating");
    var position =0;
    //find the position of Chlorides
    var field = document.forms[0].PDAEquipTest.value;
    var daList = new Array();
    daList = field.split('\n');
    
    var CyclesPosition= daList.indexOf('Cycles');
    //alert("Cycles position " + CyclesPosition);
    
    var MBPosition = daList.indexOf('MassBalance');
    //alert("Mass Balance position " + MBPosition);
    
    
    var SIPosition = daList.indexOf('SaturationIndex');
    //alert("Sat Index position " + SIPosition);
    
    //Reset Cycles
    datafield = document.forms[0].pdaDataCollection.value;

    var daData = new Array();
    daData = datafield.split('\n');
    //alert(daData[17]);
        if (CyclesPosition>=0){
          //  alert("begin Check Cycles");
            CheckCycles();
            //alert("Cycles Computed");
        }
        
        if(MBPosition>=0){
            CheckBalance();
            //alert("Mass Balance Computed");
        }
        
        if (SIPosition >=0 ){
            CheckSatIndex();
            //alert("Tower Sat Index Computed");
        }
        

        forward333(); //force a save 
        
     //alert("Calculations Complete!");

    
    
}


function doCalcs(){
alert("Calculating");
    var position =0;
    //find the position of Chlorides
    var field = document.forms[0].PDAEquipTest.value;
    var daList = new Array();
    daList = field.split('\n');
    
    var CyclesPosition= daList.indexOf('Cycles');
    //alert("Cycles position " + CyclesPosition);
    
    var MBPosition = daList.indexOf('MassBalance');
    //alert("Mass Balance position " + MBPosition);
    
    
    var SIPosition = daList.indexOf('SaturationIndex');
    //alert("Sat Index position " + SIPosition);
    
    //Reset Cycles
    datafield = document.forms[0].pdaDataCollection.value;

    var daData = new Array();
    daData = datafield.split('\n');
    //alert(daData[17]);
        if (CyclesPosition>=0){
          //  alert("begin Check Cycles");
            CheckCycles();
            alert("Cycles Computed");
        }
        
        if(MBPosition>=0){
            CheckBalance();
            alert("Mass Balance Computed");
        }
        
        if (SIPosition >=0 ){
            CheckSatIndex();
            alert("Tower Sat Index Computed");
        }
        

        forward333(); //force a save 
        
     alert("Calculations Complete!");

    
    
}

function resetCalcs(){
    //alert("Reset Calcs");
    var position =0;
    //find the position of Chlorides
    var field = document.forms[0].PDAEquipTest.value;
    var daList = new Array();
    daList = field.split('\n');
    
    var CyclesPosition= daList.indexOf('Cycles');
    //alert("Cycles position " + CyclesPosition);
    
    var MBPosition = daList.indexOf('MassBalance');
    //alert("Mass Balance position " + MBPosition);
    
    
    var SIPosition = daList.indexOf('SaturationIndex');
    //alert("Sat Index position " + SIPosition);
    
    //Reset Cycles
    datafield = document.forms[0].pdaDataCollection.value;

    var daData = new Array();
    daData = datafield.split('\n');
    //alert(daData[17]);
        if (CyclesPosition>=0){
        daData[CyclesPosition] =  "towerCycles"
            alert("Cycles Reset");
        }
        
        if(MBPosition>=0){
        daData[MBPosition] =  "towerMassBalance"
            alert("Mass Balance Reset");
        }
        
        if (SIPosition >=0 ){
        daData[SIPosition] =  "towerSatIndex"
            alert("Tower Sat Index Reset");
        }
        
     //Put it all back together again 
    // document.forms[0].equipDataCollection.value = daData.join('\n');
     document.forms[0].pdaDataCollection.value = daData.join('\n');
     
     alert("Reset Complete!");
    
    
}


function CheckCycles() {
    //alert("Calculating Cycles");

        var position =0;
        //find the position of Chlorides
        var field = document.forms[0].PDAEquipTest.value;
        var daList = new Array();
        daList = field.split('\n');
        var position= daList.indexOf('Chlorides');
        //alert("position " + position);
        datafield = document.forms[0].pdaDataCollection.value;


        /////////////////////////
        datafield = document.forms[0].pdaDataCollection.value;
        var daData = new Array();
        daData = datafield.split('\n');

        //var TPosition = daData.indexOf('towerCycles');
        var TPosition = daList.indexOf('Cycles');
        //alert("TPosition  " + TPosition );
        //////////////




        //perform validations
        with (document.forms[0])
        {
            if (validate_required(chlorides,"Chlorides Make Up must be filled out!")==false)
          {chlorides.focus();return false;}
          
         }



       // var daData = new Array();
      //  daData = datafield.split('\n');
        var towerChloridesReading = daData[position];
        var mCL = document.forms[0].chlorides.value;
        //alert ("towerChloridesReading: " +towerChloridesReading);
        //convert to number
        towerChloridesReading = towerChloridesReading*1;
        mCL = mCL *1;
        towerCycles =  towerChloridesReading / mCL; 
        towerCycles = String(towerCycles.toFixed(2)); //CONVERT to String & 2 decimals places
        //towerCycles = String(towerCycles);

       // alert(towerCycles);
        
        //alert(document.forms[0].pdaDataCollection.value);
        
        //Swap the word towerCycles for the new value
      //  document.forms[0].pdaDataCollection.value = document.forms[0].pdaDataCollection.value.replace('towerCycles',towerCycles);
        
        if(document.forms[0].daData.value == 'towerCycles'){
                 document.forms[0].daData.value = document.forms[0].daData.value.replace('towerCycles',towerCycles);
        }
        
        ///////////////////////////////////////////
        //Create an Array to store all the values
        var TowerCyclesDataArray = new Array();
        TowerCyclesDataArray  = frm.pdaDataCollection.value.split('\n');
        TowerCyclesDataArray[TPosition] = towerCycles;
        document.forms[0].pdaDataCollection.value = TowerCyclesDataArray.join("\n") ;
//alert("h " + document.forms[0].pdaDataCollection.value);


        //show("hiddenFields");
        TPosition = TPosition*1;
        //alert("tposition  " + TPosition);
        var SIoffSet =document.forms[0].o.value;
        SIoffSet= SIoffSet*1;
        var DataNameSingle= new Array();
        DataNameSingle = frm.equipDataCollection.value.split('\n');


        //This is the offset plut the current postion
        var ii = document.forms[0].i.value *1;
        //alert(DataNameSingle [TPosition+SIoffSet-ii])


        DataNameSingle [TPosition+SIoffSet-ii] =towerCycles;
//alert (DataNameSingle [TPosition+SIoffSet-ii]);
        document.forms[0].equipDataCollection.value = DataNameSingle;
        //document.forms[0].equipDataCollection.value = document.forms[0].equipDataCollection.value.split('\r'); 
        document.forms[0].equipDataCollection.value = document.forms[0].equipDataCollection.value.replace(/,/gi,'\r');

        //alert(document.forms[0].equipDataCollection.value)

        //saveReport (custid, "EquipDataCollection", document.forms[0].equipDataCollection.value );

        //Save it to WebSQL 
        SaveCalcs();

        
        
    }

function forward333() {
	//alert("fwd333");
	frm = document.forms[0];
	frm.direction.value = "forward";
	
//	document.getElementById('daData').type = "number";
	
	var BreakPointArray = new Array();
	BreakPointArray = document.forms[0].breakpoints.value.split(',');

	//alert("breakpoint "+ BreakPointArray);
	
	var selectedEquip = frm.EquipList.selectedIndex;  
	//alert("selected equip list" + selectedEquip );

	
	
	
	//document.getElementById('daData').type = "number";
	
	
	
	var i = daIndex;

	document.forms[0].r.value = daIndex;
	document.forms[0].i.value = i;
	var offset = i +(BreakPointArray[frm.EquipList.selectedIndex]*1);
	document.forms[0].o.value = offset;

	var DataSingle= new Array();
	DataRangeSingle =new Array();

	var AllData = new Array();
	var AllRangeData = new Array;

	var AllEquipVals = new Array();
	var AllRangeVals = new Array();

	DataSingle = frm.pdaDataCollection.value.split('\n');
	DataRangeSingle = frm.PDAEquipRange.value.split('\n');

	AllData = frm.equipDataCollection.value.split('\n');
	AllRangeData = frm.parseRange.value.split('\n');
	//alert( DataSingle );


	if (i-1>=0){
	//alert("index: " + frm.EquipList.selectedIndex);
	
	DataRangeSingle[i-1] =frm.RangeName.value;

	//Added to Allow Text Entries is Equipment is from JC Penny's
	var selectedEquip = document.forms[0].EquipList.selectedIndex;  
    var daJCPennyTest = document.forms[0].EquipList.options[selectedEquip].text;
    //This has to match the equipment name in the Matrix in the C2 database
    
    if(daJCPennyTest=="JCP Water Treatment Task Sheet" | daJCPennyTest=="WTTS" ) {
    	
    	hide("daData");
		show("daJCPText");
    	
    	//alert("JCP TEXT:"+daJCPennyTest);
    		DataSingle[i-1] =frm.daJCPText.value;
    		AllData[offset-1] =frm.daJCPText.value;
    		//alert("index: " + i);
    		//alert("offset" + offset);
     } else  {
    	 
    	// alert("Else index: " + i);
 		//alert("Else offset" + offset);
    	// alert("JCP TEXT:"+daJCPennyTest);
    	show("daData");
 		hide("daJCPText");
 		
    	 if (frm.daData.value.length > 1){
         var trimmedData1 = frm.daData.value.replace(/^[0]+/g,"");
	//Replace Asterix
	var trimmedData2 = trimmedData1.replace("*", ".") //3-9-12

       var trimmedData = trimmedData2.replace(/^[.]/g,"0."); //Add 0 if there is a decimal        modded 3-9-12	
    		 	DataSingle[i-1] =trimmedData;
        		
        		frm.daData.value = "";
    		
        		AllData[offset-1] =trimmedData;} 
    	 else {
    	//	 alert("Else 2 index: " + frm.daData.value);
    		 DataSingle[i-1] = frm.daData.value;
    		 
 		 	AllData[offset-1] = frm.daData.value;
    	 }
	}
	//End JCPenny Code
    
	AllRangeData [offset-1] = frm.RangeName.value;
	frm.pdaDataCollection.value = DataSingle.join('\n');
	//alert(DataRangeSingle.join('\n'));
	frm.PDAEquipRange.value = DataRangeSingle.join('\n');

	frm.parseRange.value = AllRangeData.join('\n');
	frm.equipDataCollection.value = AllData.join('\n');
	
	}


	var TestNameSingle= new Array();
	TestNameSingle = frm.PDAEquipTest.value.split('\n');



	//alert(daIndex);
	//Check for the upper bound of the Array
	if ( i > TestNameSingle.length-1) {
	//alert("End of the line");
	daIndex = 0;
	i=0;
	document.forms[0].r.value = daIndex;
	document.forms[0].i.value = i;
	
	//Save the Readings
	var  EquipDataCollection1   = document.forms[0].equipDataCollection.value;
    //alert("data "+ EquipDataCollection1);
    
    var custid = document.getElementById("customer_templates").value;
	
    saveReport (custid, "equipDataCollection", EquipDataCollection1);
     

    //Now Save the Range Data to the Webstorage
    var  RangeDataCollection1   = document.forms[0].parseRange.value;
    var custid = document.getElementById("customer_templates").value;
    saveReport (custid, "EquipRange", RangeDataCollection1);
    
	
	}else 
	{

	document.forms[0].r.value = daIndex;
	document.forms[0].i.value = i;
	}


	document.getElementById('testname').innerHTML = "<h3>"+TestNameSingle[i]+"</h3>";

	//Auto Calc Cycles, Mass Balance, Sat Index
	if (TestNameSingle[i] == "Cycles") {
	CheckCycles();
	}

	if (TestNameSingle[i] == "MassBalance") {
	CheckBalance();
	}
	//SaturationIndex
	if (TestNameSingle[i] == "SaturationIndex") {
	CheckSatIndex();
	}


	//Range
	var RangeNameSingle= new Array();
	RangeNameSingle = frm.PDAEquipRange.value.split('\n');
	frm.RangeName.value = RangeNameSingle [i];

	//Data
	var DataNameSingle= new Array();
	DataNameSingle = frm.pdaDataCollection.value.split('\n');
	
	
	frm.daData.value = DataNameSingle [i];
	
	
	
	//added daJCPText
	frm.daJCPText.value = DataNameSingle [i];
	
	//alert("join" + document.forms[0].equipDataCollection.join(";"));
	//saveReadings each time!

	var  EquipDataCollection1   = document.forms[0].equipDataCollection.value;
	//alert("data "+ EquipDataCollection1);
	
	var custid = document.getElementById("customer_templates").value;
	saveReport (custid, "equipDataCollection", EquipDataCollection1);
	 

	//Now Save the Range Data to the Webstorage
	var  RangeDataCollection1   = document.forms[0].parseRange.value;
	var custid = document.getElementById("customer_templates").value;
	saveReport (custid, "EquipRange", RangeDataCollection1);

	    
	//Increment Counter
	daIndex = daIndex +1;


	//}

	 if(daJCPennyTest=="JCP Water Treatment Task Sheet" | daJCPennyTest=="WTTS" ) {
     //    document.getElementById("RangeName").focus();
           
 //      setTimeout("document.getElementById('daJCPText').focus();", 50);
   //    setTimeout("document.getElementById('daJCPText').select();", 50);
	    document.forms[0].daJCPText.focus();
       
     } 
	 else 
	    {
			//Added 3-8-12
	    document.forms[0].daData.focus();
	  
   
        }
	


	
}

	

function autoBackspace(){
    //select whats in the field

    
    var currentValue = document.getElementById('daData').value;
	var currLength = document.getElementById('daData').value.length;
	
    alert(currentValue);
	
    if (currentValue == '0' );
	{
		if(currLength == 0){
		   document.getElementById('daData').value ="";	
		 }
    }
}

	function CheckBalance() {
		//balance = (towerCalcium/makeupCalcium) - (towerChloride/makeupChloride). 

		//makeupChlorides 
		var makeupChlorides = document.forms[0].chlorides.value *1; //Convert to number

		//TowerCalcium
		var position =0;
		//find the position of Chlorides
		var field = document.forms[0].PDAEquipTest.value;
		var daList = new Array();
		daList = field.split('\n');
		var position= daList.indexOf('Calcium');
		//alert("position " + position);
		datafield = document.forms[0].pdaDataCollection.value;
		var daData = new Array();
		daData = datafield.split('\n');
		var TowerCalcium = daData[position];
		//alert ("tower calcium " + TowerCalcium); 
		TowerCalcium = TowerCalcium *1;

		/////////////////////////
		var TPosition = daList.indexOf('MassBalance');
		//alert("TPosition  " + TPosition );
		//////////////

		var position2= daList.indexOf('Chlorides');
		//alert("position " + position);

		var TowerChloride = daData[position2];
		//alert ("tower Chlorides " + TowerChloride ); 
		TowerChloride =TowerChloride *1;
		//makeupCalcium
		var makeupCalcium = document.forms[0].calciumHardness.value *1; //Convert to a number


		//perform validations
		//TowerCalcium/makeupCalcium) - (TowerChloride/makeupChlorides)
		with (document.forms[0])
		{

		      if (validate_required(calciumHardness,"Calcium Hardness Make Up must be filled out!")==false)
		  {calciumHardness.focus();return false;}
		  
		      if (validate_required(chlorides,"Chlorides Make Up must be filled out!")==false)
		  {chlorides.focus();return false;}
		  
		 }



		//balance = (towerCalcium/makeupCalcium) - (towerChloride/makeupChloride). 
		balance = (TowerCalcium/makeupCalcium) - (TowerChloride/makeupChlorides); 

		//alert(balance);
		balance = String(balance.toFixed(2));  // Convert to String and make 2 decimal places


		//Swap the word towerBalance for the new value
		//document.forms[0].pdaDataCollection.value = document.forms[0].pdaDataCollection.value.replace('towerMassBalance',balance);
		//document.forms[0].daData.value = document.forms[0].daData.value.replace('towerMassBalance',balance);
		//New Code
		//Create an Array to store all the values
		var BalanceDataArray = new Array();
		BalanceDataArray   = frm.pdaDataCollection.value.split('\n');
		BalanceDataArray [TPosition] = balance;
		document.forms[0].pdaDataCollection.value = BalanceDataArray.join("\n") ;

		///////////////////////////////////////////

		//show("hiddenFields");
		TPosition = TPosition*1;
		//alert("tposition  " + TPosition);
		var SIoffSet =document.forms[0].o.value;
		SIoffSet= SIoffSet*1;
		var DataNameSingle= new Array();
		DataNameSingle = frm.equipDataCollection.value.split('\n');

		//This is the offset plut the current postion
		var ii = document.forms[0].i.value *1;
		//alert(DataNameSingle [TPosition+SIoffSet-ii])


		DataNameSingle [TPosition+SIoffSet-ii] =balance;
		//alert (DataNameSingle [TPosition+SIoffSet-ii])
		document.forms[0].equipDataCollection.value = DataNameSingle;
		//document.forms[0].equipDataCollection.value = document.forms[0].equipDataCollection.value.split('\r'); 
		document.forms[0].equipDataCollection.value = document.forms[0].equipDataCollection.value.replace(/,/gi,'\r');

		//alert(document.forms[0].equipDataCollection.value)

		//Save it to WebSQL 
		SaveCalcs();

	}

	function CheckSatIndex() {
	//alert("Automatically Calculating Sat Index");
	//window.SatIndex.click();
		var position =0;
		//find the position of Chlorides
		var field = document.forms[0].PDAEquipTest.value;
		var daList = new Array();
		daList = field.split('\n');
		//Is this a Tower Valid for testing Conductivity if not drop out
		var TPosition= daList.indexOf('SaturationIndex');
		//alert(TPosition);
		//alert(document.forms[0].o.value);
		TPosition = TPosition*1;
		var SIoffSet =document.forms[0].o.value;
		SIoffSet= SIoffSet*1;


		//alert(TPosition+SIoffSet);

		if (TPosition == -1)
			{
		//exit function	
		alert("This is not a Tower");
		return false;
			}



		var position= daList.indexOf('Conductivity');
		//alert("position " + position);
		datafield = document.forms[0].pdaDataCollection.value;
		var daData = new Array();
		daData = datafield.split('\n');
		var Conductivity = daData[position];
		//alert ("Conductivity " + Conductivity); 
		B3 = Conductivity  *1;
		//alert(B3);
		//if(B3==0){alert("Please Enter a Value for Conductivity"); return false;}
		
	      while (B3==0 | B3==null)
	        {
	          //alert("B5:" + B5);
	          B3 = prompt("Please Enter a Value for Conductivity","1");       
	          
	          datafield = document.forms[0].pdaDataCollection.value;
	          var daData = new Array();
	          daData = datafield.split('\n');
	              
	              daData[position] = B3
	                           
	           //Put it all back together again 
	          // document.forms[0].equipDataCollection.value = daData.join('\n');
	           document.forms[0].pdaDataCollection.value = daData.join('\n');
	           
	              
	          
	        } //WEND
		
		
		
		
		


		//WaterTemp or MaxSkinTemp can be used
		var skinposition= daList.indexOf('MaxSkinTemp');
		
		//alert("Skin Temp position " + skinposition);
		
		var position2= daList.indexOf('WaterTemp');
		//alert("WaterTemp position: " +position2);
		
		if (position2== -1) {var position2 = skinposition }
				
		//alert("postion2 result " + position2);
		
		var WaterTemp = daData[position2];
		//alert ("Water Temp " + WaterTemp); 
		WaterTemp =WaterTemp  *1;
		B4 = WaterTemp;
		//if(B4==0){alert("Please Enter a Value for Water Temp"); return false;}

	    while (B4==0 | B4==null)
        {
          //alert("B5:" + B5);
          B4 = prompt("Please Enter a Value for Water Temp","60");       
          
          datafield = document.forms[0].pdaDataCollection.value;
          var daData = new Array();
          daData = datafield.split('\n');
              
              daData[position2] = B4
                           
           //Put it all back together again 
          // document.forms[0].equipDataCollection.value = daData.join('\n');
           document.forms[0].pdaDataCollection.value = daData.join('\n');
           
              
          
        } //WEND
		
		
		
		
		
		

		//Calcium
		var position3= daList.indexOf('Calcium');
		var Calcium = daData[position3];
		//alert ("tower Chlorides " + TowerChloride ); 
		//alert ("Calcium " + Calcium); 
		Calcium =Calcium  *1;
		B5 = Calcium;
		
		//if(B5==0){alert("Please Enter a Value for Calcium"); return false;}
		
		while (B5==0 | B5==null)
        {
          //alert("B5:" + B5);
          B5 = prompt("Please Enter a Value for Calcium","1");
        //  alert("position" + position3);
//this puts the Calcium value in the column and Calculation          
          
          datafield = document.forms[0].pdaDataCollection.value;
          var daData = new Array();
          daData = datafield.split('\n');
              
              daData[position3] = B5
           
                                   
           //Put it all back together again 
          // document.forms[0].equipDataCollection.value = daData.join('\n');
           document.forms[0].pdaDataCollection.value = daData.join('\n');
           
              
          
        } //WEND

		//M.Alkalinity
		var position4= daList.indexOf('M.Alkalinity');
		var MAlkalinity = daData[position4];
		//alert ("tower Chlorides " + TowerChloride ); 
		//alert ("M.Alkalinity " + MAlkalinity); 
		MAlkalinity =MAlkalinity  *1;
		B6 = MAlkalinity;
		//if(B6==0){alert("Please Enter a Value for M.Alkalinity"); return false;}
		
		
	      while (B6==0 | B6==null)
	        {
	          //alert("B5:" + B5);
	          B6 = prompt("Please Enter a Value for M.Alkalinity","1");       
	          
	          datafield = document.forms[0].pdaDataCollection.value;
	          var daData = new Array();
	          daData = datafield.split('\n');
	              
	              daData[position4] = B6
	                           
	           //Put it all back together again 
	          // document.forms[0].equipDataCollection.value = daData.join('\n');
	           document.forms[0].pdaDataCollection.value = daData.join('\n');
	           
	              
	          
	        } //WEND
		

		//The Formula


		result =((2*((9.3+((log10(B3/1.33)-1)/10)+(((-13.12*log10(((B4-32)*5/9)+273))+34.55)))-(((log10(B5)-0.4)+log10(B6)))))-((1.465*log10(B6))+4.54));



		function log10(val) {
		 return Math.log(val) / Math.log(10);
		}



		result = String(result.toFixed(2));  // Convert to String and make 2 decimal places

		//Swap the word towerSatIndex for the new value
		document.forms[0].pdaDataCollection.value = document.forms[0].pdaDataCollection.value.replace('towerSatIndex',result);
		document.forms[0].daData.value = document.forms[0].daData.value.replace('towerSatIndex',result);

		/////////////////////////////////////////////////////////////

		var DataNameSingle= new Array();
		DataNameSingle = frm.equipDataCollection.value.split('\n');
		//alert(DataNameSingle [TPosition+SIoffSet]);
		//This is the offset plut the current poistion
		var ii = document.forms[0].i.value *1;
		//alert(DataNameSingle [TPosition+SIoffSet-ii])


		DataNameSingle [TPosition+SIoffSet-ii] =result;

		document.forms[0].equipDataCollection.value = DataNameSingle;
		//document.forms[0].equipDataCollection.value = document.forms[0].equipDataCollection.value.split('\r'); 
		document.forms[0].equipDataCollection.value = document.forms[0].equipDataCollection.value.replace(/,/gi,'\r');

		//Save it to WebSQL 
		SaveCalcs();
	}
	
	
	function SaveCalcs() {
		
		//alert("saving..");
		//saveReadings each time!
		var  EquipDataCollection1   = document.forms[0].equipDataCollection.value;

		var custid = document.getElementById("customer_templates").value;
		saveReport (custid, "EquipDataCollection", EquipDataCollection1);

		//Now Save the Range Data to the Webstorage
		var  RangeDataCollection1   = document.forms[0].parseRange.value;
		var custid = document.getElementById("customer_templates").value;
		saveReport (custid, "EquipRange", RangeDataCollection1);
		
	}
	
	
	function SaveDaData() {
		
		//alert("saving..");
		//saveReadings each time!
		
		
		frm = document.forms[0];
	frm.direction.value = "forward";
	
//	document.getElementById('daData').type = "number";
	
	var BreakPointArray = new Array();
	BreakPointArray = document.forms[0].breakpoints.value.split(',');

	//alert("breakpoint "+ BreakPointArray);
	
	var selectedEquip = frm.EquipList.selectedIndex;  
	//alert("selected equip list" + selectedEquip );

	
	
	
	//document.getElementById('daData').type = "number";
	
	
	
	var i = daIndex;

	document.forms[0].r.value = daIndex;
	document.forms[0].i.value = i;
	var offset = i +(BreakPointArray[frm.EquipList.selectedIndex]*1);
	document.forms[0].o.value = offset;

	var DataSingle= new Array();
	DataRangeSingle =new Array();

	var AllData = new Array();
	var AllRangeData = new Array;

	var AllEquipVals = new Array();
	var AllRangeVals = new Array();

	DataSingle = frm.pdaDataCollection.value.split('\n');
	DataRangeSingle = frm.PDAEquipRange.value.split('\n');

	AllData = frm.equipDataCollection.value.split('\n');
	AllRangeData = frm.parseRange.value.split('\n');
	//alert( DataSingle );


	if (i-1>=0){
	//alert("index: " + frm.EquipList.selectedIndex);
	
	DataRangeSingle[i-1] =frm.RangeName.value;

	//Added to Allow Text Entries is Equipment is from JC Penny's
	var selectedEquip = document.forms[0].EquipList.selectedIndex;  
    var daJCPennyTest = document.forms[0].EquipList.options[selectedEquip].text;
    //This has to match the equipment name in the Matrix in the C2 database
    
    if(daJCPennyTest=="JCP Water Treatment Task Sheet" | daJCPennyTest=="WTTS" ) {
    	
    	hide("daData");
		show("daJCPText");
    	
    	//alert("JCP TEXT:"+daJCPennyTest);
    		DataSingle[i-1] =frm.daJCPText.value;
    		AllData[offset-1] =frm.daJCPText.value;
    		//alert("index: " + i);
    		//alert("offset" + offset);
     } else  {
    	 
    	// alert("Else index: " + i);
 		//alert("Else offset" + offset);
    	// alert("JCP TEXT:"+daJCPennyTest);
    	show("daData");
 		hide("daJCPText");
 		
    	 if (frm.daData.value.length > 1){
         var trimmedData1 = frm.daData.value.replace(/^[0]+/g,"");
	//Replace Asterix
	var trimmedData2 = trimmedData1.replace("*", ".") //3-9-12

       var trimmedData = trimmedData2.replace(/^[.]/g,"0."); //Add 0 if there is a decimal        modded 3-9-12	
    		 	DataSingle[i-1] =trimmedData;
        		
        	//	frm.daData.value = "";
    		
        		AllData[offset-1] =trimmedData;} 
    	 else {
    	//	 alert("Else 2 index: " + frm.daData.value);
    		 DataSingle[i-1] = frm.daData.value;
    		 
 		 	AllData[offset-1] = frm.daData.value;
    	 }
	}
	//End JCPenny Code
    
	AllRangeData [offset-1] = frm.RangeName.value;
	frm.pdaDataCollection.value = DataSingle.join('\n');
	//alert(DataRangeSingle.join('\n'));
	frm.PDAEquipRange.value = DataRangeSingle.join('\n');

	frm.parseRange.value = AllRangeData.join('\n');
	frm.equipDataCollection.value = AllData.join('\n');
	
	}
		
		
		
		
		
		
		
		
		
		
		//Save the readings
		var custid = document.getElementById("customer_templates").value;
		saveReport (custid, "equipDataCollection", frm.equipDataCollection.value);
		//Now Save the Range Data to the Webstorage
	
		saveReport (custid, "EquipRange", document.forms[0].parseRange.value);
		
	}
	
	

