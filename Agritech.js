// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 2000);

    // Mobile navbar toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Active navbar highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.1s';
                entry.target.classList.add('animate-slide-up', 'animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-slide-up, .animate-fade-in, .feature-card, .equipment-card, .crop-card').forEach(el => {
        observer.observe(el);
    });

    // Reels functionality
    const reelCards = document.querySelectorAll('.reel-card');
    let currentReel = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' && currentReel > 0) {
            switchReel(currentReel - 1);
        } else if (e.key === 'ArrowDown' && currentReel < reelCards.length - 1) {
            switchReel(currentReel + 1);
        }
    });

    // Auto switch reels every 5 seconds
    setInterval(() => {
        currentReel = (currentReel + 1) % reelCards.length;
        switchReel(currentReel);
    }, 5000);

    function switchReel(index) {
        reelCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        currentReel = index;
    }

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
    });

    // Button click effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Booking Modal Functions
function showBookingModal(equipment, owner, location, price) {
    const modal = document.getElementById('bookingModal');
    const details = document.getElementById('bookingDetails');
    
    details.innerHTML = `
        <h3>${equipment}</h3>
        <p><strong>Owner:</strong> ${owner}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p>Are you sure you want to book this equipment?</p>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.getElementById('contactModal').style.display = 'none';
}

function confirmBooking() {
    alert('🎉 Booking confirmed! You will receive a call from the owner shortly.');
    closeModal();
}

// Contact Seller Function
function contactSeller(sellerName) {
    document.getElementById('sellerName').textContent = `Contact ${sellerName}`;
    document.getElementById('contactModal').style.display = 'block';
}

// Like button toggle
function toggleLike(button) {
    const icon = button.querySelector('i');
    button.classList.toggle('liked');
    if (button.classList.contains('liked')) {
        icon.className = 'fas fa-heart';
    } else {
        icon.className = 'far fa-heart';
    }
}

// Chat functionality
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('chatMessages');
        const newMessage = document.createElement('div');
        newMessage.className = 'message sent';
        newMessage.innerHTML = `
            <p>${message}</p>
            <span>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        `;
        chatMessages.appendChild(newMessage);
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Auto reply after 2 seconds
        setTimeout(() => {
            const reply = document.createElement('div');
            reply.className = 'message received';
            reply.innerHTML = `
                <p>Thank you for your message! I'll check availability and get back to you.</p>
                <span>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            `;
            chatMessages.appendChild(reply);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 2000);
    }
}

// Enter key to send message
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}