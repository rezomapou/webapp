window.Analytics = {
  track(event, data = {}) {
    console.log('[Analytics]', event, data);
  }
};
if (window.Analytics) {
  Analytics.track('component_loaded', { component: 'ANALYTICS' });
}
