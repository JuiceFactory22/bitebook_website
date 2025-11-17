/**
 * BiteBook Events Carousel JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('events-container');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    
    if (!container || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const cardWidth = 320; // w-80 equivalent
    const gap = 16; // space between cards
    const cardsPerView = 4;
    const totalCards = container.children.length;
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    
    // Update button states
    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        
        if (currentIndex === 0) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }
        
        if (currentIndex >= maxIndex) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }
    
    // Move carousel
    function moveCarousel(direction) {
        const newIndex = currentIndex + direction;
        
        if (newIndex >= 0 && newIndex <= maxIndex) {
            currentIndex = newIndex;
            const translateX = -currentIndex * (cardWidth + gap);
            container.style.transform = `translateX(${translateX}px)`;
            updateButtons();
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', function() {
        moveCarousel(-1);
    });
    
    nextBtn.addEventListener('click', function() {
        moveCarousel(1);
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let isDragging = false;
    
    container.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    container.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    container.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                moveCarousel(1); // Swipe left - next
            } else {
                moveCarousel(-1); // Swipe right - prev
            }
        }
        
        isDragging = false;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            moveCarousel(-1);
        } else if (e.key === 'ArrowRight') {
            moveCarousel(1);
        }
    });
    
    // Initialize
    updateButtons();
    
    // Auto-play (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(function() {
            if (currentIndex < maxIndex) {
                moveCarousel(1);
            } else {
                currentIndex = 0;
                container.style.transform = 'translateX(0px)';
                updateButtons();
            }
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Pause auto-play on hover
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
    
    // Start auto-play
    startAutoPlay();
});

// Global function for onclick handlers
function moveCarousel(direction) {
    const container = document.getElementById('events-container');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    
    if (!container || !prevBtn || !nextBtn) return;
    
    let currentIndex = parseInt(container.dataset.currentIndex) || 0;
    const cardWidth = 320;
    const gap = 16;
    const cardsPerView = 4;
    const totalCards = container.children.length;
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    
    const newIndex = currentIndex + direction;
    
    if (newIndex >= 0 && newIndex <= maxIndex) {
        currentIndex = newIndex;
        container.dataset.currentIndex = currentIndex;
        const translateX = -currentIndex * (cardWidth + gap);
        container.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        
        if (currentIndex === 0) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }
        
        if (currentIndex >= maxIndex) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }
}
