<?php
session_start();
include "config.php";

$error = "";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Basic user check (no hashing for simplicity)
    $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) === 1) {
        $user = mysqli_fetch_assoc($result);
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];

        // Redirect based on role
        if ($user['role'] == 'admin' || $user['role'] == 'vendor') {
            header("Location: dashboard.php");
        } else {
            header("Location: track.php");
        }
        exit();
    } else {
        $error = "❌ Invalid username or password.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login - GlassEase</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
      font-family: Arial, sans-serif;
    }
    .login-box {
      width: 350px;
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0px 6px 18px rgba(0,0,0,0.2);
    }
    .login-box h2 {
      text-align: center;
      margin-bottom: 20px;
    }
    .form-control {
      border-radius: 8px;
    }
    .btn {
      width: 100%;
      border-radius: 8px;
    }
    .error {
      color: red;
      text-align: center;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="login-box">
    <h2>🔑 Login</h2>

    <?php if ($error) { echo "<p class='error'>$error</p>"; } ?>

    <form method="post">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input type="text" name="username" class="form-control" required>
      </div>

      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" name="password" class="form-control" required>
      </div>

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</body>
</html>
