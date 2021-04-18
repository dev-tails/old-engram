export const FF_DASHBOARD = "dashboard";
export const FF_PAGES = "pages";
export const FF_WORKSPACES = "workspaces";

const featureFlags: { [key: string]: boolean } = {};

export async function initializeFeatureFlags() {}

export function isFFEnabled(featureFlag: string) {
  return featureFlags[featureFlag];
}

export async function toggleFF(featureFlag: string) {
  featureFlags[featureFlag] = !Boolean(featureFlags[featureFlag]);
}
