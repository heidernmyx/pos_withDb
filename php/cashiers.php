<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$users = [
  ['username' => 'pitok', 'password' => '12345', 'fullname' => 'Pitok Batolata'],
  ['username' => 'kulas', 'password' => '54321', 'fullname' => 'Kulas D. Malas'],
  ['username' => 'sabel', 'password' => '123', 'fullname' => 'Sabel'],
  ['username' => 'heidern', 'password' => 'montejo', 'fullname' => 'Heidern Montejo'],
];

echo json_encode($users);
