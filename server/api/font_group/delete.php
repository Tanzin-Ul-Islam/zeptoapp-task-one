<?php
require_once __DIR__ . '/../../config/headers.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/db_helper.php';

handlePreflight();
setCorsHeaders();

try {
  $db = getDbConnection();
  $input = json_decode(file_get_contents('php://input'), true);
  $groupId = $input['id'] ?? null;

  // Validate input
  if (!$groupId || !is_numeric($groupId)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Valid group ID required']);
    exit;
  }

  // Start transaction
  $db->beginTransaction();

  // 1. Get group info for response before deletion
  $stmt = $db->prepare("SELECT name FROM font_groups WHERE id = ?");
  $stmt->execute([$groupId]);
  $group = $stmt->fetch();

  if (!$group) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Group not found']);
    exit;
  }

  // 2. Delete the group (cascade will handle font_group_members)
  $deleteStmt = $db->prepare("DELETE FROM font_groups WHERE id = ?");
  $deleteStmt->execute([$groupId]);

  // Commit transaction
  $db->commit();
  echo json_encode([
    'success' => true,
    'message' => 'Group deleted successfully',
    'deleted_group' => ['id' => $groupId, 'name' => $group['name']],
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
