<!DOCTYPE html>
<html>
<body>
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

$conn = mysqli_connect($host,$user,$password,$dbname,$port);
if(!$conn){
  die("Connection failed: ".mysqli_connect_error());
}
$sql ="SELECT max(UnitId) from registration;";
$result = mysqli_query($conn,$sql) or die("Error in selecting".mysqli_error($conn));
while($row = mysqli_fetch_assoc($result)){
  $newID =$row['max(UnitId)']+1;
}

$sql1="INSERT INTO registration values('$newID', '$ID', '$Lon','$Lat','$Add');";
mysqli_query($conn,$sql1) or die("Error in selecting".mysqli_error($conn));
echo "Device successfully registered";
//echo $newID;
?>

<?php
/*$ID=$_POST["OwnerId"];
$host = "localhost";
$port=3306;
$user="logan";
$password="ROFLdb!789";
$dbname="trashnet_db";
$conn = mysqli_connect($host,$user,$password,$dbname,$port);
if(!$conn){
  die("Connection failed: ".mysqli_connect_error());
}
$sql = "select * from registration where OwnerID='$ID'";

    $result = mysqli_query($conn,$sql) or die("Error in selecting".mysqli_error($conn));
    $tmpArr = array();
    $i=0;
    echo $ID."'s devices are: ";
    while($row = mysqli_fetch_assoc($result)){
      $tmpArr[$i] = $row;
      echo "<br>";
      echo "UnitId: ".$row['UnitId']." ";
      echo "Longitude: ".$row['Longitude']." ";
      echo "Latitude: ".$row['Latitude']." ";
      echo "Address: ".$row['Address'];
      $i++;
    }
    //echo "The JSON IS: ".json_encode($tmpArr);
    mysqli_close($conn);*/
?>


</body>
</html>
