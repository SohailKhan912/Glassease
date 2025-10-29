<?php
include "config.php";
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $order_id = $_POST['order_id'];
    $rating = $_POST['rating'];
    $comment = $_POST['comment'];

    $sql = "INSERT INTO feedback (order_id, rating, comment) VALUES ('$order_id', '$rating', '$comment')";
    if (mysqli_query($conn, $sql)) {
        echo "Thanks for your feedback!";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>
<link rel="stylesheet" href="style.css">

<form method="post">
  Order ID: <input type="number" name="order_id" required><br>
  Rating (1-5): <input type="number" name="rating" min="1" max="5" required><br>
  Comment: <br><textarea name="comment" rows="4" cols="30" required></textarea><br>
  <input type="submit" value="Submit Feedback">
</form>
