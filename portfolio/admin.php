<?php
include 'db.php';
session_start();

$PASS = 'podmark2025';

// Auth Logic
if (isset($_POST['login'])) {
    if ($_POST['password'] === $PASS)
        $_SESSION['admin'] = true;
}
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: admin.php");
    exit;
}

$is_auth = isset($_SESSION['admin']);
$msg = "";

// Handle Actions (JSON Version)
if ($is_auth && $_SERVER['REQUEST_METHOD'] === 'POST') {

    // --- CREATE ACTIONS ---
    if (isset($_POST['add_client'])) {
        $db->addClient($_POST['name'], $_POST['desc']);
        $msg = "Client Added.";
    }

    if (isset($_POST['add_cat'])) {
        $db->addCategory($_POST['client_id'], $_POST['cat_name']);
        $msg = "Category Added.";
    }

    if (isset($_POST['upload'])) {
        $total = count($_FILES['files']['name']);
        $title = $_POST['title'] ?? '';
        $success_count = 0;
        $errors = [];

        for ($i = 0; $i < $total; $i++) {
            $error_code = $_FILES['files']['error'][$i];
            $name = $_FILES['files']['name'][$i];
            
            if ($error_code === UPLOAD_ERR_OK) {
                // Basic sanitization
                $safe_name = preg_replace('/[^a-zA-Z0-9\._-]/', '', $name);
                $unique_name = time() . "_" . uniqid() . "_" . $safe_name;
                $target = "uploads/" . $unique_name;
                
                if (move_uploaded_file($_FILES['files']['tmp_name'][$i], $target)) {
                    $db->addMedia($_POST['cat_id'], $target, $_POST['type'], $title);
                    $success_count++;
                } else {
                    $errors[] = "Failed to move $name";
                }
            } else {
                // Map error codes
                switch ($error_code) {
                    case UPLOAD_ERR_INI_SIZE:
                    case UPLOAD_ERR_FORM_SIZE:
                        $errors[] = "$name exceeds size limit (" . ini_get('upload_max_filesize') . ")";
                        break;
                    case UPLOAD_ERR_PARTIAL:
                        $errors[] = "$name was only partially uploaded";
                        break;
                    case UPLOAD_ERR_NO_FILE:
                        $errors[] = "No file chosen";
                        break;
                    default:
                        $errors[] = "$name failed (Error: $error_code)";
                }
            }
        }
        
        if ($success_count > 0) {
            $msg = "$success_count files uploaded successfully.";
        }
        if (!empty($errors)) {
            $msg .= " Errors: " . implode(", ", $errors);
        }
    }

    // --- DELETE ACTIONS ---
    if (isset($_POST['delete_client'])) {
        $db->deleteClient($_POST['client_id']);
        $msg = "Client and associated content deleted.";
    }

    if (isset($_POST['delete_media'])) {
        $db->deleteMedia($_POST['media_id']);
        $msg = "Media file deleted.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | Podmark</title>
    <link rel="stylesheet" href="css/style.css">
    <!-- Admin Specific Styles -->
    <style>
        .admin-nav-link {
            color: white;
            text-decoration: none;
            padding: 10px;
            display: block;
            border-radius: 4px;
            transition: 0.2s;
        }

        .admin-nav-link:hover,
        .admin-nav-link.active {
            background: #222;
            color: var(--accent-gold);
        }

        .manage-grid {
            display: grid;
            gap: 20px;
        }

        .manage-item {
            background: #151515;
            padding: 20px;
            border: 1px solid #333;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .manage-sub {
            margin-left: 20px;
            margin-top: 10px;
            padding-left: 10px;
            border-left: 2px solid #333;
        }

        .btn-delete {
            background: #330000;
            color: #ff6666;
            border: 1px solid #550000;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.7rem;
            text-transform: uppercase;
        }

        .btn-delete:hover {
            background: #550000;
        }

        .media-row {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 10px;
        }

        .media-thumb {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
            border: 1px solid #333;
        }

        .media-container {
            position: relative;
        }

        .media-del-btn {
            position: absolute;
            top: -5px;
            right: -5px;
            background: red;
            color: white;
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
        }
    </style>
</head>

<body style="background: #000;">

    <?php if (!$is_auth): ?>
        <div style="height: 100vh; display: flex; align-items: center; justify-content: center;">
            <div style="background:#111; padding: 40px; border: 1px solid #333; text-align: center; border-radius: 8px;">
                <h2 class="serif">Admin Access</h2>
                <form method="POST" style="margin-top: 30px;">
                    <input type="password" name="password"
                        style="width: 100%; padding: 10px; margin-bottom: 10px; background: #000; border: 1px solid #333; color: white;"
                        placeholder="Passkey" required>
                    <button type="submit" name="login" class="btn btn-gold"
                        style="width: 100%; border: none; cursor: pointer;">Unlock</button>
                </form>
            </div>
        </div>
    <?php else: ?>

        <div style="display: flex; min-height: 100vh;">
            <!-- Sidebar (Sticky) -->
            <aside
                style="background: #0A0A0A; border-right: 1px solid #222; padding: 40px 20px; width: 250px; flex-shrink: 0; position: sticky; top: 0; height: 100vh; overflow-y: auto;">
                <h2 class="serif" style="margin-bottom: 50px; font-size: 1.5rem;">PODMARK</h2>
                <nav style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="#structure" class="admin-nav-link">1. Create Structure</a>
                    <a href="#upload" class="admin-nav-link">2. Upload Content</a>
                    <a href="#manage" class="admin-nav-link active">3. Manage & Delete</a>
                    <div style="height: 40px;"></div>
                    <a href="index.php" target="_blank" style="color: var(--accent-gold); font-size: 0.9rem;">View Live Site
                        ↗</a>
                    <a href="?logout=1" style="color: #666; font-size: 0.8rem; margin-top: 20px;">Logout</a>
                </nav>
            </aside>

            <!-- Main (Flex Grow) -->
            <main style="flex-grow: 1; padding: 60px; min-width: 0;">
                <?php if ($msg): ?>
                    <div
                        style="background: rgba(0,255,0,0.1); border: 1px solid lime; padding: 15px; margin-bottom: 30px; color: lime;">
                        <?php echo $msg; ?>
                    </div>
                <?php endif; ?>

                <h1 class="serif" style="font-size: 2.5rem; margin-bottom: 40px;">Dashboard</h1>

                <!-- 1. Structure -->
                <section id="structure" style="margin-bottom: 80px;">
                    <h3 style="color: var(--accent-gold); margin-bottom: 20px;">1. Client Structure</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                        <!-- Create Client -->
                        <div style="background: #111; padding: 30px; border: 1px solid #222; border-radius: 8px;">
                            <h4>Create New Client</h4>
                            <form method="POST" style="margin-top: 20px;">
                                <input type="text" name="name"
                                    style="width: 100%; padding: 12px; margin-bottom: 10px; background: #000; border: 1px solid #333; color: white;"
                                    placeholder="Client Name (e.g. Nike)" required>
                                <input type="text" name="desc"
                                    style="width: 100%; padding: 12px; margin-bottom: 10px; background: #000; border: 1px solid #333; color: white;"
                                    placeholder="Tagline">
                                <button type="submit" name="add_client" class="btn btn-gold"
                                    style="width: 100%; border: none; cursor: pointer;">Add Client</button>
                            </form>
                        </div>

                        <!-- Add Category -->
                        <div style="background: #111; padding: 30px; border: 1px solid #222; border-radius: 8px;">
                            <h4>Add Category to Client</h4>
                            <form method="POST" style="margin-top: 20px;">
                                <select name="client_id"
                                    style="width: 100%; padding: 12px; margin-bottom: 10px; background: #000; border: 1px solid #333; color: white;"
                                    required>
                                    <option value="">Select Client...</option>
                                    <?php
                                    $clients = $db->getClients();
                                    foreach ($clients as $c)
                                        echo "<option value='{$c['id']}'>{$c['name']}</option>";
                                    ?>
                                </select>
                                <input type="text" name="cat_name"
                                    style="width: 100%; padding: 12px; margin-bottom: 10px; background: #000; border: 1px solid #333; color: white;"
                                    placeholder="Category Name (e.g. Social Reels)" required>
                                <button type="submit" name="add_cat" class="btn btn-gold"
                                    style="width: 100%; border: none; cursor: pointer;">Add Category</button>
                            </form>
                        </div>
                    </div>
                </section>

                <!-- 2. Upload -->
                <section id="upload" style="margin-bottom: 80px;">
                    <h3 style="color: var(--accent-gold); margin-bottom: 20px;">2. Upload Content</h3>
                    <div style="background: #111; padding: 30px; border: 1px solid #222; border-radius: 8px;">
                        <form method="POST" enctype="multipart/form-data">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                                <div>
                                    <label
                                        style="display: block; margin-bottom: 5px; font-size: 0.8rem; color: #888;">Target
                                        Section</label>
                                    <select name="cat_id"
                                        style="width: 100%; padding: 12px; background: #000; border: 1px solid #333; color: white;"
                                        required>
                                        <option value="">Select Category...</option>
                                        <?php
                                        foreach ($clients as $c) {
                                            $cats = $db->getCategories($c['id']);
                                            foreach ($cats as $cat) {
                                                echo "<option value='{$cat['id']}'>{$c['name']} > {$cat['name']}</option>";
                                            }
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 5px; font-size: 0.8rem; color: #888;">Media
                                        Type</label>
                                    <select name="type"
                                        style="width: 100%; padding: 12px; background: #000; border: 1px solid #333; color: white;">
                                        <option value="image">Image / Poster</option>
                                        <option value="video">Video / Reel</option>
                                    </select>
                                </div>
                            </div>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 5px; font-size: 0.8rem; color: #888;">Project
                                    Title (Optional)</label>
                                <input type="text" name="title"
                                    style="width: 100%; padding: 12px; background: #000; border: 1px solid #333; color: white;"
                                    placeholder="e.g. Summer Campaign 2025">
                            </div>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 5px; font-size: 0.8rem; color: #888;">Select
                                    Files</label>
                                <input type="file" name="files[]" multiple required style="color: white;">
                            </div>
                            <button type="submit" name="upload" class="btn btn-gold"
                                style="padding: 15px 40px; border: none; cursor: pointer;">Upload Content</button>
                        </form>
                    </div>
                </section>

                <!-- 3. Manage -->
                <section id="manage">
                    <h3 style="color: var(--accent-gold); margin-bottom: 20px;">3. Manage Content (Delete)</h3>
                    <div class="manage-grid">
                        <?php
                        $full_pf = $db->getFullPortfolio();
                        if (empty($full_pf))
                            echo "<p style='color:#666;'>No content found yet.</p>";

                        foreach ($full_pf as $client):
                            ?>
                            <div class="manage-item" style="display: block;">
                                <div
                                    style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                    <h4 style="font-size: 1.2rem;"><?php echo htmlspecialchars($client['name']); ?></h4>
                                    <form method="POST"
                                        onsubmit="return confirm('DELETE CLIENT? This will delete ALL categories and media inside it.');">
                                        <input type="hidden" name="client_id" value="<?php echo $client['id']; ?>">
                                        <button type="submit" name="delete_client" class="btn-delete">Delete Client</button>
                                    </form>
                                </div>

                                <?php foreach ($client['categories'] as $cat): ?>
                                    <div class="manage-sub">
                                        <h5 style="color: var(--accent-gold); margin-bottom: 10px;">
                                            <?php echo htmlspecialchars($cat['name']); ?></h5>

                                        <div class="media-row">
                                            <?php if (empty($cat['media']))
                                                echo "<small style='color:#444;'>No media.</small>"; ?>

                                            <?php foreach ($cat['media'] as $media): ?>
                                                <div class="media-container">
                                                    <?php if ($media['media_type'] == 'video'): ?>
                                                        <video src="<?php echo $media['file_path']; ?>" class="media-thumb"></video>
                                                    <?php else: ?>
                                                        <img src="<?php echo $media['file_path']; ?>" class="media-thumb">
                                                    <?php endif; ?>

                                                    <form method="POST" onsubmit="return confirm('Delete this file?');">
                                                        <input type="hidden" name="media_id" value="<?php echo $media['id']; ?>">
                                                        <button type="submit" name="delete_media" class="media-del-btn">×</button>
                                                    </form>
                                                </div>
                                            <?php endforeach; ?>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </section>

            </main>
        </div>

    <?php endif; ?>

</body>

</html>