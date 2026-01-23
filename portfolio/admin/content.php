<header class="admin-header">
    <h1 class="admin-title">Media & Content.</h1>
    <p style="color: var(--text-muted);">Upload and manage your portfolio visuals.</p>
</header>

<div class="admin-card">
    <h3 class="card-title">Upload New Media</h3>
    <form method="POST" enctype="multipart/form-data" id="uploadForm">
        <div class="grid-2">
            <div>
                <div class="form-group">
                    <label class="form-label">Step 1: Select Client</label>
                    <select id="client_select" class="form-input" required onchange="updateCategories()">
                        <option value="">Choose Client...</option>
                        <?php
                        $clients = $db->getClients();
                        $cat_data = [];
                        foreach ($clients as $client):
                            $cats = $db->getCategories($client['id']);
                            $cat_data[$client['id']] = $cats;
                            ?>
                            <option value="<?php echo $client['id']; ?>"><?php echo htmlspecialchars($client['name']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Step 2: Select Category</label>
                    <select name="cat_id" id="category_select" class="form-input" required disabled
                        onchange="handleCategoryLogic()">
                        <option value="">First select a client...</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Media Type (Auto-detected)</label>
                    <div id="media_type_display"
                        style="background: rgba(255,255,255,0.05); padding: 14px 20px; border-radius: 12px; border: 1px solid var(--grey); color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
                        Select category...
                    </div>
                    <input type="hidden" name="type" id="media_type_hidden" value="image">
                </div>
            </div>

            <div>
                <div class="form-group">
                    <label class="form-label">Project Title</label>
                    <input type="text" name="title" class="form-input" placeholder="e.g. Summer Campaign 2025">
                </div>
                <div class="form-group">
                    <label class="form-label">Select Media Files</label>
                    <input type="file" name="files[]" id="file_input" multiple required class="form-input">
                </div>
                <div class="form-group" id="thumb_group" style="display: none;">
                    <label class="form-label">Video Thumbnail (Optional)</label>
                    <input type="file" name="thumbnail" class="form-input" accept="image/*">
                    <small style="color: var(--text-muted);">Required for high-end video previews.</small>
                </div>
                <div style="margin-top: 30px;">
                    <button type="submit" name="upload" class="btn-admin btn-primary" style="width: 100%;">
                        <i class="fas fa-cloud-upload-alt"></i> Start Upload
                    </button>
                </div>

                <div class="progress-container" id="progress_container" style="display: none;">
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" id="progress_fill"></div>
                    </div>
                    <div class="progress-info">
                        <span id="progress_status">Uploading...</span>
                        <span id="progress_percent">0%</span>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<script>
    const categoryMapping = <?php echo json_encode($cat_data); ?>;

    function updateCategories() {
        const client_id = document.getElementById('client_select').value;
        const catSelect = document.getElementById('category_select');

        catSelect.innerHTML = '<option value="">Choose Category...</option>';

        if (client_id && categoryMapping[client_id]) {
            catSelect.disabled = false;
            categoryMapping[client_id].forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat.id;
                opt.dataset.name = cat.name.toLowerCase();
                opt.textContent = cat.name.charAt(0).toUpperCase() + cat.name.slice(1);
                catSelect.appendChild(opt);
            });
        } else {
            catSelect.disabled = true;
            catSelect.innerHTML = '<option value="">First select a client...</option>';
            resetLogic();
        }
    }

    function handleCategoryLogic() {
        const catSelect = document.getElementById('category_select');
        const selectedOption = catSelect.options[catSelect.selectedIndex];
        const categoryName = selectedOption.dataset.name || "";

        const typeDisplay = document.getElementById('media_type_display');
        const typeHidden = document.getElementById('media_type_hidden');
        const thumbGroup = document.getElementById('thumb_group');
        const fileInput = document.getElementById('file_input');

        if (categoryName === 'reels') {
            typeDisplay.innerHTML = '<i class="fas fa-video"></i> VIDEO (MP4)';
            typeHidden.value = 'video';
            thumbGroup.style.display = 'block';
            fileInput.accept = 'video/mp4,video/x-m4v,video/*';
        } else if (categoryName === 'poster') {
            typeDisplay.innerHTML = '<i class="fas fa-image"></i> IMAGE (JPG/PNG)';
            typeHidden.value = 'image';
            thumbGroup.style.display = 'none';
            fileInput.accept = 'image/*';
        } else {
            resetLogic();
        }
    }

    function resetLogic() {
        document.getElementById('media_type_display').textContent = 'Select category...';
        document.getElementById('thumb_group').style.display = 'none';
        document.getElementById('file_input').accept = '';
    }

    // Progress Bar Logic
    document.getElementById('uploadForm').onsubmit = function (e) {
        const btn = this.querySelector('button[name="upload"]');
        const progContainer = document.getElementById('progress_container');
        const progFill = document.getElementById('progress_fill');
        const progPercent = document.getElementById('progress_percent');
        const progStatus = document.getElementById('progress_status');

        if (!document.getElementById('file_input').files.length) return;

        e.preventDefault();

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> processing...';
        progContainer.style.display = 'block';

        const formData = new FormData(this);
        formData.append('upload', '1'); // Force detection in admin.php

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'admin.php?view=content', true);

        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                progFill.style.width = percent + '%';
                progPercent.textContent = percent + '%';
                if (percent === 100) {
                    progStatus.textContent = 'Finalizing files...';
                }
            }
        };

        xhr.onload = function () {
            if (xhr.status === 200) {
                window.location.href = 'admin.php?view=content&msg=Upload+Complete';
            } else {
                alert('Upload failed. Check server limits.');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Start Upload';
                progContainer.style.display = 'none';
            }
        };

        xhr.send(formData);
    };
</script>

<div class="admin-card">
    <h3 class="card-title">Gallery Management</h3>
    <?php
    $pf = $db->getFullPortfolio();
    if (empty($pf))
        echo "<p style='color: var(--text-muted);'>No media found.</p>";
    foreach ($pf as $entry):
        foreach ($entry['categories'] as $cat):
            if (empty($cat['media']))
                continue;
            ?>
            <div style="margin-bottom: 40px;">
                <h5
                    style="color: var(--primary); margin-bottom: 15px; border-bottom: 1px solid var(--grey); padding-bottom: 10px; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;">
                    <?php echo htmlspecialchars($entry['client']['name']); ?> / <?php echo htmlspecialchars($cat['name']); ?>
                </h5>
                <div class="admin-gallery">
                    <?php foreach ($cat['media'] as $media): ?>
                        <div class="gallery-item">
                            <?php if ($media['media_type'] == 'video'): ?>
                                <video src="<?php echo $media['file_path']; ?><?php echo empty($media['thumbnail']) ? '#t=15' : ''; ?>"
                                    class="gallery-thumb" muted playsinline preload="metadata"
                                    onmouseover="<?php echo !empty($media['thumbnail']) ? 'this.currentTime = 15;' : ''; ?> this.play();"
                                    onmouseout="this.pause(); <?php echo !empty($media['thumbnail']) ? 'this.load();' : 'this.currentTime = 15;'; ?>"
                                    <?php if (!empty($media['thumbnail']))
                                        echo 'poster="' . $media['thumbnail'] . '"'; ?>></video>
                                <div
                                    style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">
                                    VIDEO
                                </div>
                            <?php else: ?>
                                <img src="<?php echo $media['file_path']; ?>" class="gallery-thumb" alt="">
                                <div
                                    style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">
                                    IMAGE
                                </div>
                            <?php endif; ?>

                            <div class="gallery-actions">
                                <form action="admin.php?view=content" method="POST">
                                    <input type="hidden" name="media_id" value="<?php echo $media['id']; ?>">
                                    <input type="hidden" name="delete_media" value="1">
                                    <button type="submit" class="btn-admin btn-danger"
                                        style="padding: 12px; border-radius: 50%; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; border: 2px solid white;">
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