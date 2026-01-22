<header class="admin-header" style="display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
        <h1 class="admin-title">Blog Updates.</h1>
        <p style="color: var(--text-muted);">Share the latest agency news and updates.</p>
    </div>
    <a href="blog.php" target="_blank" class="btn-admin btn-outline"
        style="text-decoration: none; border: 1px solid var(--grey); color: var(--text-white); padding: 10px 20px; border-radius: 8px;">
        <i class="fas fa-external-link-alt"></i> View Live Blog
    </a>
</header>

<div class="admin-card">
    <h3 class="card-title">Post New Update</h3>
    <form method="POST">
        <div class="form-group">
            <label class="form-label">Title</label>
            <input type="text" name="title" class="form-input" placeholder="e.g. New Project Launch" required>
        </div>
        <div class="form-group">
            <label class="form-label">Content</label>
            <textarea name="content" class="form-input" style="height: 150px; resize: none;"
                placeholder="Project details, agency wins, etc." required></textarea>
        </div>
        <button type="submit" name="add_update" class="btn-admin btn-primary">
            <i class="fas fa-paper-plane"></i> Post Update
        </button>
    </form>
</div>

<div class="admin-card">
    <h3 class="card-title">Manage Updates</h3>
    <div class="manage-list">
        <?php
        $updates = $db->getUpdates();
        if (empty($updates))
            echo "<p style='color: var(--text-muted);'>No updates posted yet.</p>";
        foreach ($updates as $up):
            ?>
            <div class="manage-item">
                <div class="item-info">
                    <h5>
                        <?php echo htmlspecialchars($up['title']); ?>
                    </h5>
                    <p>
                        <?php echo date('M d, Y', strtotime($up['created_at'])); ?>
                    </p>
                </div>
                <form method="POST" onsubmit="return confirm('Delete this update?');">
                    <input type="hidden" name="update_id" value="<?php echo $up['id']; ?>">
                    <button type="submit" name="delete_update" class="btn-admin btn-danger" style="padding: 10px 20px;">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </form>
            </div>
        <?php endforeach; ?>
    </div>
</div>