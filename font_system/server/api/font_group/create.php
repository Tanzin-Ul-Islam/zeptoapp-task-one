<?php
require_once __DIR__ . '/../../config/headers.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/db_helper.php';

handlePreflight();
setCorsHeaders();

try {
    $db = getDbConnection();
    $input = json_decode(file_get_contents('php://input'), true);
    

    if (empty($input['name'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Group name is required']);
        exit;
    }

    $groupName = trim($input['name']);

    $db->beginTransaction();

    $checkStmt = $db->prepare("SELECT id FROM font_groups WHERE name = ?");
    $checkStmt->execute([$groupName]);
    
    if ($checkStmt->fetch()) {
        $db->rollBack();
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'Group name already exists'
        ]);
        exit;
    }

    $stmt = $db->prepare("INSERT INTO font_groups (name) VALUES (?)");
    $stmt->execute([$groupName]);
    $groupId = $db->lastInsertId();

    $fontsAdded = 0;
    if (!empty($input['fonts']) && is_array($input['fonts'])) {
        $insertStmt = $db->prepare("INSERT INTO font_group_members (group_id, font_id) VALUES (?, ?)");
        
        foreach ($input['fonts'] as $fontId) {
            if (!is_numeric($fontId)) continue;
            try {
                $insertStmt->execute([$groupId, (int)$fontId]);
                $fontsAdded++;
            } catch (PDOException $e) {
                if ($e->errorInfo[1] != 1062) throw $e;
            }
        }
    }

    $db->commit();

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'group_id' => $groupId,
        'name' => $groupName,
        'fonts_added' => $fontsAdded,
        'message' => 'Group created successfully.'
    ]);

} catch(PDOException $e) {
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