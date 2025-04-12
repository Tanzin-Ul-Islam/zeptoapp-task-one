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
    if (empty($input['name'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Group name is required']);
        exit;
    }

    $groupName = trim($input['name']);

    // Start transaction
    $db->beginTransaction();

    // 1. Check for existing group with same name
    $checkStmt = $db->prepare("SELECT id FROM font_groups WHERE name = ?");
    $checkStmt->execute([$groupName]);
    
    if ($checkStmt->fetch()) {
        $db->rollBack();
        http_response_code(409); // Conflict status code
        echo json_encode([
            'success' => false,
            'message' => 'Group name already exists'
        ]);
        exit;
    }

    // 2. Create the group
    $stmt = $db->prepare("INSERT INTO font_groups (name) VALUES (?)");
    $stmt->execute([$groupName]);
    $groupId = $db->lastInsertId();

    // 3. Add fonts if provided
    $fontsAdded = 0;
    if (!empty($input['fonts']) && is_array($input['fonts'])) {
        $insertStmt = $db->prepare("INSERT INTO font_group_members (group_id, font_id) VALUES (?, ?)");
        
        foreach ($input['fonts'] as $fontId) {
            if (!is_numeric($fontId)) continue;
            try {
                $insertStmt->execute([$groupId, (int)$fontId]);
                $fontsAdded++;
            } catch (PDOException $e) {
                // Skip duplicate entries silently
                if ($e->errorInfo[1] != 1062) throw $e; // MySQL duplicate key error code
            }
        }
    }

    // Commit transaction
    $db->commit();

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'group_id' => $groupId,
        'name' => $groupName,
        'fonts_added' => $fontsAdded
    ]);

} catch(PDOException $e) {
    // Rollback on error
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