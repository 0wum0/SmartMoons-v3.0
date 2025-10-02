/**
 * SmartMoons - Sci-Fi UI Enhancements
 * Modern JavaScript for immersive user experience
 */

(function($) {
    'use strict';

    /**
     * Animated Resource Counter
     * Smoothly animates resource values counting up
     */
    class ResourceCounter {
        constructor(element, targetValue, duration = 1000) {
            this.element = element;
            this.targetValue = targetValue;
            this.duration = duration;
            this.startValue = 0;
            this.startTime = null;
        }

        easeOutQuad(t) {
            return t * (2 - t);
        }

        animate(currentTime) {
            if (!this.startTime) this.startTime = currentTime;
            
            const elapsed = currentTime - this.startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            const easedProgress = this.easeOutQuad(progress);
            
            const currentValue = Math.floor(this.startValue + (this.targetValue - this.startValue) * easedProgress);
            this.element.textContent = this.formatNumber(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame((time) => this.animate(time));
            } else {
                this.element.textContent = this.formatNumber(this.targetValue);
            }
        }

        formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }

        start() {
            const currentValue = parseInt(this.element.textContent.replace(/\./g, '')) || 0;
            this.startValue = currentValue;
            requestAnimationFrame((time) => this.animate(time));
        }
    }

    /**
     * Initialize Resource Counters
     */
    function initResourceCounters() {
        $('.resource-value').each(function() {
            const $this = $(this);
            const targetValue = parseInt($this.data('value')) || parseInt($this.text().replace(/\./g, ''));
            
            if (targetValue && !isNaN(targetValue)) {
                const counter = new ResourceCounter(this, targetValue, 800);
                counter.start();
            }
        });
    }

    /**
     * Burger Menu Toggle
     * Mobile navigation functionality
     */
    function initBurgerMenu() {
        // Create burger menu if it doesn't exist
        if ($('.burger-menu').length === 0) {
            const burgerHTML = `
                <div class="burger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="mobile-nav-overlay"></div>
            `;
            $('body').prepend(burgerHTML);
        }

        // Toggle menu on click
        $('.burger-menu').on('click', function() {
            $(this).toggleClass('active');
            $('#leftmenu').toggleClass('active');
            $('.mobile-nav-overlay').toggleClass('active').toggle();
        });

        // Close menu when overlay is clicked
        $('.mobile-nav-overlay').on('click', function() {
            $('.burger-menu').removeClass('active');
            $('#leftmenu').removeClass('active');
            $(this).removeClass('active').hide();
        });

        // Close menu on window resize if desktop
        $(window).on('resize', function() {
            if ($(window).width() > 768) {
                $('.burger-menu').removeClass('active');
                $('#leftmenu').removeClass('active');
                $('.mobile-nav-overlay').removeClass('active').hide();
            }
        });
    }

    /**
     * Progress Bar Animation
     */
    function animateProgressBars() {
        $('.sci-progress').each(function() {
            const $bar = $(this).find('.sci-progress__bar');
            const targetWidth = $bar.data('progress') || 0;
            
            $bar.css('width', '0%');
            setTimeout(() => {
                $bar.css('width', targetWidth + '%');
            }, 100);
        });
    }

    /**
     * Tooltip Enhancement
     */
    function enhanceTooltips() {
        // Add sci-fi glow effect to tooltips
        $('.tooltip, .tooltip_sticky').each(function() {
            if (!$(this).hasClass('sci-tooltip')) {
                $(this).addClass('sci-tooltip');
            }
        });
    }

    /**
     * Card Hover Effects
     */
    function initCardEffects() {
        $('.sci-card').on('mouseenter', function() {
            $(this).addClass('sci-animate-float');
        }).on('mouseleave', function() {
            $(this).removeClass('sci-animate-float');
        });
    }

    /**
     * Loading Spinner
     */
    function showLoadingSpinner(container) {
        const spinnerHTML = '<div class="sci-spinner"></div>';
        $(container).html(spinnerHTML);
    }

    function hideLoadingSpinner(container) {
        $(container).find('.sci-spinner').remove();
    }

    /**
     * Smooth Scroll to Top
     */
    function initScrollToTop() {
        // Create scroll to top button
        if ($('.scroll-to-top').length === 0) {
            const scrollBtn = `
                <button class="scroll-to-top sci-btn sci-btn--primary" style="
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: none;
                    z-index: 999;
                    padding: 0;
                ">
                    <i class="fas fa-arrow-up"></i>
                </button>
            `;
            $('body').append(scrollBtn);
        }

        // Show/hide scroll to top button
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 300) {
                $('.scroll-to-top').fadeIn();
            } else {
                $('.scroll-to-top').fadeOut();
            }
        });

        // Smooth scroll to top
        $('.scroll-to-top').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
        });
    }

    /**
     * Table Row Highlight
     */
    function initTableHighlight() {
        $('.sci-table tbody tr').on('click', function() {
            $(this).addClass('highlight').siblings().removeClass('highlight');
        });
    }

    /**
     * Number Counter Animation for Statistics
     */
    function animateStatNumbers() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const targetValue = parseInt($this.data('value')) || parseInt($this.text());
            
            if (targetValue && !isNaN(targetValue)) {
                const counter = new ResourceCounter(this, targetValue, 1200);
                counter.start();
            }
        });
    }

    /**
     * Initialize Notification System
     */
    function initNotifications() {
        window.showNotification = function(message, type = 'info', duration = 3000) {
            const notificationHTML = `
                <div class="sci-notification sci-notification--${type}" style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    max-width: 400px;
                    background: var(--color-bg-elevated);
                    border: 1px solid var(--color-accent-cyan);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-md);
                    box-shadow: var(--glow-cyan);
                    z-index: 2000;
                    animation: slideInRight 0.3s ease-out;
                ">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}" 
                           style="font-size: 1.5rem; color: var(--color-accent-${type === 'success' ? 'green' : type === 'error' ? 'red' : 'cyan'});"></i>
                        <span style="flex: 1; color: var(--color-text-primary);">${message}</span>
                        <button class="notification-close" style="
                            background: none;
                            border: none;
                            color: var(--color-text-muted);
                            cursor: pointer;
                            font-size: 1.25rem;
                            padding: 0;
                            margin: 0;
                        ">×</button>
                    </div>
                </div>
            `;
            
            const $notification = $(notificationHTML);
            $('body').append($notification);
            
            $notification.find('.notification-close').on('click', function() {
                $notification.fadeOut(300, function() {
                    $(this).remove();
                });
            });
            
            if (duration > 0) {
                setTimeout(() => {
                    $notification.fadeOut(300, function() {
                        $(this).remove();
                    });
                }, duration);
            }
        };
    }

    /**
     * Add CSS animations dynamically
     */
    function addDynamicStyles() {
        const styles = `
            <style>
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .sci-table tbody tr.highlight {
                    background: rgba(0, 243, 255, 0.1) !important;
                    box-shadow: inset 3px 0 0 var(--color-accent-cyan);
                }
                
                .pulse-effect {
                    animation: pulse-glow 2s infinite;
                }
            </style>
        `;
        $('head').append(styles);
    }

    /**
     * Initialize all UI enhancements
     */
    function init() {
        addDynamicStyles();
        initBurgerMenu();
        enhanceTooltips();
        initCardEffects();
        initScrollToTop();
        initTableHighlight();
        initNotifications();
        animateProgressBars();
        
        // Initialize resource counters on page load
        $(window).on('load', function() {
            initResourceCounters();
            animateStatNumbers();
        });
    }

    // Auto-initialize when DOM is ready
    $(document).ready(function() {
        init();
    });

    // Export functions for external use
    window.SciFiUI = {
        showLoading: showLoadingSpinner,
        hideLoading: hideLoadingSpinner,
        animateProgressBars: animateProgressBars,
        ResourceCounter: ResourceCounter
    };

})(jQuery);
