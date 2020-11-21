export function objectIdFromDate(date: Date) {
  return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
}

export function dateFromObjectId(objectId?: string) {
  if (!objectId) {
    return null;
  }
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
}
