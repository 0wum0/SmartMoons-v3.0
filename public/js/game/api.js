window.SmartMoonsApi = {
  async request(action, options = {}) {
    const method = options.method || 'GET';
    const params = new URLSearchParams(options.params || {});
    params.set('action', action);

    const url = `api.php?${params.toString()}`;
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: method === 'POST' ? new URLSearchParams(options.body || {}).toString() : undefined,
      cache: 'no-store'
    });

    const payload = await response.json();
    if (!response.ok || !payload.success) {
      const message = payload?.error?.message || `API request failed for action "${action}"`;
      throw new Error(message);
    }
    return payload.data;
  },

  getManifest() {
    return fetch('public/assets/game/manifest.json', { cache: 'no-store' }).then(r => {
      if (!r.ok) throw new Error('Asset manifest konnte nicht geladen werden.');
      return r.json();
    });
  },

  getPlanetState() { return this.request('planet_state'); },
  getResources() { return this.request('resources'); },
  getBuildings() { return this.request('buildings'); }
};
