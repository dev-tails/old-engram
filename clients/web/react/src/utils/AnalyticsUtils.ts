export function trackEvent(eventName: string, eventParams?: Object) {
  if (process.env.NODE_ENV === "production") {
    gtag("event", eventName, eventParams);
  }
}
