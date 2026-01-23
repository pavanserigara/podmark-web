<?php
include 'db.php';
session_start();

$upload_max = ini_get('upload_max_filesize');
$post_max = ini_get('post_max_size');

// Auth Logic
if (isset($_POST['login'])) {
    if ($db->login($_POST['password'])) {
        $_SESSION['admin'] = true;
    } else {
        $error = "Incorrect password.";
    }
}
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: admin.php");
    exit;
}

$is_auth = isset($_SESSION['admin']);
$msg = $_GET['msg'] ?? "";

// Handle Actions
if ($is_auth && $_SERVER['REQUEST_METHOD'] === 'POST') {
    // --- CREATE ACTIONS ---
    if (isset($_POST['add_client'])) {
        $client_id = $db->addClient($_POST['name'], $_POST['desc']);
        // Automatically add fixed categories
        $db->addCategory($client_id, 'poster');
        $db->addCategory($client_id, 'reels');
        $msg = "Client added with Poster and Reels categories.";
    }
    if (isset($_POST['add_cat'])) {
        $db->addCategory($_POST['client_id'], $_POST['cat_name']);
        $msg = "Category created.";
    }
    if (isset($_POST['upload'])) {
        $total = count($_FILES['files']['name']);
        $title = $_POST['title'] ?? '';
        $success_count = 0;

        $thumbnail_path = '';
        if (isset($_FILES['thumbnail']) && $_FILES['thumbnail']['error'] === UPLOAD_ERR_OK) {
            $thumb_name = preg_replace('/[^a-zA-Z0-9\._-]/', '', $_FILES['thumbnail']['name']);
            $thumb_unique = time() . "_thumb_" . uniqid() . "_" . $thumb_name;
            $thumbnail_path = "uploads/" . $thumb_unique;
            move_uploaded_file($_FILES['thumbnail']['tmp_name'], $thumbnail_path);
        }

        for ($i = 0; $i < $total; $i++) {
            if ($_FILES['files']['error'][$i] === UPLOAD_ERR_OK) {
                $safe_name = preg_replace('/[^a-zA-Z0-9\._-]/', '', $_FILES['files']['name'][$i]);
                $target = "uploads/" . time() . "_" . uniqid() . "_" . $safe_name;
                if (move_uploaded_file($_FILES['files']['tmp_name'][$i], $target)) {
                    $db->addMedia($_POST['cat_id'], $target, $_POST['type'], $title, '', '', $thumbnail_path);
                    $success_count++;
                }
            }
        }
        $msg = "$success_count files uploaded successfully.";
    }

    // --- MANAGE ACTIONS ---
    if (isset($_POST['delete_client'])) {
        $db->deleteClient($_POST['client_id']);
        $msg = "Client deleted.";
    }
    if (isset($_POST['delete_cat'])) {
        $db->deleteCategory($_POST['cat_id']);
        $msg = "Category deleted.";
    }
    if (isset($_POST['delete_media'])) {
        $db->deleteMedia($_POST['media_id']);
        $msg = "Media removed.";
    }
    if (isset($_POST['add_update'])) {
        $db->addUpdate($_POST['title'], $_POST['content']);
        $msg = "Blog update published.";
    }
    if (isset($_POST['delete_update'])) {
        $db->deleteUpdate($_POST['update_id']);
        $msg = "Update deleted.";
    }
    if (isset($_POST['change_password'])) {
        if ($db->login($_POST['current_pass'])) {
            if (!empty($_POST['new_pass'])) {
                $db->updatePassword($_POST['new_pass']);
                $msg = "Password updated successfully.";
            } else {
                $error = "New password cannot be empty.";
            }
        } else {
            $error = "Current password incorrect.";
        }
    }
}

// Layout Logic
if (!$is_auth) {
    include 'admin/login.php';
} else {
    include 'admin/layout_top.php';

    $view = $_GET['view'] ?? 'dashboard';
    $file = "admin/{$view}.php";

    if (file_exists($file)) {
        include $file;
    } else {
        include 'admin/dashboard.php';
    }

    include 'admin/layout_bottom.php';
}
?>