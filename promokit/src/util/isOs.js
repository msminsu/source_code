/**
 * isOs
 * @param findBrowser
 * @param agent
 * @returns {boolean}
 */

const isOs = (findBrowser, agent = navigator.userAgent.toLowerCase()) =>{
    return agent.indexOf(findBrowser) !== -1;
};

export default isOs;