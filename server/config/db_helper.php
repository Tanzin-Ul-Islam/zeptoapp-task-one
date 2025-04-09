<?php
require_once __DIR__ . '/database.php';

function getDbConnection() {
    static $db = null; // Persistent connection
    
    if ($db === null) {
        try {
            $database = new Database();
            $db = $database->connect();
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Database connection failed',
                'error' => $e->getMessage()
            ]);
            exit;
        }
    }
    
    return $db;
}