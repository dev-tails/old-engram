const isDevelopment = __DEV__;

export const baseUrl = isDevelopment
  ? "http://192.168.0.13:4000"
  : "https://engram.xyzdigital.com";
