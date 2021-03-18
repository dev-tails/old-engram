import { addDevice, getDevice } from "./db/db";

export async function createLocalDevice() {
  const localDevice = await hasLocalDevice();
  if (!localDevice) {
    await addDevice();
  }
}

export async function hasLocalDevice(): Promise<boolean> {
  const device = await getDevice();
  return device ? true : false;
}
