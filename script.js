// Main JavaScript for Savia Tunik Landing Page

// Smooth scrolling function
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll to order form
function scrollToOrder() {
    smoothScrollTo('#order');
}

// Scroll to gallery
function scrollToGallery() {
    smoothScrollTo('#gallery');
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Initialize animations on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Lazy loading for images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Countdown timer for urgency (optional feature)
function initCountdownTimer() {
    const countdownElement = document.getElementById('countdown-timer');
    if (!countdownElement) return;

    const countDownDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (countdownElement) {
            countdownElement.innerHTML = `${hours}j ${minutes}m ${seconds}d`;
        
        if (distance < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = "PROMO BERAKHIR!";
        }
    }, 1000);
}

// Exit intent popup
function initExitIntent() {
    let mouseY = 0;
    
    document.addEventListener('mouseout', (e) => {
        if (e.clientY < 0) {
            showExitPopup();
        }
    });
}

function showExitPopup() {
    // Create exit intent popup
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center';
    popup.innerHTML = `
        <div class="bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
            <i data-feather="alert-triangle" class="w-12 h-12 text-coral mx-auto mb-4"></i>
            <h3 class="font-display text-2xl font-bold text-deep-blue mb-4">
                Tunggu Dulu! 🎁
            </h3>
            <p class="text-deep-blue/80 mb-6">
                Dapatkan diskon spesial 10% tambahan dengan menggunakan kode: <strong class="text-coral">SAVIA10</strong>
            </p>
            <button onclick="this.closest('.fixed').remove()" class="bg-coral text-white px-6
