<?php
// =========================
// Contact Form Handler
// =========================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Your email
$to_email = 'calebngiciri075@gmail.com';

// Get request data
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

// Fallback to POST if JSON not provided
if (!$data || empty($data)) {
    $data = $_POST;
}

// Sanitization
function clean($value) {
    return htmlspecialchars(trim((string)$value), ENT_QUOTES, 'UTF-8');
}

// Collect form data
$name    = clean($data['name'] ?? '');
$email   = clean($data['email'] ?? '');
$message = clean($data['message'] ?? '');

// Validation
$errors = [];
if (empty($name)) $errors[] = 'Name is required.';
if (empty($email)) {
    $errors[] = 'Email is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email address.';
}
if (empty($message)) $errors[] = 'Message is required.';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => implode(' ', $errors)]);
    exit;
}

// Build email
$subject = "New Contact Form Submission - ShanTech Global Developers";
$body  = "New contact form submission from ShanTech Global Developers website\n\n";
$body .= "========================================\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n\n";
$body .= "Message:\n$message\n";
$body .= "========================================\n";
$body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
$body .= "IP Address: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n";
$body .= "========================================\n";

// Headers
$headers = "From: noreply@shantechglobal.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send
$mail_sent = @mail($to_email, $subject, $body, $headers);

// Response
if ($mail_sent) {
    http_response_code(200);
    echo json_encode(['ok' => true, 'message' => 'Message sent successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to send message. Please try again or email us directly at calebngiciri075@gmail.com']);
}
?>