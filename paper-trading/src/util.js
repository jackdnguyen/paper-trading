export const STOCKS_TYPE = "Stocks";
export const LISTS_TYPE = "Lists";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function pollFunc(fn, timeout, interval) {
  var startTime = new Date().getTime();
  interval = interval || 1000;

  (function p() {
    fn();
    if (new Date().getTime() - startTime <= timeout) {
      setTimeout(p, interval);
    }
  })();
}
