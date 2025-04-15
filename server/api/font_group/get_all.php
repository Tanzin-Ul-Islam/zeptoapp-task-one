<?php
require_once __DIR__ . '/../../config/headers.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/db_helper.php';

handlePreflight();
setCorsHeaders();

try {
    $db = getDbConnection();
    $groups = $db->query("SELECT * FROM font_groups ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
    foreach ($groups as &$group) {
        $stmt = $db->prepare("
            SELECT f.* 
            FROM fonts f
            JOIN font_group_members fgm ON f.id = fgm.font_id
            WHERE fgm.group_id = ?
            ORDER BY fgm.created_at ASC
        ");
        $stmt->execute([$group['id']]);
        $group['fonts'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode([
        'success' => true,
        'data' => $groups
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
