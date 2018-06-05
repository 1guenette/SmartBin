//call ajax

var hideShow = document.getElementById("more-info");
hideShow.style.display = "none";


function CreateRegistrationTable(){
	
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "data.php", true);
    ajax.send();
    
    // receiving response from data.php
    ajax.onreadystatechange = function(){
        if((ajax.readyState == 4 && ajax.status == 200)){
            // converting JSON back to array
            var data = JSON.parse(ajax.responseText);

            //html values
            var html = "";

            for(var a = 0; a < data.length; a++){
				var unitId = data[a].UnitId;
                var ownerId = data[a].OwnerId;
                var lon = data[a].Longitude;
                var lat = data[a].Latitude;
                var stat = data[a].Status;

				//linkNum = linkNum + unitId;
				var idNum = a + 1;
				
                //appending at html
                html += "<tr>";
                    html += "<td onclick=" + "'UpdateEventLogTableAndGraph(" + idNum + ")'" + "id=" + CreateId(idNum) + " " + "class='numLink'" + ">" + unitId + "</td>";
					html += "<td>" + ownerId + "</td>";
                    html += "<td>" + lon + "</td>";
                    html += "<td>" + lat + "</td>";
                    html += "<td>" + stat + "</td>";
                html += "</tr>";
            }

            //replacing the <tbody> of <table>
            document.getElementById("data1").innerHTML = html;
            //document.getElementById("data").innerHTML = html.style

        }
    }
}

function CreateId(_id){
	var linkNum = "link" + _id;
	return linkNum;
}

function CreateEventLogTable(_id){
    var ajax = new XMLHttpRequest();

    ajax.open("GET", "EventLog.php", true);

    ajax.send();

    // receiving response from data.php
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // converting JSON back to array
            var data = JSON.parse(this.responseText);
            //console.log(data); // for debugging

            //html values
            var html = "";
			//var title = "";
            for(var a = 0; a < data.length; a++){
				if(data[a].UnitId == _id){
					//console.log('gotin');
					var unitId = data[a].UnitId;
					var eventType = data[a].EventType;
					var eventTime = data[a].EventTime;

                //appending at html
					html += "<tr>";
						//html += "<td>" + unitId + "</td>";
						if(eventType == 0){
							html += "<td>Emptied</td>";
						}else if(eventType == 1){
							html += "<td>Full</td>";
						}else if(eventType == 2){
							html += "<td>Error</td>";
						}else{
							html += "<td>Use</td>"
						}
						
					
						html += "<td>" + eventTime + "</td>";
					html += "</tr>";
				}
            }
			document.getElementById("data-title").innerHTML = "Unit: " + (data[_id - 1].UnitId);

            //replacing the <tbody> of <table>
            document.getElementById("data2").innerHTML = html;
            //document.getElementById("data").innerHTML = html.style

        }
    }
}



function UpdateEventLogTableAndGraph(_id){
	var linkId = "link" + _id;
	CreateEventLogTable(_id);
    CreateGraphs(_id, "2018-03-28");
	hideShow.style.display = "block";
	return document.getElementById(linkId).innerHTML;
	
}

 function CreateGraphs(_id, dataStr){ //Most enter in year-month-hour format

    //Information for the frequency by day array
    var dateByDayArray = ["3/28", "3/29", "3/30", "3/31", "4/1", "4/2", "4/3"];
    var freqByDayArray = [4, 12, 6, 9, 14, 4, 8];
    var dayData;
    var ctx1 = document.getElementById('myChart1').getContext('2d');

    //Information for the frequency by hour array
    var dateByHourArray = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];
    var freqByHourArrayHelper = [];
    var hourCounterArray = [];
    var freqByHourArray = new Array(24);
    var hourData;
    var ctx2 = document.getElementById('myChart2').getContext('2d');

    var ajax = new XMLHttpRequest();

    ajax.open("GET", "EventLog.php", true);

    ajax.send();

    // receiving response from data.php
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // converting JSON back to array
            var data = JSON.parse(this.responseText);
            //Logic for the freqency by hour graph
            for(var a = 0; a < data.length; a++){
                if(data[a].UnitId == _id){
                    //Code to create the freqByHourArrayHelper
                    if((data[a].EventType == 3) && (data[a].EventTime.slice(0,10) == dataStr)){
                        freqByHourArrayHelper[a] = parseInt(data[a].EventTime.slice(11,13));
                    }
                }
            }

            for(var i = 0; i < freqByHourArrayHelper.length; i++){
                freqByHourArray[i] = 0;
            }

            for(var i = 0; i < freqByHourArrayHelper.length; i++){
                if(freqByHourArray[i] === undefined){
                    continue;
                }else{
                    freqByHourArray[freqByHourArrayHelper[i]]++;
                    console.log(freqByHourArrayHelper[i]);
                }
            }

            dayData = {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: dateByHourArray,
                    datasets: [{
                        label: "Frequency By Day",
                        backgroundColor: 'rgb(255, 122, 20)',
                        borderColor: 'rgb(255, 122, 20)',
                        data: freqByHourArray,
                    }]
                },

                    // Configuration options go here
                    options: {}
            };          
            
            hourData = {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: dateByDayArray,
                    datasets: [{
                        label: "Frequency By Hour",
                        backgroundColor: 'rgb(255, 122, 20)',
                        borderColor: 'rgb(255, 122, 20)',
                        data: freqByDayArray,
                    }]
                },

                    // Configuration options go here
                    options: {}
            };
        }
        var chart1 = new Chart(ctx1, dayData);
        var chart2 = new Chart(ctx2, hourData);
    }
}

function getAddress(lat, lon){
    function success(position){
        var latitude = lat;
        console.log("latitude " + latitude);
        var longitude = lon;
        
        var location = document.getElementById("location");
        var apiKey = "AIzaSyDdTd6M6KOw5AaWzczNr_WeHbPJyBXJtlE";
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
        
        // location.innerHTML = "Latitude:" + latitude+"°"+ "Longitude: " + longitude+'°';
        var theUrl = url + latitude + ',' + longitude + '&key=' + apiKey;
     
        $.getJSON(theUrl, function(data){
            $.ajax({
                url: theUrl, dataType: 'json',
                success: function(results){
                    $("#city").text(results.results[3].address_components[4].long_name)
                    $("#country").text(results.results[0].address_components[5].long_name)
                }
            }     
        )});
        
    }   
    navigator.geolocation.getCurrentPosition(success);
    // location.innerHTML = "Locating...";
 }

CreateRegistrationTable();
//CreateGraphs(1, "2018-03-28");
//IsFull();

        
        

        