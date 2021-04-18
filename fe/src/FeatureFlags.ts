export enum PluginName {
  PLUGIN_WORKSPACES = "Workspaces",
  PLUGIN_DASHBOARD = "Dashboard",
  PLUGIN_PAGES = "Pages",
}

const localStorageKey = "plugins";

let plugins: { [key: string]: boolean } = {};

export async function initializePlugins() {
  const storedPluginsJSON = localStorage.getItem(localStorageKey);
  if (storedPluginsJSON) {
    plugins = JSON.parse(storedPluginsJSON);
  } else {
    for (const key of Object.values(PluginName)) {
      plugins[key] = false;
    }
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
