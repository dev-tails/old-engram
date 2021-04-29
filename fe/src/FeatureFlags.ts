export enum PluginName {
  PLUGIN_DASHBOARD = "Dashboard",
  PLUGIN_PAGES = "Pages",
  PLUGIN_WORKSPACES = "Workspaces",
  PLUGIN_ZAPIER = "Zapier",
}

const localStorageKey = "plugins";

let plugins: { [key: string]: boolean } = {};

export async function initializePlugins() {
  for (const key of Object.values(PluginName)) {
    plugins[key] = false;
  }
  const storedPluginsJSON = localStorage.getItem(localStorageKey);
  if (storedPluginsJSON) {
    Object.assign(plugins, JSON.parse(storedPluginsJSON));
  }
}

export function getPlugins() {
  return plugins;
}

export function isPluginEnabled(pluginName: string) {
  return plugins[pluginName];
}

export async function togglePlugin(pluginName: string) {
  plugins[pluginName] = !Boolean(plugins[pluginName]);
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(plugins));
}
