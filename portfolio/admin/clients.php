<header class="admin-header">
    <h1 class="admin-title">Clients & Structure.</h1>
    <p style="color: var(--text-muted);">Each new client automatically gets <strong>Poster</strong> and
        <strong>Reels</strong> categories.</p>
</header>

<div class="admin-card">
    <h3 class="card-title">Add New Client</h3>
    <form method="POST">
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Client Name</label>
                <input type="text" name="name" class="form-input" placeholder="e.g. Nike" required>
            </div>
            <div class="form-group">
                <label class="form-label">Client Description / Tagline</label>
                <input type="text" name="desc" class="form-input" placeholder="e.g. Global Sports Brand">
            </div>
        </div>
        <button type="submit" name="add_client" class="btn-admin btn-primary">
            <i class="fas fa-plus"></i> Create Client
        </button>
    </form>
</div>

<div class="admin-card">
    <h3 class="card-title">Manage Structure</h3>
    <div class="manage-list">
        <?php
        $clients = $db->getClients();
        if (empty($clients))
            echo "<p style='color: var(--text-muted);'>No clients found.</p>";
        foreach ($clients as $client):
            ?>
            <div class="manage-item" style="flex-direction: column; align-items: stretch; gap: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="item-info">
                        <h5>
                            <?php echo htmlspecialchars($client['name']); ?>
                        </h5>
                        <p>
                            <?php echo htmlspecialchars($client['description']); ?>
                        </p>
                    </div>
                    <form action="admin.php?view=clients" method="POST">
                        <input type="hidden" name="client_id" value="<?php echo $client['id']; ?>">
                        <button type="submit" name="delete_client" class="btn-admin btn-danger"
                            style="padding: 8px 16px; font-size: 0.8rem;">
                            <i class="fas fa-trash"></i> Delete Client
                        </button>
                    </form>
                </div>

                <!-- Fixed Categories -->
                <div style="padding-left: 30px; border-left: 2px solid var(--grey); display: flex; gap: 10px;">
                    <?php
                    $cats = $db->getCategories($client['id']);
                    foreach ($cats as $cat):
                        ?>
                        <div
                            style="background: rgba(255,255,255,0.03); padding: 8px 15px; border-radius: 6px; border: 1px solid var(--grey);">
                            <span
                                style="font-size: 0.85rem; color: var(--primary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                                <i class="fas fa-folder"></i> <?php echo htmlspecialchars($cat['name']); ?>
                            </span>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>