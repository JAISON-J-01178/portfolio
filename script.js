document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. THEME TOGGLER (DARK / LIGHT MODE)
       ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fa-solid fa-moon';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });

    /* ==========================================
       2. MOBILE HAMBURGER NAVIGATION
       ========================================== */
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navLinksWrapper = document.querySelector('.nav-links-wrapper');
    const menuIcon = mobileNavToggle.querySelector('i');
    
    mobileNavToggle.addEventListener('click', () => {
        navLinksWrapper.classList.toggle('active');
        if (navLinksWrapper.classList.contains('active')) {
            menuIcon.className = 'fa-solid fa-xmark';
        } else {
            menuIcon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinksWrapper.classList.remove('active');
            menuIcon.className = 'fa-solid fa-bars';
        });
    });

    /* ==========================================
       3. HERO TYPING ANIMATION EFFECT
       ========================================== */
    const typedTextSpan = document.getElementById('typed-text');
    const rolesArray = [
        "Frontend Developer.",
        "UI/UX Designer.",
        "IT Engineering Student.",
        "Mobile App Innovator."
    ];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newRoleDelay = 2000;
    let roleIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < rolesArray[roleIndex].length) {
            typedTextSpan.textContent += rolesArray[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newRoleDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = rolesArray[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            roleIndex = (roleIndex + 1) % rolesArray.length;
            setTimeout(type, typingSpeed + 50);
        }
    }

    // Initialize typing animation
    if (typedTextSpan) {
        setTimeout(type, 1000);
    }

    /* ==========================================
       4. SCROLL SPY ACTIVE NAV LINK
       ========================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight a bit before center viewport
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================
       5. PORTFOLIO FILTERING
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    // Trigger entry transition
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transition = 'opacity 0.4s ease';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ==========================================
       6. INTERACTIVE RESUME TABS
       ========================================== */
    const tabButtons = document.querySelectorAll('.resume-tab-btn');
    const tabPanels = document.querySelectorAll('.resume-tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Deactivate all buttons
            tabButtons.forEach(button => button.classList.remove('active'));
            // Activate clicked
            btn.classList.add('active');

            // Toggle panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('id') === `panel-${tabId}`) {
                    panel.classList.add('active');
                }
            });
        });
    });

    /* ==========================================
       7. FIGMA PROTOTYPE EMBED MODAL
       ========================================== */
    const figmaModal = document.getElementById('figma-modal');
    const figmaIframe = document.getElementById('figma-iframe');
    const figmaExternalLink = document.getElementById('figma-external-link');
    const closeFigmaBtn = document.getElementById('btn-close-figma');
    const figmaSpinner = document.querySelector('.figma-spinner');
    
    // Open modal on click
    document.querySelectorAll('.view-figma-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const embedUrl = btn.getAttribute('data-figma');
            const cardTitle = btn.closest('.project-card').querySelector('h3').textContent;
            
            // Get original figma URL for external link
            const parentLink = btn.nextElementSibling ? btn.nextElementSibling.getAttribute('href') : '#';
            
            document.getElementById('figma-modal-title').textContent = `${cardTitle} - Prototype`;
            
            figmaSpinner.style.display = 'flex';
            figmaIframe.style.display = 'none';
            figmaIframe.src = embedUrl;
            figmaExternalLink.href = parentLink;
            
            figmaModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        });
    });

    // Hide spinner once loaded
    figmaIframe.addEventListener('load', () => {
        figmaSpinner.style.display = 'none';
        figmaIframe.style.display = 'block';
    });

    // Close modal function
    function closeModal() {
        figmaModal.classList.remove('active');
        figmaIframe.src = '';
        document.body.style.overflow = 'auto'; // Unlock scroll
    }

    closeFigmaBtn.addEventListener('click', closeModal);
    figmaModal.querySelector('.figma-modal-overlay').addEventListener('click', closeModal);
    
    // Close on Escape key press
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && figmaModal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ==========================================
       8. CONTACT FORM SUBMISSION (WEB3FORMS + FALLBACK)
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    const formAlert = document.getElementById('form-alert');
    const submitBtn = document.getElementById('btn-submit-form');
    
    // Replace with your Web3Forms Access Key:
    // Generate one at https://web3forms.com/
    const WEB3FORMS_ACCESS_KEY = "d9d0270c-d349-4cf9-8d5e-e6e04eba2177";
    const accessKeyInput = document.getElementById('web3forms-key');

    // Inject active key if available
    if (accessKeyInput && WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== "YOUR_ACCESS_KEY_HERE") {
        accessKeyInput.value = WEB3FORMS_ACCESS_KEY;
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const key = accessKeyInput.value.trim();
        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const subject = document.getElementById('form-subject').value;
        const message = document.getElementById('form-message').value;

        // Smart Fallback: If no token is configured, construct a mailto link so the email still fires direct from client
        if (key === "YOUR_ACCESS_KEY_HERE" || key === "") {
            formAlert.className = 'form-message-alert error';
            formAlert.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Mail service token not configured. Directing request to your email client...';
            
            setTimeout(() => {
                const mailtoLink = `mailto:jaisonkumar.001@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
                window.location.href = mailtoLink;
                formAlert.className = 'form-message-alert success';
                formAlert.innerHTML = '<i class="fa-solid fa-check"></i> Email client triggered. Feel free to send your message!';
            }, 1500);
            return;
        }

        // Web3Forms API Fetch Call
        formAlert.className = 'form-message-alert loading';
        formAlert.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Dispatching message to Jaison...';
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let res = await response.json();
            if (response.status == 200) {
                formAlert.className = 'form-message-alert success';
                formAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent successfully! Jaison will contact you soon.';
                contactForm.reset();
            } else {
                console.error(response);
                formAlert.className = 'form-message-alert error';
                formAlert.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Error: ${res.message || 'Service failure.'}`;
            }
        })
        .catch(error => {
            console.error(error);
            formAlert.className = 'form-message-alert error';
            formAlert.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Network error. Please try again or email directly.';
        })
        .then(() => {
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = 'Send Message';
            setTimeout(() => {
                formAlert.style.display = 'none';
            }, 6000);
        });
    });
});
