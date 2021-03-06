<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$sources = array(
        'id'=> 1,
        'title'=> 'Image1');

  echo json_encode(['data'=>$sources]);
?>