<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | Podmark</title>
    <link rel="stylesheet" href="css/admin.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
    <aside class="admin-sidebar">
        <div class="admin-logo">PODMARK.</div>
        <nav class="admin-nav">
            <a href="admin.php"
                class="admin-nav-item <?php echo (!isset($_GET['view']) || $_GET['view'] == 'dashboard') ? 'active' : ''; ?>">
                <i class="fas fa-home"></i> Dashboard
            </a>
            <a href="admin.php?view=clients"
                class="admin-nav-item <?php echo (isset($_GET['view']) && $_GET['view'] == 'clients') ? 'active' : ''; ?>">
                <i class="fas fa-users"></i> Clients & Categories
            </a>
            <a href="admin.php?view=content"
                class="admin-nav-item <?php echo (isset($_GET['view']) && $_GET['view'] == 'content') ? 'active' : ''; ?>">
                <i class="fas fa-cloud-upload-alt"></i> Upload & Media
            </a>
            <a href="admin.php?view=updates"
                class="admin-nav-item <?php echo (isset($_GET['view']) && $_GET['view'] == 'updates') ? 'active' : ''; ?>">
                <i class="fas fa-bullhorn"></i> Blog Updates
            </a>
            <div style="margin-top: auto; height: 50px;"></div>
            <a href="index.php" target="_blank" class="admin-nav-item">
                <i class="fas fa-external-link-alt"></i> View Site
            </a>
            <a href="?logout=1" class="admin-nav-item" style="color: var(--danger);">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        </nav>
    </aside>

    <main class="admin-main">
        <?php if ($msg): ?>
            <div
                style="background: rgba(40, 167, 69, 0.1); border: 1px solid var(--success); color: var(--success); padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <i class="fas fa-check-circle"></i>
                <?php echo $msg; ?>
            </div>
        <?php endif; ?>