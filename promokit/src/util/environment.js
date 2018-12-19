/**
 * get environment
 * @param href
 * @returns {*}
 */

const environment = (href = location.href) =>{
    let here;
    
    if(/rc\./i.test(href) || /rc-/i.test(href)){
        here = 'rc';
    }
    else if ( /local|localhost|opdev|ui-static|file:/i.test(href)){
        here = 'local';
    }
    else {
        here = 'live';
    }

    return here;
};

export default environment;