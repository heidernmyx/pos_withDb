<?php

header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$content = trim(file_get_contents("php://input"));
$data = json_decode($content, true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  include '../php/connection.php';


  $username = isset($data['username']) ? $data['username'] : null;
  $password = isset($data['password']) ? $data['password'] : null;

  $sql = "SELECT *
    FROM tbl_accounts
    WHERE username = :username AND password = :password";

  $stmt = $conn->prepare($sql);
  $stmt->bindParam(':username', $username, PDO::PARAM_STR);
  $stmt->bindParam(':password', $password, PDO::PARAM_STR);
  $stmt->execute();

  $result = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($result) {

    echo json_encode(array('data' => $result));
    // echo json_encode(array("data" => [ 
    //   'message' => 'Login Successful', 
    // ]));
  }
  else {
    echo json_encode(array("error" => [ 
      'message' => 'Wrong Credentials, Please try again', 
    ]));
  }

  // echo json_encode(array(
  //   "data" => [ 
  //     'email' => $data['email'], 
  //     'password' => $data['password']
  //   ]
  // ));
  
  // echo json_encode(array("data" => [ 'email' => $data['email'], 'password' => $data['password']]));
}