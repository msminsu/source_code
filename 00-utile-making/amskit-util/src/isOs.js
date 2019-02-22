
/**
 * 
 * @param {*} findOs 
 * @param {*} agent 
 * @returns {boolean}
 */
const isOs = (findOs,agent = navigator.userAgent.toLowerCase()) => {
    return agent.indexOf(findOs) !== -1;
};
export default isOs;