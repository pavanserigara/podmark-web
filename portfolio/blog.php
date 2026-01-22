<?php
include 'db.php';
$updates = $db->getUpdates();

// Check if a specific post is requested
$single_post = null;
if (isset($_GET['id'])) {
    $id = (int) $_GET['id'];
    foreach ($updates as $up) {
        if ($up['id'] === $id) {
            $single_post = $up;
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>
        <?php echo $single_post ? htmlspecialchars($single_post['title']) . ' | Podmark Blog' : 'Blog & Updates | Podmark'; ?>
    </title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet">
    <style>
        :root {
            --blog-card-bg: rgba(255, 255, 255, 0.03);
            --blog-card-border: rgba(139, 92, 246, 0.1);
        }

        .blog-hero {
            padding: 180px 0 100px;
            text-align: center;
            background: radial-gradient(circle at top, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
        }

        .blog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 40px;
            padding: 60px 0;
        }

        .blog-card {
            background: var(--blog-card-bg);
            border: 1px solid var(--blog-card-border);
            border-radius: 24px;
            padding: 40px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            backdrop-filter: blur(10px);
            text-decoration: none;
            color: inherit;
        }

        .blog-card:hover {
            transform: translateY(-10px);
            border-color: var(--podPurple);
            background: rgba(255, 255, 255, 0.05);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .blog-date {
            font-size: 0.8rem;
            color: var(--podCyan);
            text-transform: uppercase;
            letter-spacing: 0.2em;
            margin-bottom: 20px;
            font-weight: 700;
        }

        .blog-card-title {
            font-size: 1.8rem;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 20px;
            color: var(--text-white);
        }

        .blog-excerpt {
            color: var(--text-muted);
            font-size: 1rem;
            line-height: 1.7;
            margin-bottom: 30px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .read-more {
            margin-top: auto;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 700;
            color: var(--podPurple);
            text-transform: uppercase;
            font-size: 0.9rem;
            letter-spacing: 0.1em;
        }

        /* Single Post Styles */
        .post-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 180px 20px 100px;
        }

        .post-header {
            margin-bottom: 60px;
            text-align: center;
        }

        .post-title {
            font-size: 4rem;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 30px;
            letter-spacing: -0.03em;
        }

        .post-content {
            font-size: 1.2rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.8);
        }

        .post-content p {
            margin-bottom: 30px;
        }

        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            color: var(--podCyan);
            text-decoration: none;
            font-weight: 700;
            margin-bottom: 40px;
            text-transform: uppercase;
            font-size: 0.9rem;
            transition: gap 0.3s ease;
        }

        .back-link:hover {
            gap: 15px;
        }

        @media (max-width: 768px) {
            .post-title {
                font-size: 2.5rem;
            }

            .blog-hero {
                padding: 140px 20px 60px;
            }
        }
    </style>
</head>

<body style="background-color: var(--podDark);">

    <!-- NAVIGATION BAR -->
    <nav class="navbar active" id="navbar">
        <div class="nav-container">
            <a href="index.php" class="nav-logo">
                <img src="img/podmark_logo.svg" alt="PODMARK" style="height: 24px;">
            </a>

            <ul class="nav-links" id="navLinks">
                <li><a href="index.php#work">Work</a></li>
                <li><a href="index.php#story">Story</a></li>
                <li><a href="blog.php" class="active">Blog</a></li>
                <li><a href="index.php#contact">Contact</a></li>
                <li><a href="admin.php">Admin</a></li>
            </ul>
        </div>
    </nav>

    <?php if ($single_post): ?>
        <!-- SINGLE POST VIEW -->
        <article class="post-container">
            <a href="blog.php" class="back-link">
                <i class="fas fa-arrow-left"></i> Back to Updates
            </a>
            <header class="post-header">
                <div class="blog-date">
                    <?php echo date('M d, Y', strtotime($single_post['created_at'])); ?>
                </div>
                <h1 class="post-title gradient-text">
                    <?php echo htmlspecialchars($single_post['title']); ?>
                </h1>
            </header>
            <div class="post-content">
                <?php echo nl2br(htmlspecialchars($single_post['content'])); ?>
            </div>
        </article>
    <?php else: ?>
        <!-- BLOG INDEX VIEW -->
        <section class="blog-hero">
            <div class="container">
                <span class="section-badge">AGENCY NEWS</span>
                <h2 class="serif" style="font-size: 4rem; color: #fff;">Latest <span class="gradient-text">Updates.</span>
                </h2>
                <p class="hero-subtitle" style="margin: 20px auto 0;">Explore our journey, insights, and the latest from
                    Podmark Digital.</p>
            </div>
        </section>

        <div class="container">
            <div class="blog-grid">
                <?php if (empty($updates)): ?>
                    <p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 100px 0;">
                        Stay tuned! Our story is just beginning.
                    </p>
                <?php else: ?>
                    <?php foreach ($updates as $post): ?>
                        <a href="blog.php?id=<?php echo $post['id']; ?>" class="blog-card">
                            <div class="blog-date">
                                <?php echo date('M d, Y', strtotime($post['created_at'])); ?>
                            </div>
                            <h3 class="blog-card-title">
                                <?php echo htmlspecialchars($post['title']); ?>
                            </h3>
                            <p class="blog-excerpt">
                                <?php echo htmlspecialchars(substr($post['content'], 0, 150)) . '...'; ?>
                            </p>
                            <div class="read-more">
                                Read Article <i class="fas fa-arrow-right"></i>
                            </div>
                        </a>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    <?php endif; ?>

    <!-- FOOTER -->
    <footer class="footer" style="margin-top: 100px;">
        <div class="container">
            <div class="footer-bottom">
                <p>&copy;
                    <?php echo date('Y'); ?> PODMARK. All rights reserved.
                </p>
            </div>
        </div>
    </footer>

</body>

</html>