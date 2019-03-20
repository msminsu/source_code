const environment = (href = location.href) => {
    const staticPath = {
        local: 'https://op.com',
        rc: 'https://rc.com',
        live: 'https://wstatic.com'
    };

    let here;

    if(/rc\./i.test(href) || /rc-/i.test(href)) {
        here = 'rc';
    }
    else if (/local|localhost|opdev|ui-static|file:/i.test(href)) {
        here = 'local';
    }
    else {
        here = 'live';
    }

    return staticPath[here];
};

export default environment;