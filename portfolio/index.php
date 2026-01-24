<?php
include 'db.php';
$portfolio_data = $db->getFullPortfolio();

// --- 1. SORTING LOGIC ---
if (!empty($portfolio_data) && is_array($portfolio_data)) {
    usort($portfolio_data, function ($a, $b) {
        return strcasecmp($a['name'], $b['name']);
    });
}

// --- 2. WHATSAPP CONFIG ---
$phone = "918105575795";
$default_msg = rawurlencode("Hello PODMARK, I'm interested in starting a project with you!");
$whatsapp_url = "https://wa.me/{$phone}?text={$default_msg}";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Podmark | Premium Digital Agency Portfolio</title>
    <meta name="description" content="PODMARK - A creative digital agency crafting impactful brand experiences.">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

    <style>
        /* YouTube-Style Smart Preview System */
        :root {
            --yt-red: #FF0000;
        }

        .gallery-grid {
            display: grid;
            gap: 20px;
            margin-top: 30px;
        }

        /* Responsive Grid Logic */
        .gallery-grid.reels {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }

        .gallery-grid.posters {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }

        .yt-card {
            position: relative;
            background: #0f0f0f;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
        }

        .yt-card:hover {
            transform: scale(1.02);
            z-index: 10;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
        }

        .yt-media-container {
            position: relative;
            width: 100%;
            background: #2b2b2b;
            overflow: hidden;
        }

        /* Aspect Ratios */
        .reels .yt-media-container {
            aspect-ratio: 9/16;
        }

        .posters .yt-media-container {
            aspect-ratio: 4/5;
        }

        .gallery-grid:not(.reels):not(.posters) .yt-media-container {
            aspect-ratio: 16/9;
        }

        .yt-thumb {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: opacity 0.3s ease;
        }

        .yt-preview-video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease;
        }

        .yt-preview-video.active {
            opacity: 1;
        }

        .yt-duration {
            position: absolute;
            bottom: 8px;
            right: 8px;
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 3px 6px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 700;
            z-index: 5;
        }

        .yt-progress-container {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(255, 255, 255, 0.2);
            z-index: 6;
            opacity: 0;
            transition: opacity 0.2s ease;
        }

        .yt-card:hover .yt-progress-container {
            opacity: 1;
        }

        .yt-progress-bar {
            height: 100%;
            background: var(--yt-red);
            width: 0%;
            transition: width 0.1s linear;
        }

        .yt-info {
            padding: 12px;
            background: #0f0f0f;
        }

        .yt-title {
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            margin-bottom: 4px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.4;
        }

        .yt-meta {
            font-size: 12px;
            color: #aaaaaa;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        /* Hover Play Icon */
        .yt-play-hint {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 4;
            color: #fff;
            font-size: 20px;
        }

        .yt-card:hover .yt-play-hint {
            opacity: 1;
        }

        /* Connection Awareness Message */
        #network-status {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 10px 20px;
            border-radius: 30px;
            font-size: 12px;
            z-index: 1000;
            display: none;
            border: 1px solid var(--podCyan);
        }
    </style>
</head>

<body>

    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="#" class="nav-logo">
                <img src="img/podmark_logo.svg" alt="PODMARK" style="height: 24px;">
            </a>

            <ul class="nav-links" id="navLinks">
                <div class="menu-close" id="menuClose"><i class="fas fa-times"></i></div>
                <li><a href="#work">Work</a></li>
                <li><a href="#story">Story</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="<?php echo $whatsapp_url; ?>" class="nav-cta" target="_blank">Let's Talk</a></li>
            </ul>

            <div class="menu-toggle" id="menuToggle">
                <span></span><span></span><span></span>
            </div>
        </div>
    </nav>

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
                <a href="https://wa.me/918105575795?text=Hello%20PODMARK,%20I'm%20interested%20in%20starting%20a%20project%20with%20you."
                    class="btn btn-primary" target="_blank">
                    Start Your Project
                </a>
                <a href="#work" class="btn btn-outline">
                    View Portfolio
                </a>
            </div>
        </div>

        <div class="side-scroll left">
            <span>SCROLL</span>
            <div class="scroll-line"></div>
        </div>
        <div class="side-scroll right">
            <span>SCROLL</span>
            <div class="scroll-line"></div>
        </div>

        <div class="scroll-indicator"></div>
    </header>

    <section id="work" class="section">
        <div class="container">
            <div class="section-header">
                <div class="section-badge">Selected Work</div>
                <h2 class="section-title">Visual Excellence</h2>
            </div>

            <?php if (empty($portfolio_data)): ?>
                <div style="text-align: center; padding: 100px 20px;">
                    <h2 style="color: var(--text-muted);">Initializing Portfolio...</h2>
                </div>
            <?php else: ?>
                <?php foreach ($portfolio_data as $client): ?>
                    <div class="client-block" style="margin-bottom: 60px;">
                        <h2 class="title-client"
                            style="border-left: 4px solid var(--podCyan); padding-left: 15px; margin-bottom: 20px;">
                            <?php echo htmlspecialchars($client['name']); ?>
                        </h2>

                        <?php foreach ($client['categories'] as $category): ?>
                            <?php if (!empty($category['media'])): ?>
                                <div class="category-block">
                                    <h3 class="title-category" style="font-size: 0.9rem; opacity: 0.7; letter-spacing: 2px;">
                                        <?php echo strtoupper(htmlspecialchars($category['name'])); ?>
                                    </h3>

                                    <?php
                                    $isReelCategory = (stripos($category['name'], 'reel') !== false);
                                    $isPosterCategory = (stripos($category['name'], 'poster') !== false);
                                    $gridClass = $isReelCategory ? 'reels' : ($isPosterCategory ? 'posters' : '');
                                    ?>

                                    <div class="gallery-grid <?php echo $gridClass; ?>">
                                        <?php foreach ($category['media'] as $item): ?>
                                            <div class="yt-card" data-type="<?php echo $item['media_type']; ?>"
                                                data-src="<?php echo htmlspecialchars($item['file_path']); ?>">

                                                <div class="yt-media-container">
                                                    <?php if ($item['media_type'] === 'video'): ?>
                                                        <!-- POSTER THUMBNAIL (Low Data) -->
                                                        <img src="<?php echo !empty($item['thumbnail']) ? htmlspecialchars($item['thumbnail']) : 'img/video-placeholder.jpg'; ?>"
                                                            class="yt-thumb" loading="lazy" alt="Thumbnail">

                                                        <!-- ON-DEMAND PREVIEW PLAYER (Metadata only initially) -->
                                                        <video class="yt-preview-video"
                                                            data-video-src="<?php echo htmlspecialchars($item['file_path']); ?>" preload="none"
                                                            muted playsinline loop></video>

                                                        <div class="yt-duration">REEL</div>
                                                        <div class="yt-play-hint"><i class="fas fa-play"></i></div>
                                                        <div class="yt-progress-container">
                                                            <div class="yt-progress-bar"></div>
                                                        </div>
                                                    <?php else: ?>
                                                        <img src="<?php echo htmlspecialchars($item['file_path']); ?>" class="yt-thumb"
                                                            loading="lazy" alt="Poster">
                                                    <?php endif; ?>
                                                </div>

                                                <div class="yt-info">
                                                    <div class="yt-title"><?php echo htmlspecialchars($item['title'] ?? $client['name']); ?>
                                                    </div>
                                                    <div class="yt-meta">
                                                        <span><?php echo htmlspecialchars($client['name']); ?></span>
                                                        <span>•</span>
                                                        <span><?php echo htmlspecialchars($category['name']); ?></span>
                                                    </div>
                                                </div>
                                            </div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </section>

    <div id="network-status">Low data mode: Previews disabled.</div>

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
                        traditional marketing.
                    </p>
                    <a href="https://wa.me/918105575795?text=Hello%20PODMARK,%20I'd%20like%20to%20discuss%20a%20project."
                        class="btn btn-primary" style="margin-top: 30px;" target="_blank">
                        Start Your Project
                    </a>
                </div>
            </div>
        </div>
    </section>

    <footer id="contact" class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <h2>PODMARK</h2>
                    <p>
                        “We Don’t Just Market, We Create Impact.”
                    </p>
                </div>

                <div>
                    <h4 class="footer-head">Explore</h4>
                    <ul class="footer-links">
                        <li><a href="#work"><i class="fas fa-chevron-right"
                                    style="font-size: 0.7rem; margin-right: 8px;"></i> Selected Work</a></li>
                        <li><a href="#story"><i class="fas fa-chevron-right"
                                    style="font-size: 0.7rem; margin-right: 8px;"></i> Our Story</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="footer-head">Connect</h4>
                    <ul class="footer-links">
                        <li><a href="mailto:sales@podmark.in"><i class="fas fa-envelope"></i> sales@podmark.in</a></li>
                        <li><a href="https://wa.me/918105575795" target="_blank"><i class="fab fa-whatsapp"></i>
                                WhatsApp</a></li>
                        <li><a href="https://www.instagram.com/podmark_udupi/" target="_blank"><i
                                    class="fab fa-instagram"></i> Instagram</a></li>
                        <li><a href="https://www.facebook.com/people/Podmark-Udupi/61577674136463/#" target="_blank"><i
                                    class="fab fa-facebook"></i> Facebook</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>
                    <i class="fas fa-copyright"></i> 2025 PODMARK Digital Agency. All rights reserved.
                </p>
            </div>
        </div>
    </footer>

    <div id="lightbox" class="media-modal">
        <div id="lightbox-content" class="modal-content"></div>
    </div>

    <script>
        // --- YOUTUBE SQUAD: Engineering & Performance ---
        document.addEventListener('DOMContentLoaded', () => {
            const statusEl = document.getElementById('network-status');
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

            // 1. Connection-Aware Behavior
            let hoverEnabled = true;
            if (connection) {
                if (connection.saveData || connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
                    hoverEnabled = false;
                    statusEl.style.display = 'block';
                    statusEl.textContent = 'Low data mode: Video previews restricted.';
                }
            }

            const cards = document.querySelectorAll('.yt-card');
            let hoverTimer;

            cards.forEach(card => {
                const video = card.querySelector('.yt-preview-video');
                const progress = card.querySelector('.yt-progress-bar');
                const thumb = card.querySelector('.yt-thumb');

                if (!video) return;

                // Smart Hover Intent (YouTube standard delay)
                card.addEventListener('mouseenter', () => {
                    if (!hoverEnabled) return;

                    hoverTimer = setTimeout(() => {
                        // On-demand load source
                        if (!video.src) {
                            video.src = video.dataset.videoSrc;
                        }

                        video.play().then(() => {
                            video.classList.ad
                            d('active');
                            if (thumb) thumb.style.opacity = '0';

                            // Progress bar simulation
                            progress.style.transition = 'width ' + (video.duration || 15) + 's linear';
                            progress.style.width = '100%';
                        }).catch(e => console.log("Play blocked", e));
                    }, 500); // 500ms delay to ensure user actually wants to watch
                });

                card.addEventListener('mouseleave', () => {
                    clearTimeout(hoverTimer);
                    if (video.src) {
                        video.pause();
                        video.currentTime = 0;
                        video.classList.remove('active');
                        if (thumb) thumb.style.opacity = '1';

                        progress.style.transition = 'none';
                        progress.style.width = '0%';
                    }
                });

                // Lightbox Logic
                card.addEventListener('click', () => {
                    const src = card.getAttribute('data-src');
                    const type = card.getAttribute('data-type');
                    const lightbox = document.getElementById('lightbox');
                    const content = document.getElementById('lightbox-content');

                    content.innerHTML = (type === 'video')
                        ? `<video src="${src}" controls autoplay style="max-width:100%; max-height:90vh;"></video>`
                        : `<img src="${src}" style="max-width:100%; max-height:90vh;">`;

                    lightbox.classList.add('active');
                });
            });

            // Close Lightbox
            document.getElementById('lightbox').addEventListener('click', function () {
                this.classList.remove('active');
                this.querySelector('.modal-content').innerHTML = '';
            });

            // Mobile Menu
            const menuToggle = document.getElementById('menuToggle');
            const navLinks = document.getElementById('navLinks');
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });

        // GSAP Scroll Animations
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.client-block').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%"
                }
            });
        });
    </script>
</body>

</html>