console.log('Application is alive :)1');
import Detector from "./detector.js";
const detector = new Detector();
detector.createDetection('#test1', function () { console.log('test1'); }, {
    paintLines: true,
});
detector.createDetection('#test2', function () { console.log('test2'); }, {
    paintLines: true,
});
detector.createDetection('#test3', function () { console.log('test3'); }, {
    paintLines: true,
});
detector.createDetection('#test4', function () { console.log('test4'); }, {
    paintLines: true,
});
detector.createDetection('#test5', function () { console.log('test5'); }, {
    paintLines: true,
});
detector.createDetection('#test6', function () { console.log('test6'); }, {
    paintLines: true,
});
