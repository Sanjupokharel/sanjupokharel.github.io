document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (mobileMenu) mobileMenu.classList.add('hidden'); // Close menu on click
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    // Check for saved user preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        if (moonIcon) moonIcon.classList.add('hidden');
        if (sunIcon) sunIcon.classList.remove('hidden');
    } else {
        htmlElement.classList.remove('dark');
        if (moonIcon) moonIcon.classList.remove('hidden');
        if (sunIcon) sunIcon.classList.add('hidden');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');

            if (htmlElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
                moonIcon.classList.add('hidden');
                sunIcon.classList.remove('hidden');
            } else {
                localStorage.setItem('theme', 'light');
                moonIcon.classList.remove('hidden');
                sunIcon.classList.add('hidden');
            }
        });
    }

    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active', 'text-primary'));
            tabBtns.forEach(b => b.classList.add('text-gray-500', 'dark:text-gray-400'));

            // Add active class to clicked button
            btn.classList.add('active', 'text-primary');
            btn.classList.remove('text-gray-500', 'dark:text-gray-400');

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Show target tab content
            const targetId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    const modalImage = document.getElementById('modal-image');
    const closeModalBtn = document.getElementById('close-modal');

    // Project Data
    const projectData = {
        'campus-event': {
            title: 'Campus Event Management System',
            category: 'UI/UX Design',
            image: 'https://images.unsplash.com/photo-1555421689-492a6c368819?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            description: `
                <p class="mb-4"><strong>Overview:</strong> Redesigned the University Event Management System to improve accessibility and streamline the workflow for students and staff.</p>
                <p class="mb-4"><strong>Challenge:</strong> The previous system was cluttered and difficult to navigate on mobile devices, leading to low student engagement.</p>
                <p class="mb-4"><strong>Solution:</strong> I conducted user interviews and usability testing to identify pain points. The new design features a clean dashboard, intuitive navigation, and a mobile-first approach.</p>
                <p><strong>Tools Used:</strong> Figma, Usability Testing, Adobe XD.</p>
            `
        },
        'study-buddy': {
            title: 'StudyBuddy App',
            category: 'App Concept',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            description: `
                <p class="mb-4"><strong>Overview:</strong> A mobile application concept designed to help college students track assignments, set study reminders, and collaborate with peers.</p>
                <p class="mb-4"><strong>Key Features:</strong> Smart reminders, assignment tracking, study group finder, and progress analytics.</p>
                <p><strong>Tools Used:</strong> Figma, Prototyping, User Research.</p>
            `
        },
        'dev-portfolio': {
            title: 'Developer Portfolio',
            category: 'Web Development',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            description: `
                <p class="mb-4"><strong>Overview:</strong> A custom-built portfolio website for a software developer client, focusing on performance and minimalism.</p>
                <p class="mb-4"><strong>Tech Stack:</strong> HTML5, CSS3, JavaScript, and a touch of animation libraries.</p>
                <p><strong>Result:</strong> The client received multiple job offers within a month of launching the new site.</p>
            `
        },
        'mobile-banking': {
            title: 'NeoBank Mobile App',
            category: 'FinTech UI',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            description: `
                <p class="mb-4"><strong>Overview:</strong> A modern banking interface designed for the next generation of digital natives.</p>
                <p class="mb-4"><strong>Focus:</strong> Dark mode first design, simplified transaction flows, and gamified savings goals.</p>
                <p><strong>Tools Used:</strong> Figma, Principle, After Effects.</p>
            `
        },
        'brand-identity': {
            title: 'EcoLife Brand Identity',
            category: 'Branding',
            image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            description: `
                <p class="mb-4"><strong>Overview:</strong> Complete brand identity package for a sustainable lifestyle startup.</p>
                <p class="mb-4"><strong>Deliverables:</strong> Logo design, color palette, typography system, and packaging mockups.</p>
                <p><strong>Tools Used:</strong> Illustrator, Photoshop.</p>
            `
        },
        'dashboard-ui': {
            title: 'Analytics Dashboard',
            category: 'SaaS Design',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            description: `
                <p class="mb-4"><strong>Overview:</strong> A comprehensive data visualization dashboard for a marketing SaaS platform.</p>
                <p class="mb-4"><strong>Challenge:</strong> Presenting complex data sets in an easily digestible format for non-technical users.</p>
                <p><strong>Tools Used:</strong> Figma, D3.js (Concept).</p>
            `
        }
    };

    document.querySelectorAll('[data-modal-target]').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-modal-target');
            const data = projectData[projectId];

            if (data) {
                modalTitle.textContent = data.title;
                modalCategory.textContent = data.category;
                modalDescription.innerHTML = data.description;
                modalImage.style.backgroundImage = `url('${data.image}')`;

                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }

    // Close on click outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }

    // Contact Form Submission
    // Replace 'YOUR_SCRIPT_URL_HERE' with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'CONNECTING_FORM';

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            formMessage.classList.remove('hidden');
            formMessage.classList.remove('text-green-600', 'text-red-600');
            formMessage.classList.add('text-gray-600');
            formMessage.textContent = 'Sending your message...';

            try {
                // Check if Google Script URL is configured
                if (GOOGLE_SCRIPT_URL === 'YOUR_SCRIPT_URL_HERE') {
                    throw new Error('Please configure your Google Apps Script URL in main.js');
                }

                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                // Show success message
                formMessage.classList.remove('text-gray-600');
                formMessage.classList.add('text-green-600');
                formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';

                // Reset form
                contactForm.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);

            } catch (error) {
                // Show error message
                formMessage.classList.remove('text-gray-600');
                formMessage.classList.add('text-red-600');
                formMessage.textContent = '✗ ' + error.message;
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }
});
