<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/../config/database.php';

try {
    $database = new Database();
    $db = $database->connect();

    // Route based on method
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            // Get all fonts
            $stmt = $db->query("SELECT * FROM fonts");
            $fonts = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode([
                'success' => true,
                'data' => $fonts,
                'count' => count($fonts)
            ]);
            break;

        case 'DELETE':
            // Delete font by ID
            $input = json_decode(file_get_contents('php://input'), true);
            $id = $input['id'] ?? null;

            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Font ID required']);
                exit;
            }

            $stmt = $db->prepare("DELETE FROM fonts WHERE id = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true, 'message' => 'Font deleted']);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Font not found']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    }

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}