import _ from "lodash";

export enum PluginName {
  PLUGIN_DASHBOARD = "Dashboard",
  PLUGIN_ENCRYPTION = "Encryption",
  PLUGIN_GOOGLE = "Google",
  PLUGIN_PAGES = "Pages",
  PLUGIN_WORKSPACES = "Workspaces",
  PLUGIN_ZAPIER = "Zapier",
}

const publicPlugins = [PluginName.PLUGIN_ZAPIER];

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
  return _.pick(plugins, publicPlugins);
}

export function isPluginEnabled(pluginName: PluginName) {
  return publicPlugins.includes(pluginName) && plugins[pluginName];
}

export async function togglePlugin(pluginName: string) {
  plugins[pluginName] = !Boolean(plugins[pluginName]);
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(plugins));
}
