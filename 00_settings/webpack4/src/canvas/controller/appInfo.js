import environment from "../util/environment";

const appInfo = appInfo || {};
appInfo.register = (ns_name) => {
    let parts = ns_name.split('.'),
        parent = appInfo;
        for( let i = 0; i < parts.length; i+=1){
            if(typeof parent[parts[i]] === 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
};

appInfo.register('staticPath');
appInfo.staticPath = environment();

export default appInfo;