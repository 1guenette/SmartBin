<?php

// // getting data from database
$conn = mysqli_connect("trashnet.ece.iastate.edu", "logan", "ROFLdb!789", "trashnet_db");

// // getting data from table
$result = mysqli_query($conn, "SELECT * FROM trashnet_db.eventsLog");

// // storing in array
$data = array();
while($row = mysqli_fetch_assoc($result)){
	$data[] = $row;
}

// // returning response in JSON format

echo json_encode($data);
