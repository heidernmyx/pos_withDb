<?php


header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");

class Employee {

  public function addCashier() {

  }

  public function addSupervisor() {

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

}