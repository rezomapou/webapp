/**
 * Nav Component Object
 * Manages navigation-specific UI logic.
 */
const NavComponent = {
    init() {
        this.highlightActiveLink();
    },

    highlightActiveLink() {
        const currentPath = window.location.pathname.split("/").pop() || 'index.html';
        const links = document.querySelectorAll('.nav-links a');
        
        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};

// Nav self-initializes when called by the Header controller
