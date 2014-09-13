    //document.getElementById('GraphEquipListHist').innerHTML = 	''
	//  document.getElementById('GraphEquipTestHist').innerHTML = 	''
   
function myGraphCallback (parameter)  // parameter is the index in the array you want to show in the graph
    {
	//Initialize Global Vars
   	//8-29-12  Added Arrays to store the Graph Data Values
	
	
	//document.getElementById('GraphEquipTestHist').innerHTML = 	''
	
	var custid = localStorage.getItem('custid');
	var customerName = localStorage.getItem('customerName');
		var count =0;
	//alert(custid+" " + customerName);
	
	localStorage.setItem('customerNameGraph', customerName);
	var daDateLabels= new Array();
	var daConductivity = new Array();
	var daGraphData = new Array();
    var GraphDataConductivity = new Array();
		
		
	 
	
	//console.log('myGraphCallback  custid:'+custid);
	//Select the data from the history table
	
	loadHistory (custid);
	//alert(parameter);

////////////////////////////////Load History Function ///////////////////////////////////////////	
	function loadHistory(custid)
	{
	
	//console.log ("check history table " + custid +" is the cust id");
	
			historyDB.transaction(
				function (transaction) {
					transaction.executeSql("SELECT * from History where custid='"+custid+"';", [], dataHandlerHistory, errorHandler);
				}  
			);
	}
	
	function dataHandlerHistory(transaction, results)
	{


			//Need at least 2 data points in order to plot
			if (results.rows.length < 2) {
			//console.log('No History Records Found');
			//alert('No History to Graph: ' + results.rows.length);
			//hide('GraphImage');
					
			}

			
/*			
	if (results.rows.length > 0) {
	
	   var row = results.rows.item(0);
	
	
	console.log("# Historical Records found: "+ results.rows.length);
	//Format the Report Date from history
		
		//alert("MakeUp -  " + row['MakeUp']);
	
	MakeUpArray = row['MakeUp'].split("~");
	//alert('entire row of data');
	//alert (row['equipDataCollection']);
	
	//pre populate the equpment readindgs - field at bottom on ereport.html
	equipReadingsArray = row['equipDataCollection'].replace(/~/gi, "\r\n");

	
	}
*/	
	
	
	if(results.rows.length >2){

	 //alert("results.rows.length  " +  results.rows.length);
	 for(var i=0; i < results.rows.length; i++){
		var row = results.rows.item(i);
			
		dateString = row.ReportDate
		makeUpString = row.MakeUp
		
			var curr_date =  dateString.substring(6, 9);
			//alert(curr_date);
			var curr_month = dateString.substring(4, 6);
			//alert(curr_month);
			var curr_year = dateString.substring(0, 4);
			//alert(curr_year);
		
			daDate =   curr_month  + '/' + curr_date + '/' + curr_year;

			dataLength = row.equipDataCollection.indexOf('~');
			
			var arrLabels = row.parseEquipTestNames.split( "~" );
						
			var arrReadings = row.equipDataCollection.split( "~" );
			
			
			//populate the dropdown
			//var GraphEquipTestHistSelect = document.getElementById("GraphEquipTestHist");
			//GraphEquipTestHistSelect.options[GraphEquipTestHistSelect.options.length] = new Option(arrLabels[i], i); 

			//use the date and the make up as the value..genius!  
			
			
			//alert(arrLabels[parameter] +": " + arrReadings[parameter]);
			//alert(arrLabels[1] +": " + arrReadings[1]);
			//alert(arrLabels[2] +": " + arrReadings[2]);
			//alert(arrLabels[3] +": " + arrReadings[3]);
	   
		  // daDateLabels[i] = daDate; // x axis of the graph 
		  
		   //daGraphData[i] = row.equipDataCollection.substring(0,dataLength); // the graph data seperated by ,
		   
		   //Combine Date and the Value in order to be Sorted
		   //GraphDataConductivity[i] =  daDate +"~" + row.equipDataCollection.substring(0,dataLength); 
		   		   GraphDataConductivity[i] =  daDate +"~" + arrReadings[parameter];
		   
		   

		   //Sort the values using the Date 
		   GraphDataConductivity.sort();
			   

		   //console.log('Conductivity Data: '  + GraphDataConductivity  ) ;
	
	

	
	
	} //end For Loop
	
	
	
	//List Hist Populate the  equipment
			
										var EquipArray = new Array();

										EquipArray = row['parseEquipname'].split('~');
										TestArray = row['parseEquipTestNames'].split('~');
									
										//alert("HERE Equip array length: "+EquipArray.length);
										start = EquipArray[0];
										//alert("start " + start);
										document.forms[0].breakpoints.value = "0,";
										//alert("BP " + document.forms[0].breakpoints.value );

										//init the equip dropdown
										
										document.getElementById('GraphEquipListHist').innerHTML = 	'';
										
										
										var oSelect = document.getElementById('GraphEquipListHist');
										var oOption = document.createElement('OPTION');
										//alert(oSelect);
										// Add the option to the collection first, then set properties
										equipOption = start;
										//alert ("equipOption : " + equipOption);

										oSelect.options.add(oOption);
										oOption.innerHTML = equipOption;
										//oOption.value = equipOption;
										oOption.value = i;
										
										
										//alert("length " + EquipArray.length);

										
								
										   
										for(i = 0; i < EquipArray.length; i++){
													if (start !=EquipArray[i]) {
													start = EquipArray[i];
													document.forms[0].breakpoints.value =  document.forms[0].breakpoints.value + i + "," ;
													
													
													    var temp = new Array();    
													
													
											//		alert("BP " + document.forms[0].breakpoints.value );
												
													BPArray = document.forms[0].breakpoints.value.split(',');
												
											//		alert("BPArray " + temp[0]);
													
													oOption.value = i;
													
													count= count+1; 
													////////////////////

											document.getElementById('GraphEquipListHist').innerHTML += '<option value ="'+i+'">'+ EquipArray[i].toString() +'</option>'
											//alert("i " +i +" " +  EquipArray[i].toString() );

													}
													document.getElementById('GraphEquipListHist').innerHTML += '<option value ="'+i+'">'+ EquipArray[i].toString() +"-" +TestArray[i].toString()+'</option>'
										
													
									
													
										}
			
			
	
	
	
	
	
			//Conductivity
		   for(var q=0; q < GraphDataConductivity.length; q++){
		   
		   //alert(GraphDataConductivity[q].substring(0,10));
		   //alert(GraphDataConductivity[q].substring(11));
		   
		     daDateLabels[q] = GraphDataConductivity[q].substring(0,10); // the date value
				//alert(row.equipDataCollection.substring(0,dataLength));
			 daGraphData[q] = GraphDataConductivity[q].substring(11); // the graph data seperated by ,
		   
		   
		   }//end for loop
	
	//alert(daDateLabels);
	//alert(daGraphData);
		
	//localStorage.setItem('dataLabel', daDateLabels);
	//localStorage.setItem('GraphData', daGraphData);
	
	var title = localStorage.getItem('customerNameGraph');
	var cats = daDateLabels;
	var data = daGraphData;
	var reading = arrLabels[parameter] ;
	
	//alert("reading " + reading);
	
	//create the chart and pass its the values
	chartIT(title, cats, data, reading)
	
	
	}//end if statment


	} //end dataHandler History
	
		
    }  //end myGraphCallback 
	
	
	
	

  
	
	
	function chartIT(title, cats, data, reading){
	

	
		console.log("In chartIT function");
		//alert("In chartIT function");
		
		var data = eval("["+data+"]");
				
      chart1 = new Highcharts.Chart({
         chart: {
            renderTo: 'containerGraph',
            type: 'line'
         },
         title: {
          		text: title  // customerName passed to myGraphCallback function
         },
         xAxis: {
            //categories: ['Apples', 'Bananas', 'Oranges']
			categories: cats
         },
         yAxis: {
            title: {
               text: 'Value'
            }
         },
         series: [{
            //name: 'Conductivity',
			name: reading,
            data: data
		
         }]
      });
   }// end chartIT
   
   
   function loadChartDropDowns(){
   
        //alert("loading equip");
        frm = document.forms[0];
        var BreakPointArray = new Array();
        BreakPointArray = document.forms[0].breakpoints.value.split(',');
        //alert("BreakPointArray: "+BreakPointArray[frm.EquipList.selectedIndex+1]);
        var selectedEquip = frm.GraphEquipListHist.selectedIndex; //Graph Equipment Dropdown 
		//alert("selectedEquip " + selectedEquip);
        var s = BreakPointArray[frm.GraphEquipListHist.selectedIndex];
        var e = BreakPointArray[frm.GraphEquipListHist.selectedIndex + 1];

        //convert text to number
        s1 = s * 1;
        e1 = e * 1;
		//alert("s "+s1);
		//alert("e" +e1);
		
        //PDA Equip Test Rows 
		
		//PDAEquipTest
		//6-14-12  Dynamically set the number of rows in the equipment
		//document.getElementById('PDAEquipTest').rows = (e1-s1);
		
        //build an array
        var temp = new Array();
        temp = document.forms[0].parseEquipTestNames.value.split('\n');
		//alert(temp);
        //select a slice of the array
        pdaEquipTest = temp.slice(s1, e1);
		//alert("pdaEquipTest " + pdaEquipTest);
		
		//document.getElementById('GraphEquipTestHist').innerHTML = '';
		
		for(i = 0; i < pdaEquipTest.length; i++){
		//alert("i"+i);
		//alert(pdaEquipTest[i].toString() );
							if (start !=pdaEquipTest[i]) {
						s1 = s * 1;
						i=i*1;
		//alert("s1 "+  s1);
		offset = parseInt(s1)+ parseInt(i);
		//alert("s1 +i "+  offset);
					//		   document.getElementById('GraphEquipTestHist').innerHTML += 	'<option value ="'+offset+'">'+ pdaEquipTest[i].toString() +'</option>'
		
		
		}
		}
		




   
   
   
   }//end loadChartDropDowns
   
   
	