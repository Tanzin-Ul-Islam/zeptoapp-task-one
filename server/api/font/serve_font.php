<?php
require_once __DIR__ . '/../../config/headers.php';

setCorsHeaders();
handlePreflight();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$requestedFile = $_GET['file'] ?? '';
$fontPath = __DIR__ . '/../../uploads/fonts/' . basename($requestedFile);

if (!file_exists($fontPath)) {
    http_response_code(404);
    exit;
}

header('Content-Type: application/x-font-ttf');
header('Content-Length: ' . filesize($fontPath));

readfile($fontPath);
exit; 