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

export const ONE_DAY = "1d";
export const FIVE_DAY = "5d";
export const ONE_MONTH = "1mo";
export const THREE_MONTHS = "3mo";
export const ONE_YEAR = "1yr";

export const stocksList = [
  "AAPL",
  "MSFT",
  "AMZN",
  "TSLA",
  "META",
  "BABA",
  "UBER",
  "DIS",
  "SBUX",
];
