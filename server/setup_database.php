<?php
require_once __DIR__ . '/config/database.php';

header("Content-Type: text/plain");

try {
    $database = new Database();
    $conn = $database->connect();

    $sql = file_get_contents(__DIR__ . '/config/schema.sql');

    $conn->exec($sql);

    echo "Fonts table created successfully!\n";

    $stmt = $conn->query("SHOW TABLES LIKE 'fonts'");
    if ($stmt->rowCount() > 0) {
        echo "Verification: Fonts table exists\n";
    } else {
        echo "Verification: Fonts table not found\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
