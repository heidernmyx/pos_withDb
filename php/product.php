<?php

header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");


// $input = file_get_contents("php://input");
// $data = json_decode($input, true); 
// $name = isset($_GET['name']) ? $_GET['name'] : null;
// $price = isset($_GET['price']) ? $_GET['price'] : null;

class Product {

  public function create($json) {
    include '../php/connection.php';
    $json = json_decode($json, true);

    $sql = "INSERT INTO `tbl_products`(
      `product_name`,
      `product_price`
    )
    VALUES(
      :product_name,
      :product_price
    )";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':product_name', $json['productName'], PDO::PARAM_STR);
    $stmt->bindParam(':product_price', $json['productPrice'], PDO::PARAM_INT);
    $stmt->execute();

    $returnValue = $stmt->rowCount() > 0 ? 1 : 0;
    unset($stmt); unset($conn);
    return $returnValue;
  }

    public function getProducts() {
      include '../php/connection.php';

      // Use single or double quotes for the SQL query string
      $sql = 'SELECT * FROM tbl_products';
  
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
      unset($conn); 
      unset($stmt);
      return json_encode($result);
    }
    

}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  if (isset($_POST['operation'])) {
      $operation = $_POST['operation'];
      $json = isset($_POST['json']) ? $_POST['json'] : null;
  } else {
      echo json_encode(['error' => 'Operation not set']);
  }
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  if (isset($_GET['operation'])) {
    $operation = $_GET['operation'];
    $json = isset($_GET['json']) ? $_GET['json'] : null;
} else {
    echo json_encode(['error' => 'Operation not set']);
}
}

$product = new Product();
switch ($operation) {
  case "insert":
    echo $product ->create($json);
    break;
  case "getProducts":
    echo $product ->getProducts();
    break;
  
  default:
    echo "Your favorite color is neither red, blue, nor green!";
};

