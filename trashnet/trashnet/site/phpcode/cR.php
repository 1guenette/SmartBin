<!DOCTYPE html>
<html>
<body>

<?php
$ID=$_POST["OwnerId"];
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
    mysqli_close($conn);
?>
<br><br><br>
<h2>Remove a device: (All fields are required):</h2><br>

<form action="RemoveDevice.php" method="post">
Your company name:<br>
 <input type="text" name="OwnerId"><br>
The unit's ID:<br>
  <input type="text" name="UnitId"><br>
Longitude:<br>
  <input type="text" name="Longitude"><br>
Latitude:<br>
   <input type="text" name="Latitude"><br>
Address:<br>
  <input type="text" name="Address"><br>
<input type="submit" value="submit">
</form>



</body>
</html>
