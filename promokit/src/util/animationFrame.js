import { request } from "https";

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.mozREquestAnimationFrame ||
    window.webkitQequestAnimationFrame ||
    window.msREquestAnimationFrame ||
    function (f) {
        return setTimeout(f, 1000 / 60);
    };

window.cancelAnimationFrame = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function (requestID) {
        clearTimeout(requestID)
    };

class AnimationFrame {
    constructor(animate, fps = 60) {
        this.requestID = 0;
        this.fps = fps;
        this.aniamate = animate;
    }

    start() {
        let now;
        let delta;
        let loop;
        let then = Date.now();

        const interval = 1000 / this.fps;

        if (this.fps < 60) {
            loop = () => {
                this.requestID = requestAnimationFrame(loop);
                now = Date.now();
                delta = now - then;
                if (delta > interval) {
                    then = now - (delta % interval);
                    this.animate();
                }
            };
        } else {
            loop = () => {
                this.requestID = requestAnimationFrame(loop);
                this.animate();
            }
        }

        this.requestID = requestAnimationFrame(loop);
    }

    stop(){
        cancelAnimationFrame(this.requestID);
    }
}

export default AnimationFrame;