"use strict";
exports.__esModule = true;
exports.useFlubber = void 0;
var react_1 = require("react");
var react_native_reanimated_1 = require("react-native-reanimated");
var flubber = require('flubber');
exports.useFlubber = function (paths, config) {
    var step = (config === null || config === void 0 ? void 0 : config.step) || 0.01;
    var initialIndex = (config === null || config === void 0 ? void 0 : config.initialIndex) || 0;
    var _a = react_1.useState(initialIndex), currentIndex = _a[0], setFlubberIndex = _a[1];
    var initialPath = paths[initialIndex];
    var _b = react_1.useState(initialPath), currentPath = _b[0], setCurrentPath = _b[1];
    var sharedPathValue = react_native_reanimated_1.useSharedValue(initialPath);
    var animatedProps = react_native_reanimated_1.useAnimatedProps(function () { return ({
        d: sharedPathValue.value
    }); });
    var setNativePathProps = function (path, frame) {
        sharedPathValue.value = path;
        if (config === null || config === void 0 ? void 0 : config.onChange)
            config === null || config === void 0 ? void 0 : config.onChange(path, frame);
    };
    react_1.useEffect(function () {
        var requestAnimationId;
        var startPath = currentPath;
        var endPath = paths[currentIndex];
        if (!startPath || !endPath)
            return;
        var interpolator = flubber.interpolate(startPath, endPath);
        setNativePathProps(startPath, 0);
        if (startPath === endPath)
            return;
        var setFrame = function (val) {
            if (val >= 1 || val < 0) {
                var newPathState = paths[currentIndex];
                setNativePathProps(newPathState, 1);
                if (!newPathState)
                    return;
                setCurrentPath(newPathState);
                return;
            }
            var newPath = interpolator(val);
            setNativePathProps(newPath, val);
            var nextValue = val + step;
            requestAnimationId = requestAnimationFrame(function () { return setFrame(nextValue); });
        };
        setFrame(0);
        return function () {
            cancelAnimationFrame(requestAnimationId);
        };
    }, [currentIndex]);
    return { animatedProps: animatedProps, setFlubberIndex: setFlubberIndex, sharedPathValue: sharedPathValue, currentIndex: currentIndex };
};
