const loadCss = (src, callback) => {
    const css = document.createElement('link');

    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('href', src);

    if(css.readyState) {
        css.onreadystatechange = () => {
            if(css.readyState === 'loaded' || css.readyState === 'complete') {
                css.onreadystatechange = null;
                callback && callback();
            }
        };
    } else {
        css.onload = () => {
            callback && callback();
        }
    }

    document.getElementsByTagName('head')[0].appendChild(css);
};

export default loadCass;