<?php
require_once __DIR__ . '/config/database.php';

header("Content-Type: text/plain");

try {
    $database = new Database();
    $conn = $database->connect();
    
    // Read SQL file
    $sql = file_get_contents(__DIR__ . '/config/schema.sql');
    
    // Execute SQL
    $conn->exec($sql);
    
    echo "Fonts table created successfully!\n";
    
    // Verify table exists
    $stmt = $conn->query("SHOW TABLES LIKE 'fonts'");
    if ($stmt->rowCount() > 0) {
        echo "Verification: Fonts table exists\n";
    } else {
        echo "Verification: Fonts table not found\n";
    }
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}