<?php


$host = "localhost";
$port=3306;
$user="logan";
$password="ROFLdb!789";
$dbname="trashnet_db";


$ID = $_POST["OwnerId"];
$Lon = $_POST["Longitude"];
$Lat = $_POST["Latitude"];
$Add = $_POST["Address"];
$Uid = $_POST["UnitId"];

$conn = mysqli_connect($host,$user,$password,$dbname,$port);
if(!$conn){
  die("Connection failed: ".mysqli_connect_error());
}

$sql0="SELECT * from registration WHERE UnitId = '$Uid' and OwnerId='$ID'
        and Longitude='$Lon' and Latitude = '$Lat' and Address = '$Add';";

$result = mysqli_query($conn,$sql0) or die("Error in selecting 0".mysqli_error($conn));
$tmp = 0;
while($row = mysqli_fetch_assoc($result)){
  $tmp++;
}
if($tmp>0){
  $sql1 = "DELETE FROM binStatus WHERE UnitId='$Uid';";
  $sql2 = "DELETE FROM eventsLog WHERE UnitID='$Uid';";
  $sql3 = "DELETE FROM registration WHERE UnitId= '$Uid' and OwnerID='$ID' and Longitude ='$Lon' and Latitude='$Lat';";
mysqli_query($conn,$sql1) or die("Error in selecting 1".mysqli_error($conn));
mysqli_query($conn,$sql2) or die("Error in selecting 2".mysqli_error($conn));
mysqli_query($conn,$sql3) or die("Error in selecting 3".mysqli_error($conn));

echo "Device successfully removed";
}
else{
  echo "No Device found for ";

  echo "   UNITID ".$Uid;
  echo "   OWNER ".$ID;
  echo "   LAT ".$Lat;
  echo "   LON ".$Lon;
  echo "   ADD ".$Add;

  echo "    Try again";
}









?>
