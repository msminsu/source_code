/**
 * check mobile browser
 * @param agent
 * @returns {boolean}
 */
const isMobile = (agent = navigator.userAgent.toLocaleLowerCase()) => {
    return /(android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|Mobile Safari)/i.test(agent);
};

export default isMobile;