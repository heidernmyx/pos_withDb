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
}
else if ($_SERVER['REQUEST_METHOD'] == "GET") {
  $operation = $_GET['operation'];
}