<?php
require_once __DIR__ . '/../../config/headers.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/db_helper.php';

handlePreflight();
setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'PATCH') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

try {
    $db = getDbConnection();
    $input = json_decode(file_get_contents('php://input'), true);


    if (empty($input['group_id']) || empty($input['name'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Group ID and name required']);
        exit;
    }

    $db->beginTransaction();

    $stmt = $db->prepare("UPDATE font_groups SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
    $stmt->execute([trim($input['name']), $input['group_id']]);

    if (isset($input['fonts'])) {
        $placeholders = implode(',', array_fill(0, count($input['fonts']), '?'));
        $deleteStmt = $db->prepare("
            DELETE FROM font_group_members 
            WHERE group_id = ? 
            AND font_id NOT IN ($placeholders)
        ");
        $deleteStmt->execute(array_merge([$input['group_id']], $input['fonts']));

        $insertStmt = $db->prepare("
            INSERT IGNORE INTO font_group_members (group_id, font_id)
            VALUES (?, ?)
        ");
        foreach ($input['fonts'] as $fontId) {
            $insertStmt->execute([$input['group_id'], $fontId]);
        }
    }

    $db->commit();

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Group updated successfully',
        'updated_at' => date('Y-m-d H:i:s')
    ]);
} catch (PDOException $e) {
    if (isset($db) && $db->inTransaction()) {
        $db->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage(),
        'error_code' => $e->errorInfo[1] ?? null
    ]);
}
