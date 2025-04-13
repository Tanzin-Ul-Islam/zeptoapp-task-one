<?php
require_once __DIR__ . '/../../config/headers.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/db_helper.php';

handlePreflight();
setCorsHeaders();

try {
    $db = getDbConnection();
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    if (empty($input['group_id']) || empty($input['name'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Group ID and name required']);
        exit;
    }

    $db->beginTransaction();

    // 1. Update group name
    $stmt = $db->prepare("UPDATE font_groups SET name = ? WHERE id = ?");
    $stmt->execute([trim($input['name']), $input['group_id']]);

    // 2. Handle font updates if provided
    if (isset($input['fonts'])) {
        // Delete existing fonts not in new list
        $deleteStmt = $db->prepare("
            DELETE FROM font_group_members 
            WHERE group_id = ? 
            AND font_id NOT IN (" . implode(',', array_fill(0, count($input['fonts']), '?')) . ")
        ");
        $deleteStmt->execute(array_merge([$input['group_id']], $input['fonts']));

        // Add new fonts (ignore duplicates)
        $insertStmt = $db->prepare("
            INSERT IGNORE INTO font_group_members (group_id, font_id)
            VALUES (?, ?)
        ");
        foreach ($input['fonts'] as $fontId) {
            $insertStmt->execute([$input['group_id'], $fontId]);
        }
    }

    $db->commit();

    echo json_encode([
        'success' => true,
        'message' => 'Group updated successfully'
    ]);

} catch(PDOException $e) {
    $db->rollBack();
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}