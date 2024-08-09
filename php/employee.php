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
    $sql = "SELECT
        `user_id`,
        tbl_roles.role AS user_role,
        `fullname`,
        `date_added`
    FROM
        `tbl_accounts`
    INNER JOIN tbl_roles
    ON tbl_roles.role_id = tbl_accounts.user_role
    WHERE tbl_roles.role != 'admin'
    ;";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);
    unset($conn); 
    unset($stmt);
    echo json_encode($returnValue);

  }


  public function addSupervisor() {

    // $

  }
  
  public function updateCashier() {

    include '../php/connection.php';
    $sql = "UPDATE
        `tbl_accounts`
    SET
        `user_role` = ':',
        `username` = ':',
        `password` = ':',
        `fullname` = ':'
    WHERE
        user_id = :";
        $stmt = $conn->prepare($sql);
        $stmt



  }

  public function deleteCashier() {

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
    // case "updateEmployee":
    //   $employee->getEmployee();
    //   break;

}