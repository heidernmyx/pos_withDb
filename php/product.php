<?php

header("Content-type: application/json");
header("Content-type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $product = [
    ['product_id' => '1001','product_name' => 'Bulad', 'price' => '75'],
    ['product_id' => '1002','product_name' => 'Ginamos', 'price' => '75'],
    ['product_id' => '1003','product_name' => 'Pancit Canton', 'price' => '75'],
    ['product_id' => '1004','product_name' => 'Tinapa', 'price' => '75'],
    ['product_id' => '1005','product_name' => 'Charger', 'price' => '75'],
    ['product_id' => '1006','product_name' => 'Perfume', 'price' => '75'],
    ['product_id' => '1006','product_name' => 'Papel', 'price' => '75'],
    ['product_id' => '1006','product_name' => 'Sapatos', 'price' => '75'],
    ['product_id' => '1006','product_name' => 'Ballpen', 'price' => '75'],
    ['product_id' => '1006','product_name' => 'Earrings', 'price' => '75'],
  ];

  echo json_encode($product);
}