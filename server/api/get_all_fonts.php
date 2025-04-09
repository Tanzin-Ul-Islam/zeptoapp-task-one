<?php
require_once __DIR__ . '/../config/headers.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/db_helper.php';

handlePreflight();
setCorsHeaders();

try {
    $db = getDbConnection();
    
    $stmt = $db->query("SELECT * FROM fonts");
    $fonts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($fonts as &$font) {
        $font['file_path'] = 'http://localhost:8000/api/serve_font.php?file=' . basename($font['file_path']);
    }
    echo json_encode([
        'success' => true,
        'data' => $fonts
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}