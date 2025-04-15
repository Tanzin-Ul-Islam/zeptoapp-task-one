<?php
require_once __DIR__ . '/../../config/headers.php';
require_once __DIR__ . '/../../config/db_helper.php';
require_once __DIR__ . '/../../config/db_helper.php';

setJsonHeaders();
handlePreflight();
setCorsHeaders();

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'] ?? null;

if (!$id || !is_numeric($id)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Valid font ID required']);
  exit;
}

try {
  $db = getDbConnection();
  $uploadDir = realpath(__DIR__ . '/../../uploads/fonts');
  $db->beginTransaction();

  $stmt = $db->prepare('SELECT file_path FROM fonts WHERE id = ? for update');
  $stmt->execute([$id]);
  $font = $stmt->fetch();

  if (!$font) {
    $db->rollBack();
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Font not found']);
    exit;
  }
  $fileToDelete = realpath(__DIR__ . '/../..' . $font['file_path']);
  if (!$fileToDelete || strpos($fileToDelete, $uploadDir) !== 0) {
    $db->rollBack();
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Invalid file path']);
    exit;
  }
  if (file_exists($fileToDelete)) {
    if (!unlink($fileToDelete)) {
      throw new Exception("File deletion failed");
    }
  }
  $stmt = $db->prepare("DELETE FROM fonts WHERE id = ?");
  $stmt->execute([$id]);
  $db->commit();
  echo json_encode([
    'success' => true,
    'message' => 'Font and file deleted successfully'
  ]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'message' => 'Deletion failed: ' . $e->getMessage()
  ]);
}
