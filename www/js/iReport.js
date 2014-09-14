var shortName = 'iReportDB'; // Global Variable for the name of the Database
var maxSize = 15 * 1024 * 1024; //Global Variable for the db size 15 MB
var localDB = null; // Global Variable for the WebSQLDB
var reportDB = null;
var historyDB = null;

var techname = localStorage.getItem("tech");

localStorage.setItem('photocount', 1);


///Production Templates
//BookView Pulled from Customer 2 Database

slURL = "http://www.chardonlabs.com/eReportv4.nsf/JSONTemplatesCATsingle2?ReadViewEntries&count=500&RestrictToCategory=" + techname + "&outputformat=json";
bvURL = "http://www.chardonlabs.com/Customer2.nsf/JSONBookView2?ReadViewEntries&count=500&RestrictToCategory=" + techname + "&outputformat=json";

//Technicians List from Keywords        
tlURL = "http://www.chardonlabs.com/CUSKEY.NSF/(json)?ReadViewEntries&count=500&RestrictToCategory=service+techs&outputformat=json"

//History from eReport Database
//limited to 200 records

//8-28-12 Updated to view with the report date sorted in a hidden column
//9-23-13  set to 200 entries for history


//10-17-13  Change back to 100 -->200
histURL = "http://www.chardonlabs.com/eReportv4.nsf/iPhoneHistory2?ReadViewEntries&count=200&RestrictToCategory=" + techname + "&outputformat=json";


function getTemplates() {

    $('#progress').remove();
 $('body').append('<div id="progress1">Connecting to Chardon</div>');
var t = setTimeout(" $('#progress1').remove();", 2800); //10 seconds


     var username = localStorage.getItem("username");
     var pw = localStorage.getItem("password");
    loginStatus = doDominoLoginSilent(username, pw);
    console.log("Login Status: " + loginStatus); 

if (loginStatus == true){
  bookViewLoaded = getBVTemplates();
  console.log('bookViewLoaded: '+ bookViewLoaded);
  //alert(bookViewLoaded);
}
if (loginStatus == true){
  HistoryLoaded = getHistoryTemplates();
  console.log('HistoryLoaded: '+ HistoryLoaded);
  //alert(bookViewLoaded);
}



// getSLTemplates(); 
// getHistory();
//  checkEmptyCustomer();

}

//Builds the iReport Database on the Device - it has 5 Tables




function initWEBDB() {


    var version = '1.0';
    var displayName = 'eReportDB';
    window.localDB = openDatabase(shortName, version, displayName, maxSize); // instantiate the Database
    
    window.reportDB = openDatabase("Reports", version, "Reports", maxSize); // instantiate the ReportDatabase
    //alert("reportDB ok");
    window.historyDB = openDatabase("History", version, "History", maxSize); // instantiate the ReportDatabase
    //alert("historyDB ok");
    //6-4-12 added error display for localDB
    localDB.onerror = function(e) {
       // alert("db error " + e);
        console.log(e);
    };




    reportDB.transaction(function(tx) {
        tx.executeSql('CREATE TABLE  IF NOT EXISTS Reports' + '(id INTEGER PRIMARY KEY autoincrement, custid TEXT, name TEXT, Status TEXT, timestamp TEXT, tech TEXT, ReportDate TEXT, Contact TEXT, notify TEXT, BillAddr2 TEXT, BillCity TEXT, BILLState TEXT, BillZip TEXT, Conductivity TEXT, calciumHardness TEXT,  alkalinity TEXT, chlorides TEXT,  EquipType TEXT, EquipName TEXT, EquipTest TEXT, EquipRange TEXT, EquipDataCollection TEXT, ActionsList TEXT, ActionNum TEXT, container BLOB, AccessGivenTo TEXT, Comments TEXT, mileage TEXT, Photo1 BLOB, Photo2 BLOB, Photo3 BLOB, Photo4 BLOB, Photo5 BLOB, Photo6 BLOB, Latitude Text, Longitude Text, StartTime Text, EndTime Text, ListType Text, exception Text  )', []);
    });



    historyDB.transaction(function(tx) {
        tx.executeSql('create table if not exists History' + '(id integer primary key autoincrement, custid TEXT, BillName TEXT, BillADDR1 TEXT, Notify TEXT, BillADDR2 TEXT, BillCity TEXT, BillState TEXT, BillZip TEXT, CorporateName TEXT, ReportDate TEXT, MakeUp TEXT, parseEquipType TEXT, parseEquipname TEXT, parseEquipTestNames TEXT, parseRange TEXT, equipDataCollection TEXT, LastMonthEquipDataCollection TEXT, cyclesLow TEXT, cyclesHigh TEXT, accessGivenTo TEXT, tech TEXT, Status TEXT,  ShipPhone TEXT)', []);
    });

    localDB.transaction(function(tx) {

        tx.executeSql('create table if not exists BookView' + '(id integer primary key autoincrement, custid TEXT, BillName TEXT, BillADDR1 TEXT, Notify TEXT, BillADDR2 TEXT, BillCity TEXT, BillState TEXT, BillZip TEXT, CorporateName TEXT, parseEquipType TEXT, parseEquipname TEXT, parseEquipTestNames TEXT, parseRange TEXT, equipDataCollection TEXT, cyclesLow TEXT, cyclesHigh TEXT, accessGivenTo TEXT, tech TEXT, Status TEXT, ShipPhone TEXT  )', []);

        tx.executeSql('create table if not exists Templates' + '(id integer primary key autoincrement, custid TEXT, BillName TEXT, BillADDR1 TEXT, Notify TEXT, BillADDR2 TEXT, BillCity TEXT, BillState TEXT, BillZip TEXT, CorporateName TEXT, parseEquipType TEXT, parseEquipname TEXT, parseEquipTestNames TEXT, parseRange TEXT, equipDataCollection TEXT, cyclesLow TEXT, cyclesHigh TEXT, accessGivenTo TEXT, tech TEXT, Status TEXT, ShipPhone TEXT  )', []);

        tx.executeSql('CREATE TABLE  IF NOT EXISTS Technicians' + '(id INTEGER PRIMARY KEY autoincrement, name TEXT)', []);

        tx.executeSql('CREATE TABLE  IF NOT EXISTS ShrinkingList' + '(id INTEGER PRIMARY KEY autoincrement, custid TEXT, name TEXT)', []);


    });
    
    
    console.log("initWebDB success");
}



//Get Templates Functions
if (slcount = null) {
    slcount = o
};

//Shrinking List


function getSLTemplates() {
//alert(localDB);

   localDB.transaction(function(tx) {
       // tx.executeSql('DELETE FROM ShrinkingList where id > 0', [] );
       
  
        var sql = "DELETE FROM ShrinkingList where id > 0";
                try {
                    tx.executeSql(sql, [], SLSuccess, SLFail);
                }
                catch(err)
                {
                    alert(err);
                }
       
       
      function SLSuccess(){
           console.log("SL Initialized");
       }
      function SLFail(err){
        console.log("SL Initialize Failure");
       }
       
       
    }); 
        
    
    
    $('body').append('<div id="progress" onClick="$("#progress").remove();"><img align="middle" src="img/downloading.gif">&nbsp;&nbsp;&nbsp;&nbsp;Downloading Templates: <text id="tCount"></div>');
    getCommandAsync(slURL, "", "SLgotDocsJSON");
}//end getSLTemplates

//Book View Templates      


function getBVTemplates() {
        localDB.transaction(function(tx) {
                tx.executeSql('DELETE FROM BookView where id > 0', [] );
               
            });
    techname = localStorage.getItem("tech");
    //alert("Getting Templates for " + techname); 
    //$('body').append('<div id="progress" onClick="$("#progress").remove();"><img align="middle" src="img/downloading.gif">&nbsp;&nbsp;&nbsp;&nbsp;Downloading Templates : <text id="tCount"></div>');
   var getBVStatus = getCommandAsync(bvURL, "", "BVgotDocsJSON");
    return(getBVStatus);
}

//History


function getHistoryTemplates() {
    historyDB.transaction(function(tx) {
                tx.executeSql('DELETE FROM History where id > 0', [] );
               
            });
    console.log('history table cleared');
    //$('body').append('<div id="progress" onClick="$("#progress").remove();"><img align="middle" src="img/downloading.gif">&nbsp;&nbsp;&nbsp;&nbsp;Downloading History: <text id="hCount"></div>');
   var getHistoryStatus =  getCommandAsync(histURL, "", "histDocsJSON");
    return(getHistoryStatus);
}



function getTechnicianTemplates() {
    //alert("in getTechnicianTemplates");
    // $('body').append('<div id="progress" onClick="$("#progress").remove();"><img align="middle" src="img/downloading.gif">&nbsp;&nbsp;&nbsp;&nbsp;Downloading Technicians<text id="techCount"></div>');
    var getTechStatus = getCommandAsync(tlURL, "", "TechiciansJSON");
    return(getTechStatus);
}





function getCommandAsync(sURL, sParms, sResponseHandler) {
    var sPassedParms = "";
    var iArgCount = getCommandAsync.arguments.length;
    var aArgs;
    if (iArgCount > 3) {
        aArgs = getCommandAsync.arguments;
        for (var i = 3; i < iArgCount; i++) {
            sPassedParms += ", aArgs[" + i + "]";
        }
    }
    var objHTTP = initXMLHttpRequest();
    try {
        objHTTP.onreadystatechange = function() {
            if (objHTTP.readyState == 4) {
                if (typeof objHTTP.status == 'undefined' || objHTTP.status == 200 || objHTTP.status == 304) {
                    eval(sResponseHandler + "(eval('(' + objHTTP.responseText + ')')" + sPassedParms + ")");
                }
                //    alert(objHTTP.responseText);
            }
        };
        objHTTP.open("GET", sURL, true);
        objHTTP.setRequestHeader("Content-Type", "text/javascript");
        objHTTP.send(sParms);
    } catch (e) {}

    return(true);
}

<!--End Get CommandAsync -->


//JSON Stuff
var g_XMLHttpRequest_ActiveX;
var g_XMLDomDocument_ActiveX;

function initXMLHttpRequest() {
    var objHTTP = null;
    if (window.ActiveXObject && !window.XMLHttpRequest) { //IE
        if (g_XMLHttpRequest_ActiveX) {
            objHTTP = new ActiveXObject(g_XMLHttpRequest_ActiveX);
        } else {
            var xmlhttp = new Array('Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP');
            for (var i = 0; i < xmlhttp.length; i++) {
                try {
                    objHTTP = new ActiveXObject(xmlhttp[i]);
                    if (objHTTP != null) {
                        g_XMLHttpRequest_ActiveX = xmlhttp[i];
                        break;
                    }
                } catch (e) {}
            }
        }
    } else { //Mozilla
        try {
            objHTTP = new XMLHttpRequest();
        } catch (e) {}
    }
    return objHTTP;
}


function returnJSONValue(obj) {
    var aReturn = [];
    for (var a in obj) {
        switch (a) {
        case "text":
        case "number":
        case "datetime":
            if (obj[a].constructor.toString().indexOf("Array") == -1) {
                aReturn.push(obj[a][0]);
            } else {
                for (var i = 0; i < obj[a].length; i++) {
                    aReturn.push(obj[a][i][0]);
                }
            }
            break;
        case "textlist":
        case "numberlist":
        case "datetimelist":
            aReturn = returnJSONValue(obj[a]);
            break;
        default:
            break;
        }
    }
    return aReturn;
}

function histDocsJSON(oObject) {
    //alert("in History JSON");
    //$("#progress").remove();
    var viewentries = oObject.viewentry;
    
    if(typeof viewentries !== "undefined") {
                    var n_viewentries = viewentries.length;
                    //alert("History count " + n_viewentries);
                   

                    var entrydata = viewentries[0].entrydata;

                    var sCol0 = returnJSONValue(entrydata[0]);

                    daLength = sCol0.length


                    for (var i = 0; i < n_viewentries; i++) {

                        var unidAttr = viewentries[i]["@unid"];

                        var entrydata = viewentries[i].entrydata;
                        var sCol0 = returnJSONValue(entrydata[0]);
                        //alert("sCol0 "+ sCol0);
                        var sCol1 = returnJSONValue(entrydata[1]);
                        //alert("sCol1 "+ sCol1);
                        var sCol2 = returnJSONValue(entrydata[2]);
                        var sCol3 = returnJSONValue(entrydata[3]);
                        var sCol4 = returnJSONValue(entrydata[4]);
                        var sCol5 = returnJSONValue(entrydata[5]);
                        var sCol6 = returnJSONValue(entrydata[6]);
                        var sCol7 = returnJSONValue(entrydata[7]);
                        var sCol8 = returnJSONValue(entrydata[8]);
                        var sCol9 = returnJSONValue(entrydata[9]);
                        //alert("sCol9  Report Date "+ sCol9);
                        var sCol10 = returnJSONValue(entrydata[10]);
                        var sCol11 = returnJSONValue(entrydata[11]);
                        var sCol12 = returnJSONValue(entrydata[12]);
                        var sCol13 = returnJSONValue(entrydata[13]);
                        var sCol14 = returnJSONValue(entrydata[14]);
                        var sCol15 = returnJSONValue(entrydata[15]);
                        var sCol16 = returnJSONValue(entrydata[16]);
                        var sCol17 = returnJSONValue(entrydata[17]);
                        var sCol18 = returnJSONValue(entrydata[18]);
                        var sCol19 = returnJSONValue(entrydata[19]);
                        var sCol20 = returnJSONValue(entrydata[20]);
                        var sCol21 = returnJSONValue(entrydata[21]);
                        var sCol22 = returnJSONValue(entrydata[22]);
                        var sCol23 = returnJSONValue(entrydata[23]);
                       
                
                        //write values to the Tables
                    HistoryStatus = addHistory(sCol0, sCol1, sCol2, sCol3, sCol4, sCol5, sCol6, sCol7, sCol8, sCol9, sCol10, sCol11, sCol12, sCol13, sCol14, sCol15, sCol16, sCol17, sCol18, sCol19, sCol20, sCol21, sCol22, i);
                  console.log("Inserted History Record: "+ HistoryStatus);
          
                        var tmpcustname = returnJSONValue(entrydata[1]);
                        console.log("History Imported for: " + tmpcustname.toString()+' ' + i +' of ' + viewentries.length);





                    } //EndFor Loop

                    if (HistoryStatus <i-1){
                       // alert('less' + i +' HistoryStatus '+ HistoryStatus );
                       // getSLTemplates();
                    } else{
                        //alert('equal' + i);
                        getSLTemplates();
                    }


                // alert('Downloaded: ' + i +' History Records');
                   $('#progress').remove();

                   $('body').append('<div id="progress2">Initializing Database</div>');
                    var t = setTimeout(" $('#progress2').remove();", 800); //10 seconds

                    //  $('body').append('<div id="progress">Please Restart iReport</div>');
                    //var t = setTimeout(" $('#progress').remove();", 500); //.5 seconds
                    
                
                //  $('#customer_templates').selectmenu();
                //  $('#customer_templates').selectmenu('refresh',true);
                    
                
    } // end if 
    else {
    var t = setTimeout(" $('#progress').remove();", 2000);
    }
    
} //end histDocJSON

function TechiciansJSON(oObject) {
    var viewentries = oObject.viewentry;
    var n_viewentries = viewentries.length;
    var slcount = viewentries.length;
    var entrydata = viewentries[0].entrydata;
    var sCol0 = returnJSONValue(entrydata[0]);
    daLength = sCol0.length


    var select = document.getElementById("techList");
    
    for (var i = 0; i < daLength; i++) {
        //    alert("in for loop");
        //fill up the values
        select.options[select.options.length] = new Option(sCol0[i], sCol0[i]);

    } //end For Loop



}


function SLgotDocsJSON(oObject) {

    document.getElementById('customer_templates').innerHTML = "";
    localStorage.setItem("customer_templates_SL", "");
    var viewentries = oObject.viewentry;
    try{    var n_viewentries = viewentries.length;}
    
    catch(e){
    var n_viewentries = 0;
    }
    
      try{      var slcount = viewentries.length;}
    
    catch(e){
    var slcount = 0;
    }
    

    document.getElementById('SLCnt').innerHTML = slcount;
    //document.getElementById('SLCnt').innerHTML = "</br>"+ n_viewentries+"<p>Shrink List";
    console.log("SL Rows downloaded: " +n_viewentries);



    for (var i = 0; i < n_viewentries; i++) {

        //document.getElementById('SLCnt').innerHTML = i+1;
        var unidAttr = viewentries[i]["@unid"];

        var entrydata = viewentries[i].entrydata;
        var sCol0 = returnJSONValue(entrydata[0]);
        var sCol1 = returnJSONValue(entrydata[1]);
        var sCol2 = returnJSONValue(entrydata[2]);
        var sCol3 = returnJSONValue(entrydata[3]);
        var sCol4 = returnJSONValue(entrydata[4]);
        var sCol5 = returnJSONValue(entrydata[5]);
        var sCol6 = returnJSONValue(entrydata[6]);
        var sCol7 = returnJSONValue(entrydata[7]);
        var sCol8 = returnJSONValue(entrydata[8]);
        var sCol9 = returnJSONValue(entrydata[9]);
        var sCol10 = returnJSONValue(entrydata[10]);
        var sCol11 = returnJSONValue(entrydata[11]);
        var sCol12 = returnJSONValue(entrydata[12]);
        var sCol13 = returnJSONValue(entrydata[13]);
        var sCol14 = returnJSONValue(entrydata[14]);
        var sCol15 = returnJSONValue(entrydata[15]);
        var sCol16 = returnJSONValue(entrydata[16]);
        var sCol17 = returnJSONValue(entrydata[17]);
        var sCol18 = returnJSONValue(entrydata[18]);
        var sCol19 = returnJSONValue(entrydata[19]);
        var sCol20 = returnJSONValue(entrydata[20]);
        var sCol21 = returnJSONValue(entrydata[21]);
        var sCol22 = returnJSONValue(entrydata[22]);
        var sCol23 = returnJSONValue(entrydata[23]);
        var sCol24 = returnJSONValue(entrydata[24]);
        var sCol25 = returnJSONValue(entrydata[25]);
        var sCol26 = returnJSONValue(entrydata[26]);
        var sCol27 = returnJSONValue(entrydata[27]);
        var sCol28 = returnJSONValue(entrydata[28]);
        //alert("sCol22 "+ sCol22);
         //var sCol20 = returnJSONValue(entrydata[20])[0];
        //write values to the Tables

        addTemplate(sCol0, sCol1, sCol2, sCol3, sCol4, sCol5, sCol6, sCol7, sCol8, sCol9, sCol10, sCol11, sCol12, sCol13, sCol14, sCol15, sCol16, sCol17, sCol18, sCol19, sCol20, sCol21, sCol22, sCol23, sCol24, sCol25, sCol26, sCol27, sCol28);
        //alert("template added");
        addShrinkingList(sCol0, sCol1);

        //Build the Customer Templates List & Make them a consistent width 35 chars
        var tmpcustname = returnJSONValue(entrydata[1]);
        tmpcustname2 = tmpcustname.toString();

        document.getElementById('customer_templates').innerHTML += '<option value ="' + sCol0 + '">' + tmpcustname2.substring(0, 30) + '</option>';




    } //EndFor Loop
        $('#customer_templates').selectmenu();
    $('#customer_templates').selectmenu('refresh',true);
 $('body').append('<div id="progress3">Saved SL Templates: '+i+' </div>');
var t = setTimeout(" $('#progress3').remove();", 3500);
   // var t = setTimeout(" $('#progress').remove();", 1000);
    //updateCounts();
} //End Function    






function BVgotDocsJSON(oObject) {
    document.getElementById('customer_templates').innerHTML = "";
    localStorage.setItem("customer_templates_BV", "");

    var viewentries = oObject.viewentry;
    
    if(typeof viewentries !== "undefined") {
    
                var n_viewentries = viewentries.length;

                //alert("Rows: " +n_viewentries);
                //$('body').append('<div id="progress">Saved: BV: '+n_viewentries +' SL:'+slcount+' Templates</div>');
                document.getElementById('BVCnt').innerHTML = n_viewentries;
                //document.getElementById('BVCnt').innerHTML = document.getElementById('BVCnt').innerHTML + n_viewentries;
                //document.getElementById('BVCnt').innerHTML = "<h1>"+n_viewentries+"</h1></br>Book View";
                //document.getElementById('BVCnt').innerHTML = "</br>"+ n_viewentries+"<p>Book View";
                localStorage.setItem("BVcount", viewentries.length);

                //document.getElementById('tCount').innerHTML = n_viewentries;
                for (var i = 0; i < n_viewentries; i++) {



                    var unidAttr = viewentries[i]["@unid"];

                    var entrydata = viewentries[i].entrydata;
                    var sCol0 = returnJSONValue(entrydata[0]);
                    var sCol1 = returnJSONValue(entrydata[1]);
                    var sCol2 = returnJSONValue(entrydata[2]);
                    var sCol3 = returnJSONValue(entrydata[3]);
                    var sCol4 = returnJSONValue(entrydata[4]);
                    var sCol5 = returnJSONValue(entrydata[5]);
                    var sCol6 = returnJSONValue(entrydata[6]);
                    var sCol7 = returnJSONValue(entrydata[7]);
                    var sCol8 = returnJSONValue(entrydata[8]);
                    var sCol9 = returnJSONValue(entrydata[9]);
                    var sCol10 = returnJSONValue(entrydata[10]);
                    //alert(sCol10);
                    var sCol11 = returnJSONValue(entrydata[11]);
                    //alert(sCol11);
                    var sCol12 = returnJSONValue(entrydata[12]);
                    //alert(sCol12);
                    var sCol13 = returnJSONValue(entrydata[13]);
                    var sCol14 = returnJSONValue(entrydata[14]);
                    var sCol15 = returnJSONValue(entrydata[15]);
                    //alert(sCol15); //LastMonths Data
                    var sCol16 = returnJSONValue(entrydata[16]);
                    var sCol17 = returnJSONValue(entrydata[17]);
                    var sCol18 = returnJSONValue(entrydata[18]);
                    var sCol19 = returnJSONValue(entrydata[19]);
                    var sCol20 = returnJSONValue(entrydata[20]);
                    var sCol21 = returnJSONValue(entrydata[21]);
                    var sCol22 = returnJSONValue(entrydata[22]);

                    var sCol23 = returnJSONValue(entrydata[23]);
                    var sCol24 = returnJSONValue(entrydata[24]);
                    var sCol25 = returnJSONValue(entrydata[25]);
                    var sCol26 = returnJSONValue(entrydata[26]);
                    var sCol27 = returnJSONValue(entrydata[27]);
                    var sCol28 = returnJSONValue(entrydata[28]);

                    
                    //var sCol20 = returnJSONValue(entrydata[20])[0];
                    //write values to the Tables
                    addBookView(sCol0, sCol1, sCol2, sCol3, sCol4, sCol5, sCol6, sCol7, sCol8, sCol9, sCol10, sCol11, sCol12, sCol13, sCol14, sCol15, sCol16, sCol17, sCol18, sCol19, sCol20, sCol21, sCol22, sCol23, sCol24, sCol25, sCol26, sCol27, sCol28);
                    //addShrinkingList(sCol0, sCol1);
                    //Build the Customer Templates List & Make them a consistent width 35 chars
                    var tmpcustname = returnJSONValue(entrydata[1]);
                    
                    tmpcustname2 = tmpcustname.toString();
                    console.log('Added to BookView Table: ' + tmpcustname2);

                    document.getElementById('customer_templates').innerHTML += '<option value ="' + sCol0 + '">' + tmpcustname2.substring(0, 30) + '</option>';




                } //EndFor Loop
            //$('body').append('<div id="progress">Saved: BV: '+n_viewentries +' SL:'+slcount+'</div>');
            
            $('#customer_templates').selectmenu();
            $('#customer_templates').selectmenu('refresh',true);
            $('body').append('<div id="progress4">Saved: BookView Templates: '+i+' </div>');
            var t = setTimeout(" $('#progress4').remove();", 4500);
            //var t = setTimeout(" $('#progress').remove();", 3000);
            //updateCounts();
            var slcount = localStorage.getItem("slcount");
            return(true);
   } //End if
} //End BVgotDocsJSON  Function



function addHistory(custid, BillName, BillADDR1, Notify, BillADDR2, BillCity, BillState, BillZip, CorporateName, ReportDate, MakeUp, parseEquipType, parseEquipname, parseEquipTestNames, parseRange, equipDataCollection, LastMonthEquipDataCollection, cyclesLow, cyclesHigh, accessGivenTo, tech, Status, ShipPhone, counter) 
{
    

    historyDB.transaction(function(tx) {
        tx.executeSql('INSERT INTO HISTORY (custid, BillName, BillADDR1, Notify, BillADDR2, BillCity, BillState, BillZip, CorporateName, ReportDate, MakeUp, parseEquipType, parseEquipname, parseEquipTestNames, parseRange, equipDataCollection, LastMonthEquipDataCollection, cyclesLow, cyclesHigh, accessGivenTo, tech, Status, ShipPhone) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [custid, BillName, BillADDR1, Notify, BillADDR2, BillCity, BillState, BillZip, CorporateName, ReportDate, MakeUp, parseEquipType, parseEquipname, parseEquipTestNames, parseRange, equipDataCollection, LastMonthEquipDataCollection, cyclesLow, cyclesHigh, accessGivenTo, tech, Status, ShipPhone], successCBHist(counter), errorCB);
    });
    
    return(counter);
}

    function errorCB(err) {
        alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCBHist(counter) {

       console.log("History recored inserted into Table successfully!" + counter );

    }

  function successCBBV() {
        console.log("BookView record inserted into Table successfully!");
    }
    
      function successCBSL() {
        console.log("ShrinkList record inserted into Table Successfully!");
    }
    
      function successCBTemplate() {
        console.log("Template Table record inserted success!");
    }
    
function addBookView(custid, BillName, BillADDR1, Notify, BillADDR2, BillCity, BillState, BillZip, CorporateName, parseEquipType, parseEquipname, parseEquipTestNames, parseRange, equipDataCollection, LastMonthEquipDataCollection, cyclesLow, cyclesHigh, accessGivenTo, tech, Status, LastMonthEquipDataCollection2, LastMonthEquipDataCollection3, ShipPhone, LastMonthEquipDataCollection4, LastMonthEquipDataCollection5, LastMonthEquipDataCollection6, LastMonthEquipDataCollection7, LastMonthEquipDataCollection8, LastMonthEquipDataCollection9) {

    localDB.transaction(function(tx) {
        tx.executeSql('INSERT INTO BookView (custid, BillName, BillADDR1, Notify, BillADDR2, BillCity, BillState, BillZip, CorporateName, parseEquipType, parseEquipname, parseEquipTestNames, parseRange, equipDataCollection, cyclesLow, cyclesHigh, accessGivenTo, tech, Status, ShipPhone) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [custid, BillName, BillADDR1, Notify, BillADDR2, BillCity, BillState, BillZip, CorporateName, parseEquipType, parseEquipname, parseEquipTestNames, parseRange, equipDataCollection, cyclesLow, cyclesHigh, accessGivenTo, tech, Status, ShipPhone],successCBBV, errorCB);
    });
}

function addTemplate(custid, BillName, BillADDR1, Notify, BillADDR2, BillCity, BillState, BillZip, CorporateName, parseEquipType, parseEquipname, parseEquipTestNames, parseRange, equipDataCollection, LastMonthEquipDataCollection, cyclesLow, cyclesHigh, accessGivenTo, tech, Status, LastMonthEquipDataCollection2, LastMonthEquipDataCollection3, ShipPhone, LastMonthEquipDataCollection4, LastMonthEquipDataCollection5, LastMonthEquipDataCollection6, LastMonthEquipDataCollection7, LastMonthEquipDataCollection8, LastMonthEquipDataCollection9) {
 
    localDB.transaction(function(tx) {
        tx.executeSql('INSERT INTO TEMPLATES (custid, BillName, BillADDR1, Notify, BillADDR2, BillCity, BillState, BillZip, CorporateName, parseEquipType, parseEquipname, parseEquipTestNames, parseRange, equipDataCollection, cyclesLow, cyclesHigh, accessGivenTo, tech, Status, ShipPhone) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [custid, BillName, BillADDR1, Notify, BillADDR2, BillCity, BillState, BillZip, CorporateName, parseEquipType, parseEquipname, parseEquipTestNames, parseRange, equipDataCollection, cyclesLow, cyclesHigh, accessGivenTo, tech, Status, ShipPhone],successCBTemplate, errorCB);
    });
}

function addShrinkingList(custid, name) {
    //alert("in add Templates function" + custid);
    localDB.transaction(function(tx) {
        tx.executeSql('INSERT INTO ShrinkingList (custid, name) VALUES (?, ?)', [custid, name],successCBSL, errorCB);
    });
}





// End Get Template Functions

//Start Update Counts


function updateCounts() {
    //alert("update counts");
    //This button refreshes the Counts for OnDevice, ShrinkList, Templates
    //document.getElementById('customer_templates').innerHTML =  "";
    localDB.transaction(

    function(transaction) {
        transaction.executeSql("SELECT * from ShrinkingList", [], dataHandlerSLcount, errorHandler);
    });

    localDB.transaction(

    function(transaction) {
        transaction.executeSql("SELECT * from BookView", [], dataHandlerBVcount, errorHandler);
    }


    );

    function dataHandlerSLcount(transaction, results) {
        //alert("update counts  SL");
        document.getElementById('SLCnt').innerHTML = "";
        document.getElementById('SLCnt').innerHTML = results.rows.length;

        localStorage.setItem("slcount", results.rows.length);
    }

    function dataHandlerBVcount(transaction, results) {
        //alert("update counts  BV");
        document.getElementById('BVCnt').innerHTML = "";
        document.getElementById('BVCnt').innerHTML = results.rows.length;
        localStorage.setItem("bvcount", results.rows.length);
    }

    //'CompCount_s1
    //Count the Reports on Phone
    //document.getElementById('CompCount_s1').innerHTML =  "";
    reportDB.transaction(

    function(transaction) {
        transaction.executeSql("SELECT * from Reports where status !='Archived'", [], dataHandlerCompCount, errorHandler);
    }

    );

    function dataHandlerCompCount(transaction, results) {
        document.getElementById('CompCnt').innerHTML = "";
        document.getElementById('CompCnt').innerHTML = results.rows.length;

    }


}

function errorHandler(transaction, error) {
    // error.message is a human-readable string.
    // error.code is a numeric error code
    alert(' Error was '+error.message+' (Code '+error.code+')');
    // Handle errors here
    var we_think_this_error_is_fatal = true;
    if (we_think_this_error_is_fatal) return true;
    return false;
}


function checkConnection() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI] = 'WiFi';
    states[Connection.CELL_2G] = 'Cell 2G';
    states[Connection.CELL_3G] = 'Cell 3G';
    states[Connection.CELL_4G] = 'Cell 4G';
    states[Connection.NONE] = 'Offline';

    //alert('Connection type: ' + states[networkState]);
    document.getElementById('onlineStatus').innerHTML = states[networkState];

}


function hide(obj) {
    //alert("hide");
    var el = document.getElementById(obj);
    //    el.style.display = (el.style.display != 'none' ? 'none' : '' );
    el.style.display = (el.style.display != 'none' ? 'none' : 'none');
}

function show(obj) {
    var el = document.getElementById(obj);
    el.style.display = (el.style.display != 'none' ? '' : '');
}


//Used to Clear Out Customer Templates


function removeAllOptions(selectbox) {
    var i;
    for (i = selectbox.options.length - 1; i >= 0; i--) {
        selectbox.remove(i);
    }
}


function validate_required(field, alerttxt) {
    with(field) {
        if (value == null || value == "" | value <= 0) {
            vibrate();
            alert(alerttxt);
            return false;
        }
        else {
            return true;
        }
    }
}



function resetDB() {

    var shortName = 'iReportDB'; // Global Variable for the name of the Database
    var version = '1.0';
    var displayName = 'eReportDB';
    var maxSize = 15 * 1024 * 1024; // 50 MB



    localDB = window.openDatabase("iReportDB", "", "", "");
    reportDB = window.openDatabase("Reports", version, "Reports", maxSize); // instantiate the ReportDatabase
    historyDB = window.openDatabase("History", version, "History", maxSize); // instantiate the ReportDatabase

    var test = confirmDelete();


    if (test == 1) {
     
        localDB.transaction(function(tx) {
            tx.executeSql('Drop table if exists shrinkinglist', []);
            tx.executeSql('Drop Table IF EXISTS BookView', []);
            tx.executeSql('Drop Table IF EXISTS Templates', []);
            tx.executeSql('Drop Table IF EXISTS Technicians', []);


        });

     
        historyDB.transaction(function(tx) {

            tx.executeSql('Drop Table IF EXISTS History', []);

        });

        resetDB1();

    } else {
        //alert("in return");
        return
    }
}



function resetDB2() {

    var shortName = 'iReportDB'; // Global Variable for the name of the Database
    var version = '1.0';
    var displayName = 'eReportDB';
    var maxSize = 15 * 1024 * 1024; // 50 MB



    reportDB = window.openDatabase("Reports", version, "Reports", maxSize); // instantiate the ReportDatabase


    var test = confirmDelete2();

    var test = confirmDelete3();
    
  
    if (test == 1) {
              reportDB.transaction(function(tx) {

            tx.executeSql('Drop Table IF EXISTS Reports', []);

        });

      

     //alert("Success - iReports Removed from Device.");
      $('body').append('<div id="progress4">Success - iReports Removed from Device.</div>');
            var t = setTimeout(" $('#progress4').remove();", 2500);

    } else {
        //alert("in return");
        return
    }
}





function confirmDelete() {
    return confirm("Really Initialize DB?")
}


function confirmDelete2() {
    return confirm("Warning - You are about to delete all past iReports from this device.")
}

function confirmDelete3() {
    return confirm("Are you Sure ?? - You are about to delete all past iReports from this device.")
}


function resetDB1() {

    localDB.transaction(function(tx) {
        tx.executeSql('Drop Table IF EXISTS BookView', []);
    });
    //     alert(localDB);
    localDB.transaction(function(tx) {
        tx.executeSql('Drop Table IF EXISTS ShrinkingList', []);
    });

    // alert("dropping BV");
    localStorage.setItem("customer_templates_BV", "");

    localDB.transaction(function(tx) {
        tx.executeSql('Drop Table IF EXISTS BookView', []);
    });
 
    localDB.transaction(function(tx) {
        tx.executeSql('Drop Table IF EXISTS Templates', []);
    });

    historyDB.transaction(function(tx) {
        tx.executeSql('Drop Table IF EXISTS History', []);
    });
    localDB.transaction(function(tx) {
        tx.executeSql('Drop Table IF EXISTS Technicians', []);
    });



    alert("Database Initialized");
    //rebuild the tables
    //clear the Techname
    //    localStorage.setItem("tech", "");
    initWEBDB();


}
//End Reset Database



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Functions used on the eReport.html page
//Clear Options is used by begin.js


function ClearOptions(id) {
    document.getElementById(id).options.length = 0;
    console.log(id);
}


function clearCustTemplates() {
    //Shrink the Dialog List Customer Templates and the Local Storage 

    //Clear History Drop Down
    try {
        document.getElementById('histList').innerHTML = '<option value =""></option>';
    }
    catch (e) {
        console.log("tried to clear the history dropdown")
    }
    //document.getElementById('histList').innerHTML == null;
    //alert("clear Hist Options");
    ClearOptions('histList');

    // Clear EquipHistList
    document.getElementById('EquipHistList').innerHTML = '<option value =""></option>';
    ClearOptions('EquipHistList');


    removeOptionSelected(); // Remove from the Customer_Template Dropdown

    //Remove from the Local Storage
    var selectobject = document.getElementById("customer_templates");
    for (var i = 0; i < selectobject.length; i++) {
        //alert(selectobject.options[i].text+" "+selectobject.options[i].value);
        daList = localStorage.getItem("customer_templates_SL");
        //alert(daList);
        localStorage.setItem("customer_templates_SL", daList += '<option value ="' + selectobject.options[i].value + '">' + selectobject.options[i].text + '</option>');

    }




} //End ClearTemplates

function removeOptionSelected() {
    //alert("start the remove");
    var elSel = document.getElementById('customer_templates');
    var i;
    for (i = elSel.length - 1; i >= 0; i--) {
        if (elSel.options[i].selected) {
            elSel.remove(i);
        }
    }
}



function loadBV() {
    hide('preview');
    clearCustTemplates();
    document.getElementById('customer_templates').innerHTML = '<option value =""></option>';


    console.log("Loading BookView");
    //initWEBDB();
    //alert("web db init");
    //alert(localDB);
    localDB.transaction(

    function(transaction) {
        transaction.executeSql("SELECT * from BookView", [], dataHandlerBV, errorHandler);
    }

    );

    function dataHandlerBV(transaction, results) {

       //alert(results.rows.length);
        for (var i = 0; i < results.rows.length; i++) {
            //alert("BV found: "+ results.rows.length);
            // Each row is a standard JavaScript array indexed by     
            var row = results.rows.item(i);
            sCol0 = row['custid'];
            sCol1 = row['BillName'];
      //  alert(  '<option value ="'+sCol0 +'">'+ sCol1  +'</option>');
            document.getElementById('customer_templates').innerHTML += '<option value ="' + sCol0 + '">' + sCol1 + '</option>';
        }
        //alert("BV List Loaded");
        $('#customer_templates').selectmenu();
        $('#customer_templates').selectmenu('refresh',true);
    }
    
}


function loadSL() {

    hide('preview');
    
    clearCustTemplates();
    
    document.getElementById('customer_templates').innerHTML = '<option value =""></option>';
    
    console.log("Loading Shrinking list");
   
    //initWEBDB();
    localDB.transaction(

    function(transaction) {
        transaction.executeSql("SELECT * from ShrinkingList", [], dataHandlerSL, errorHandler);
    }

    );

    function dataHandlerSL(transaction, results) {

       //alert("Found SL Docs: "+ results.rows.length);
        for (var i = 0; i < results.rows.length; i++) {
            // Each row is a standard JavaScript array indexed by     
            var row = results.rows.item(i);
            sCol0 = row['custid'];
            sCol1 = row['name'];
          // alert(  '<option value ="'+sCol0 +'">'+ sCol1 +'</option>');
            document.getElementById('customer_templates').innerHTML += '<option value ="' + sCol0 + '">' + sCol1 + '</option>';
        }
        //alert("SL Loaded successfully");
        //$('#customer_templates').selectmenu();
        //$('#customer_templates').selectmenu('refresh',true);
    }
    

    } //End loadSL

function loadOD() {
    hide('preview');
    //alert("load OD");
    clearCustTemplates();
    document.getElementById('customer_templates').innerHTML = '<option value =""></option>';


    //alert("Loading OnDevice");
    //initWEBDB();
    //alert("web db init");
    //alert(localDB);
    reportDB.transaction(

    function(transaction) {
        transaction.executeSql("SELECT * from Reports where status !='Archived'", [], dataHandlerOD, errorHandler);
    }

    );

    function dataHandlerOD(transaction, results) {

        //        alert(results.rows.length);
        for (var i = 0; i < results.rows.length; i++) {
            //alert("BV found: "+ results.rows.length);
            // Each row is a standard JavaScript array indexed by     
            var row = results.rows.item(i);
            sCol0 = row['custid'];
            sCol1 = row['name'];

            //Where did it originate?
            LType = row['ListType'];
            //alert("List Type:" + LType);

            //alert(  '<option value ="'+sCol0 +'">'+ sCol1.substring(0,30)  +'</option>');
            document.getElementById('customer_templates').innerHTML += '<option value ="' + sCol0 + '">' + sCol1.substring(0, 430) + '</option>';
        }
        //alert("Drafts - Loaded successfully");
        //$('#customer_templates').selectmenu();
        //$('#customer_templates').selectmenu('refresh',true);
        
    }
    
}



//populates the dropdown list in restore.html


function loadBU() {



    document.getElementById('customer_templatesBU').innerHTML = '<option value =""></option>';

    console.log("Loading Archived Reports ");
    //initWEBDB();
    historyDB.transaction(

    function(transaction) {
        transaction.executeSql("SELECT * from Reports where Status = 'Archived' ", [], dataHandlerBU, errorHandler);
    }

    );

    function dataHandlerBU(transaction, results) {

        //    alert(results.rows.length);
        for (var i = 0; i < results.rows.length; i++) {
            // Each row is a standard JavaScript array indexed by     
            var row = results.rows.item(i);
            sCol0 = row['custid'];
            sCol1 = row['ReportDate'] + " - " + row['name'];
            //alert(  '<option value ="'+sCol0 +'">'+ sCol1.substring(0,30)  +'</option>');
            document.getElementById('customer_templatesBU').innerHTML += '<option value ="' + sCol0 + '">' + sCol1.substring(0, 430) + '</option>';
        }
        //alert("On Device Loaded successfully");
        //$('#customer_templates').selectmenu();
        //$('#customer_templates').selectmenu('refresh',true);
    }

}





















function go() {
    setTimeout("document.getElementById('daData').select();", 70);
    //Used by the Shrinking List

    //FIELD VALIDATIONS
    with(document.forms[0]) {
        if (validate_required(mileage, "Please enter your Mileage.") == false) {
            mileage.focus();
            return false;
        }

        if (validate_required(Conductivity, "Conductivity Make Up must be filled out!") == false) {
            Conductivity.focus();
            return false;
        }

        if (validate_required(calciumHardness, "Calcium Make Up must be filled out!") == false) {
            calciumHardness.focus();
            return false;
        }

        if (validate_required(alkalinity, "Alkalinity Make Up must be filled out!") == false) {
            alkalinity.focus();
            return false;
        }

        if (validate_required(chlorides, "Chlorides Make Up must be filled out!") == false) {
            chlorides.focus();
            return false;
        }

    }
    
//9-10-12 Calc Ranges Function re-written   
//12-14-12  Add the .toFixed(2)  to the Ranges to cut off after 2 decimals!
//10-13-13  Removed the .toFixed(2)  to the Ranges to cut off after 2 decimals!
function calcRanges(){
    

    temp = document.forms[0].PDAEquipRange.value;
    //alert(temp);
    cycRange = document.forms[0].cycles.value.replace(",", " - ");
    //alert("cyc Range " +cycRange);
    document.forms[0].PDAEquipRange.value = temp.replace("makeupCycles", cycRange);
    //Update all the makupCycles
    document.forms[0].parseRange.value = document.forms[0].parseRange.value.replace(/makeupCycles/g, cycRange);
    //alert("parseRange "+document.forms[0].parseRange.value);
    //Conductivity Range
    //ConductivityRange = makeupConductivity * CyclesLow "to" makeupConductivity * CyclesHigh 
    cyclesArray = document.forms[0].cycles.value.split(",");
   //alert( "cycles array" + cyclesArray[0] );
  // alert( "cycles array" + cyclesArray[1] );
    firstpart = cyclesArray[0] * document.forms[0].Conductivity.value;
   // alert("first part"+ firstpart);
    secondpart = cyclesArray[1] * document.forms[0].Conductivity.value;
    //alert("second part"+ secondpart);
    
    //12-13-12 trimmed to 2 decimals
    //conductivityRange = firstpart.toFixed(2) + " - " + secondpart.toFixed(2);
    conductivityRange = firstpart+ " - " + secondpart;
    
    
    
    //alert("conductivity range  " + conductivityRange);
    temp = document.forms[0].PDAEquipRange.value;
    //alert(temp);
    document.forms[0].PDAEquipRange.value = temp.replace("makeupConductivity", conductivityRange);
    //temp =document.forms[0].parseRange.value;
    document.forms[0].parseRange.value = document.forms[0].parseRange.value.replace(/makeupConductivity/g, conductivityRange);




    //Calcium Range
    CHvalue = document.forms[0].calciumHardness.value;
    firstpart = cyclesArray[0] * CHvalue;
    secondpart = cyclesArray[1] * CHvalue;
    CalHardness = firstpart + " - " + secondpart;
    //alert(conductivityRange);
    temp = document.forms[0].PDAEquipRange.value;
    //alert(temp);
    document.forms[0].PDAEquipRange.value = temp.replace("makeupCalcium", CalHardness);
    document.forms[0].parseRange.value = document.forms[0].parseRange.value.replace(/makeupCalcium/g, CalHardness);


    //Alkalinity
    AlkValue = document.forms[0].alkalinity.value;
    firstpart = cyclesArray[0] * AlkValue;
    secondpart = cyclesArray[1] * AlkValue;
    //AlkValue = firstpart.toFixed(2) + " - " + secondpart.toFixed(2);
    AlkValue = firstpart+ " - " + secondpart;
    //alert(conductivityRange);
    temp = document.forms[0].PDAEquipRange.value;

    document.forms[0].PDAEquipRange.value = temp.replace("makeupM.Alkalinity", AlkValue);
    document.forms[0].parseRange.value = document.forms[0].parseRange.value.replace(/makeupM.Alkalinity/g, AlkValue);

    //Chlorides
    Chlorides = document.forms[0].chlorides.value;
    firstpart = cyclesArray[0] * Chlorides;
    secondpart = cyclesArray[1] * Chlorides;
    //Chlorides = firstpart.toFixed(2) + " - " + secondpart.toFixed(2);
    Chlorides = firstpart + " - " + secondpart;
    //alert(conductivityRange);
    temp = document.forms[0].PDAEquipRange.value;
    //alert(temp);
    document.forms[0].PDAEquipRange.value = temp.replace("makeupChloride", Chlorides);
    document.forms[0].parseRange.value = document.forms[0].parseRange.value.replace(/makeupChloride/g, Chlorides);


}


    //End Range Calc Part
    daIndex = 0;

    //Check for empty
    frm = document.forms[0];
    //alert("end of line");
/*
alert(document.forms[0].EquipList.options[0].text);
alert("9876");
if (document.forms[0].EquipList.options[0].text=="") {
alert("selected index is blank");
return;


}
*/


     goloadEquip();
     
     //9-6-12  Load Equipment first


    function goloadEquip() {
        //alert("loading equip");
        frm = document.forms[0];
        var BreakPointArray = new Array();
        BreakPointArray = document.forms[0].breakpoints.value.split(',');
        //alert("BreakPointArray: "+BreakPointArray[frm.EquipList.selectedIndex+1]);
        var selectedEquip = frm.EquipList.selectedIndex; //frm.EquipList.options[frm.EquipList.selectedIndex+1].value;
        var s = BreakPointArray[frm.EquipList.selectedIndex];
        var e = BreakPointArray[frm.EquipList.selectedIndex + 1];

        //convert text to number
        s1 = s * 1;
        e1 = e * 1;

        //alert(e1-s1);
        
        //PDA Equip Test Rows 
        
        PDAEquipTest
        //6-14-12  Dynamically set the number of rows in the equipment
        //document.getElementById('PDAEquipTest').rows = (e1-s1);
        
        //build an array
        var temp = new Array();
        temp = document.forms[0].parseEquipTestNames.value.split('\n');
        //select a slice of the array
        pdaEquipTest = temp.slice(s1, e1);
        //format as a string seperated by newlines
        frm.PDAEquipTest.value = pdaEquipTest.join('\n');

//New way to split up rows
/*
  var tempArray = pdaEquipTest.join('\n');
  alert(tempArray);

    var area = document.getElementById("PDAEquipTest");
    area.value= tempArray;
*/


        //add it to history
        frm.PDAEquipTestHist.value = pdaEquipTest.join('\n');



        //pdaEquipmentRange
        //build an array
        var pdaEquipmentRangetemp = new Array();
        pdaEquipmentRangetemp = document.forms[0].parseRange.value.split('\n');
        //select a slice of the array
        pdaEquipRange = pdaEquipmentRangetemp.slice(s1, e1);

        //format as a string seperated by newlines
        frm.PDAEquipRange.value = pdaEquipRange.join('\n');
        //add it to history
        frm.PDAEquipRangeHist.value = pdaEquipRange.join('\n');

        //pdaDataCollection and the last 3 months history
        //build the arrays & Split up  the Data for each equipment
        var tempDATA = new Array();
        var tempDataHist1 = new Array();
        //show the right chunk of data
        tempDataHist1 = document.forms[0].LastMonthEquipDataCollection.value.split('\n');
        history1 = tempDataHist1.slice(s1, e1);
        //alert(history1);
        frm.pdaDataCollectionHist.value = history1.join('\n');


        
        
        //4-25-12 new history way
        var tempDataHist10 = new Array();
        tempDataHist10 = document.forms[0].HistoryEquipDataCollection.value.split('\n');
        history10 = tempDataHist10.slice(s1, e1);

        frm.pdaDataHist.value = history10.join('\n');

        //End new History way

        
        //9-10-12 Calculate the Ranges a New Way
        calcRanges();
        

            
        var listType = localStorage.getItem('listType');
        //alert(listType);
        temp = document.forms[0].equipDataCollection.value.split('\n');

        if (listType != 'onDevice') {

            temp = document.forms[0].equipDataCollection.value.split('\n');
            //alert("is this zeros? "+ temp);
        }


        var tempDATA = document.forms[0].equipDataCollection.value.split('\n');
        pdaDataCollection1 = tempDATA.slice(s1, e1);
        frm.pdaDataCollection.value = pdaDataCollection1.join('\n');

        //alert(frm.pdaDataCollection.value);






        show('equip');
        hide('Makeup');
        show('equip');

        var selectedEquip = document.forms[0].EquipList.selectedIndex;
        try{
        var daJCPennyTest = document.forms[0].EquipList.options[selectedEquip].text;
        }
        catch (error)   {
            //catch
        }
        
        //This has to match the equipment name in the Matrix in the C2 database
        if (daJCPennyTest == "JCP Water Treatment Task Sheet" | daJCPennyTest == "WTTS") {



            hide("daData");
            show("daJCPText");

            document.getElementById("RangeName").focus();

            setTimeout("document.getElementById('daJCPText').focus();", 70);
            setTimeout("document.getElementById('daJCPText').select();", 70);


        }
        else {
            //alert("else");
            // document.getElementById("RangeName").focus();
            //document.getElementById("daData").focus();
            //document.getElementById("RangeName").focus();
            document.getElementById("RangeName").focus();
            setTimeout("document.getElementById('daData').focus();", 70);
            setTimeout("document.getElementById('daData').select();", 70);


        }


        forward333();

    }




}




/////////////////////Set the Status to Complete based on UNID ////////////////////    


function completeReport(unid, fieldname, value) {
   
   var nUnid = unid.replace(".0","");
   //Trim off the .0 if it has one Drafts had it new ones didnt
   unid=nUnid+".0"
   
   //alert("in completeReport " + unid +" " + fieldname + " " +value);
    
    reportDB.transaction(

    function(tx) {
        tx.executeSql("UPDATE Reports Set Status = 'Completed' where timestamp = " + unid +"", [], completeReportHandler, errorHandler);
    });

    
    //Callback for setting the status
    function completeReportHandler(transaction, results) {
    //alert("in the completeReportHandler " + results.rows.length);
    //alert("updated " + fieldname);
    
    var custid = document.getElementById('customer_templates').value;
    SetEndTime(custid);
    
    //alert('Contacting Server ...'); 
     $('body').append('<div id="progress">Contacting Chardon Labs Server ... '+i+' </div>');
    var t = setTimeout(" $('#progress').remove();", 500);
    
    var t = setTimeout("syncData();", 500);
    

    
    }
    


}



/////////////////////SAVE REPORT ////////////////////    


function saveReport(custid, fieldname, value) {
    reportDB.transaction(

    function(transaction) {
        transaction.executeSql("UPDATE Reports Set  " + fieldname + "= '" + value + "' where custid=" + custid);
    });


    //save to localstorage 
    localStorage.setItem(custid + fieldname, value);

    temp = localStorage.getItem(custid + fieldname);
    //    alert(temp);
}




function saveReport2(custid, fieldname, value) {


    $('body').append('<div id="progress" onClick="$("#progress").remove();"><img align="middle" src="img/downloading.gif">&nbsp;&nbsp;&nbsp;&nbsp;Saving</div>');


    alert("Saving " + custid + " " + fieldname + " " + value);
    try {
        reportDB.transaction(


        function(transaction) {
            transaction.executeSql("UPDATE Reports Set  " + fieldname + "= '" + value + "' where custid=" + custid);
        });




        //alert(this.id + ": Data Saved to Device!" );                                                                                                                                                                                                                                                                                        
    }
    catch (ex) {

        alert("Error saving row: " + ex.message);
    }

      //save to localstorage 
    localStorage.setItem(custid + fieldname, value);

    temp = localStorage.getItem(custid + fieldname);
    //    alert(temp);
    
    //var t = setTimeout("$('#progress').remove();", 200);

}

////////////////////END Save REPORT    
//Set the Start Time

function SetStartTime(custid) {


    //TimeStamp - Capture Start Time
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();

    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    var seconds = currentTime.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds
    }

    var daTime = (month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds);

    //alert("Start Time "+ daTime);
    document.forms[0].timestamp.value = daTime;


    //saveReport (custid, "timestamp", document.forms[0].timestamp.value);
    saveReport(custid, "StartTime", daTime);

    //

}

//Set End Time


function SetEndTime(custid) {

    //alert("EndTime Function");
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();

    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    var seconds = currentTime.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds
    }




    var daEndTime = (month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds);
    //document.forms[0].EndTime.value = daEndTime;
    //alert("End Time" + daEndTime);
    //Save the Time
    // alert("End Time "+ daEndTime);
    saveReport(custid, "EndTime", daEndTime);

}
//End Time Functions

//PREVIEW


function preview() {


    //Get the Template List Type from localStorage
    var listType = localStorage.getItem('listType');


    //alert("preview " + listType);
    var custid = document.getElementById("customer_templates").value; // da Key
    //alert("custid"+ custid );
    //Load Templates based on listType
    if (listType == 'shrinkingList') {
        //alert("SL Preview"); 
        localDB.transaction(

        function(transaction) {
            transaction.executeSql("SELECT * from Templates where custid='" + custid + "';", [], dataHandlerPreview, errorHandler);
        });
    }




    if (listType == 'bookView') {
        //        alert("BVPreview");
        localDB.transaction(

        function(transaction) {
            transaction.executeSql("SELECT * from BookView where custid='" + custid + "';", [], dataHandlerPreview, errorHandler);
        });
    }

    if (listType == 'onDevice') {
               // alert("OD Preview");
             reportDB.transaction(
                    function (transaction) {
                        transaction.executeSql("SELECT * from Reports where status !='Archived' AND custid='"+custid+"';", [], dataHandlerPreview, errorHandler);}
                    ); 
                    
                        //10-09-12 Fixed Database / Table to be reportDB
                        hide('preview');
                    
      //9-4-12 Fixed On Device bug with the above SQL statement
    }





} //end Preview


function dataHandlerPreview(transaction, results) {
    //alert("dataHandlerFoundNoDraft");
    // Handle the results
    var string = "In the Data Handler";

    var orgMyString = "start";
  // alert("number of rows "+ results.rows.length);
    for (var i = 0; i < results.rows.length; i++) {
        // Each row is a standard JavaScript array indexed by     
        var row = results.rows.item(i);

        document.getElementById('dspCust').innerHTML = row['BillName'] + "<br><br>Contact: " + row['BillADDR1'] + "<br><br>Customer ID:" + row['custid'];
        document.getElementById('BillAddress').innerHTML = row['BillADDR2'];
        //document.getElementById('emailNotify').innerHTML = row['Notify'].replace(/~/g,", "); 

        //alert(row['Notify']); 
        document.getElementById('CSZ').innerHTML = row['BillCity'] + ", " + row['BillState'] + " " + row['BillZip'];



        //Build the MAP and Phone Links
        //3-1-12 Added Target= Blank
        try {
            var emails = row['Notify'].replace(/~/g, ", ");
            mapURL = "<center><table><tr><td><a target='_blank' href='http://maps.google.com/maps?q=" + row['BillADDR2'] + "," + row['BillCity'] + " " + row['BillState'] + " " + row['BillZip'] + "&hl=en' style='text-decoration:none'>&nbsp;&nbsp;&nbsp;<img src='img/map.png'><br>Map It</a></td>  <td>&nbsp;&nbsp;<br></td><td><a href='mailto:" + emails + "' style='text-decoration:none'>&nbsp;&nbsp;&nbsp;<img src='img/mail.png'><br>Email</a></td><td>&nbsp;&nbsp;<br></td><td><a href='tel:" + row['ShipPhone'].replace("~", ",") + "' style='text-decoration:none'>&nbsp;&nbsp;&nbsp;<img src='img/call.png'><br>Call It</a></td></tr></table></center></br></br></br></br>";
            //alert(mapURL);
            document.getElementById('map').innerHTML = mapURL;

            show("preview");
        }
        catch (err) {

            hide("preview");
            //show("preview");
        }
        
        

    }
}
//END PREVIEW    



function vibrate() {

    try {
        navigator.notification.vibrate(500);
    }
    catch (err) {
        console.log('BZZZZ  - in Vibrate');
    }

} //end vibrate



function toggleException(){

            var test = document.forms[0].except.src;
        
                
                    if (test.indexOf("no") ==-1) {
                    
                        document.forms[0].except.src='img/exCheckedno.png';
                        var custid = localStorage.getItem('custid');
                        saveReport(custid, "exception", "No");
                    }
                    else
                    {
                        
                        document.forms[0].except.src='img/exChecked.png';
                        var custid = localStorage.getItem('custid');
                        saveReport(custid, "exception", "Yes");
                    }

                

            
                

}//end toggleException




//Initial User Setup Logic

function setupUser() {
    updateCounts(); //count stuff
    console.log("Updated counts - iReport.js");

    var TheTech = localStorage.getItem("tech");
    //alert("Welcome: "+ TheTech);
    //document.getElementById('TechName').innerHTML =localStorage.getItem("tech");
    //var TheTech = localStorage.getItem("username");
    if (TheTech == null || TheTech == '') {
        localStorage.setItem("Tech", "setup");

        window.location.replace("setup.html");

    }



    function initial_setup() {
        var name = prompt("eReport Setup -  Please enter your Username", "");
        var pw = prompt("eReport Setup -  Please enter your Domino Password", "");


        if (name != null && name != "" && pw != "") {



            daLogin = doDominoLogin(name, pw); // ajaxLogin.js
            if (daLogin) {
                //alert("daLogin succeeded");
                //Set the tech name based on who is logged in
                localStorage.setItem("username", name);
                localStorage.setItem("password", pw);



                //var TheTech = localStorage.getItem("tech");
                //var TheTech = localStorage.getItem("username");
                document.getElementById('TechName').innerHTML = localStorage.getItem("Tech");



                //alert("hello " + TheTech);
                show('initSetup');
            }


        }
    }
 

}







<!--End Initial Setup Function -->

function setTech(daTech) {
    localStorage.setItem("tech", daTech);
    //alert(daTech);
}

function clearTech() {
    localStorage.setItem("tech", '');
}


<!--ajaxLogin -->

function doDominoLogin(username, password) {

    var logReq = createXHTMLHttpRequest();
    var poststring = "RedirectTo=" + escape('ereportv4.nsf/login.html') + "&Username=" + username + "&password=" + password;
    logReq.open("POST", "https://www.chardonlabs.com/names.nsf?Login", false);
    logReq.send(poststring);


    if (logReq.status == 200) {

        lastposition = logReq.responseText.lastIndexOf("###");


        if (lastposition == -1) {
            alert("Invalid Username orPassword");
            //initial_setup1();
            return (false);
        }

        // I am looking for a specific page:  ereportv4.nsf/login.html
        //All of the parsing values are based on this - it will need to be modified if the login.html changes

        daLength = lastposition - 600;
        username = logReq.responseText.substr(617, 150);
        namelength = username.indexOf("###");
        //alert(namelength);

        username = logReq.responseText.substr(617, namelength - 29);

        localStorage.setItem("Tech", username);

        //alert("Username: "+ username);

        roleStart = logReq.responseText.indexOf("$$WebClient,");
        //alert("roleStart: "+ roleStart);
        //roleStart = logReq.responseText.indexOf(username);
        //alert("roleStart: "+ roleStart);
        roleEnd = logReq.responseText.lastIndexOf("###");
        //alert("roleEnd: "+ roleEnd);
        RolesChunk = logReq.responseText.substr(roleStart, roleEnd - roleStart - 29);

        //RolesChunk = logReq.responseText.lastIndexOf("$$WebClient,");
        localStorage.setItem("Roles", RolesChunk);

        //alert("Roles : "+ RolesChunk );
        //alert("end " +roleEnd);
        console.log(logReq.responseText);

        //alert("You are logged in as: "+ username);
        //document.getElementById('TechName').innerHTML = username;
        return (true);
    }
    else {
        alert("Network Unreachable!");
        return (false);
    };
}

function createXHTMLHttpRequest() {


    try {
        return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {}
    try {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
    try {
        return new XMLHttpRequest();
    } catch (e) {}
    alert("XMLHttpRequest is not supported on this browser!");
    return null;
}




//////////////////////////////////Silently Login to Domino prior to each Network Call 

function loginReport() {
    //updates the 
    try {
        //Run some code here
        navigator.network.isReachable("www.chardonlabs.com", reachableCallback, {});
    }
    catch (err) {
        //Handle errors here
        //alert("Authenticating from a Browser");  
    }



    var username = localStorage.getItem("username");
    var pw = localStorage.getItem("password");
  
    doDominoLoginSilent(username, pw);

}

function login() {
    //updates the 
    try {
        //Run some code here
        navigator.network.isReachable("www.chardonlabs.com", reachableCallback, {});
    }
    catch (err) {
        //Handle errors here
        //alert("Authenticating from a Browser");  
    }


    //Silent Login - no prompts
    //use stored values from localStorage
    var username = localStorage.getItem("username");
    var pw = localStorage.getItem("password");


    //Remove this code when Setup Screen is working
    //if (username == null){username='mbutcher'};
    //if (pw == null){pw ='mike'};
    //alert(username+" " +pw + " " + "  iReport.js  line 262");  
    doDominoLoginSilent(username, pw);

}


function doDominoLoginSilent(username, password) {

    var logReq = createXHTMLHttpRequest();
    var poststring = "RedirectTo=" + escape('ereportv4.nsf/login.html') + "&Username=" + username + "&password=" + password;
    logReq.open("POST", "https://www.chardonlabs.com/names.nsf?Login", false);
    logReq.send(poststring);

 

    if (logReq.readyState==4 && logReq.status == 200) {

        lastposition = logReq.responseText.lastIndexOf("###");


        if (lastposition == -1) {
            alert("Invalid Password");
            //initial_setup1();
            return (false);
        }

        // I am looking for a specific page:  ereportv4.nsf/login.html
        //All of the parsing values are based on this - it will need to be modified if the login.html changes

        daLength = lastposition - 600;
        username = logReq.responseText.substr(617, 150);
        namelength = username.indexOf("###");
        //alert(namelength);

        username = logReq.responseText.substr(617, namelength - 29);


        console.log("You are logged in as: "+ username);
        //document.getElementById('TechName').innerHTML = username;
        return (true);
    }
    else {

        alert("Network Unreachable!");
        return (false);
    };
}
<!--End Ajax Login -->
