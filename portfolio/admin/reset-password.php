<header class="admin-header">
    <h1 class="admin-title">Security & Password.</h1>
    <p style="color: var(--text-muted);">Update your administrative credentials.</p>
</header>

<div class="admin-card" style="max-width: 600px;">
    <h3 class="card-title">Change Password</h3>
    <form method="POST">
        <div class="form-group">
            <label class="form-label">Current Password</label>
            <input type="password" name="current_pass" class="form-input" placeholder="Enter your current password"
                required>
        </div>
        <div class="form-group">
            <label class="form-label">New Password</label>
            <input type="password" name="new_pass" class="form-input" placeholder="Enter new strong password" required
                minlength="6">
        </div>
        <div class="form-group">
            <label class="form-label">Confirm Password</label>
            <input type="password" name="confirm_pass" class="form-input" placeholder="Repeat new password" required
                minlength="6" oninput="checkMatch(this)">
            <p id="match_msg" style="font-size: 0.8rem; margin-top: 5px; display: none;"></p>
        </div>
        <button type="submit" name="change_password" id="submit_btn" class="btn-admin btn-primary">
            <i class="fas fa-key"></i> Update Password
        </button>
    </form>
</div>

<script>
    function checkMatch(confirmInput) {
        const pass = document.getElementsByName('new_pass')[0].value;
        const msg = document.getElementById('match_msg');
        const btn = document.getElementById('submit_btn');

        if (confirmInput.value !== pass) {
            msg.textContent = "Passwords do not match.";
            msg.style.color = "var(--danger)";
            msg.style.display = "block";
            btn.disabled = true;
            btn.style.opacity = "0.5";
        } else {
            msg.textContent = "Passwords match.";
            msg.style.color = "var(--success)";
            msg.style.display = "block";
            btn.disabled = false;
            btn.style.opacity = "1";
        }
    }
</script>