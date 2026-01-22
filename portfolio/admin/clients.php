<header class="admin-header">
    <h1 class="admin-title">Clients & Structure.</h1>
    <p style="color: var(--text-muted);">Organize your portfolio hierarchy.</p>
</header>

<div class="grid-2">
    <!-- Create Client -->
    <div class="admin-card">
        <h3 class="card-title">Add New Client</h3>
        <form method="POST">
            <div class="form-group">
                <label class="form-label">Client Name</label>
                <input type="text" name="name" class="form-input" placeholder="e.g. Nike" required>
            </div>
            <div class="form-group">
                <label class="form-label">Client Description / Tagline</label>
                <input type="text" name="desc" class="form-input" placeholder="e.g. Global Sports Brand">
            </div>
            <button type="submit" name="add_client" class="btn-admin btn-primary">
                <i class="fas fa-plus"></i> Create Client
            </button>
        </form>
    </div>

    <!-- Create Category -->
    <div class="admin-card">
        <h3 class="card-title">Add Category</h3>
        <form method="POST">
            <div class="form-group">
                <label class="form-label">Select Client</label>
                <select name="client_id" class="form-input" required>
                    <option value="">Select Client...</option>
                    <?php
                    $clients = $db->getClients();
                    foreach ($clients as $c)
                        echo "<option value='{$c['id']}'>{$c['name']}</option>";
                    ?>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Category Name</label>
                <input type="text" name="cat_name" class="form-input" placeholder="e.g. Social Reels" required>
            </div>
            <button type="submit" name="add_cat" class="btn-admin btn-primary">
                <i class="fas fa-folder-plus"></i> Add Category
            </button>
        </form>
    </div>
</div>

<div class="admin-card">
    <h3 class="card-title">Manage Structure</h3>
    <div class="manage-list">
        <?php
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
                    <form method="POST"
                        onsubmit="return confirm('Deleting client will delete all its categories and media. Confirm?');">
                        <input type="hidden" name="client_id" value="<?php echo $client['id']; ?>">
                        <button type="submit" name="delete_client" class="btn-admin btn-danger"
                            style="padding: 8px 16px; font-size: 0.8rem;">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </form>
                </div>

                <!-- Categories -->
                <div
                    style="padding-left: 30px; border-left: 2px solid var(--light-grey); display: flex; flex-direction: column; gap: 10px;">
                    <?php
                    $cats = $db->getCategoriesByClient($client['id']);
                    foreach ($cats as $cat):
                        ?>
                        <div
                            style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); padding: 10px 15px; border-radius: 8px;">
                            <span style="font-size: 0.95rem;">
                                <?php echo htmlspecialchars($cat['name']); ?>
                            </span>
                            <form method="POST" onsubmit="return confirm('Delete this category and its media?');">
                                <input type="hidden" name="cat_id" value="<?php echo $cat['id']; ?>">
                                <button type="submit" name="delete_cat" class="btn-admin btn-danger"
                                    style="padding: 6px 12px; font-size: 0.75rem; border: none;">
                                    <i class="fas fa-times"></i>
                                </button>
                            </form>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>