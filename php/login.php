<?php

header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");
// $content = trim(file_get_contents("php://input"));
// $data = json_decode($content, true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  include '../php/connection.php';
  
  $json = isset($_POST['json']) ? $_POST['json'] : null;

// Decode the JSON string
  $json = json_decode($json, true);
  $sql = "SELECT user_id, user_role, fullname
    FROM tbl_accounts
    WHERE username = :username AND password = :password";

  $stmt = $conn->prepare($sql);
  $stmt->bindParam(':username', $json['username'], PDO::PARAM_STR);
  $stmt->bindParam(':password', $json['password'], PDO::PARAM_STR);
  $stmt->execute();

  $result = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($result) {

    echo json_encode($result);
  }
  else {
    echo json_encode(array("error" => [ 
      'message' => 'Wrong Credentials, Please try again', 
    ]));
  }

}