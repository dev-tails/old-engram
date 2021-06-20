import Axios from 'axios';

type Flag = {
  _id: string;
  name: string;
  enabled: boolean;
};

const flags: { [flag: string]: Flag } = {};

export async function initializeFeatureFlags() {
  const res = await Axios.get("/api/flags");
  const flagsArray = res.data.data;
  for (const flag of flagsArray) {
    flags[flag.name] = {
      ...flag,
    };
  }
}

export function isFeatureEnabled(flag: string) {
  return flags[flag].enabled;
}
