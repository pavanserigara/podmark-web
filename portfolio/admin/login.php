<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login | Podmark</title>
    <link rel="stylesheet" href="css/admin.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>

<body class="login-screen">
    <div class="login-card">
        <div class="admin-logo" style="margin-bottom: 30px;">PODMARK.</div>
        <h2 style="margin-bottom: 10px; font-weight: 800;">Admin Access</h2>
        <p style="color: var(--text-muted); margin-bottom: 40px; font-size: 0.9rem;">Please enter your clearance code to
            proceed.</p>

        <?php if (isset($error)): ?>
            <div
                style="background: rgba(220, 53, 69, 0.1); border: 1px solid var(--danger); color: var(--danger); padding: 15px; border-radius: 12px; margin-bottom: 25px; font-size: 0.9rem;">
                <?php echo $error; ?>
            </div>
        <?php endif; ?>

        <form method="POST">
            <div class="form-group" style="text-align: left;">
                <label class="form-label">Access Password</label>
                <input type="password" name="password" class="form-input" placeholder="••••••••" required autofocus>
            </div>
            <button type="submit" name="login" class="btn-admin btn-primary"
                style="width: 100%; justify-content: center;">
                Launch Dashboard
            </button>
        </form>

        <div style="margin-top: 40px;">
            <a href="index.php" style="color: var(--text-muted); text-decoration: none; font-size: 0.85rem;">
                <i class="fas fa-arrow-left"></i> Return to Site
            </a>
        </div>
    </div>
</body>

</html>