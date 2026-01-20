<?php
include 'db.php';
$portfolio_data = $db->getFullPortfolio();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Podmark | Agency Portfolio</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
</head>
<body>

    <!-- HERO SECTION -->
    <header class="hero">
        <h1 class="title-hero">AGENCY<br>PODMARK</h1>
        <div class="cta-group">
            <a href="#work" class="btn btn-gold">View Selected Work</a>
        </div>
        <p style="margin-top: 30px; letter-spacing: 0.3em; color: var(--text-muted); text-transform: uppercase; font-size: 0.8rem;">
            Strategize • Create • Dominate
        </p>
    </header>

    <!-- WORK SECTION (Strict Hierarchy: Client > Category > Grid) -->
    <main id="work" class="section container">
        
        <?php if(empty($portfolio_data)): ?>
            <!-- Fallback Empty State -->
            <div style="text-align: center; padding: 100px;">
                <h2 class="serif" style="font-size: 2rem; color: var(--text-muted);">Portfolio Initializing...</h2>
                <p>Please access the <a href="admin.php" style="color: var(--accent-gold);">Admin Panel</a> to upload content.</p>
            </div>
        <?php else: ?>

            <?php foreach($portfolio_data as $client): ?>
                <section class="client-block">
                    <!-- CLIENT INTRO -->
                    <div class="client-intro">
                        <h2 class="title-client"><?php echo htmlspecialchars($client['name']); ?></h2>
                        <p class="client-desc"><?php echo htmlspecialchars($client['description']); ?></p>
                    </div>

                    <!-- CATEGORIES LOOP -->
                    <?php foreach($client['categories'] as $category): ?>
                        
                        <?php if(!empty($category['media'])): ?>
                            <div class="category-block">
                                <h3 class="title-category"><?php echo htmlspecialchars($category['name']); ?></h3>
                                
                                <!-- MEDIA GRID -->
                                <div class="gallery-grid <?php echo (stripos($category['name'], 'reel') !== false) ? 'reels' : ''; ?>">
                                    <?php foreach($category['media'] as $item): ?>
                                        <div class="gallery-card" data-type="<?php echo $item['media_type']; ?>" data-src="<?php echo htmlspecialchars($item['file_path']); ?>">
                                            <div class="gallery-media-wrapper">
                                                <?php if($item['media_type'] === 'video'): ?>
                                                    <video src="<?php echo htmlspecialchars($item['file_path']); ?>" 
                                                           loop muted playsinline 
                                                           onmouseover="this.play()" 
                                                           onmouseout="this.pause()"></video>
                                                <?php else: ?>
                                                    <img src="<?php echo htmlspecialchars($item['file_path']); ?>" loading="lazy" alt="Project">
                                                <?php endif; ?>
                                            </div>
                                            
                                            <!-- Overlay -->
                                            <div class="card-overlay">
                                                <div class="project-title"><?php echo (!empty($item['title']) ? htmlspecialchars($item['title']) : 'Untitled Project'); ?></div>
                                                <div class="project-meta"><?php echo htmlspecialchars($category['name']); ?></div>
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

    </main>

    <!-- ABOUT SECTION (Enhanced) -->
    <section id="about" class="section-alt">
        <div class="container">
            <div class="about-grid">
                <div>
                    <h2 class="serif" style="font-size: 3rem; line-height: 1;">Digital<br><span style="color: var(--accent-gold);">Architecture</span></h2>
                    <div style="width: 50px; height: 2px; background: white; margin: 30px 0;"></div>
                    <p class="about-lead">
                        Founded in March 2025, PODMARK is a creative-driven digital powerhouse built on <span style="color: var(--accent-gold);">trust</span> and teamwork.
                    </p>
                </div>
                <div>
                   <p class="about-text">
                       We partner with elite brands to architect growth through high-impact strategy and cinematic storytelling. We don't work for you, we work <strong>with you</strong>, as part of your brand.
                   </p>
                   <p class="about-text">
                       At PODMARK, we go beyond traditional marketing. We partner with you to grow your brand through <span style="color: white;">creativity, strategy, and trust</span>.
                   </p>
                   <a href="#contact" class="btn btn-outline" style="margin-top: 30px; display: inline-block;">Start Project</a>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER (Professional) -->
    <footer id="contact" class="footer">
        <div class="container">
            <div class="footer-grid">
                <!-- Brand -->
                <div style="text-align: left;">
                    <h2 class="serif" style="font-size: 2rem; margin-bottom: 20px;">.PODMARK.</h2>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        A digital agency crafting huge impacts for brands that dare to be different.
                    </p>
                </div>
                
                <!-- Links -->
                <div style="text-align: left;">
                    <h4 class="footer-head">Explore</h4>
                    <ul class="footer-links">
                        <li><a href="#work">Selected Work</a></li>
                        <li><a href="#about">Agency Ethos</a></li>
                        <li><a href="admin.php">Admin Portal</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div style="text-align: left;">
                    <h4 class="footer-head">Connect</h4>
                    <ul class="footer-links">
                        <li><a href="mailto:hello@podmark.agency">hello@podmark.agency</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2025 PODMARK Digital Agency. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- LIGHTBOX MODAL -->
    <div id="lightbox" class="media-modal">
        <div id="lightbox-content" class="modal-content"></div>
    </div>

    <script>
        // --- Lightbox Logic ---
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
                    video.style.maxWidth = '100%';
                    video.style.maxHeight = '90vh';
                    contentBox.appendChild(video);
                } else {
                    const img = document.createElement('img');
                    img.src = src;
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '90vh';
                    contentBox.appendChild(img);
                }
                lightbox.classList.add('active');
            });
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                contentBox.innerHTML = ''; 
            }
        });

        // --- GSAP ---
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.client-block').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%"
                }
            });
        });
    </script>
</body>
</html>