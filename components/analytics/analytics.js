/**
 * analytics.js — Analytics Service
 */

window.Analytics = {

  track(event, data = {}) {

    const payload = {
      event,
      data,
      ts: Date.now(),
      page: window.location.pathname
    };

    // For now: console only
    console.log('[Analytics]', payload);

    // Later: send to backend
    /*
    navigator.sendBeacon?.(config_const.SCRIPT_URL, JSON.stringify(payload))
      || fetch(config_const.SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        keepalive: true
      });
    */
  }

};
