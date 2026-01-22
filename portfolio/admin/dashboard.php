<header class="admin-header">
    <h1 class="admin-title">Welcome Back.</h1>
    <p style="color: var(--text-muted);">Manage your digital portfolio overview.</p>
</header>

<div class="admin-stats">
    <?php
    $clients = $db->getClients();
    $fullPortfolio = $db->getFullPortfolio();
    $total_media = 0;
    $total_cats = 0;
    foreach ($fullPortfolio as $client) {
        $total_cats += count($client['categories']);
        foreach ($client['categories'] as $cat) {
            $total_media += count($cat['media']);
        }
    }
    ?>
    <div class="stat-card">
        <div class="stat-value"><?php echo count($clients); ?></div>
        <div class="stat-label">Total Clients</div>
    </div>
    <div class="stat-card">
        <div class="stat-value"><?php echo $total_cats; ?></div>
        <div class="stat-label">Active Categories</div>
    </div>
    <div class="stat-card">
        <div class="stat-value"><?php echo $total_media; ?></div>
        <div class="stat-label">Media Assets</div>
    </div>
</div>

<div class="grid-2">
    <div class="admin-card">
        <h3 class="card-title">Quick Actions</h3>
        <div class="manage-list">
            <a href="admin.php?view=content" class="manage-item"
                style="text-decoration: none; border: 1px solid var(--grey);">
                <div class="item-info">
                    <h5>Upload New Media</h5>
                    <p>Add fresh videos or images to the gallery</p>
                </div>
                <i class="fas fa-arrow-right" style="color: var(--primary);"></i>
            </a>
            <a href="admin.php?view=clients" class="manage-item"
                style="text-decoration: none; border: 1px solid var(--grey);">
                <div class="item-info">
                    <h5>Manage Clients</h5>
                    <p>Add or edit client details and categories</p>
                </div>
                <i class="fas fa-arrow-right" style="color: var(--primary);"></i>
            </a>
        </div>
    </div>

    <div class="admin-card">
        <h3 class="card-title">Server Status</h3>
        <div class="manage-list">
            <div class="manage-item">
                <div class="item-info">
                    <h5>PHP Version</h5>
                    <p><?php echo phpversion(); ?></p>
                </div>
                <span class="badge badge-gold">ACTIVE</span>
            </div>
            <div class="manage-item">
                <div class="item-info">
                    <h5>Max Upload Size</h5>
                    <p><?php echo ini_get('upload_max_filesize'); ?></p>
                </div>
                <span class="badge badge-gold">OPTIMIZED</span>
            </div>
        </div>
    </div>
</div>