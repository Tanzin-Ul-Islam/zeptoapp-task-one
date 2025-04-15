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

  if (!$groupId || !is_numeric($groupId)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Valid group ID required']);
    exit;
  }

  $db->beginTransaction();

  $stmt = $db->prepare("SELECT name FROM font_groups WHERE id = ?");
  $stmt->execute([$groupId]);
  $group = $stmt->fetch();

  if (!$group) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Group not found']);
    exit;
  }

  $deleteStmt = $db->prepare("DELETE FROM font_groups WHERE id = ?");
  $deleteStmt->execute([$groupId]);

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
