<?php
include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];

    $sql = "SELECT * FROM orders WHERE customer_name='$name'";
    $result = mysqli_query($conn, $sql);

    echo "<h3>Order Status for: $name</h3>";
    while ($row = mysqli_fetch_assoc($result)) {
        echo "Order ID: " . $row['id'] . "<br>";
        echo "Door Type: " . $row['door_type'] . "<br>";
        echo "Status: <strong>" . $row['status'] . "</strong><br><hr>";
    }
}
?>
<link rel="stylesheet" href="style.css">

<form method="post">
  Enter Your Name: <input type="text" name="name" required>
  <input type="submit" value="Check Status">
</form>
