import Painter from "./painter.js";
export default class Detector {
    constructor() {
        this.painter = new Painter();
        this.listeners = [];
    }
    validateSettings(settings) {
        var _a, _b;
        return {
            _executionDistance: (_a = settings._executionDistance) !== null && _a !== void 0 ? _a : 200,
            paintLines: (_b = settings.paintLines) !== null && _b !== void 0 ? _b : false,
        };
    }
    createDetection(selection, callback, settings) {
        const element = document.querySelector(selection);
        if (!element)
            return;
        this.listeners.push({
            element: element,
            settings: this.validateSettings(settings !== null && settings !== void 0 ? settings : {}),
            callback,
        });
        this.registerEvent();
        this.drawLines();
    }
    drawLines() {
        document.addEventListener("mousemove", (event) => {
            this.listeners.forEach((listener) => {
                if (listener.settings.paintLines) {
                    this.painter.drawLine(listener, event);
                }
            });
        });
    }
    registerEvent() {
        document.addEventListener("mousemove", (event) => {
            this.listeners = this.listeners.filter(function (listener) {
                var _a;
                const rect = listener.element.getBoundingClientRect();
                const elementX = rect.left + rect.width / 2;
                const elementY = rect.top + rect.height / 2;
                const distance = Math.sqrt(Math.pow(event.clientX - elementX, 2) + Math.pow(event.clientY - elementY, 2));
                if (distance < ((_a = listener.settings._executionDistance) !== null && _a !== void 0 ? _a : 0)) {
                    if (listener.callback)
                        listener.callback();
                    return false;
                }
                return true;
            });
        });
    }
}
