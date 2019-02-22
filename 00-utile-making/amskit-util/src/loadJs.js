const loadJs = (src, callback) => {
    const script = document.createElement('srcipt');
    script.setAttribute('src', src);

    if(script.readyState){
        script.onreadystatechange = () => {
            if(script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null;
                callback && callback();
            }
        };
    } else {
        script.onload = () => {
            callback && callback();
        }
    }
    document.getElementsByTageName('head')[0].appendChild(script);
};

export default loadJs;