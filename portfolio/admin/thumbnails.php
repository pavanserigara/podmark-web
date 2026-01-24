<header class="admin-header">
    <h1 class="admin-title">Thumbnail Manager</h1>
    <p style="color: var(--text-muted);">Update cover images for your video assets.</p>
</header>

<div class="admin-card">
    <?php
    $portfolio = $db->getFullPortfolio();

    // Sort clients A-Z to match index
    if (!empty($portfolio) && is_array($portfolio)) {
        usort($portfolio, function ($a, $b) {
            return strcasecmp($a['name'], $b['name']);
        });
    }

    $hasVideos = false;
    foreach ($portfolio as $client):
        foreach ($client['categories'] as $cat):
            foreach ($cat['media'] as $media):
                if ($media['media_type'] === 'video') {
                    $hasVideos = true;
                    break 3;
                }
            endforeach;
        endforeach;
    endforeach;

    if (!$hasVideos):
        echo "<p style='padding: 50px; text-align: center; color: var(--text-muted); font-size: 1.1rem;'>No video assets found in the portfolio.</p>";
    else:
        foreach ($portfolio as $client):
            // Check if client has videos
            $clientHasVideos = false;
            foreach ($client['categories'] as $cat) {
                foreach ($cat['media'] as $m) {
                    if ($m['media_type'] === 'video') {
                        $clientHasVideos = true;
                        break 2;
                    }
                }
            }
            if (!$clientHasVideos)
                continue;
            ?>
            <div
                style="margin-bottom: 60px; border: 1px solid var(--grey); border-radius: 16px; overflow: hidden; background: rgba(255,255,255,0.02);">
                <!-- Client Header -->
                <div
                    style="background: var(--grey); padding: 20px 30px; border-left: 6px solid var(--primary); display: flex; align-items: center; gap: 15px;">
                    <div
                        style="width: 30px; height: 30px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #000; font-size: 0.9rem;">
                        <i class="fas fa-user-edit"></i>
                    </div>
                    <h3
                        style="margin: 0; color: #fff; font-size: 1.4rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">
                        <?php echo htmlspecialchars($client['name']); ?>
                    </h3>
                </div>

                <div style="padding: 30px;">
                    <?php foreach ($client['categories'] as $cat):
                        // Check if category has videos
                        $catHasVideos = false;
                        foreach ($cat['media'] as $m) {
                            if ($m['media_type'] === 'video') {
                                $catHasVideos = true;
                                break;
                            }
                        }
                        if (!$catHasVideos)
                            continue;
                        ?>
                        <div style="margin-bottom: 40px;">
                            <h4
                                style="color: var(--primary); font-size: 0.9rem; margin-bottom: 20px; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; display: inline-block;">
                                <i class="fas fa-folder" style="margin-right: 8px;"></i>
                                <?php echo htmlspecialchars($cat['name']); ?>
                            </h4>

                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px;">
                                <?php foreach ($cat['media'] as $media):
                                    if ($media['media_type'] !== 'video')
                                        continue;
                                    ?>
                                    <div
                                        style="background: #000; border: 1px solid var(--grey); border-radius: 16px; padding: 20px; transition: border-color 0.3s ease;">
                                        <div style="display: flex; gap: 20px;">
                                            <!-- Current Thumbnail Preview -->
                                            <div
                                                style="width: 100px; height: 160px; background: #1a1a1a; border-radius: 8px; overflow: hidden; flex-shrink: 0; position: relative; border: 1px solid rgba(255,255,255,0.1);">
                                                <?php if (!empty($media['thumbnail'])): ?>
                                                    <img src="<?php echo htmlspecialchars($media['thumbnail']); ?>"
                                                        style="width: 100%; height: 100%; object-fit: cover;">
                                                    <div
                                                        style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.8); color: var(--success); font-size: 9px; font-weight: 800; text-align: center; padding: 4px;">
                                                        ACTIVE</div>
                                                <?php else: ?>
                                                    <div
                                                        style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); opacity: 0.5;">
                                                        <i class="fas fa-film" style="font-size: 1.5rem; margin-bottom: 5px;"></i>
                                                        <span style="font-size: 8px;">AUTO</span>
                                                    </div>
                                                    <div
                                                        style="position: absolute; bottom: 0; left: 0; right: 0; background: var(--danger); color: #fff; font-size: 9px; font-weight: 800; text-align: center; padding: 4px;">
                                                        NO THUMB</div>
                                                <?php endif; ?>
                                            </div>

                                            <div
                                                style="flex-grow: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: center;">
                                                <div
                                                    style="color: #fff; font-weight: 700; font-size: 1rem; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                                    <?php echo htmlspecialchars($media['title'] ?: 'Untitled Video'); ?>
                                                </div>
                                                <div
                                                    style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 20px; background: rgba(255,255,255,0.05); padding: 6px 10px; border-radius: 6px; display: inline-block;">
                                                    <i class="fas fa-file-video"></i>
                                                    <?php echo basename($media['file_path']); ?>
                                                </div>

                                                <form action="admin.php?view=thumbnails" method="POST" enctype="multipart/form-data">
                                                    <input type="hidden" name="media_id" value="<?php echo $media['id']; ?>">
                                                    <input type="hidden" name="update_thumbnail" value="1">

                                                    <label class="btn-primary"
                                                        style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; font-size: 0.8rem; border-radius: 8px; cursor: pointer; background: var(--primary); color: #000; font-weight: 700; transition: transform 0.2s;">
                                                        <i class="fas fa-cloud-upload-alt"></i> Upload New Cover
                                                        <input type="file" name="new_thumbnail" accept="image/*" required
                                                            style="display: none;"
                                                            onchange="if(confirm('Update thumbnail for this video?')) this.form.submit()">
                                                    </label>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>
<header class="admin-header">
    <h1 class="admin-title">Thumbnail Manager</h1>
    <p style="color: var(--text-muted);">Update cover images for your video assets.</p>
</header>

<div class="admin-card">
    <?php
    $portfolio = $db->getFullPortfolio();

    // Sort clients A-Z to match index
    if (!empty($portfolio) && is_array($portfolio)) {
        usort($portfolio, function ($a, $b) {
            return strcasecmp($a['name'], $b['name']);
        });
    }

    $hasVideos = false;
    foreach ($portfolio as $client):
        foreach ($client['categories'] as $cat):
            foreach ($cat['media'] as $media):
                if ($media['media_type'] === 'video') {
                    $hasVideos = true;
                    break 3;
                }
            endforeach;
        endforeach;
    endforeach;

    if (!$hasVideos):
        echo "<p style='padding: 50px; text-align: center; color: var(--text-muted); font-size: 1.1rem;'>No video assets found in the portfolio.</p>";
    else:
        foreach ($portfolio as $client):
            // Check if client has videos
            $clientHasVideos = false;
            foreach ($client['categories'] as $cat) {
                foreach ($cat['media'] as $m) {
                    if ($m['media_type'] === 'video') {
                        $clientHasVideos = true;
                        break 2;
                    }
                }
            }
            if (!$clientHasVideos)
                continue;
            ?>
            <div
                style="margin-bottom: 60px; border: 1px solid var(--grey); border-radius: 16px; overflow: hidden; background: rgba(255,255,255,0.02);">
                <!-- Client Header -->
                <div
                    style="background: var(--grey); padding: 20px 30px; border-left: 6px solid var(--primary); display: flex; align-items: center; gap: 15px;">
                    <div
                        style="width: 30px; height: 30px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #000; font-size: 0.9rem;">
                        <i class="fas fa-user-edit"></i>
                    </div>
                    <h3
                        style="margin: 0; color: #fff; font-size: 1.4rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">
                        <?php echo htmlspecialchars($client['name']); ?>
                    </h3>
                </div>

                <div style="padding: 30px;">
                    <?php foreach ($client['categories'] as $cat):
                        // Check if category has videos
                        $catHasVideos = false;
                        foreach ($cat['media'] as $m) {
                            if ($m['media_type'] === 'video') {
                                $catHasVideos = true;
                                break;
                            }
                        }
                        if (!$catHasVideos)
                            continue;
                        ?>
                        <div style="margin-bottom: 40px;">
                            <h4
                                style="color: var(--primary); font-size: 0.9rem; margin-bottom: 20px; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; display: inline-block;">
                                <i class="fas fa-folder" style="margin-right: 8px;"></i>
                                <?php echo htmlspecialchars($cat['name']); ?>
                            </h4>

                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px;">
                                <?php foreach ($cat['media'] as $media):
                                    if ($media['media_type'] !== 'video')
                                        continue;
                                    ?>
                                    <div
                                        style="background: #000; border: 1px solid var(--grey); border-radius: 16px; padding: 20px; transition: border-color 0.3s ease;">
                                        <div style="display: flex; gap: 20px;">
                                            <!-- Current Thumbnail Preview -->
                                            <div
                                                style="width: 100px; height: 160px; background: #1a1a1a; border-radius: 8px; overflow: hidden; flex-shrink: 0; position: relative; border: 1px solid rgba(255,255,255,0.1);">
                                                <?php if (!empty($media['thumbnail'])): ?>
                                                    <img src="<?php echo htmlspecialchars($media['thumbnail']); ?>"
                                                        style="width: 100%; height: 100%; object-fit: cover;">
                                                    <div
                                                        style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.8); color: var(--success); font-size: 9px; font-weight: 800; text-align: center; padding: 4px;">
                                                        ACTIVE</div>
                                                <?php else: ?>
                                                    <div
                                                        style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); opacity: 0.5;">
                                                        <i class="fas fa-film" style="font-size: 1.5rem; margin-bottom: 5px;"></i>
                                                        <span style="font-size: 8px;">AUTO</span>
                                                    </div>
                                                    <div
                                                        style="position: absolute; bottom: 0; left: 0; right: 0; background: var(--danger); color: #fff; font-size: 9px; font-weight: 800; text-align: center; padding: 4px;">
                                                        NO THUMB</div>
                                                <?php endif; ?>
                                            </div>

                                            <div not perrt
                                                style="flex-grow: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: center;">
                                                <div
                                                    style="color: #fff; font-weight: 700; font-size: 1rem; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                                    <?php echo htmlspecialchars($media['title'] ?: 'Untitled Video'); ?>
                                                </div>
                                                <div
                                                    style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 20px; background: rgba(255,255,255,0.05); padding: 6px 10px; border-radius: 6px; display: inline-block;">
                                                    <i class="fas fa-file-video"></i>
                                                    <?php echo basename($media['file_path']); ?>
                                                </div>

                                                <form action="admin.php?view=thumbnails" method="POST" enctype="multipart/form-data">
                                                    <input type="hidden" name="media_id" value="<?php echo $media['id']; ?>">
                                                    <input type="hidden" name="update_thumbnail" value="1">

                                                    <label class="btn-primary"
                                                        style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; font-size: 0.8rem; border-radius: 8px; cursor: pointer; background: var(--primary); color: #000; font-weight: 700; transition: transform 0.2s;">
                                                        <i class="fas fa-cloud-upload-alt"></i> Upload New Cover
                                                        <input type="file" name="new_thumbnail" accept="image/*" required
                                                            style="display: none;" onchange="handleThumbUpload(this)">
                                                    </label>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>

<!-- Upload Progress Overlay -->
<div id="thumb-progress"
    style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 9999; align-items: center; justify-content: center; backdrop-filter: blur(5px);">
    <div
        style="background: #1a1a1a; padding: 40px; border-radius: 20px; text-align: center; border: 1px solid var(--primary); max-width: 400px; width: 90%;">
        <div style="font-size: 3rem; color: var(--primary); margin-bottom: 20px;">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
        <h3 style="color: #fff; margin-bottom: 10px; font-size: 1.5rem;">Uploading Cover...</h3>
        <p style="color: var(--text-muted);">Please wait while we update the video thumbnail.</p>
    </div>
</div>

<script>
    function handleThumbUpload(input) {
        if (input.files && input.files[0]) {
            if (confirm('Update thumbnail for this video?')) {
                document.getElementById('thumb-progress').style.display = 'flex';
                input.form.submit();
            } else {
                input.value = ''; // Reset if cancelled
            }
        }
    }
</script>