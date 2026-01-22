<header class="admin-header">
    <h1 class="admin-title">Media & Content.</h1>
    <p style="color: var(--text-muted);">Upload and manage your portfolio visuals.</p>
</header>

<div class="admin-card">
    <h3 class="card-title">Upload New Media</h3>
    <form method="POST" enctype="multipart/form-data">
        <div class="grid-2">
            <div>
                <div class="form-group">
                    <label class="form-label">Target Category</label>
                    <select name="cat_id" class="form-input" required>
                        <option value="">Select Category...</option>
                        <?php
                        $pf = $db->getFullPortfolio();
                        foreach ($pf as $entry) {
                            echo "<optgroup label='" . htmlspecialchars($entry['client']['name']) . "'>";
                            foreach ($entry['categories'] as $cat) {
                                echo "<option value='{$cat['id']}'>" . htmlspecialchars($cat['name']) . "</option>";
                            }
                            echo "</optgroup>";
                        }
                        ?>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Media Type</label>
                    <select name="type" class="form-input" required>
                        <option value="video">Video (MP4)</option>
                        <option value="image">Image (JPG/PNG)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Project Title</label>
                    <input type="text" name="title" class="form-input" placeholder="e.g. Summer Campaign 2025">
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label class="form-label">Select Media Files</label>
                    <input type="file" name="files[]" multiple required class="form-input" accept="image/*,video/*">
                    <small style="color: var(--text-muted);">You can select multiple files.</small>
                </div>
                <div class="form-group">
                    <label class="form-label">Video Thumbnail (Optional)</label>
                    <input type="file" name="thumbnail" class="form-input" accept="image/*">
                    <small style="color: var(--text-muted);">Custom preview image for videos.</small>
                </div>
                <div style="margin-top: 40px;">
                    <button type="submit" name="upload" class="btn-admin btn-primary" style="width: 100%;">
                        <i class="fas fa-cloud-upload-alt"></i> Start Upload
                    </button>
                </div>
            </div>
        </div>
    </form>
</div>

<div class="admin-card">
    <h3 class="card-title">Gallery Management</h3>
    <?php
    $pf = $db->getFullPortfolio();
    foreach ($pf as $entry):
        foreach ($entry['categories'] as $cat):
            if (empty($cat['media'])) continue;
    ?>
        <div style="margin-bottom: 40px;">
            <h5 style="color: var(--primary); margin-bottom: 15px; border-bottom: 1px solid var(--grey); padding-bottom: 10px;">
                <?php echo htmlspecialchars($entry['client']['name']); ?> / <?php echo htmlspecialchars($cat['name']); ?>
            </h5>
            <div class="admin-gallery">
                <?php foreach ($cat['media'] as $media): ?>
                    <div class="gallery-item">
                        <?php if ($media['media_type'] == 'video'): ?>
                            <video src="<?php echo $media['file_path']; ?>#t=15" class="gallery-thumb"
                                <?php if(!empty($media['thumbnail'])) echo 'poster="'.$media['thumbnail'].'"'; ?>></video>
                            <div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">
                                VIDEO
                            </div>
                        <?php else: ?>
                            <img src="<?php echo $media['file_path']; ?>" class="gallery-thumb" alt="">
                            <div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">
                                IMAGE
                            </div>
                        <?php endif; ?>
                        
                        <div class="gallery-actions">
                            <form action="admin.php?view=content" method="POST">
                                <input type="hidden" name="media_id" value="<?php echo $media['id']; ?>">
                                <input type="hidden" name="delete_media" value="1"> <!-- Hidden input for reliability -->
                                <button type="submit" class="btn-admin btn-danger" style="padding: 12px; border-radius: 50%; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; border: 2px solid white;">
                                    <i class="fas fa-trash-alt" style="font-size: 1.2rem;"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    <?php 
        endforeach;
    endforeach; 
    ?>
</div>
