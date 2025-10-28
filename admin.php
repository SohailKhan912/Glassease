<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: admin_login.php");
    exit();
}

$conn = new mysqli("localhost", "root", "", "glassease");

// Handle status update
if (isset($_POST['update_status'])) {
    $orderId = $_POST['order_id'];
    $newStatus = $_POST['status'];
    $conn->query("UPDATE orders SET status='$newStatus' WHERE id=$orderId");
    header("Location: admin.php"); // refresh page
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GlassEase Admin Panel</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body { background-color: #f4f6f9; }
    .sidebar {
      height: 100vh;
      background: #343a40;
      color: white;
      padding: 20px;
      position: fixed;
      width: 250px;
    }
    .sidebar a {
      color: #ddd;
      display: block;
      padding: 10px;
      margin: 5px 0;
      text-decoration: none;
      border-radius: 5px;
    }
    .sidebar a:hover { background: #495057; }
    .content { margin-left: 270px; padding: 20px; }
    table { background: white; }
    img { border-radius: 5px; }
  </style>
</head>
<body>
<div class="sidebar">
  <h3>Admin Panel</h3>
  <p>Welcome, <?php echo $_SESSION['admin']; ?> 👋</p>
  <a href="admin.php">Dashboard</a>
  <a href="#">Manage Orders</a>
  <a href="#">Manage Products</a>
  <a href="#">Manage Users</a>
  <a href="logout.php">Logout</a>
</div>

<div class="content">
  <h2>📊 Recent Orders</h2>
  <p>Manage all customer bookings here:</p>

  <table class="table table-striped table-bordered">
    <thead class="table-dark">
      <tr>
        <th>Order ID</th>
        <th>Customer</th>
        <th>Contact</th>
        <th>Address</th>
        <th>Door Type</th>
        <th>Size</th>
        <th>Glass Type</th>
        <th>Image</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <?php
      $result = $conn->query("SELECT * FROM orders ORDER BY id DESC");
      while ($row = $result->fetch_assoc()) {
          echo "<tr>
                  <td>{$row['id']}</td>
                  <td>{$row['customer_name']}</td>
                  <td>{$row['contact']}</td>
                  <td>{$row['address']}</td>
                  <td>{$row['door_type']}</td>
                  <td>{$row['size']}</td>
                  <td>{$row['glass_type']}</td>
                  <td><img src='{$row['image_path']}' width='60'></td>
                  <td><span class='badge bg-info'>{$row['status']}</span></td>
                  <td>
                    <form method='POST' style='display:inline-block;'>
                      <input type='hidden' name='order_id' value='{$row['id']}'>
                      <select name='status' class='form-select form-select-sm'>
                        <option value='Pending' ".($row['status']=="Pending"?"selected":"").">Pending</option>
                        <option value='Processing' ".($row['status']=="Processing"?"selected":"").">Processing</option>
                        <option value='Delivered' ".($row['status']=="Delivered"?"selected":"").">Delivered</option>
                        <option value='Cancelled' ".($row['status']=="Cancelled"?"selected":"").">Cancelled</option>
                      </select>
                      <button type='submit' name='update_status' class='btn btn-sm btn-primary mt-1'>Update</button>
                    </form>
                  </td>
                </tr>";
      }
      ?>
    </tbody>
  </table>
</div>
</body>
</html>
