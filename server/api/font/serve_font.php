<?php
require_once __DIR__ . '/../../config/headers.php';

setCorsHeaders();
handlePreflight();

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Security checks
$requestedFile = $_GET['file'] ?? '';
$fontPath = __DIR__ . '/../../uploads/fonts/' . basename($requestedFile);

if (!file_exists($fontPath)) {
    http_response_code(404);
    exit;
}

// Set proper headers for font file
header('Content-Type: application/x-font-ttf');
header('Content-Length: ' . filesize($fontPath));

// Serve the file
readfile($fontPath);
exit; 