import browser from "./browser";

const vendorPrefix = (now = browser()) => {
    const prefix = {
        IE11: "-ms-",
        IE10: "-ms-",
        IE9: "-ms-",
        Chrome: "-webkit-",
        Opera: "-o-",
        Firefox: "-moz-",
        Safari: "-webkit-",
      };

      return prefix[now];
}

export default vendorPrefix;