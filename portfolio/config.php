<?php
/**
 * Podmark Agency - Configuration Site Settings
 * This file handles local vs production environment detection
 */

// Environment Detection
$is_local = in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1']);

if ($is_local) {
    // Local Development Settings
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'podmark_db');
    define('DB_USER', 'root');
    define('DB_PASS', '');
} else {
    // Hostinger Production Settings (USER: Fill these from Hostinger hPanel)
    define('DB_HOST', 'localhost'); // Usually localhost on Hostinger
    define('DB_NAME', 'u123456789_podmark');
    define('DB_USER', 'u123456789_user');
    define('DB_PASS', 'Your_Strong_Password_Here');
}

// Global App Settings
define('APP_NAME', 'Podmark Digital');
define('UPLOAD_DIR', 'uploads/');

// Error Reporting (Hide on production)
if ($is_local) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}
?>