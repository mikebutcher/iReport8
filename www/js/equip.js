
	

////////////////////////////////////////////////////////////////////////////////////////////
function rangeCalc () {

//FIELD VALIDATIONS
with (document.forms[0])
{

  if (validate_required(Conductivity,"Conductivity Make Up must be filled out!")==false)
  {Conductivity.focus();return false;}

  if (validate_required(calciumHardness,"Calcium Make Up must be filled out!")==false)
  {calciumHardness.focus();return false;}
  
    if (validate_required(alkalinity,"Alkalinity Make Up must be filled out!")==false)
  {alkalinity.focus();return false;}

    if (validate_required(chlorides,"Chlorides Make Up must be filled out!")==false)
  {chlorides.focus();return false;}
  
 }


//MakeUp Cycles
temp = document.forms[0].PDAEquipRange.value;
//alert(temp);
cycRange = document.forms[0].cycles.value.replace(","," - ");
//alert(cycRange);
document.forms[0].PDAEquipRange.value = temp.replace("makeupCycles", cycRange);
//Update all the makupCycles
document.forms[0].parseRange.value = document.forms[0].parseRange.value.replace(/makeupCycles/g, cycRange);
//alert("parseRange "+document.forms[0].parseRange.value);

//Conductivity Range
//ConductivityRange = makeupConductivity * CyclesLow "to" makeupConductivity * CyclesHigh 
cyclesArray = document.forms[0].cycles.value.split(",");
//alert( "cycles array" + cyclesArray[0] );
firstpart = cyclesArray[0] * document.forms[0].Conductivity.value;
//alert("first part"+ firstpart);
secondpart = cyclesArray[1] * document.forms[0].Conductivity.value;
//alert("second part"+ secondpart);
conductivityRange = firstpart + " - " +secondpart;
//alert("conductivity range  " + conductivityRange);
temp = document.forms[0].PDAEquipRange.value;
//alert(temp);
document.forms[0].PDAEquipRange.value = temp.replace("makeupConductivity", conductivityRange);
//temp =document.forms[0].parseRange.value;
document.forms[0].parseRange.value = document.forms[0].parseRange.value.replace(/makeupConductivity/g, conductivityRange);




//Calcium Range
CHvalue =document.forms[0].calciumHardness.value;
firstpart = cyclesArray[0] * CHvalue;
secondpart = cyclesArray[1] * CHvalue;
CalHardness = firstpart + " - " +secondpart;
//alert(conductivityRange);
temp = document.forms[0].PDAEquipRange.value;
//alert(temp);
document.forms[0].PDAEquipRange.value = temp.replace("makeupCalcium", CalHardness);
document.forms[0].parseRange.value = document.forms[0].parseRange.value.replace(/makeupCalcium/g, CalHardness);


//Alkalinity
AlkValue = document.forms[0].alkalinity.value;
firstpart = cyclesArray[0] * AlkValue;
secondpart = cyclesArray[1] * AlkValue;
AlkValue = firstpart + " - " +secondpart;
//alert(conductivityRange);
temp = document.forms[0].PDAEquipRange.value;
//alert(temp);
document.forms[0].PDAEquipRange.value = temp.replace("makeupM.Alkalinity", AlkValue);
document.forms[0].parseRange.value = document.forms[0].parseRange.value.replace(/makeupM.Alkalinity/g, AlkValue);


//Chlorides
Chlorides = document.forms[0].chlorides.value;
firstpart = cyclesArray[0] * Chlorides;
secondpart = cyclesArray[1] * Chlorides;
Chlorides = firstpart + " - " +secondpart;
//alert(conductivityRange);
temp = document.forms[0].PDAEquipRange.value;
//alert(temp);
document.forms[0].PDAEquipRange.value = temp.replace("makeupChloride", Chlorides);
document.forms[0].parseRange.value = document.forms[0].parseRange.value.replace(/makeupChloride/g, Chlorides);

}
//End Range Calc


////////////////////////////////////////////////////////////////////////




//////////////////////////////////      Backwards
function backward () {
    //alert("backwards");
	daIndex = daIndex -1;
	frm.direction.value = "backward";
	frm = document.forms[0];
	var BreakPointArray = new Array();
	BreakPointArray = document.forms[0].breakpoints.value.split(',');

	var selectedEquip = frm.EquipList.selectedIndex  ;
	//alert("selected equip list" + selectedEquip );
	//var i = daIndex+1;
	var i = daIndex-1;


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

	//Added to Allow Text Entries is Equipment is from JC Penny's
	var selectedEquip = document.forms[0].EquipList.selectedIndex;  
    var daJCPennyTest = document.forms[0].EquipList.options[selectedEquip].text;
    if(daJCPennyTest=="JCP Water Treatment Task Sheet" | daJCPennyTest=="WTTS" ) {
    	//alert("JCP TEXT Focus");
    		DataSingle[i+1] =frm.daJCPText.value;
    		AllData[offset+1] =frm.daJCPText.value;
    		
    		//set the focus to the data text field
    	       //document.getElementById("RangeName").focus();
    	       document.getElementById("daJCPText").focus();
    	       document.getElementById("daJCPText").select();
    		
     } else  {
   //Remove leading zeros 	 
    	 
    	 
   if (frm.daData.value.length > 1){
    	 var trimmedData = frm.daData.value.replace(/^[0]+/g,"");
    //alert(trimmedData);
    DataSingle[i+1] =trimmedData;
	AllData[offset+1] =trimmedData;
    	 }
   else
       {
    	 DataSingle[i+1] =frm.daData.value;
    	 AllData[offset+1] =frm.daData.value;
    	}
    	 

     //  document.getElementById("RangeName").focus();
     //  document.getElementById("daData").focus();
     //  document.getElementById("daData").select();

   	//added focus 4-25-12
 document.forms[0].daData.focus();
   
   
   //
   
	}
	//End JCPenny Code
	
	
	
	
	//DataSingle[i+1] =frm.daData.value;
	DataRangeSingle[i+1] =frm.RangeName.value;


	//AllData[offset+1] =frm.daData.value;
	AllRangeData [offset+1] = frm.RangeName.value;

	frm.pdaDataCollection.value = DataSingle.join('\n');

	//alert(DataRangeSingle.join('\n'));
	frm.PDAEquipRange.value = DataRangeSingle.join('\n');

	frm.parseRange.value = AllRangeData.join('\n');
	frm.equipDataCollection.value = AllData.join('\n');
	//Added code to push the value to the bottom

	var TestNameSingle= new Array();
	TestNameSingle = frm.PDAEquipTest.value.split('\n');



	//alert(daIndex);
	//Check for the upper bound of the Array
	//alert("i = "+i);
	if ( i < 0) {
	//alert(i);
	//alert("End of the line");
	TestNameSingle.length;
	daIndex = TestNameSingle.length-1;
	i=TestNameSingle.length-1;
	document.forms[0].r.value = daIndex;
	document.forms[0].i.value = i;
	//Added to correct skipping 
	daIndex = daIndex+1;

	}else 
	{
	i=daIndex-1;
	//alert("else");
	//alert("i"+i);
	//alert("daIndex " + daIndex);
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
	frm.daJCPText.value = DataNameSingle [i];
	//alert("join" + document.forms[0].equipDataCollection.join(";"));
	//saveReadings each time!

	var  EquipDataCollection1   = document.forms[0].equipDataCollection.value;
	var custid = document.getElementById("customer_templates").value;
	saveReport (custid, "EquipDataCollection", EquipDataCollection1);

	//Now Save the Range Data to the Webstorage
	var  RangeDataCollection1   = document.forms[0].parseRange.value;
	var custid = document.getElementById("customer_templates").value;
	saveReport (custid, "EquipRange", RangeDataCollection1);

	//added focus 4-25-12
 document.forms[0].daData.focus();
	   //Decrement Counter


   
	
/*
    if(daJCPennyTest=="JCP Water Treatment Task Sheet" | daJCPennyTest=="WTTS" ) {
        document.getElementById("RangeName").focus();
        document.getElementById("daJCPText").focus();
        document.getElementById("daJCPText").select();
    } else  {
        document.getElementById("RangeName").focus();
        document.getElementById("daData").focus();
        document.getElementById("daData").select();
       }
	*/
	
	}

//End Backwards
/////////////////////////////////////////////////////////////////////////////////
// Function Cycles
function Cycles(){
	
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



	var daData = new Array();
	daData = datafield.split('\n');
	var towerChloridesReading = daData[position];
	var mCL = document.forms[0].chlorides.value;
	//alert ("towerChloridesReading: " +towerChloridesReading);
	//convert to number
	towerChloridesReading = towerChloridesReading*1;
	mCL = mCL *1;
	towerCycles =  towerChloridesReading / mCL; 
	towerCycles = String(towerCycles.toFixed(2)); //CONVERT to String & 2 decimals places
	//towerCycles = String(towerCycles);

	//alert(towerCycles);

	//Swap the word towerCycles for the new value
	document.forms[0].pdaDataCollection.value = document.forms[0].pdaDataCollection.value.replace('towerCycles',towerCycles);
	document.forms[0].daData.value = document.forms[0].daData.value.replace('towerCycles',towerCycles);
	///////////////////////////////////////////
	//Create an Array to store all the values
	var TowerCyclesDataArray = new Array();
	TowerCyclesDataArray  = frm.pdaDataCollection.value.split('\n');
	TowerCyclesDataArray[TPosition] = towerCycles;
	document.forms[0].pdaDataCollection.value = TowerCyclesDataArray.join("\n") ;


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
	//alert (DataNameSingle [TPosition+SIoffSet-ii])
	document.forms[0].equipDataCollection.value = DataNameSingle;
	//document.forms[0].equipDataCollection.value = document.forms[0].equipDataCollection.value.split('\r'); 
	document.forms[0].equipDataCollection.value = document.forms[0].equipDataCollection.value.replace(/,/gi,'\r');

	//alert(document.forms[0].equipDataCollection.value)

	//saveReport (custid, "EquipDataCollection", document.forms[0].equipDataCollection.value );

	//Save it to WebSQL 
	//window.SaveCalcs.click();
	SaveCalcs ();
	
}

///////////////////////////////////////////////////////////////////////////////////////////
function Balance(){
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
	//window.SaveCalcs.click();
	SaveCalcs();
	
	
}

//////////////////////////////////////////////////////////////////////////////////////////////
function SatIndex(){
	//show("hiddenFields");

	// TowerSatIndex

	//Conductivity
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
	if(B3==0){alert("Please Enter a Value for Conductivity"); return false;}


	//Water Temp and MaxSkinTemp Temp
	var position2= daList.indexOf('WaterTemp');
	//10-19-12 Changed SkinTemp to MaxSkinTemp
	if (position2 ==-1){
	    var position2= daList.indexOf('MaxSkinTemp');
	}
	var WaterTemp = daData[position2];
	//alert ("Water Temp " + WaterTemp); 
	WaterTemp =WaterTemp  *1;
	B4 = WaterTemp;
	if(B4==0){alert("Please Enter a Value for Water Temp"); return false;}


	//Calcium
	var position3= daList.indexOf('Calcium');
	var Calcium = daData[position3];
	//alert ("tower Chlorides " + TowerChloride ); 
	//alert ("Calcium " + Calcium); 
	Calcium =Calcium  *1;
	B5 = Calcium;
	if(B5==0){alert("Please Enter a Value for Calcium"); return false;}

	//M.Alkalinity
	var position4= daList.indexOf('M.Alkalinity');
	var MAlkalinity = daData[position4];
	//alert ("tower Chlorides " + TowerChloride ); 
	//alert ("M.Alkalinity " + MAlkalinity); 
	MAlkalinity =MAlkalinity  *1;
	B6 = MAlkalinity;
	if(B6==0){alert("Please Enter a Value for M.Alkalinity"); return false;}

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
	//window.SaveCalcs.click();
	SaveCalcs();
}

///////////////////////////////////////////////////////////////////////////////////

function SaveCalcs () {
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




