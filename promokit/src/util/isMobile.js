/**
 * 모바일 브라우저 인지 체크
 * @param agent
 * @returns {boolean}
 */
const isMobile = (agent = navigator.userAgent.toLowerCase()) =>{
    return /(android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini)/i.test(agent);
};

export default isMobile;