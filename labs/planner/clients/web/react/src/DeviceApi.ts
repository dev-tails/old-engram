import { addDevice, getDevice, putDevice } from "./db/db";

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

export async function updateDevice(device: {
  localId: string;
  syncedAt: Date;
}) {
  putDevice(device);
}
