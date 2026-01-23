<?php
// PODMARK DATABASE CONFIGURATION
require_once 'config.php';

class Database
{
    private $host = DB_HOST;
    private $db = DB_NAME;
    private $user = DB_USER;
    private $pass = DB_PASS;
    private $charset = 'utf8mb4';
    private $pdo;

    public function __construct()
    {
        $dsn = "mysql:host=$this->host;dbname=$this->db;charset=$this->charset";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        try {
            $this->pdo = new PDO($dsn, $this->user, $this->pass, $options);
        } catch (\PDOException $e) {
            // Check if local or production for error message
            if (defined('DB_NAME') && in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1'])) {
                die("Database connection failed. Please ensure MySQL is running and you have imported database.sql into " . DB_NAME . ". Error: " . $e->getMessage());
            } else {
                die("Database Connection Error. Please verify your Hostinger DB credentials in config.php. Specific Error: " . $e->getMessage());
            }
        }
    }

    // --- AUTH ---
    public function login($password)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE username = 'admin' LIMIT 1");
        $stmt->execute();
        $user = $stmt->fetch();
        if ($user && password_verify($password, $user['password'])) {
            return true;
        }
        return false;
    }

    public function updatePassword($new_password)
    {
        $hash = password_hash($new_password, PASSWORD_DEFAULT);
        $stmt = $this->pdo->prepare("UPDATE users SET password = ? WHERE username = 'admin'");
        return $stmt->execute([$hash]);
    }

    // --- CLIENTS ---
    public function getClients()
    {
        $stmt = $this->pdo->query("SELECT * FROM clients ORDER BY id DESC");
        return $stmt->fetchAll();
    }

    public function addClient($name, $desc, $logo_url = '')
    {
        $stmt = $this->pdo->prepare("INSERT INTO clients (name, description, logo) VALUES (?, ?, ?)");
        $stmt->execute([$name, $desc, $logo_url]);
        return $this->pdo->lastInsertId();
    }

    public function editClient($id, $name, $desc)
    {
        $stmt = $this->pdo->prepare("UPDATE clients SET name = ?, description = ? WHERE id = ?");
        return $stmt->execute([$name, $desc, $id]);
    }

    public function deleteClient($id)
    {
        // Delete all files associated with this client's media
        $stmt = $this->pdo->prepare("SELECT m.file_path, m.thumbnail FROM media m JOIN categories c ON m.category_id = c.id WHERE c.client_id = ?");
        $stmt->execute([$id]);
        $mediaBatch = $stmt->fetchAll();
        foreach ($mediaBatch as $m) {
            if (!empty($m['file_path']) && file_exists(__DIR__ . '/' . $m['file_path']))
                @unlink(__DIR__ . '/' . $m['file_path']);
            if (!empty($m['thumbnail']) && file_exists(__DIR__ . '/' . $m['thumbnail']))
                @unlink(__DIR__ . '/' . $m['thumbnail']);
        }

        $stmt = $this->pdo->prepare("DELETE FROM clients WHERE id = ?");
        return $stmt->execute([$id]);
    }

    // --- CATEGORIES ---
    public function getCategories($client_id = null)
    {
        if ($client_id === null) {
            $stmt = $this->pdo->query("SELECT * FROM categories");
        } else {
            $stmt = $this->pdo->prepare("SELECT * FROM categories WHERE client_id = ?");
            $stmt->execute([$client_id]);
        }
        return $stmt->fetchAll();
    }

    public function addCategory($client_id, $name)
    {
        $stmt = $this->pdo->prepare("INSERT INTO categories (client_id, name) VALUES (?, ?)");
        $stmt->execute([$client_id, $name]);
        return $this->pdo->lastInsertId();
    }

    public function editCategory($id, $name)
    {
        $stmt = $this->pdo->prepare("UPDATE categories SET name = ? WHERE id = ?");
        return $stmt->execute([$name, $id]);
    }

    public function deleteCategory($id)
    {
        // Delete files associated with this category's media
        $stmt = $this->pdo->prepare("SELECT file_path, thumbnail FROM media WHERE category_id = ?");
        $stmt->execute([$id]);
        $mediaBatch = $stmt->fetchAll();
        foreach ($mediaBatch as $m) {
            if (!empty($m['file_path']) && file_exists(__DIR__ . '/' . $m['file_path']))
                @unlink(__DIR__ . '/' . $m['file_path']);
            if (!empty($m['thumbnail']) && file_exists(__DIR__ . '/' . $m['thumbnail']))
                @unlink(__DIR__ . '/' . $m['thumbnail']);
        }

        $stmt = $this->pdo->prepare("DELETE FROM categories WHERE id = ?");
        return $stmt->execute([$id]);
    }

    // --- MEDIA ---
    public function getMedia($category_id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM media WHERE category_id = ?");
        $stmt->execute([$category_id]);
        return $stmt->fetchAll();
    }

    public function addMedia($category_id, $file_path, $type, $title = '', $link = '', $desc = '', $thumbnail = '')
    {
        $stmt = $this->pdo->prepare("INSERT INTO media (category_id, file_path, media_type, title, link, description, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$category_id, $file_path, $type, $title, $link, $desc, $thumbnail]);
        return $this->pdo->lastInsertId();
    }

    public function deleteMedia($id)
    {
        $stmt = $this->pdo->prepare("SELECT file_path, thumbnail FROM media WHERE id = ?");
        $stmt->execute([$id]);
        $m = $stmt->fetch();
        if ($m) {
            if (!empty($m['file_path']) && file_exists(__DIR__ . '/' . $m['file_path'])) {
                @unlink(__DIR__ . '/' . $m['file_path']);
            }
            if (!empty($m['thumbnail']) && file_exists(__DIR__ . '/' . $m['thumbnail'])) {
                @unlink(__DIR__ . '/' . $m['thumbnail']);
            }
        }

        $stmt = $this->pdo->prepare("DELETE FROM media WHERE id = ?");
        return $stmt->execute([$id]);
    }

    // --- UPDATES ---
    public function getUpdates()
    {
        $stmt = $this->pdo->query("SELECT * FROM updates ORDER BY created_at DESC");
        return $stmt->fetchAll();
    }

    public function addUpdate($title, $content)
    {
        $stmt = $this->pdo->prepare("INSERT INTO updates (title, content) VALUES (?, ?)");
        $stmt->execute([$title, $content]);
        return $this->pdo->lastInsertId();
    }

    public function deleteUpdate($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM updates WHERE id = ?");
        return $stmt->execute([$id]);
    }

    // --- Helper ---
    public function getFullPortfolio()
    {
        $clients = $this->getClients();
        foreach ($clients as &$client) {
            $client['categories'] = $this->getCategories($client['id']);
            foreach ($client['categories'] as &$cat) {
                $cat['media'] = $this->getMedia($cat['id']);
            }
        }
        return $clients;
    }
}

$db = new Database();