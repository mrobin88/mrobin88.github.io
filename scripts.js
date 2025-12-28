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
    
    // Typing Effect
    const typingText = document.getElementById('typingText');
    if (typingText) {
        const text = "Welcome to Matt's Site";
        let i = 0;
        typingText.textContent = '';
        
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Start blinking after typing
                typingText.classList.add('blink-text');
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Particle System
    const particleCanvas = document.getElementById('particleCanvas');
    if (particleCanvas) {
        const ctx = particleCanvas.getContext('2d');
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 50;
        
        class Particle {
            constructor() {
                this.x = Math.random() * particleCanvas.width;
                this.y = Math.random() * particleCanvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > particleCanvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > particleCanvas.height) this.vy *= -1;
            }
            
            draw() {
                ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Draw connections
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(0, 255, 0, ${0.2 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            drawConnections();
            requestAnimationFrame(animate);
        }
        
        animate();
        
        window.addEventListener('resize', () => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        });
    }
    
    // Cursor Trail Effect
    const cursorTrail = document.getElementById('cursorTrail');
    if (cursorTrail) {
        let trail = [];
        const trailLength = 20;
        
        document.addEventListener('mousemove', (e) => {
            trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            
            if (trail.length > trailLength) {
                trail.shift();
            }
            
            updateTrail();
        });
        
        function updateTrail() {
            cursorTrail.innerHTML = '';
            trail.forEach((point, index) => {
                const dot = document.createElement('div');
                const size = (index / trailLength) * 10 + 2;
                const opacity = index / trailLength;
                dot.style.cssText = `
                    position: fixed;
                    left: ${point.x}px;
                    top: ${point.y}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: #0f0;
                    border-radius: 50%;
                    pointer-events: none;
                    opacity: ${opacity};
                    transform: translate(-50%, -50%);
                    z-index: 9999;
                    transition: all 0.1s;
                `;
                cursorTrail.appendChild(dot);
            });
        }
        
        setInterval(() => {
            trail = trail.filter(point => Date.now() - point.time < 200);
            updateTrail();
        }, 50);
    }
    
    // Web API Info
    function updateAPIInfo() {
        const screenInfo = document.getElementById('screenInfo');
        const browserInfo = document.getElementById('browserInfo');
        const onlineStatus = document.getElementById('onlineStatus');
        const currentTime = document.getElementById('currentTime');
        
        if (screenInfo) {
            screenInfo.textContent = `${window.screen.width}x${window.screen.height}`;
        }
        
        if (browserInfo) {
            const ua = navigator.userAgent;
            let browser = 'Unknown';
            if (ua.includes('Chrome')) browser = 'Chrome';
            else if (ua.includes('Firefox')) browser = 'Firefox';
            else if (ua.includes('Safari')) browser = 'Safari';
            else if (ua.includes('Edge')) browser = 'Edge';
            browserInfo.textContent = browser;
        }
        
        if (onlineStatus) {
            onlineStatus.textContent = navigator.onLine ? 'Yes' : 'No';
            onlineStatus.style.color = navigator.onLine ? '#0f0' : '#f00';
        }
        
        if (currentTime) {
            const updateTime = () => {
                currentTime.textContent = new Date().toLocaleTimeString();
            };
            updateTime();
            setInterval(updateTime, 1000);
        }
    }
    
    updateAPIInfo();
});
