<?php
include 'db.php';
$portfolio_data = $db->getFullPortfolio();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Podmark | Premium Digital Agency Portfolio</title>
    <meta name="description"
        content="PODMARK - A creative digital agency crafting impactful brand experiences through strategy, design, and storytelling.">
    <link rel="stylesheet" href="css/style.css">

    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- AnimeJS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>

    <!-- GSAP Animation Library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
</head>

<body>

    <!-- ANIMATED BACKGROUND (Matched to Main Project) -->


    <!-- NAVIGATION BAR -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="#" class="nav-logo">
                <img src="img/podmark_logo.svg" alt="PODMARK" style="height: 24px;">
            </a>

            <ul class="nav-links" id="navLinks">
                <div class="menu-close" id="menuClose">
                    <i class="fas fa-times"></i>
                </div>

                <li><a href="#work">Work</a></li>
                <li><a href="#story">Story</a></li>
                <li><a href="blog.php">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="admin.php">Admin</a></li>
                <li><a href="#contact" class="nav-cta">Let's Talk</a></li>
            </ul>

            <div class="menu-toggle" id="menuToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- HERO SECTION -->
    <header class="hero">
        <div class="hero-blobs">
            <div class="blob"></div>
        </div>

        <div class="hero-content">
            <span class="section-badge"
                style="margin-bottom: 24px; display: inline-block; border-color: var(--podPurple); color: var(--podCyan);">
                PREMIUM DIGITAL AGENCY
            </span>
            <h1 class="title-hero">
                PODMARK<br>
                <span class="gradient-text">DIGITAL.</span>
            </h1>

            <p class="hero-subtitle">
                We craft immersive digital experiences that define the future.
                Strategy, Design, and Technology blended into perfection.
            </p>

            <div class="cta-group">
                <a href="#contact" class="btn btn-primary">
                    Start Your Project
                </a>
                <a href="#work" class="btn btn-outline">
                    View Portfolio
                </a>
            </div>
        </div>

        <!-- Side Scroll Indicators -->
        <div class="side-scroll left">
            <span>SCROLL</span>
            <div class="scroll-line"></div>
        </div>
        <div class="side-scroll right">
            <span>SCROLL</span>
            <div class="scroll-line"></div>
        </div>

        <!-- Center Scroll Indicator (Legacy/Backup) -->
        <div class="scroll-indicator"></div>
    </header>



    <!-- WORK SECTION -->
    <section id="work" class="section">
        <div class="container">
            <div class="section-header">
                <div class="section-badge">
                    Portfolio
                </div>
                <h2 class="section-title">Featured Projects</h2>
                <p class="section-description">
                    Discover our portfolio of award-winning work that drives measurable results
                    and creates lasting impact for our clients.
                </p>
            </div>

            <?php if (empty($portfolio_data)): ?>
                <!-- Empty State -->
                <div
                    style="text-align: center; padding: 100px 20px; background: rgba(139, 92, 246, 0.05); border-radius: 24px; border: 1px dashed rgba(139, 92, 246, 0.3);">
                    <i class="fas fa-folder-open"
                        style="font-size: 4rem; color: var(--primary-purple); margin-bottom: 20px; opacity: 0.5;"></i>
                    <h2 style="font-size: 2rem; color: var(--text-muted); margin-bottom: 15px;">Portfolio Initializing...
                    </h2>
                    <p style="color: var(--text-dim); margin-bottom: 30px;">Please access the admin panel to upload your
                        first project.</p>
                    <a href="admin.php" class="btn btn-primary">
                        <i class="fas fa-plus-circle"></i> Go to Admin Panel
                    </a>
                </div>
            <?php else: ?>

                <?php foreach ($portfolio_data as $index => $client): ?>
                    <section class="client-block" style="animation-delay: <?php echo $index * 0.1; ?>s;">
                        <!-- Client Header (Centered) -->
                        <div class="client-header">
                            <h2 class="title-client"><?php echo htmlspecialchars($client['name']); ?></h2>
                            <p class="client-desc"><?php echo htmlspecialchars($client['description']); ?></p>
                        </div>

                        <!-- CATEGORIES LOOP -->
                        <?php foreach ($client['categories'] as $category): ?>

                            <?php if (!empty($category['media'])): ?>
                                <div class="category-block">
                                    <h3 class="title-category">
                                        <i class="fas fa-layer-group"></i>
                                        <?php echo htmlspecialchars($category['name']); ?>
                                    </h3>

                                    <!-- MEDIA GRID -->
                                    <?php
                                    $isReelCategory = (stripos($category['name'], 'reel') !== false);
                                    $isPosterCategory = (stripos($category['name'], 'poster') !== false);
                                    $gridClass = $isReelCategory ? 'reels' : ($isPosterCategory ? 'posters' : '');
                                    ?>
                                    <div class="gallery-grid <?php echo $gridClass; ?>">
                                        <?php foreach ($category['media'] as $item): ?>
                                            <?php
                                            $cardClass = $isReelCategory ? 'reel-card' : ($isPosterCategory ? 'poster-card' : '');
                                            ?>
                                            <div class="gallery-card <?php echo $cardClass; ?>"
                                                data-type="<?php echo $item['media_type']; ?>"
                                                data-src="<?php echo htmlspecialchars($item['file_path']); ?>">
                                                <div class="gallery-media-wrapper">
                                                    <?php if ($item['media_type'] === 'video'): ?>
                                                        <video
                                                            src="<?php echo htmlspecialchars($item['file_path']); ?><?php echo empty($item['thumbnail']) ? '#t=15' : ''; ?>"
                                                            loop muted playsinline preload="metadata"
                                                            onmouseover="<?php echo !empty($item['thumbnail']) ? 'this.currentTime = 15;' : ''; ?> this.play();"
                                                            onmouseout="this.pause(); <?php echo !empty($item['thumbnail']) ? 'this.load();' : 'this.currentTime = 15;'; ?>"
                                                            data-poster="<?php echo !empty($item['thumbnail']) ? htmlspecialchars($item['thumbnail']) : ''; ?>"
                                                            <?php if (!empty($item['thumbnail']))
                                                                echo 'poster="' . htmlspecialchars($item['thumbnail']) . '"'; ?>></video>
                                                    <?php else: ?>
                                                        <img src="<?php echo htmlspecialchars($item['file_path']); ?>" loading="lazy"
                                                            alt="<?php echo htmlspecialchars($item['title'] ?: 'Project'); ?>">
                                                    <?php endif; ?>
                                                </div>

                                                <!-- Overlay -->
                                                <div class="card-overlay">
                                                    <div class="project-meta">
                                                        <i class="fas fa-tag"></i> <?php echo htmlspecialchars($category['name']); ?>
                                                    </div>
                                                    <div class="project-title">
                                                        <?php echo (!empty($item['title']) ? htmlspecialchars($item['title']) : 'Untitled Project'); ?>
                                                    </div>
                                                </div>
                                            </div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                            <?php endif; ?>

                        <?php endforeach; ?>
                    </section>
                <?php endforeach; ?>

            <?php endif; ?>
        </div>
        </main>

        <!-- ABOUT SECTION -->
        <section id="story" class="section section-alt">
            <div class="container">
                <div class="about-grid">
                    <div>
                        <div class="section-badge">
                            Our Story
                        </div>
                        <h2 class="about-lead">
                            We don't just build websites. We build <span class="gradient-text">Digital Arsenals</span>.
                        </h2>
                        <div class="about-divider"></div>
                        <p class="about-text">
                            Founded in 2025, PODMARK was born from a simple belief: Brands need more than just
                            visibility—they need impact.
                        </p>
                    </div>
                    <div>
                        <p class="about-text">
                            Founded in March 2025, PODMARK is a
                            creative-driven digital powerhouse built on trust
                            and teamwork. We partner with elite brands to
                            architect growth through high-impact strategy
                            and cinematic storytelling.

                        </p>
                        <p class="about-text">
                            We don't work for you, we work with you, as part
                            of your brand. At PODMARK, we go beyond
                            traditional marketing. We partner with you to
                            grow your brand through creativity, strategy,
                            and trust.
                        </p>
                        <a href="#contact" class="btn btn-primary" style="margin-top: 30px;">
                            Start Your Project
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- FOOTER -->
        <footer id="contact" class="footer">
            <div class="container">
                <div class="footer-grid">
                    <!-- Brand -->
                    <div class="footer-brand">
                        <h2>PODMARK</h2>
                        <p>
                            We create impact. Bespoke digital solutions for ambitious brands.
                        </p>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h4 class="footer-head">Explore</h4>
                        <ul class="footer-links">
                            <li><a href="#work"><i class="fas fa-chevron-right"
                                        style="font-size: 0.7rem; margin-right: 8px;"></i> Selected Work</a></li>
                            <li><a href="#about"><i class="fas fa-chevron-right"
                                        style="font-size: 0.7rem; margin-right: 8px;"></i> About Us</a></li>
                            <li><a href="admin.php"><i class="fas fa-chevron-right"
                                        style="font-size: 0.7rem; margin-right: 8px;"></i> Admin Portal</a></li>
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div>
                        <h4 class="footer-head">Connect</h4>
                        <ul class="footer-links">
                            <li><a href="mailto:hello@podmark.agency"><i class="fas fa-envelope"></i>
                                    hello@podmark.agency</a></li>
                            <li><a href="https://instagram.com/podmark" target="_blank"><i class="fab fa-instagram"></i>
                                    Instagram</a></li>
                            <li><a href="https://linkedin.com/company/podmark" target="_blank"><i
                                        class="fab fa-linkedin"></i> LinkedIn</a></li>
                            <li><a href="https://twitter.com/podmark" target="_blank"><i class="fab fa-twitter"></i>
                                    Twitter</a></li>
                        </ul>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>
                        <i class="fas fa-copyright"></i> 2025 PODMARK Digital Agency. All rights reserved.
                        Crafted with <i class="fas fa-heart" style="color: var(--primary-pink);"></i> and <i
                            class="fas fa-coffee"></i>
                    </p>
                </div>
            </div>
        </footer>

        <!-- LIGHTBOX MODAL -->
        <div id="lightbox" class="media-modal">
            <div id="lightbox-content" class="modal-content"></div>
        </div>

        <script>
            // ===== NAVIGATION SCROLL EFFECT =====
            const navbar = document.getElementById('navbar');
            const menuToggle = document.getElementById('menuToggle');
            const navLinks = document.getElementById('navLinks');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // Mobile Menu Toggle
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });

            // Close button handler
            const menuClose = document.getElementById('menuClose');
            if (menuClose) {
                menuClose.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            }

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                const isMenuOpen = navLinks.classList.contains('active');
                const clickedInsideMenu = navLinks.contains(e.target);
                const clickedToggle = menuToggle.contains(e.target);

                if (isMenuOpen && !clickedInsideMenu && !clickedToggle) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });

            // ===== LIGHTBOX FUNCTIONALITY =====
            const lightbox = document.getElementById('lightbox');
            const contentBox = document.getElementById('lightbox-content');

            document.querySelectorAll('.gallery-card').forEach(card => {
                card.addEventListener('click', () => {
                    const src = card.getAttribute('data-src');
                    const type = card.getAttribute('data-type');
                    contentBox.innerHTML = '';

                    if (type === 'video') {
                        const video = document.createElement('video');
                        video.src = src;
                        video.controls = true;
                        video.autoplay = true;
                        const poster = card.querySelector('video').getAttribute('data-poster');
                        if (poster) video.setAttribute('poster', poster);
                        video.style.maxWidth = '100%';
                        video.style.maxHeight = '90vh';
                        video.style.borderRadius = '12px';
                        contentBox.appendChild(video);
                    } else {
                        const img = document.createElement('img');
                        img.src = src;
                        img.style.maxWidth = '100%';
                        img.style.maxHeight = '90vh';
                        img.style.borderRadius = '12px';
                        contentBox.appendChild(img);
                    }

                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                    contentBox.innerHTML = '';
                    document.body.style.overflow = 'auto';
                }
            });

            // Close lightbox with ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                    lightbox.classList.remove('active');
                    contentBox.innerHTML = '';
                    document.body.style.overflow = 'auto';
                }
            });

            // ===== GSAP ANIMATIONS =====
            gsap.registerPlugin(ScrollTrigger);

            // Animate client blocks on scroll
            gsap.utils.toArray('.client-block').forEach(section => {
                gsap.from(section, {
                    opacity: 0,
                    y: 80,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });

            // Animate gallery cards
            gsap.utils.toArray('.gallery-card').forEach((card, index) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                });
            });

            // Animate about section
            gsap.from('.about-grid > div', {
                opacity: 0,
                x: (index) => index === 0 ? -50 : 50,
                duration: 1,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.about-grid',
                    start: "top 75%",
                }
            });

            // Animated Grid Removed for simplicity

            // ===== HERO SLIDER =====
            if (slides.length > 0) {
                // Slider removed
            }
        </script>
</body>

</html>