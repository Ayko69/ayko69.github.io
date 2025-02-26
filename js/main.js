// Main JavaScript file for Fezzan Foundation website

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const mainNav = document.getElementById('mainNav');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');

    // Hero Slider functionality
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    // Initialize slider
    function initializeSlider() {
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Show first slide
        slides[0].classList.add('active');

        // Start auto-sliding
        startSlideShow();
    }

    function startSlideShow() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function goToSlide(n) {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dotsContainer.children[currentSlide].classList.remove('active');

        // Update current slide
        currentSlide = n;

        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dotsContainer.children[currentSlide].classList.add('active');

        // Reset interval
        startSlideShow();
    }

    // Scroll handling
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class based on scroll position
        if (currentScroll > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
        
        // Show/hide navigation based on scroll direction
        if (currentScroll > lastScroll && currentScroll > scrollThreshold && !mobileMenu.classList.contains('show')) {
            mainNav.classList.remove('visible');
        } else {
            mainNav.classList.add('visible');
        }
        
        lastScroll = currentScroll;

        // Update active nav link
        updateActiveNavLink();
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('show');
        
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('show');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navHeight = mainNav.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const currentScroll = window.pageYOffset;

            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                const targetId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${targetId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (mobileMenu.classList.contains('show')) {
                    mobileMenuBtn.click();
                }
                
                // Smooth scroll to target
                const navHeight = mainNav.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Language switching functionality
    function switchLanguage(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update all elements with data-ar and data-en attributes
        document.querySelectorAll('[data-ar][data-en]').forEach(element => {
            const targetText = lang === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
            
            // If element has a lang-text child, update that instead
            const langTextElement = element.querySelector('.lang-text');
            if (langTextElement) {
                langTextElement.textContent = targetText;
            } else {
                element.textContent = targetText;
            }
        });

        // Update language switch buttons
        const switchText = lang === 'ar' ? 'English' : 'العربية';
        document.querySelectorAll('#langSwitch, #langSwitchMobile').forEach(button => {
            button.textContent = switchText;
        });

        // Update button icons direction
        document.querySelectorAll('.btn-primary svg, .btn-outline-dark svg').forEach(icon => {
            icon.style.transform = lang === 'ar' ? 'scaleX(-1)' : 'none';
        });
    }

    // Event listeners for language switching
    document.querySelectorAll('#langSwitch, #langSwitchMobile').forEach(button => {
        button.addEventListener('click', function() {
            const newLang = document.documentElement.lang === 'ar' ? 'en' : 'ar';
            switchLanguage(newLang);
        });
    });

    // Static data for projects
    const projects = [
        {
            title: {
                ar: "مشروع تطوير الزراعة المستدامة",
                en: "Sustainable Agriculture Development Project"
            },
            description: {
                ar: "مشروع يهدف إلى تطوير الممارسات الزراعية المستدامة وتحسين إنتاجية المحاصيل",
                en: "Project aimed at developing sustainable agricultural practices and improving crop productivity"
            },
            image: "WhatsApp Image 2025-02-03 at 22.19.50_68a440d6.jpg"
        },
        {
            title: {
                ar: "برنامج الأمن الغذائي",
                en: "Food Security Program"
            },
            description: {
                ar: "برنامج شامل لتعزيز الأمن الغذائي وضمان توفر الغذاء للمجتمعات المحلية",
                en: "Comprehensive program to enhance food security and ensure food availability for local communities"
            },
            image: "WhatsApp Image 2025-02-14 at 16.06.51_954cb8cc.jpg"
        },
        {
            title: {
                ar: "مبادرة التدريب الزراعي",
                en: "Agricultural Training Initiative"
            },
            description: {
                ar: "برنامج تدريبي لتطوير مهارات المزارعين وتعزيز قدراتهم في الزراعة الحديثة",
                en: "Training program to develop farmers' skills and enhance their capabilities in modern agriculture"
            },
            image: "WhatsApp Image 2025-02-14 at 16.06.58_e5cdf83c.jpg"
        }
    ];

    // Static data for news
    const news = [
        {
            title: {
                ar: "افتتاح مركز تدريب جديد",
                en: "Opening of New Training Center"
            },
            date: {
                ar: "15 فبراير 2025",
                en: "February 15, 2025"
            },
            description: {
                ar: "افتتاح مركز تدريب جديد لتطوير مهارات المزارعين في التقنيات الزراعية الحديثة",
                en: "Opening of a new training center to develop farmers' skills in modern agricultural techniques"
            },
            image: "WhatsApp Image 2025-02-03 at 22.20.08_e07e62c5.jpg"
        },
        {
            title: {
                ar: "إطلاق مشروع الري الحديث",
                en: "Launch of Modern Irrigation Project"
            },
            date: {
                ar: "10 فبراير 2025",
                en: "February 10, 2025"
            },
            description: {
                ar: "إطلاق مشروع جديد للري الحديث يهدف إلى ترشيد استهلاك المياه وزيادة الإنتاجية",
                en: "Launch of a new modern irrigation project aimed at rationalizing water consumption and increasing productivity"
            },
            image: "WhatsApp Image 2025-02-14 at 16.07.12_e756d7f1.jpg"
        }
    ];

    // Function to render projects
    function renderProjects() {
        const projectsContainer = document.querySelector('#projects .grid');
        if (!projectsContainer) return;

        projectsContainer.innerHTML = projects.map(project => `
            <div class="project-card group">
                <div class="relative overflow-hidden rounded-xl">
                    <img src="${project.image}" alt="${project.title.ar}" class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110">
                    <div class="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-0"></div>
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-bold mb-3">${project.title.ar}</h3>
                    <p class="text-gray-600">${project.description.ar}</p>
                </div>
            </div>
        `).join('');
    }

    // Function to render news
    function renderNews() {
        const newsContainer = document.querySelector('#news .grid');
        if (!newsContainer) return;

        newsContainer.innerHTML = news.map(item => `
            <div class="news-card group">
                <div class="relative overflow-hidden rounded-xl">
                    <img src="${item.image}" alt="${item.title.ar}" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110">
                    <div class="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-0"></div>
                </div>
                <div class="p-6">
                    <div class="text-green-600 mb-2">${item.date.ar}</div>
                    <h3 class="text-xl font-bold mb-3">${item.title.ar}</h3>
                    <p class="text-gray-600">${item.description.ar}</p>
                </div>
            </div>
        `).join('');
    }

    // Initialize projects and news
    renderProjects();
    renderNews();

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const successMessage = document.documentElement.lang === 'ar' ? 'تم إرسال رسالتك بنجاح' : 'Your message has been sent successfully';
            alert(successMessage);
            contactForm.reset();
        });
    }

    // Initialize slider
    initializeSlider();
});
