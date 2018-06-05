<?php

//use http://trashnet.ece.iastate.edu/ConnectTest.php
$host="localhost";
$port=3306;
$user="logan";
$password="ROFLdb!789";
$dbname="test";

// connects to database using the login credentials
$conn = mysqli_connect($host,$user,$password,$dbname,$port);

//tests and checks for a successful connection to the database
if (!$conn){
  die("Connection failed: ".mysqli_connect_error());
}
if($conn){
  echo "Connection successful";
}
?>
