import Painter from "./painter.js";
import DetectorSettings from "./interfaces/DetectorSettings.js";
import Listener from "./interfaces/Listener.js";

export default class Detector {
    painter: Painter
    listeners: Array<Listener>

    constructor()
    {
        this.painter   = new Painter();
        this.listeners = [];
    }

    validateSettings (settings: DetectorSettings): DetectorSettings {
        return {
            _executionDistance: settings._executionDistance ?? 200,
            paintLines: settings.paintLines ?? false,
        }
    }

    createDetection (selection: string, callback: Function, settings?: DetectorSettings)
    {
        const element = document.querySelector(selection);

        if (!element) return;

        this.listeners.push({
            element: element,
            settings: this.validateSettings(settings ?? {}),
            callback,
        })

        this.registerEvent();
        this.drawLines();
    }

    public drawLines()
    {
        document.addEventListener("mousemove", (event) => {
            this.listeners.forEach((listener: Listener) => {
                if (listener.settings.paintLines) {
                    this.painter.drawLine(listener, event);
                }
            })
        });
    }

    registerEvent ()
    {
        document.addEventListener("mousemove", (event) => {
            this.listeners = this.listeners.filter(function (listener: Listener) {
                const rect = listener.element.getBoundingClientRect();
                const elementX = rect.left + rect.width / 2;
                const elementY = rect.top + rect.height / 2;

                const distance = Math.sqrt(
                    Math.pow(event.clientX - elementX, 2) + Math.pow(event.clientY - elementY, 2)
                );

                if (distance < (listener.settings._executionDistance ?? 0)) {
                    if (listener.callback) listener.callback();
                    return false;
                }

                return true;
            })
        });
    }
}