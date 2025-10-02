/**
 * OGame Interface - JavaScript Controller
 * Vollständige Funktionalität für das neue Dark Sci-Fi Interface
 */

// ========================================
// DOM ELEMENTE
// ========================================
const elements = {
    // Hamburger Buttons
    leftMenuToggle: document.getElementById('leftMenuToggle'),
    rightMenuToggle: document.getElementById('rightMenuToggle'),
    
    // Sidebars
    leftSidebar: document.getElementById('leftSidebar'),
    rightSidebar: document.getElementById('rightSidebar'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    
    // Close Buttons
    closeLeftSidebar: document.getElementById('closeLeftSidebar'),
    closeRightSidebar: document.getElementById('closeRightSidebar'),
    
    // Content
    mainContent: document.getElementById('mainContent'),
    overviewPage: document.getElementById('overviewPage'),
    buildingsPage: document.getElementById('buildingsPage')
};

// ========================================
// SIDEBAR MANAGEMENT
// ========================================
class SidebarManager {
    constructor() {
        this.activeMenu = null;
        this.init();
    }
    
    init() {
        // Left Menu Toggle
        elements.leftMenuToggle?.addEventListener('click', () => {
            this.toggleSidebar('left');
        });
        
        // Right Menu Toggle
        elements.rightMenuToggle?.addEventListener('click', () => {
            this.toggleSidebar('right');
        });
        
        // Close Buttons
        elements.closeLeftSidebar?.addEventListener('click', () => {
            this.closeSidebar('left');
        });
        
        elements.closeRightSidebar?.addEventListener('click', () => {
            this.closeSidebar('right');
        });
        
        // Overlay Click
        elements.sidebarOverlay?.addEventListener('click', () => {
            this.closeAllSidebars();
        });
        
        // ESC Key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllSidebars();
            }
        });
    }
    
    toggleSidebar(side) {
        const sidebar = side === 'left' ? elements.leftSidebar : elements.rightSidebar;
        const button = side === 'left' ? elements.leftMenuToggle : elements.rightMenuToggle;
        
        if (sidebar.classList.contains('active')) {
            this.closeSidebar(side);
        } else {
            this.openSidebar(side);
        }
    }
    
    openSidebar(side) {
        // Close other sidebar if open
        this.closeAllSidebars();
        
        const sidebar = side === 'left' ? elements.leftSidebar : elements.rightSidebar;
        const button = side === 'left' ? elements.leftMenuToggle : elements.rightMenuToggle;
        
        sidebar.classList.add('active');
        button.classList.add('active');
        elements.sidebarOverlay.classList.add('active');
        this.activeMenu = side;
        
        // Prevent body scroll when sidebar is open
        document.body.style.overflow = 'hidden';
    }
    
    closeSidebar(side) {
        const sidebar = side === 'left' ? elements.leftSidebar : elements.rightSidebar;
        const button = side === 'left' ? elements.leftMenuToggle : elements.rightMenuToggle;
        
        sidebar.classList.remove('active');
        button.classList.remove('active');
        
        if (this.activeMenu === side) {
            elements.sidebarOverlay.classList.remove('active');
            this.activeMenu = null;
            document.body.style.overflow = '';
        }
    }
    
    closeAllSidebars() {
        this.closeSidebar('left');
        this.closeSidebar('right');
        elements.sidebarOverlay.classList.remove('active');
        this.activeMenu = null;
        document.body.style.overflow = '';
    }
}

// ========================================
// RESOURCE MANAGER
// ========================================
class ResourceManager {
    constructor() {
        this.resources = {
            metal: 125340,
            crystal: 82567,
            deuterium: 45234,
            energy: { current: 2450, max: 3200 },
            darkMatter: 1250
        };
        
        this.production = {
            metal: 2456,
            crystal: 1234,
            deuterium: 567
        };
        
        this.init();
    }
    
    init() {
        // Start resource update interval
        this.startProduction();
        
        // Update display immediately
        this.updateDisplay();
    }
    
    startProduction() {
        // Update resources every second
        setInterval(() => {
            this.resources.metal += this.production.metal / 3600;
            this.resources.crystal += this.production.crystal / 3600;
            this.resources.deuterium += this.production.deuterium / 3600;
            
            this.updateDisplay();
        }, 1000);
    }
    
    updateDisplay() {
        const metalAmount = document.getElementById('metalAmount');
        const crystalAmount = document.getElementById('crystalAmount');
        const deuteriumAmount = document.getElementById('deuteriumAmount');
        const energyAmount = document.getElementById('energyAmount');
        const dmAmount = document.getElementById('dmAmount');
        
        if (metalAmount) metalAmount.textContent = this.formatNumber(Math.floor(this.resources.metal));
        if (crystalAmount) crystalAmount.textContent = this.formatNumber(Math.floor(this.resources.crystal));
        if (deuteriumAmount) deuteriumAmount.textContent = this.formatNumber(Math.floor(this.resources.deuterium));
        if (energyAmount) energyAmount.textContent = `${this.formatNumber(this.resources.energy.current)}/${this.formatNumber(this.resources.energy.max)}`;
        if (dmAmount) dmAmount.textContent = this.formatNumber(this.resources.darkMatter);
    }
    
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
}

// ========================================
// COUNTDOWN MANAGER
// ========================================
class CountdownManager {
    constructor() {
        this.countdowns = new Map();
        this.init();
    }
    
    init() {
        // Find all countdown elements
        const countdownElements = document.querySelectorAll('.countdown');
        
        countdownElements.forEach(element => {
            const endTime = element.dataset.end;
            if (endTime) {
                this.addCountdown(element, new Date(endTime));
            }
        });
        
        // Start update interval
        this.startUpdating();
    }
    
    addCountdown(element, endTime) {
        this.countdowns.set(element, endTime);
    }
    
    startUpdating() {
        setInterval(() => {
            this.updateAllCountdowns();
        }, 1000);
    }
    
    updateAllCountdowns() {
        const now = new Date();
        
        this.countdowns.forEach((endTime, element) => {
            const diff = endTime - now;
            
            if (diff > 0) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                element.textContent = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
                
                // Update progress bar if exists
                this.updateProgressBar(element, diff, endTime);
            } else {
                element.textContent = '00:00:00';
                element.classList.add('completed');
                
                // Remove from countdowns
                this.countdowns.delete(element);
                
                // Trigger completion event
                this.onCountdownComplete(element);
            }
        });
    }
    
    updateProgressBar(element, remaining, endTime) {
        const container = element.closest('.queue-item, .fleet-item');
        if (!container) return;
        
        const progressFill = container.querySelector('.progress-fill');
        if (!progressFill) return;
        
        // Calculate total duration (example: 8 hours)
        const totalDuration = 8 * 60 * 60 * 1000;
        const elapsed = totalDuration - remaining;
        const progress = (elapsed / totalDuration) * 100;
        
        progressFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
    
    pad(num) {
        return num.toString().padStart(2, '0');
    }
    
    onCountdownComplete(element) {
        const container = element.closest('.queue-item, .fleet-item');
        if (container) {
            container.classList.add('completed');
            
            // Show notification
            this.showNotification('Auftrag abgeschlossen!', 'success');
            
            // Remove after animation
            setTimeout(() => {
                container.style.opacity = '0';
                setTimeout(() => {
                    container.remove();
                }, 300);
            }, 1000);
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }
    
    removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// ========================================
// PAGE NAVIGATION
// ========================================
class PageNavigator {
    constructor() {
        this.currentPage = 'overview';
        this.init();
    }
    
    init() {
        // Handle navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = new URL(link.href);
                const page = url.searchParams.get('page');
                
                if (page) {
                    this.navigateToPage(page);
                    
                    // Update active state
                    document.querySelectorAll('.nav-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    link.closest('.nav-item').classList.add('active');
                    
                    // Close sidebar on mobile
                    if (window.innerWidth <= 768) {
                        sidebarManager.closeAllSidebars();
                    }
                }
            });
        });
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || 'overview';
            this.showPage(page);
        });
        
        // Set initial state
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page') || 'overview';
        this.showPage(page);
    }
    
    navigateToPage(page) {
        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('page', page);
        window.history.pushState({ page }, '', url);
        
        // Show page
        this.showPage(page);
    }
    
    showPage(page) {
        // Hide all pages
        document.querySelectorAll('.page-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        // Show requested page
        const pageElement = document.getElementById(`${page}Page`);
        if (pageElement) {
            pageElement.classList.remove('hidden');
            this.currentPage = page;
            
            // Page-specific initialization
            this.initPageContent(page);
        } else {
            // Fallback to overview if page not found
            elements.overviewPage?.classList.remove('hidden');
        }
    }
    
    initPageContent(page) {
        switch(page) {
            case 'buildings':
                this.initBuildingsPage();
                break;
            case 'overview':
                this.initOverviewPage();
                break;
            // Add more page initializations as needed
        }
    }
    
    initBuildingsPage() {
        // Add click handlers for building cards
        document.querySelectorAll('.building-card .btn-primary').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.building-card');
                const buildingName = card.querySelector('.building-name').textContent;
                
                // Add to queue
                this.addToBuildQueue(buildingName);
                
                // Disable button temporarily
                button.disabled = true;
                button.textContent = 'In Warteschlange';
                
                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = 'Ausbauen';
                }, 3000);
            });
        });
    }
    
    initOverviewPage() {
        // Initialize planet selector
        document.querySelectorAll('.planet-nav').forEach(button => {
            button.addEventListener('click', (e) => {
                const isPrev = button.classList.contains('prev');
                // Implement planet switching logic
                console.log(isPrev ? 'Previous planet' : 'Next planet');
            });
        });
    }
    
    addToBuildQueue(buildingName) {
        const queueContainer = document.querySelector('.build-queue .card-body');
        const emptySlot = queueContainer?.querySelector('.queue-empty');
        
        if (emptySlot) {
            // Create new queue item
            const queueItem = document.createElement('div');
            queueItem.className = 'queue-item';
            queueItem.innerHTML = `
                <div class="queue-icon">
                    <img src="stiles/building.png" alt="${buildingName}">
                </div>
                <div class="queue-info">
                    <h3>${buildingName}</h3>
                    <p>Wird vorbereitet...</p>
                </div>
                <div class="queue-timer">
                    <span class="time-estimate">Berechne...</span>
                </div>
            `;
            
            // Insert before empty slot
            emptySlot.parentNode.insertBefore(queueItem, emptySlot);
            
            // Animate
            setTimeout(() => {
                queueItem.style.opacity = '1';
            }, 10);
        }
    }
}

// ========================================
// ANIMATION EFFECTS
// ========================================
class AnimationEffects {
    constructor() {
        this.init();
    }
    
    init() {
        // Add hover effects to cards
        this.initCardEffects();
        
        // Add particle effects
        this.initParticleEffects();
        
        // Add glow effects
        this.initGlowEffects();
    }
    
    initCardEffects() {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRipple(e, card);
            });
        });
    }
    
    createRipple(e, element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
    
    initParticleEffects() {
        // Add floating particles to active queue items
        document.querySelectorAll('.queue-item.active').forEach(item => {
            this.addFloatingParticles(item);
        });
    }
    
    addFloatingParticles(element) {
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.animationDelay = `${i * 0.3}s`;
            element.appendChild(particle);
        }
    }
    
    initGlowEffects() {
        // Add pulsing glow to important elements
        document.querySelectorAll('.countdown').forEach(countdown => {
            if (countdown.closest('.active')) {
                countdown.style.textShadow = '0 0 10px currentColor';
            }
        });
    }
}

// ========================================
// RESPONSIVE HANDLER
// ========================================
class ResponsiveHandler {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }
    
    init() {
        // Handle resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Initial setup
        this.handleResize();
    }
    
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        // If changed from mobile to desktop or vice versa
        if (wasMobile !== this.isMobile) {
            // Close all sidebars when switching
            sidebarManager.closeAllSidebars();
            
            // Adjust layout
            this.adjustLayout();
        }
    }
    
    adjustLayout() {
        if (this.isMobile) {
            // Mobile adjustments
            document.body.classList.add('mobile-view');
        } else {
            // Desktop adjustments
            document.body.classList.remove('mobile-view');
        }
    }
}

// ========================================
// INITIALIZATION
// ========================================

// Global instances
let sidebarManager;
let resourceManager;
let countdownManager;
let pageNavigator;
let animationEffects;
let responsiveHandler;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 OGame Interface initialized');
    
    // Initialize all managers
    sidebarManager = new SidebarManager();
    resourceManager = new ResourceManager();
    countdownManager = new CountdownManager();
    pageNavigator = new PageNavigator();
    animationEffects = new AnimationEffects();
    responsiveHandler = new ResponsiveHandler();
    
    // Add loading complete
    document.body.classList.add('loaded');
    
    // Performance optimization: Lazy load images
    lazyLoadImages();
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// ADDITIONAL STYLES FOR NOTIFICATIONS
// ========================================

// Add notification styles dynamically
const notificationStyles = `
    <style>
    .notification {
        position: fixed;
        top: calc(var(--header-height) + 20px);
        right: 20px;
        padding: 15px 20px;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 2000;
        max-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-color: var(--accent-green);
        background: rgba(0, 255, 136, 0.1);
    }
    
    .notification.error {
        border-color: var(--accent-red);
        background: rgba(255, 51, 85, 0.1);
    }
    
    .notification.warning {
        border-color: var(--accent-orange);
        background: rgba(255, 107, 53, 0.1);
    }
    
    .notification-close {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        color: var(--accent-red);
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 212, 255, 0.3);
        transform: scale(0);
        animation: ripple 1s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .floating-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--accent-cyan);
        border-radius: 50%;
        animation: float 3s ease-in-out infinite;
        pointer-events: none;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translateY(-30px) translateX(10px);
        }
    }
    
    body.loaded {
        animation: fadeIn 0.5s ease;
    }
    
    body.mobile-view .sidebar {
        top: 0;
        height: 100vh;
    }
    </style>
`;

// Inject notification styles
document.head.insertAdjacentHTML('beforeend', notificationStyles);

// ========================================
// EXPORT FOR DEBUGGING
// ========================================
window.OGameInterface = {
    sidebarManager,
    resourceManager,
    countdownManager,
    pageNavigator,
    animationEffects,
    responsiveHandler
};