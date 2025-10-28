<?php
include "config.php";

$name = $_POST['name'];
$contact = $_POST['contact'];
$address = $_POST['address'];
$door_type = $_POST['door_type'];
$size = $_POST['size'];
$glass_type = $_POST['glass_type'];

$image = $_FILES['image']['name'];
$target = "uploads/" . basename($image);
move_uploaded_file($_FILES['image']['tmp_name'], $target);

$sql = "INSERT INTO orders (customer_name, contact, address, door_type, size, glass_type, image_path)
VALUES ('$name', '$contact', '$address', '$door_type', '$size', '$glass_type', '$target')";

if (mysqli_query($conn, $sql)) {
    echo "Booking submitted!";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>
