export default class Painter {
    /**
     * Constructor.
     */
    constructor() {
        this.svg = this.createBaseSVG();
    }
    /**
     * Create base SVG
     */
    createBaseSVG() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100vw");
        svg.setAttribute("height", "100vh");
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.pointerEvents = "none";
        document.body.appendChild(svg);
        return svg;
    }
    createLine() {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "2");
        this.svg.appendChild(line);
        return line;
    }
    drawLineStatus(event, listener) {
        var _a;
        if (!listener.line) {
            console.error('Line was not created.');
            return;
        }
        const rect = listener.element.getBoundingClientRect();
        const distance = Math.sqrt(Math.pow(event.clientX - (rect.left + rect.width / 2), 2)
            + Math.pow(event.clientY - (rect.top + rect.height / 2), 2));
        if (distance > ((_a = listener.settings._executionDistance) !== null && _a !== void 0 ? _a : 0) + 50) {
            listener.line.setAttribute("stroke", "black");
        }
        else {
            listener.line.setAttribute("stroke", "red");
        }
    }
    positLine(event, listener) {
        if (!listener.line) {
            console.error('Line was not created.');
            return;
        }
        const rect = listener.element.getBoundingClientRect();
        listener.line.setAttribute("x1", event.clientX.toString());
        listener.line.setAttribute("y1", event.clientY.toString());
        listener.line.setAttribute("x2", (rect.left + rect.width / 2).toString());
        listener.line.setAttribute("y2", (rect.top + rect.height / 2).toString());
    }
    drawLine(listener, event) {
        if (!listener.line) {
            listener.line = this.createLine();
        }
        this.positLine(event, listener);
        this.drawLineStatus(event, listener);
    }
}
