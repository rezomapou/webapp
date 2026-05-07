/**
 * ad.js — Ad Slot Component
 * Renders text or image from config_const.ADS
 * Empty = hidden automatically (no layout shift)
 * Called for both AD_TOP and AD_BOTTOM containerId
 */

const AdComponent = {

    async init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const slot = containerId === 'ad-top-container' ? 'top' : 'bottom';
        const ads  = config_const.ADS || {};
        const ad   = ads[slot];

        if (!ad || !ad.active) return;

        const inner = container.querySelector('.ad-slot');
        if (!inner) return;

        if (ad.type === 'text') {
            inner.innerHTML = `<div class="ad-text">${ad.content}</div>`;
            inner.classList.add('has-content');
        } else if (ad.type === 'image') {
            inner.innerHTML = `<a href="${ad.href || '#'}">
                <img class="ad-image" src="${ad.src}" alt="${ad.alt || ''}">
            </a>`;
            inner.classList.add('has-content');
        }

        window.Analytics?.track?.('ad_shown', { slot, type: ad.type });
    }

};

window.AdTopComponent    = AdComponent;
window.AdBottomComponent = AdComponent;
console.log("AdComponent registered.");
