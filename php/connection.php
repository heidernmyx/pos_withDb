<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pos_db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(array("error" => "Connection failed: " . $e->getMessage()));
    exit();
}
?>
