/**
 * NavStats Component Object
 * Manages the fetching and display of global statistics.
 */
const NavStatsComponent = {
    async init() {
        await this.refresh();
    },

    async refresh() {
        try {
            // fetchGlobalStats() should be defined in your global codes/stats.js or config.js
            const data = await fetchGlobalStats(); 
            
            this.updateElement('nav-total-reg', data.total_users);
            this.updateElement('nav-total-countries', data.countries);
            this.updateElement('nav-total-depts', data.departments);
            this.updateElement('nav-total-communes', data.communes);
        } catch (error) {
            console.error("NavStats refresh failed:", error);
        }
    },

    updateElement(id, value) {
        const el = document.getElementById(id);
        if (el) el.innerText = value || '0';
    }
};
