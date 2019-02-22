const getCookie = (key) => {
    if(!document.cookie){
        return false;
    }

    let cookies = document.cookie.replace(/\s+/gi, '').split(";");

    for( let i = 0, compare, length = cookies.length; i <length; i++){
        compare = cookies[i].split("=");
        if(key === compare[0]){
            return compare [1];
        }

    }
};
export default getCookie;