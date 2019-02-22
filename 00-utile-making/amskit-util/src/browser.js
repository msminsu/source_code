const browser = (agent = navigator.userAgent.toLocaleLowerCase()) => {
    const trident = agent.match(/trident\/(\d.\d)/i);

    if(trident !== null) {
        if(trident[1] === "7.0") return "IE" + 11;
        if(trident[1] === "6.0") return "IE" + 10;
        if(trident[1] === "5.0") return "IE" + 9;
        if(trident[1] === "4.0") return "IE" + 8;
    }

    if(navigator.appName === "Microsoft Internet Explorer") return "IE" + 7;

    if(agent.indexOf("edge") !== -1) return "Edge";
    if(agent.indexOf("chrome") !== -1) return "chrome";
    if(agent.indexOf("opera") !== -1) return "Opera";
    if(agent.indexOf("firefox") !== -1) return "Firefox";
    if(agent.indexOf("safari") !== -1) return "Safari";
}

export default browser;