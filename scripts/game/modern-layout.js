/**
 * Modern Layout JavaScript
 * Handles sidebar toggle, mobile navigation, and UI interactions
 */

(function() {
    'use strict';

    // DOM Elements
    let sidebar, burgerMenu, overlay, mainContent;
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeLayout();
        initializeSidebarToggle();
        initializeCardAnimations();
        handleResponsiveChanges();
    });

    /**
     * Initialize layout elements
     */
    function initializeLayout() {
        // Get DOM references
        sidebar = document.querySelector('.game-sidebar');
        burgerMenu = document.querySelector('.burger-menu');
        overlay = document.querySelector('.sidebar-overlay');
        mainContent = document.querySelector('.game-main');

        // Create overlay if it doesn't exist
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
        }
    }

    /**
     * Initialize sidebar toggle functionality
     */
    function initializeSidebarToggle() {
        // Burger menu click handler
        if (burgerMenu) {
            burgerMenu.addEventListener('click', toggleSidebar);
        }

        // Overlay click handler
        if (overlay) {
            overlay.addEventListener('click', closeSidebar);
        }

        // Close sidebar on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSidebar();
            }
        });

        // Handle sidebar link clicks on mobile
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            });
        });
    }

    /**
     * Toggle sidebar visibility
     */
    function toggleSidebar() {
        if (sidebar && overlay) {
            const isActive = sidebar.classList.contains('active');
            
            if (isActive) {
                closeSidebar();
            } else {
                openSidebar();
            }
        }
    }

    /**
     * Open sidebar
     */
    function openSidebar() {
        if (sidebar && overlay) {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate burger icon
            if (burgerMenu) {
                const icon = burgerMenu.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        }
    }

    /**
     * Close sidebar
     */
    function closeSidebar() {
        if (sidebar && overlay) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Animate burger icon
            if (burgerMenu) {
                const icon = burgerMenu.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    }

    /**
     * Initialize card animations
     */
    function initializeCardAnimations() {
        const cards = document.querySelectorAll('.game-card');
        
        // Add intersection observer for fade-in animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            entry.target.style.transition = 'all 0.5s ease';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 100);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            cards.forEach(card => {
                observer.observe(card);
            });
        }

        // Add click ripple effect to cards
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                const ripple = document.createElement('div');
                ripple.className = 'card-ripple';
                
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    /**
     * Handle responsive changes
     */
    function handleResponsiveChanges() {
        let resizeTimer;
        
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                const isMobile = window.innerWidth <= 768;
                
                if (!isMobile) {
                    // Close sidebar on desktop
                    closeSidebar();
                }
                
                // Adjust card grid
                adjustCardGrid();
            }, 250);
        });
        
        // Initial adjustment
        adjustCardGrid();
    }

    /**
     * Adjust card grid based on screen size
     */
    function adjustCardGrid() {
        const cardGrids = document.querySelectorAll('.card-grid');
        const width = window.innerWidth;
        
        cardGrids.forEach(grid => {
            // Remove all grid classes
            grid.classList.remove('card-grid-1', 'card-grid-2', 'card-grid-3');
            
            // Add appropriate class based on screen width
            if (width > 1024) {
                if (grid.dataset.columns === '3') {
                    grid.classList.add('card-grid-3');
                } else {
                    grid.classList.add('card-grid-2');
                }
            } else if (width > 768) {
                grid.classList.add('card-grid-2');
            } else {
                grid.classList.add('card-grid-1');
            }
        });
    }

    /**
     * Update progress bars
     */
    window.updateProgressBar = function(id, value, max) {
        const progressBar = document.querySelector(`#${id} .progress-bar-fill`);
        if (progressBar) {
            const percentage = Math.min((value / max) * 100, 100);
            progressBar.style.width = percentage + '%';
            
            // Update label if exists
            const label = document.querySelector(`#${id} .progress-value`);
            if (label) {
                label.textContent = Math.round(percentage) + '%';
            }
        }
    };

    /**
     * Show notification
     */
    window.showNotification = function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    };

    /**
     * Get notification icon based on type
     */
    function getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || icons['info'];
    }

    /**
     * Initialize tooltips for resource counters
     */
    window.initResourceTooltips = function() {
        const resourceItems = document.querySelectorAll('.resource-item');
        
        resourceItems.forEach(item => {
            item.addEventListener('mouseenter', function(e) {
                const tooltip = document.createElement('div');
                tooltip.className = 'resource-tooltip';
                tooltip.innerHTML = this.dataset.tooltip || '';
                
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.top = (rect.bottom + 5) + 'px';
                tooltip.style.left = rect.left + 'px';
                
                this._tooltip = tooltip;
            });
            
            item.addEventListener('mouseleave', function() {
                if (this._tooltip) {
                    this._tooltip.remove();
                    delete this._tooltip;
                }
            });
        });
    };

    /**
     * Animate counter
     */
    window.animateCounter = function(element, start, end, duration = 1000) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            
            element.textContent = Math.round(current).toLocaleString();
        }, 16);
    };

})();

// CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
.card-ripple {
    position: absolute;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(0, 243, 255, 0.4);
    transform: translate(-50%, -50%);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
}

@keyframes ripple {
    to {
        width: 200px;
        height: 200px;
        opacity: 0;
    }
}

.notification {
    position: fixed;
    top: 90px;
    right: -300px;
    min-width: 250px;
    max-width: 400px;
    padding: 1rem 1.5rem;
    background: linear-gradient(135deg, rgba(26, 35, 50, 0.98), rgba(21, 28, 43, 0.98));
    border: 1px solid rgba(100, 116, 139, 0.3);
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 9999;
    transition: right 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.notification.show {
    right: 20px;
}

.notification i {
    font-size: 1.25rem;
}

.notification-success {
    border-color: rgba(16, 185, 129, 0.5);
}

.notification-success i {
    color: #10b981;
}

.notification-error {
    border-color: rgba(239, 68, 68, 0.5);
}

.notification-error i {
    color: #ef4444;
}

.notification-warning {
    border-color: rgba(234, 179, 8, 0.5);
}

.notification-warning i {
    color: #eab308;
}

.notification-info {
    border-color: rgba(0, 243, 255, 0.5);
}

.notification-info i {
    color: #00f3ff;
}

.resource-tooltip {
    position: absolute;
    padding: 0.5rem 0.75rem;
    background: rgba(10, 14, 26, 0.95);
    border: 1px solid rgba(0, 243, 255, 0.3);
    border-radius: 6px;
    color: #e2e8f0;
    font-size: 0.875rem;
    z-index: 9999;
    pointer-events: none;
    white-space: nowrap;
}

.card-grid-1 {
    grid-template-columns: 1fr !important;
}
`;
document.head.appendChild(style);