"use strict";
exports.__esModule = true;
exports.useFlubber = void 0;
var react_1 = require("react");
var flubber = require('flubber');
exports.useFlubber = function (paths, config) {
    var step = (config === null || config === void 0 ? void 0 : config.step) || 0.01;
    var initialIndex = (config === null || config === void 0 ? void 0 : config.initialIndex) || 0;
    var _a = react_1.useState(initialIndex), currentIndex = _a[0], setFlubberIndex = _a[1];
    var initialPath = paths[initialIndex];
    var _b = react_1.useState(initialPath), currentPath = _b[0], setCurrentPath = _b[1];
    var pathRef = react_1.useRef();
    var setNativePathProps = function (path) {
        var _a;
        (_a = pathRef === null || pathRef === void 0 ? void 0 : pathRef.current) === null || _a === void 0 ? void 0 : _a.setNativeProps({
            d: path
        });
    };
    react_1.useEffect(function () {
        var requestAnimationId;
        var startPath = currentPath;
        var endPath = paths[currentIndex];
        if (!startPath || !endPath)
            return;
        var interpolator = flubber.interpolate(startPath, endPath);
        setNativePathProps(startPath);
        if (startPath === endPath)
            return;
        var setFrame = function (val) {
            if (val >= 1 || val < 0) {
                var newPathState = paths[currentIndex];
                setNativePathProps(newPathState);
                if (!newPathState)
                    return;
                setCurrentPath(newPathState);
                return;
            }
            var newPath = interpolator(val);
            setNativePathProps(newPath);
            var nextValue = val + step;
            requestAnimationId = requestAnimationFrame(function () { return setFrame(nextValue); });
        };
        setFrame(0);
        return function () {
            cancelAnimationFrame(requestAnimationId);
        };
    }, [currentIndex]);
    return { pathRef: pathRef, setFlubberIndex: setFlubberIndex };
};
