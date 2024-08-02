<?php

header("Content-type: application/json");
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $product = [
    ['product_id' => '1001','product_name' => 'Bulad', 'price' => '100'],
    ['product_id' => '1002','product_name' => 'Ginamos', 'price' => '10'],
    ['product_id' => '1003','product_name' => 'Pancit Canton', 'price' => '20'],
    ['product_id' => '1004','product_name' => 'Tinapa', 'price' => '30'],
    ['product_id' => '1005','product_name' => 'Charger', 'price' => '140'],
    ['product_id' => '1006','product_name' => 'Perfume', 'price' => '230'],
    ['product_id' => '1007','product_name' => 'Papel', 'price' => '50'],
    ['product_id' => '1008','product_name' => 'Sapatos', 'price' => '450'],
    ['product_id' => '1009','product_name' => 'Ballpen', 'price' => '10'],
    ['product_id' => '1010','product_name' => 'Earrings', 'price' => '50'],
  ];

  echo json_encode($product);
}