<?php
include "config.php";

$result = mysqli_query($conn, "SELECT * FROM orders");

echo "<h2>All Orders</h2>";
while ($row = mysqli_fetch_assoc($result)) {
    echo "<div>";
    echo "Customer: " . $row['customer_name'] . "<br>";
    echo "Status: " . $row['status'] . "<br>";
    echo "<a href='update_status.php?id=".$row['id']."&status=Accepted'>Accept</a> | ";
    echo "<a href='update_status.php?id=".$row['id']."&status=Dispatched'>Dispatch</a> | ";
    echo "<a href='update_status.php?id=".$row['id']."&status=Delivered'>Deliver</a>";
    echo "</div><hr>";
}
?>
