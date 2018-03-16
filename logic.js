$(document).ready(function() {

    // Global Variables
    var tDb = firebase.database();
    
    
    // Event listener for form
    $("#train-submit").on("click", function(e){
        
        e.preventDefault();

        var tName = $("#train-name").val().trim();
        var tDest = $("#train-dest").val().trim();
        var tTime = moment($("#train-time").val().trim(), "HH:mm").format("X");
        var tFreq = $("#train-freq").val().trim();

        var newT = {
            Name: tName,
            Destination: tDest,
            Frequency: tFreq,
            Time_Input: tTime,
            dbTime: firebase.database.ServerValue.TIMESTAMP
        };

        tDb.ref().push(newT);

    });

    
    // Time conversion event listener
    tDb.ref().on("child_added", function(childSnapshot){
            
        var tSnap = childSnapshot.val();
        console.log(tSnap);

        var dbName = tSnap.Name;
        var dbDest = tSnap.Destination;
        var dbFreq = tSnap.Frequency;
        var dbTimeInput = tSnap.Time_Input;
        
        var timeDiff = moment().diff(moment.unix(dbTimeInput), "minutes");
        var timeRem = moment().diff(moment.unix(dbTimeInput), "minutes") % dbFreq ;
        var min = dbFreq - timeRem;

        var tArrival = moment().add(min, "m").format("hh:mm A"); 
        
        
        console.log(min);
        console.log(tArrival);
        console.log(moment().format("hh:mm A"));
        console.log(tArrival);
        console.log(moment().format("X"));



        
        var addRow = $("<tr>");
        var addTData = $("<td>" + dbName + "</td>" + "<td>" + dbDest + "</td>"+ "<td>" + dbFreq + "</td>" + "<td>" + tArrival + "</td>" + "<td>" + min + "</td>");

        addRow.append(addTData);
        $("#table-body").append(addRow);
        
    }); 
});