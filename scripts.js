// Email copy function
function Copy() {
    // Copy email to clipboard
    const email = 'ratthewrobin@gmail.com';
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email copied!');
        }).catch(() => {
            // Fallback for older browsers
            fallbackCopy(email);
        });
    } else {
        // Fallback for older browsers
        fallbackCopy(email);
    }
}

// Fallback copy method
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showNotification('Email copied!');
    } catch (err) {
        showNotification('Failed to copy. Email: ' + text);
    }
    document.body.removeChild(textArea);
}

// Show notification
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.classList.add('notification');
    
    document.body.appendChild(notification);
    
    // Remove notification after 2 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Copy Bitcoin address
function copyBTC() {
    const btcAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(btcAddress).then(() => {
            showNotification('Bitcoin address copied!');
        }).catch(() => {
            fallbackCopy(btcAddress);
        });
    } else {
        fallbackCopy(btcAddress);
    }
}

// Add smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add retro click sound effect (optional - can be removed if not needed)
    document.querySelectorAll('.retro-link, .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
    
    // Interactive Canvas
    const canvas = document.getElementById('interactiveCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let hue = 0;
        
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add some pattern
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            for (let i = 0; i < 5; i++) {
                ctx.fillRect(i * 40, i * 20, 20, 20);
            }
        }
        
        canvas.addEventListener('click', function(e) {
            hue = (hue + 30) % 360;
            draw();
        });
        
        // Animate on load
        draw();
        
        // Subtle animation
        setInterval(() => {
            hue = (hue + 0.5) % 360;
            draw();
        }, 100);
    }
});
