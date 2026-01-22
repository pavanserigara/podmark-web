<?php
include 'db.php';
session_start();

$upload_max = ini_get('upload_max_filesize');
$post_max = ini_get('post_max_size');

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

        if (!is_dir('uploads')) {
            mkdir('uploads', 0777, true);
        }

        // Handle thumbnail upload if provided
        $thumbnail_path = '';
        if (isset($_FILES['thumbnail']) && $_FILES['thumbnail']['error'] === UPLOAD_ERR_OK) {
            $thumb_name = preg_replace('/[^a-zA-Z0-9\._-]/', '', $_FILES['thumbnail']['name']);
            $thumb_unique = time() . "_thumb_" . uniqid() . "_" . $thumb_name;
            $thumbnail_path = "uploads/" . $thumb_unique;
            move_uploaded_file($_FILES['thumbnail']['tmp_name'], $thumbnail_path);
        }

        for ($i = 0; $i < $total; $i++) {
            $error_code = $_FILES['files']['error'][$i];
            $name = $_FILES['files']['name'][$i];

            if ($error_code === UPLOAD_ERR_OK) {
                // Basic sanitization
                $safe_name = preg_replace('/[^a-zA-Z0-9\._-]/', '', $name);
                $unique_name = time() . "_" . uniqid() . "_" . $safe_name;
                $target = "uploads/" . $unique_name;

                if (move_uploaded_file($_FILES['files']['tmp_name'][$i], $target)) {
                    $db->addMedia($_POST['cat_id'], $target, $_POST['type'], $title, '', '', $thumbnail_path);
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
        $msg = "Media file deleted.";
    }

    if (isset($_POST['edit_client'])) {
        $db->editClient($_POST['client_id'], $_POST['name'], $_POST['desc']);
        $msg = "Client updated.";
    }

    if (isset($_POST['edit_cat'])) {
        $db->editCategory($_POST['cat_id'], $_POST['name']);
        $msg = "Category updated.";
    }

    if (isset($_POST['add_update'])) {
        $db->addUpdate($_POST['title'], $_POST['content']);
        $msg = "Update posted.";
    }

    if (isset($_POST['delete_update'])) {
        $db->deleteUpdate($_POST['update_id']);
        $msg = "Update deleted.";
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
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 8px;
            border: 1px solid #333;
            transition: all 0.3s ease;
            cursor: pointer;
            background: #1a1a1a;
        }

        .media-thumb:hover {
            border-color: var(--accent-gold);
            transform: scale(1.05);
        }

        .media-container {
            position: relative;
            display: inline-block;
        }

        .media-container video {
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
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
            z-index: 10;
        }

        /* Play icon overlay for videos */
        .media-container video::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            pointer-events: none;
        }

        .video-play-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            opacity: 0.8;
            transition: opacity 0.3s;
        }

        .video-play-icon::after {
            content: '▶';
            color: #000;
            font-size: 12px;
            margin-left: 2px;
        }

        .media-container:hover .video-play-icon {
            opacity: 1;
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

                <h1 class="serif" style="font-size: 2.5rem; margin-bottom: 20px;">Dashboard</h1>
                <div style="font-size: 0.8rem; color: #888; margin-bottom: 40px; display: flex; gap: 20px;">
                    <span>Max Upload Size: <strong style="color: var(--accent-gold);"><?php echo $upload_max; ?></strong></span>
                    <span>Post Size Limit: <strong style="color: var(--accent-gold);"><?php echo $post_max; ?></strong></span>
                </div>

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
                                <input type="file" name="files[]" multiple required style="color: white;"
                                    accept="image/*,video/*">
                            </div>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 5px; font-size: 0.8rem; color: #888;">
                                    Video Thumbnail (Optional - for videos only)</label>
                                <input type="file" name="thumbnail" style="color: white;" accept="image/*">
                                <small style="color: #666; display: block; margin-top: 5px;">Upload a custom thumbnail image for videos. If not provided, the first frame will be used.</small>
                            </div>
                            <button type="submit" name="upload" class="btn btn-gold"
                                style="padding: 15px 40px; border: none; cursor: pointer;">Upload Content</button>
                        </form>
                    </div>
                </section>

                <!-- 3. Manage Content -->
                <section id="manage" style="margin-bottom: 80px;">
                    <h3 style="color: var(--accent-gold); margin-bottom: 20px;">3. Manage Portfolio Content</h3>
                    <div class="manage-grid">
                        <?php
                        $full_pf = $db->getFullPortfolio();
                        if (empty($full_pf))
                            echo "<p style='color:#666;'>No content found yet.</p>";

                        foreach ($full_pf as $client):
                            ?>
                            <div class="manage-item" style="display: block; margin-bottom: 30px;">
                                <!-- Client Manage Row -->
                                <div
                                    style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #333;">
                                    <form method="POST"
                                        style="display: flex; gap: 15px; align-items: flex-end; flex-wrap: wrap;">
                                        <input type="hidden" name="client_id" value="<?php echo $client['id']; ?>">
                                        <div style="flex: 1; min-width: 200px;">
                                            <label
                                                style="display:block; font-size: 0.7rem; color: #888; margin-bottom: 5px;">Client
                                                Name</label>
                                            <input type="text" name="name"
                                                value="<?php echo htmlspecialchars($client['name']); ?>"
                                                style="width: 100%; padding: 8px; background: #000; border: 1px solid #333; color: white;">
                                        </div>
                                        <div style="flex: 2; min-width: 300px;">
                                            <label
                                                style="display:block; font-size: 0.7rem; color: #888; margin-bottom: 5px;">Tagline</label>
                                            <input type="text" name="desc"
                                                value="<?php echo htmlspecialchars($client['description']); ?>"
                                                style="width: 100%; padding: 8px; background: #000; border: 1px solid #333; color: white;">
                                        </div>
                                        <div style="display: flex; gap: 10px;">
                                            <button type="submit" name="edit_client" class="btn btn-gold"
                                                style="padding: 8px 15px; font-size: 0.7rem; border: none; cursor: pointer;">Save</button>
                                            <button type="submit" name="delete_client" class="btn-delete"
                                                onsubmit="return confirm('DELETE CLIENT? This will delete ALL categories and media inside it.');">Delete</button>
                                        </div>
                                    </form>
                                </div>

                                <!-- Categories for this Client -->
                                <?php foreach ($client['categories'] as $cat): ?>
                                    <div class="manage-sub"
                                        style="margin-bottom: 20px; background: #111; padding: 15px; border-radius: 6px;">
                                        <form method="POST"
                                            style="display: flex; gap: 15px; align-items: center; margin-bottom: 15px;">
                                            <input type="hidden" name="cat_id" value="<?php echo $cat['id']; ?>">
                                            <div style="flex: 1;">
                                                <input type="text" name="name" value="<?php echo htmlspecialchars($cat['name']); ?>"
                                                    style="width: 100%; padding: 5px; background: #000; border: 1px solid #333; color: var(--accent-gold); font-weight: 700;">
                                            </div>
                                            <div style="display: flex; gap: 10px;">
                                                <button type="submit" name="edit_cat" class="btn btn-gold"
                                                    style="padding: 5px 10px; font-size: 0.6rem; border: none; cursor: pointer;">Update
                                                    Name</button>
                                                <button type="submit" name="delete_cat" class="btn-delete"
                                                    style="padding: 5px 10px; font-size: 0.6rem;"
                                                    onsubmit="return confirm('Delete this category?');">Delete Category</button>
                                            </div>
                                        </form>

                                        <div class="media-row">
                                            <?php if (empty($cat['media']))
                                                echo "<small style='color:#444;'>No media.</small>"; ?>
                                            <?php foreach ($cat['media'] as $media): ?>
                                                <div class="media-container">
                                                    <?php if ($media['media_type'] == 'video'): ?>
                                                        <video src="<?php echo $media['file_path']; ?>#t=15" class="media-thumb" controls
                                                            preload="metadata"
                                                            <?php if (!empty($media['thumbnail'])): ?>poster="<?php echo $media['thumbnail']; ?>"<?php endif; ?>></video>
                                                        <div class="video-play-icon"></div>
                                                    <?php else: ?>
                                                        <img src="<?php echo $media['file_path']; ?>" class="media-thumb"
                                                            alt="<?php echo htmlspecialchars($media['title'] ?? ''); ?>">
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

                <!-- 4. Manage Updates -->
                <section id="updates">
                    <h3 style="color: var(--accent-gold); margin-bottom: 20px;">4. Service Updates</h3>
                    <div
                        style="background: #111; padding: 30px; border: 1px solid #222; border-radius: 8px; margin-bottom: 30px;">
                        <h4>Post New Update</h4>
                        <form method="POST" style="margin-top: 20px;">
                            <input type="text" name="title"
                                style="width: 100%; padding: 12px; margin-bottom: 10px; background: #000; border: 1px solid #333; color: white;"
                                placeholder="Update Title" required>
                            <textarea name="content"
                                style="width: 100%; padding: 12px; margin-bottom: 10px; background: #000; border: 1px solid #333; color: white; height: 100px;"
                                placeholder="Content" required></textarea>
                            <button type="submit" name="add_update" class="btn btn-gold"
                                style="width: 100%; border: none; cursor: pointer;">Post Update</button>
                        </form>
                    </div>

                    <div class="manage-grid">
                        <?php
                        $updates = $db->getUpdates();
                        foreach ($updates as $up):
                            ?>
                            <div class="manage-item">
                                <div>
                                    <h4 style="color: var(--accent-gold);"><?php echo htmlspecialchars($up['title']); ?></h4>
                                    <p style="font-size: 0.8rem; color: #888;"><?php echo htmlspecialchars($up['content']); ?>
                                    </p>
                                    <small style="color: #444;"><?php echo $up['created_at']; ?></small>
                                </div>
                                <form method="POST" onsubmit="return confirm('Delete this update?');">
                                    <input type="hidden" name="update_id" value="<?php echo $up['id']; ?>">
                                    <button type="submit" name="delete_update" class="btn-delete">Delete</button>
                                </form>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </section>

            </main>
        </div>

    <?php endif; ?>

</body>

</html>