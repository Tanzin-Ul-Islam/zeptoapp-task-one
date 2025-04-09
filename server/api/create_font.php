<?php
require_once __DIR__ . '/../config/headers.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/db_helper.php';

// Handle preflight requests first
handlePreflight();
// Set CORS headers for all requests
setCorsHeaders();
// Set JSON headers for API responses
setJsonHeaders();

echo "test";

// Create uploads directory if it doesn't exist
if (!file_exists(__DIR__ . '/../uploads/fonts')) {
  mkdir(__DIR__ . '/../uploads/fonts', 0777, true);
}

try {
  // Validate input
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
  }

  $fontName = $_POST['fontName'] ?? null;
  $fontFile = $_FILES['fontFile'] ?? null;

  echo $fontName;
  echo $fontFile;

  if (!$fontName || !$fontFile) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'fontName and fontFile are required']);
    exit;
  }

  // Validate file type (TTF) - using file extension instead of mime_content_type
  $fileExt = strtolower(pathinfo($fontFile['name'], PATHINFO_EXTENSION));
  $allowedExtensions = ['ttf', 'otf'];
  
  if (!in_array($fileExt, $allowedExtensions)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Only TTF and OTF files are allowed']);
    exit;
  }

  // Generate unique filename
  $fileName = uniqid('font_') . '.' . $fileExt;
  $filePath = '/uploads/fonts/' . $fileName;
  
  // Correct path for file upload
  $uploadDir = __DIR__ . '/../uploads/fonts/';
  $targetPath = $uploadDir . $fileName;

  // Move uploaded file
  if (!move_uploaded_file($fontFile['tmp_name'], $targetPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'File upload failed']);
    exit;
  }

  // Save to database
  $db = getDbConnection();
  $stmt = $db->prepare("INSERT INTO fonts (font_name, file_path) VALUES (?, ?)");
  $stmt->execute([$fontName, $filePath]);

  http_response_code(201);
  echo json_encode([
    'success' => true,
    'message' => 'Font uploaded successfully',
    'data' => [
      'id' => $db->lastInsertId(),
      'font_name' => $fontName,
      'file_path' => $filePath
    ]
  ]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
