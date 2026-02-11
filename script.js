document.addEventListener('DOMContentLoaded', () => {

    // ========== MAGICAL ENHANCEMENTS ==========

    // Create scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    // Create cursor glow effect
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    // Track cursor for glow effect
    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    // Smooth cursor glow follow
    function updateCursorGlow() {
        const speed = 0.1;
        glowX += (cursorX - glowX) * speed;
        glowY += (cursorY - glowY) * speed;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(updateCursorGlow);
    }
    updateCursorGlow();

    // Update scroll progress bar
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Create floating blobs in hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.position = 'relative';
        heroSection.style.overflow = 'hidden';

        for (let i = 1; i <= 3; i++) {
            const blob = document.createElement('div');
            blob.className = `magic-blob blob-${i}`;
            heroSection.appendChild(blob);
        }
    }

    // ========== PARALLAX BACKGROUND SYSTEM ==========

    // Create parallax shapes for all major sections
    const parallaxSections = document.querySelectorAll('.hero, .mission, .services, .testimonial, .location-section');

    function createParallaxShapes(section, count = 8) {
        const container = document.createElement('div');
        container.className = 'parallax-shapes';

        const shapes = [
            { class: 'parallax-shape shape-circle', size: [40, 120] },
            { class: 'parallax-shape shape-filled', size: [60, 150] },
            { class: 'parallax-shape shape-ring', size: [50, 100] },
            { class: 'parallax-shape shape-dot', size: [8, 20] },
            { class: 'parallax-orb orb-teal', size: [100, 250] },
            { class: 'parallax-orb orb-gold', size: [80, 200] },
            { class: 'geo-shape geo-square', size: [30, 50] },
            { class: 'geo-shape geo-plus', size: [20, 40] },
        ];

        for (let i = 0; i < count; i++) {
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            const shape = document.createElement('div');
            shape.className = shapeType.class;

            const size = shapeType.size[0] + Math.random() * (shapeType.size[1] - shapeType.size[0]);
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';

            // Store parallax speed for each shape
            shape.dataset.parallaxSpeed = (0.2 + Math.random() * 0.6).toFixed(2);
            shape.dataset.parallaxDirection = Math.random() > 0.5 ? '1' : '-1';

            container.appendChild(shape);
        }

        // Add some sparkles
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = (Math.random() * 3) + 's';
            container.appendChild(sparkle);
        }

        // Add animated gradient background
        const gradientBg = document.createElement('div');
        gradientBg.className = 'gradient-bg-animated';
        container.appendChild(gradientBg);

        section.style.position = 'relative';
        section.insertBefore(container, section.firstChild);

        return container;
    }

    // Create parallax shapes for each section
    const parallaxContainers = [];
    parallaxSections.forEach((section, index) => {
        const shapeCount = index === 0 ? 12 : 6; // More shapes in hero
        parallaxContainers.push({
            section,
            container: createParallaxShapes(section, shapeCount)
        });
    });

    // Parallax scroll animation
    function updateParallaxShapes() {
        const scrolled = window.pageYOffset;

        parallaxContainers.forEach(({ section, container }) => {
            const sectionRect = section.getBoundingClientRect();
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Only animate when section is near viewport
            if (sectionRect.bottom > -200 && sectionRect.top < window.innerHeight + 200) {
                const shapes = container.querySelectorAll('[data-parallax-speed]');

                shapes.forEach(shape => {
                    const speed = parseFloat(shape.dataset.parallaxSpeed);
                    const direction = parseInt(shape.dataset.parallaxDirection);
                    const relativeScroll = scrolled - sectionTop;

                    const yOffset = relativeScroll * speed * direction * 0.5;
                    const xOffset = Math.sin(relativeScroll * 0.003) * 20 * speed;
                    const rotation = relativeScroll * 0.02 * speed;

                    shape.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(${rotation}deg)`;
                });
            }
        });
    }

    // Add parallax lines
    function createParallaxLines() {
        const body = document.body;

        for (let i = 0; i < 6; i++) {
            const line = document.createElement('div');
            line.className = i % 2 === 0 ? 'parallax-line' : 'parallax-line parallax-line-vertical';
            line.style.position = 'fixed';
            line.style.left = (Math.random() * 100) + '%';
            line.style.top = (Math.random() * 100) + '%';
            line.style.opacity = '0.3';
            line.style.pointerEvents = 'none';
            line.style.zIndex = '0';
            line.dataset.lineSpeed = (0.1 + Math.random() * 0.3).toFixed(2);
            body.appendChild(line);
        }
    }
    createParallaxLines();

    // Animate parallax lines
    function updateParallaxLines() {
        const scrolled = window.pageYOffset;
        const lines = document.querySelectorAll('.parallax-line');

        lines.forEach((line, index) => {
            const speed = parseFloat(line.dataset.lineSpeed);
            const yOffset = scrolled * speed;
            const xOffset = Math.sin(scrolled * 0.002 + index) * 30;
            line.style.transform = `translate3d(${xOffset}px, ${-yOffset}px, 0)`;
        });
    }

    // Combined scroll handler for all parallax effects
    let parallaxTicking = false;
    window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
            requestAnimationFrame(() => {
                updateParallaxShapes();
                updateParallaxLines();
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    });

    // Initial call
    updateParallaxShapes();
    updateParallaxLines();

    // ========== END PARALLAX BACKGROUND SYSTEM ==========

    // Magnetic button effect
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-directions, .btn-whatsapp');
    magneticButtons.forEach(btn => {
        btn.classList.add('magnetic-btn');

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // Add shimmer effect to cards
    const shimmerCards = document.querySelectorAll('.service-card, .address-card, .testimonial-item');
    shimmerCards.forEach(card => {
        card.classList.add('shimmer-card');
    });

    // Animated counter for statistics
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString() + '+';
            }
        }

        requestAnimationFrame(update);
    }

    // Observe counters and animate when visible
    const counterElements = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.counter);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));

    // Text reveal animation for headings
    const revealHeadings = document.querySelectorAll('h1, h2');
    revealHeadings.forEach(heading => {
        heading.classList.add('reveal-text');
    });

    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                headingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    revealHeadings.forEach(heading => headingObserver.observe(heading));

    // Stagger children animation for grids
    const staggerGrids = document.querySelectorAll('.services-grid, .footer-grid, .direction-buttons');
    staggerGrids.forEach(grid => {
        grid.classList.add('stagger-children');
    });

    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                gridObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    staggerGrids.forEach(grid => gridObserver.observe(grid));

    // Add animated underline to nav links
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.classList.add('animated-underline');
    });

    // Parallax effect for blobs on mouse move
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.magic-blob');
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;

        blobs.forEach((blob, index) => {
            const intensity = 20 + (index * 10);
            const currentTransform = getComputedStyle(blob).transform;
            blob.style.transform = `translate(${xPercent * intensity}px, ${yPercent * intensity}px)`;
        });
    });

    // Add hover lift effect to cards
    const liftCards = document.querySelectorAll('.service-card, .address-card');
    liftCards.forEach(card => {
        card.classList.add('hover-lift');
    });

    // Ripple effect on button click
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    // Add ripple CSS animation dynamically
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Apply ripple effect to all buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });

    // ========== END MAGICAL ENHANCEMENTS ==========

    // 1. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            });
        });
    }

    // 3. Service Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const serviceCategories = document.querySelectorAll('.service-category');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Hide all categories
            serviceCategories.forEach(category => {
                category.classList.remove('active-category');
            });

            // Show the target category
            const targetId = button.getAttribute('data-target');
            const targetCategory = document.getElementById(targetId);
            if (targetCategory) {
                targetCategory.classList.add('active-category');
            }
        });
    });

    // 4. Magical Parallax Effects
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    const floatingBadges = document.querySelectorAll('.badge');
    const heroImage = document.querySelector('.hero-img-container');

    function updateParallax() {
        const scrolled = window.pageYOffset;

        // Parallax background layers
        parallaxBgs.forEach(bg => {
            const speed = parseFloat(bg.dataset.parallaxSpeed) || 0.5;
            const section = bg.parentElement;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Only animate when section is in view
            if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const yPos = (scrolled - sectionTop) * speed;
                bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });

        // Floating badges parallax
        floatingBadges.forEach((badge, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrolled * speed;
            const xPos = Math.sin(scrolled * 0.002 + index) * 5;
            badge.style.transform = `translate3d(${xPos}px, ${-yPos * 0.3}px, 0)`;
        });

        // Hero image is CSS fixed parallax - no JS movement needed
    }

    // Smooth scroll listener with requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 5. Mouse move parallax for hero section
    const heroSectionForMouse = document.querySelector('.hero');

    if (heroSectionForMouse) {
        heroSectionForMouse.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;

            // Floating badges parallax
            floatingBadges.forEach((badge, index) => {
                const intensity = 15 + (index * 5);
                badge.style.transform = `translate(${xPercent * intensity}px, ${yPercent * intensity}px)`;
            });
        });
    }

    // 6. Scroll Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('section, .service-card, .mission-text, .hero-text, .pop-in');
    const staggerElements = document.querySelectorAll('.stagger-in');

    // Add initial reveal class
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // Stagger animation observer
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    staggerElements.forEach(element => {
        staggerObserver.observe(element);
    });

    // 7. Testimonial cards animated entrance
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered slide-in animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    testimonialItems.forEach((item, index) => {
        // Initial state - slide from alternating sides
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        testimonialObserver.observe(item);
    });

    // 8. Service cards hover 3D effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});
