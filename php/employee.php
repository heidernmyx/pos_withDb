<?php


header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");

class Employee {

  public function addCashier($json) {
    include '../php/connection.php';

    $json = json_decode($json, true);

    // Check if all expected keys are present in the JSON data
    if(!isset($json['user_role'], $json['username'], $json['password'], $json['fullname'])) {
        throw new Exception("Invalid input: missing required fields");
    }

    $sql = "INSERT INTO tbl_accounts (
        user_role,
        username,
        password,
        fullname
    ) VALUES (
        :user_role,
        :username,
        :password,
        :fullname
    )";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_role', $json['user_role'], PDO::PARAM_INT);
    $stmt->bindParam(':username', $json['username'], PDO::PARAM_STR);
    $stmt->bindParam(':password', $json['password'], PDO::PARAM_STR);
    $stmt->bindParam(':fullname', $json['fullname'], PDO::PARAM_STR);

    $stmt->execute();
    $returnValue = $stmt->rowCount() > 0 ? 1 : 0;

    unset($conn);
    unset($stmt);

    return $returnValue;
}

  public function getEmployee() {

    include '../php/connection.php';
    $sql = "SELECT * FROM tbl_accounts";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    unset($conn); 
    unset($stmt);
    return json_encode($result);


  }


  public function addSupervisor() {

    // $

  }
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
  $operation = $_POST['operation'];
  $json = isset($_POST['json']) ? $_POST['json'] : null;
}
else if ($_SERVER['REQUEST_METHOD'] == "GET") {
  $operation = $_GET['operation'];
  $json = isset($_GET['json']) ? $_POST['json'] : null;
}

$employee = new Employee ();
switch ($operation) {
  case "addEmployee":
    $employee->addCashier($json);
    break;
  case "getEmployee":
    $employee->getEmployee();
    break;

}