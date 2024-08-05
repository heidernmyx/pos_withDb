<?php

  header('Content-Type: application/json');
  header("Access-Control-Allow-Origin: *");
  include '../php/connection.php';

  $data = json_decode(file_get_contents('php://input'), true);
  $username = $data['username'];
  $password = $data['password'];

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $sql= "SELECT * FROM `tbl_accounts` username = :username AND password = :password";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":username", $username, PDO::PARAM_STR );
    $stmt->bindParam(":password", $password, PDO::PARAM_STR );
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    unset($conn); unset($stmt);
    return json_encode($result);
  }
  else {
    echo json_encode(["message" => "Wrong Credentials"]);
  }