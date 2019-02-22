const staticPath = {
    local: "https://local.com",
    rc: "https://rc.com",
    live: "https://live.com",
};

let now = (href = location.href) => {
    if(/local|localhost|test|static|op|file:/i.test(href)){
        return 'local';
    }

    if(/test\./i.test(href) || /rc-/i.test(href)) {
        return 'test';
    }

    return 'live';
};

export default (url) => {
    let n = now(url);

    return {
        statciPath: staticPath[n],
        lan: n,
    };
}