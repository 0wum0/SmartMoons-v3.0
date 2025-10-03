/**
 * SmartMoons - Weltraum Browsergame Interface
 * JavaScript Controller für Interaktivität
 * Version: 4.0
 */

(function() {
    'use strict';

    // ============================================
    // GAME STATE
    // ============================================
    const GameState = {
        currentPage: 'overview',
        currentPlanet: 0,
        planets: [
            { id: 1, name: 'Heimatwelt', coords: '[1:2:3]' },
            { id: 2, name: 'Kolonie Alpha', coords: '[1:2:8]' },
            { id: 3, name: 'Kolonie Beta', coords: '[2:5:6]' }
        ],
        resources: {
            metal: { current: 1250000, max: 2000000, production: 12500 },
            crystal: { current: 450000, max: 1000000, production: 8200 },
            deuterium: { current: 920000, max: 1000000, production: 5100 },
            energy: { current: 15000, max: 18000 },
            darkmatter: { current: 2500 }
        },
        timers: []
    };

    // ============================================
    // MENU CONTROLLER
    // ============================================
    const MenuController = {
        init: function() {
            this.setupGameMenu();
            this.setupUserMenu();
            this.setupOverlay();
        },

        setupGameMenu: function() {
            const toggle = document.getElementById('gameMenuToggle');
            const menu = document.getElementById('gameMenu');
            const closeBtn = menu.querySelector('.side-menu-close');
            const menuItems = menu.querySelectorAll('.menu-item');

            if (!toggle || !menu) return;

            toggle.addEventListener('click', () => {
                this.toggleMenu(menu);
            });

            closeBtn.addEventListener('click', () => {
                this.closeMenu(menu);
            });

            menuItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    const page = item.dataset.page;
                    if (page) {
                        e.preventDefault();
                        PageController.switchPage(page);
                        this.closeMenu(menu);
                        
                        // Update active state
                        menuItems.forEach(mi => mi.classList.remove('active'));
                        item.classList.add('active');
                    }
                });
            });
        },

        setupUserMenu: function() {
            const toggle = document.getElementById('userMenuToggle');
            const menu = document.getElementById('userMenu');
            const closeBtn = menu.querySelector('.side-menu-close');
            const menuItems = menu.querySelectorAll('.menu-item');

            if (!toggle || !menu) return;

            toggle.addEventListener('click', () => {
                this.toggleMenu(menu);
            });

            closeBtn.addEventListener('click', () => {
                this.closeMenu(menu);
            });

            menuItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    const page = item.dataset.page;
                    if (page) {
                        e.preventDefault();
                        PageController.switchPage(page);
                        this.closeMenu(menu);
                    }
                });
            });
        },

        setupOverlay: function() {
            const overlay = document.getElementById('menuOverlay');
            if (!overlay) return;

            overlay.addEventListener('click', () => {
                this.closeAllMenus();
            });
        },

        toggleMenu: function(menu) {
            const isActive = menu.classList.contains('active');
            
            // Close all menus first
            this.closeAllMenus();
            
            // Toggle the clicked menu
            if (!isActive) {
                menu.classList.add('active');
                document.getElementById('menuOverlay').classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        },

        closeMenu: function(menu) {
            menu.classList.remove('active');
            document.getElementById('menuOverlay').classList.remove('active');
            document.body.style.overflow = '';
        },

        closeAllMenus: function() {
            document.querySelectorAll('.side-menu').forEach(menu => {
                menu.classList.remove('active');
            });
            document.getElementById('menuOverlay').classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // ============================================
    // PAGE CONTROLLER
    // ============================================
    const PageController = {
        init: function() {
            // Set initial page
            this.switchPage('overview');
        },

        switchPage: function(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });

            // Show target page
            const targetPage = document.getElementById(`page-${pageId}`);
            if (targetPage) {
                targetPage.classList.add('active');
                GameState.currentPage = pageId;

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    // ============================================
    // PLANET SELECTOR
    // ============================================
    const PlanetSelector = {
        init: function() {
            const prevBtn = document.getElementById('prevPlanet');
            const nextBtn = document.getElementById('nextPlanet');
            const select = document.getElementById('planetSelect');

            if (!prevBtn || !nextBtn || !select) return;

            prevBtn.addEventListener('click', () => {
                this.previousPlanet();
            });

            nextBtn.addEventListener('click', () => {
                this.nextPlanet();
            });

            select.addEventListener('change', (e) => {
                GameState.currentPlanet = parseInt(e.target.value) - 1;
                this.updatePlanetInfo();
            });
        },

        previousPlanet: function() {
            const select = document.getElementById('planetSelect');
            if (GameState.currentPlanet > 0) {
                GameState.currentPlanet--;
                select.value = GameState.currentPlanet + 1;
                this.updatePlanetInfo();
            }
        },

        nextPlanet: function() {
            const select = document.getElementById('planetSelect');
            if (GameState.currentPlanet < GameState.planets.length - 1) {
                GameState.currentPlanet++;
                select.value = GameState.currentPlanet + 1;
                this.updatePlanetInfo();
            }
        },

        updatePlanetInfo: function() {
            const planet = GameState.planets[GameState.currentPlanet];
            console.log('Switched to planet:', planet.name, planet.coords);
            // Here you would update the planet information display
            NotificationSystem.show('info', `Planet gewechselt zu ${planet.name} ${planet.coords}`);
        }
    };

    // ============================================
    // RESOURCE MANAGER
    // ============================================
    const ResourceManager = {
        init: function() {
            this.startResourceTicker();
        },

        startResourceTicker: function() {
            setInterval(() => {
                this.updateResources();
            }, 1000); // Update every second
        },

        updateResources: function() {
            // Calculate resource increases (production per hour / 3600 seconds)
            const metalIncrease = GameState.resources.metal.production / 3600;
            const crystalIncrease = GameState.resources.crystal.production / 3600;
            const deuteriumIncrease = GameState.resources.deuterium.production / 3600;

            // Update resource values
            GameState.resources.metal.current = Math.min(
                GameState.resources.metal.current + metalIncrease,
                GameState.resources.metal.max
            );
            GameState.resources.crystal.current = Math.min(
                GameState.resources.crystal.current + crystalIncrease,
                GameState.resources.crystal.max
            );
            GameState.resources.deuterium.current = Math.min(
                GameState.resources.deuterium.current + deuteriumIncrease,
                GameState.resources.deuterium.max
            );

            // Update UI
            this.updateResourceDisplay();
        },

        updateResourceDisplay: function() {
            const resources = ['metal', 'crystal', 'deuterium', 'energy', 'darkmatter'];
            
            resources.forEach(resource => {
                // Update desktop display
                const element = document.querySelector(`[data-resource="${resource}"]`);
                if (element && GameState.resources[resource]) {
                    const value = Math.floor(GameState.resources[resource].current);
                    element.textContent = this.formatNumber(value);
                }
                
                // Update mobile display with shortened values
                const mobileElement = document.querySelector(`[data-resource="${resource}-mobile"]`);
                if (mobileElement && GameState.resources[resource]) {
                    const value = Math.floor(GameState.resources[resource].current);
                    mobileElement.textContent = this.formatShortNumber(value);
                }
            });

            // Update progress bars
            this.updateProgressBars();
        },
        
        formatShortNumber: function(num) {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + 'M';
            } else if (num >= 1000) {
                return (num / 1000).toFixed(0) + 'K';
            }
            return num.toString();
        },

        updateProgressBars: function() {
            const metalPercent = (GameState.resources.metal.current / GameState.resources.metal.max) * 100;
            const crystalPercent = (GameState.resources.crystal.current / GameState.resources.crystal.max) * 100;
            const deuteriumPercent = (GameState.resources.deuterium.current / GameState.resources.deuterium.max) * 100;

            const metalBar = document.querySelector('.resource-metal .resource-progress-bar');
            const crystalBar = document.querySelector('.resource-crystal .resource-progress-bar');
            const deuteriumBar = document.querySelector('.resource-deuterium .resource-progress-bar');

            if (metalBar) metalBar.style.width = `${metalPercent}%`;
            if (crystalBar) crystalBar.style.width = `${crystalPercent}%`;
            if (deuteriumBar) deuteriumBar.style.width = `${deuteriumPercent}%`;
        },

        formatNumber: function(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
    };

    // ============================================
    // TIMER SYSTEM
    // ============================================
    const TimerSystem = {
        init: function() {
            this.findAllTimers();
            this.startTimerUpdates();
        },

        findAllTimers: function() {
            const timerElements = document.querySelectorAll('.timer');
            timerElements.forEach(element => {
                const time = parseInt(element.dataset.time);
                if (!isNaN(time)) {
                    GameState.timers.push({
                        element: element,
                        remainingTime: time,
                        originalTime: time
                    });
                }
            });
        },

        startTimerUpdates: function() {
            setInterval(() => {
                this.updateTimers();
            }, 1000);
        },

        updateTimers: function() {
            GameState.timers.forEach(timer => {
                if (timer.remainingTime > 0) {
                    timer.remainingTime--;
                    timer.element.textContent = this.formatTime(timer.remainingTime);

                    // Update progress bar if exists
                    const progressBar = timer.element.parentElement.querySelector('.queue-progress-bar');
                    if (progressBar && timer.originalTime > 0) {
                        const progress = ((timer.originalTime - timer.remainingTime) / timer.originalTime) * 100;
                        progressBar.style.width = `${progress}%`;
                    }
                } else {
                    timer.element.textContent = '00:00:00';
                    // Show completion notification
                    NotificationSystem.show('success', 'Bauauftrag abgeschlossen!');
                }
            });
        },

        formatTime: function(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;

            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
    };

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    const NotificationSystem = {
        container: null,

        init: function() {
            this.container = document.getElementById('notificationContainer');
        },

        show: function(type, message, duration = 5000) {
            if (!this.container) return;

            const notification = this.createNotification(type, message);
            this.container.appendChild(notification);

            // Auto remove after duration
            setTimeout(() => {
                this.remove(notification);
            }, duration);
        },

        createNotification: function(type, message) {
            const notification = document.createElement('div');
            notification.className = `notification notification--${type}`;

            const icons = {
                success: 'fa-check-circle',
                error: 'fa-times-circle',
                warning: 'fa-exclamation-triangle',
                info: 'fa-info-circle'
            };

            const titles = {
                success: 'Erfolg',
                error: 'Fehler',
                warning: 'Warnung',
                info: 'Information'
            };

            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas ${icons[type]}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${titles[type]}</div>
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            `;

            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => {
                this.remove(notification);
            });

            return notification;
        },

        remove: function(notification) {
            notification.style.animation = 'slideOutRight 250ms ease-in-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 250);
        }
    };

    // ============================================
    // BUILDING SYSTEM
    // ============================================
    const BuildingSystem = {
        init: function() {
            this.setupBuildButtons();
        },

        setupBuildButtons: function() {
            const buildButtons = document.querySelectorAll('.building-card .btn--primary:not(:disabled)');
            
            buildButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const card = button.closest('.building-card');
                    const buildingName = card.querySelector('h3').textContent;
                    this.startBuilding(buildingName, button);
                });
            });
        },

        startBuilding: function(buildingName, button) {
            // Simulate building start
            button.innerHTML = '<i class="fas fa-cog fa-spin"></i> Im Bau';
            button.disabled = true;
            
            NotificationSystem.show('success', `${buildingName} wurde in Auftrag gegeben!`);
            
            // In a real game, this would communicate with the server
            console.log('Building started:', buildingName);
        }
    };

    // ============================================
    // RESEARCH SYSTEM
    // ============================================
    const ResearchSystem = {
        init: function() {
            this.setupResearchButtons();
        },

        setupResearchButtons: function() {
            const researchButtons = document.querySelectorAll('.research-card .btn--primary:not(:disabled)');
            
            researchButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const card = button.closest('.research-card');
                    const researchName = card.querySelector('h3').textContent;
                    this.startResearch(researchName, button);
                });
            });
        },

        startResearch: function(researchName, button) {
            // Simulate research start
            button.innerHTML = '<i class="fas fa-cog fa-spin"></i> In Forschung';
            button.disabled = true;
            
            NotificationSystem.show('success', `Forschung "${researchName}" wurde gestartet!`);
            
            // In a real game, this would communicate with the server
            console.log('Research started:', researchName);
        }
    };

    // ============================================
    // FLEET SYSTEM
    // ============================================
    const FleetSystem = {
        init: function() {
            this.setupFleetButtons();
            this.setupFleetForm();
        },

        setupFleetButtons: function() {
            const recallButtons = document.querySelectorAll('.fleet-mission-actions .btn--danger');
            
            recallButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const mission = button.closest('.fleet-mission');
                    const missionType = mission.querySelector('h4').textContent;
                    this.recallFleet(missionType, mission);
                });
            });
        },

        setupFleetForm: function() {
            const form = document.querySelector('.fleet-send-form');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.sendFleet(form);
            });

            // Speed range slider
            const speedRange = form.querySelector('.form-range');
            const speedValue = form.querySelector('.range-value');
            
            if (speedRange && speedValue) {
                speedRange.addEventListener('input', (e) => {
                    speedValue.textContent = `${e.target.value}%`;
                });
            }
        },

        sendFleet: function(form) {
            const coords = form.querySelector('.form-input').value;
            const missionType = form.querySelector('.form-select').value;
            const speed = form.querySelector('.form-range').value;

            NotificationSystem.show('success', `Flotte gesendet nach ${coords}! Mission: ${missionType}, Geschwindigkeit: ${speed}%`);
            
            console.log('Fleet sent:', { coords, missionType, speed });
        },

        recallFleet: function(missionType, missionElement) {
            NotificationSystem.show('info', `Flotte wird zurückgerufen: ${missionType}`);
            
            // Animate removal
            missionElement.style.opacity = '0.5';
            setTimeout(() => {
                missionElement.remove();
            }, 500);
            
            console.log('Fleet recalled:', missionType);
        }
    };

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    const KeyboardShortcuts = {
        init: function() {
            document.addEventListener('keydown', (e) => {
                // ESC key - close menus
                if (e.key === 'Escape') {
                    MenuController.closeAllMenus();
                }

                // Ctrl/Cmd + Number keys - quick page navigation
                if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
                    const pageMap = {
                        '1': 'overview',
                        '2': 'buildings',
                        '3': 'research',
                        '4': 'shipyard',
                        '5': 'defense',
                        '6': 'fleet',
                        '7': 'galaxy',
                        '8': 'alliance'
                    };

                    if (pageMap[e.key]) {
                        e.preventDefault();
                        PageController.switchPage(pageMap[e.key]);
                    }
                }
            });
        }
    };

    // ============================================
    // ANIMATIONS
    // ============================================
    const Animations = {
        init: function() {
            this.observeElements();
        },

        observeElements: function() {
            const options = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, options);

            // Observe cards
            document.querySelectorAll('.card, .building-card, .research-card, .stat-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(card);
            });
        }
    };

    // ============================================
    // TOOLTIPS (Optional Enhancement)
    // ============================================
    const Tooltips = {
        init: function() {
            // Add tooltips to elements with title attribute
            document.querySelectorAll('[title]').forEach(element => {
                element.addEventListener('mouseenter', (e) => {
                    this.show(e.target, e.target.getAttribute('title'));
                });

                element.addEventListener('mouseleave', (e) => {
                    this.hide();
                });
            });
        },

        show: function(element, text) {
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = text;
            tooltip.style.cssText = `
                position: fixed;
                background: rgba(31, 37, 51, 0.95);
                color: var(--color-text-primary);
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.875rem;
                z-index: 10000;
                pointer-events: none;
                border: 1px solid var(--color-border-accent);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            `;

            document.body.appendChild(tooltip);

            // Position tooltip
            const rect = element.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;

            this.currentTooltip = tooltip;
        },

        hide: function() {
            if (this.currentTooltip) {
                this.currentTooltip.remove();
                this.currentTooltip = null;
            }
        }
    };

    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    const Performance = {
        init: function() {
            // Reduce animations on low-end devices
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.body.classList.add('reduce-motion');
            }

            // Throttle resize events
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    console.log('Window resized');
                }, 250);
            });
        }
    };

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        console.log('🚀 SmartMoons Interface initializing...');

        // Initialize all systems
        MenuController.init();
        PageController.init();
        PlanetSelector.init();
        ResourceManager.init();
        TimerSystem.init();
        NotificationSystem.init();
        BuildingSystem.init();
        ResearchSystem.init();
        FleetSystem.init();
        KeyboardShortcuts.init();
        Animations.init();
        Tooltips.init();
        Performance.init();

        console.log('✅ SmartMoons Interface ready!');

        // Welcome notification
        setTimeout(() => {
            NotificationSystem.show('info', 'Willkommen, Commander! Dein Imperium erwartet deine Befehle.', 3000);
        }, 500);
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose to window for debugging
    window.SmartMoons = {
        GameState,
        MenuController,
        PageController,
        NotificationSystem,
        ResourceManager,
        TimerSystem
    };

})();

// Add slideOutRight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
`;
document.head.appendChild(style);
