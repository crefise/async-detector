import DetectorSettings from "./DetectorSettings.js";

export default interface Listener {
    callback?: Function,
    element: Element,
    settings: DetectorSettings,
    line?: SVGLineElement // Used to painting
}