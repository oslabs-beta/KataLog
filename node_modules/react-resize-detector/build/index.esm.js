import React,{cloneElement,isValidElement,createRef,PureComponent,Component,forwardRef,useRef,useState,useEffect,useLayoutEffect}from'react';import {findDOMNode}from'react-dom';import debounce from'lodash/debounce';import throttle from'lodash/throttle';/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}var patchResizeHandler = function (resizeCallback, refreshMode, refreshRate, refreshOptions) {
    switch (refreshMode) {
        case 'debounce':
            return debounce(resizeCallback, refreshRate, refreshOptions);
        case 'throttle':
            return throttle(resizeCallback, refreshRate, refreshOptions);
        default:
            return resizeCallback;
    }
};
var isFunction = function (fn) { return typeof fn === 'function'; };
var isSSR = function () { return typeof window === 'undefined'; };
var isDOMElement = function (element) {
    return element instanceof Element || element instanceof HTMLDocument;
};
var createNotifier = function (setSize, handleWidth, handleHeight) {
    return function (_a) {
        var width = _a.width, height = _a.height;
        setSize(function (prev) {
            if (prev.width === width && prev.height === height) {
                // skip if dimensions haven't changed
                return prev;
            }
            if ((prev.width === width && !handleHeight) || (prev.height === height && !handleWidth)) {
                // process `handleHeight/handleWidth` props
                return prev;
            }
            return { width: width, height: height };
        });
    };
};var ResizeDetector = /** @class */ (function (_super) {
    __extends(ResizeDetector, _super);
    function ResizeDetector(props) {
        var _this = _super.call(this, props) || this;
        _this.cancelHandler = function () {
            if (_this.resizeHandler && _this.resizeHandler.cancel) {
                // cancel debounced handler
                _this.resizeHandler.cancel();
                _this.resizeHandler = null;
            }
        };
        _this.attachObserver = function () {
            var _a = _this.props, targetRef = _a.targetRef, observerOptions = _a.observerOptions;
            if (isSSR()) {
                return;
            }
            if (targetRef && targetRef.current) {
                _this.targetRef.current = targetRef.current;
            }
            var element = _this.getElement();
            if (!element) {
                // can't find element to observe
                return;
            }
            if (_this.observableElement && _this.observableElement === element) {
                // element is already observed
                return;
            }
            _this.observableElement = element;
            _this.resizeObserver.observe(element, observerOptions);
        };
        _this.getElement = function () {
            var _a = _this.props, querySelector = _a.querySelector, targetDomEl = _a.targetDomEl;
            if (isSSR())
                return null;
            // in case we pass a querySelector
            if (querySelector)
                return document.querySelector(querySelector);
            // in case we pass a DOM element
            if (targetDomEl && isDOMElement(targetDomEl))
                return targetDomEl;
            // in case we pass a React ref using React.createRef()
            if (_this.targetRef && isDOMElement(_this.targetRef.current))
                return _this.targetRef.current;
            // the worse case when we don't receive any information from the parent and the library doesn't add any wrappers
            // we have to use a deprecated `findDOMNode` method in order to find a DOM element to attach to
            var currentElement = findDOMNode(_this);
            if (!currentElement)
                return null;
            var renderType = _this.getRenderType();
            switch (renderType) {
                case 'renderProp':
                    return currentElement;
                case 'childFunction':
                    return currentElement;
                case 'child':
                    return currentElement;
                case 'childArray':
                    return currentElement;
                default:
                    return currentElement.parentElement;
            }
        };
        _this.createResizeHandler = function (entries) {
            var _a = _this.props, _b = _a.handleWidth, handleWidth = _b === void 0 ? true : _b, _c = _a.handleHeight, handleHeight = _c === void 0 ? true : _c, onResize = _a.onResize;
            if (!handleWidth && !handleHeight)
                return;
            var notifyResize = createNotifier(function (setStateFunc) { return _this.setState(setStateFunc, function () { return onResize === null || onResize === void 0 ? void 0 : onResize(_this.state.width, _this.state.height); }); }, handleWidth, handleHeight);
            entries.forEach(function (entry) {
                var _a = (entry && entry.contentRect) || {}, width = _a.width, height = _a.height;
                var shouldSetSize = !_this.skipOnMount && !isSSR();
                if (shouldSetSize) {
                    notifyResize({ width: width, height: height });
                }
                _this.skipOnMount = false;
            });
        };
        _this.getRenderType = function () {
            var _a = _this.props, render = _a.render, children = _a.children;
            if (isFunction(render)) {
                // DEPRECATED. Use `Child Function Pattern` instead
                return 'renderProp';
            }
            if (isFunction(children)) {
                return 'childFunction';
            }
            if (isValidElement(children)) {
                return 'child';
            }
            if (Array.isArray(children)) {
                // DEPRECATED. Wrap children with a single parent
                return 'childArray';
            }
            // DEPRECATED. Use `Child Function Pattern` instead
            return 'parent';
        };
        var skipOnMount = props.skipOnMount, refreshMode = props.refreshMode, _a = props.refreshRate, refreshRate = _a === void 0 ? 1000 : _a, refreshOptions = props.refreshOptions;
        _this.state = {
            width: undefined,
            height: undefined
        };
        _this.skipOnMount = skipOnMount;
        _this.targetRef = createRef();
        _this.observableElement = null;
        if (isSSR()) {
            return _this;
        }
        _this.resizeHandler = patchResizeHandler(_this.createResizeHandler, refreshMode, refreshRate, refreshOptions);
        _this.resizeObserver = new window.ResizeObserver(_this.resizeHandler);
        return _this;
    }
    ResizeDetector.prototype.componentDidMount = function () {
        this.attachObserver();
    };
    ResizeDetector.prototype.componentDidUpdate = function () {
        this.attachObserver();
    };
    ResizeDetector.prototype.componentWillUnmount = function () {
        if (isSSR()) {
            return;
        }
        this.observableElement = null;
        this.resizeObserver.disconnect();
        this.cancelHandler();
    };
    ResizeDetector.prototype.render = function () {
        var _a = this.props, render = _a.render, children = _a.children, _b = _a.nodeType, WrapperTag = _b === void 0 ? 'div' : _b;
        var _c = this.state, width = _c.width, height = _c.height;
        var childProps = { width: width, height: height, targetRef: this.targetRef };
        var renderType = this.getRenderType();
        switch (renderType) {
            case 'renderProp':
                return render === null || render === void 0 ? void 0 : render(childProps);
            case 'childFunction': {
                var childFunction = children;
                return childFunction === null || childFunction === void 0 ? void 0 : childFunction(childProps);
            }
            case 'child': {
                // @TODO bug prone logic
                var child = children;
                if (child.type && typeof child.type === 'string') {
                    // child is a native DOM elements such as div, span etc
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    childProps.targetRef; var nativeProps = __rest(childProps, ["targetRef"]);
                    return cloneElement(child, nativeProps);
                }
                // class or functional component otherwise
                return cloneElement(child, childProps);
            }
            case 'childArray': {
                var childArray = children;
                return childArray.map(function (el) { return !!el && cloneElement(el, childProps); });
            }
            default:
                return React.createElement(WrapperTag, null);
        }
    };
    return ResizeDetector;
}(PureComponent));function withResizeDetector(ComponentInner, options) {
    if (options === void 0) { options = {}; }
    var ResizeDetectorHOC = /** @class */ (function (_super) {
        __extends(ResizeDetectorHOC, _super);
        function ResizeDetectorHOC() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ref = createRef();
            return _this;
        }
        ResizeDetectorHOC.prototype.render = function () {
            var _a = this.props, forwardedRef = _a.forwardedRef, rest = __rest(_a, ["forwardedRef"]);
            var targetRef = forwardedRef !== null && forwardedRef !== void 0 ? forwardedRef : this.ref;
            return (React.createElement(ResizeDetector, __assign({}, options, { targetRef: targetRef }),
                React.createElement(ComponentInner, __assign({ targetRef: targetRef }, rest))));
        };
        return ResizeDetectorHOC;
    }(Component));
    function forwardRefWrapper(props, ref) {
        return React.createElement(ResizeDetectorHOC, __assign({}, props, { forwardedRef: ref }));
    }
    var name = ComponentInner.displayName || ComponentInner.name;
    forwardRefWrapper.displayName = "withResizeDetector(".concat(name, ")");
    return forwardRef(forwardRefWrapper);
}var useEnhancedEffect = isSSR() ? useEffect : useLayoutEffect;
function useResizeDetector(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.skipOnMount, skipOnMount = _c === void 0 ? false : _c, refreshMode = _b.refreshMode, _d = _b.refreshRate, refreshRate = _d === void 0 ? 1000 : _d, refreshOptions = _b.refreshOptions, _e = _b.handleWidth, handleWidth = _e === void 0 ? true : _e, _f = _b.handleHeight, handleHeight = _f === void 0 ? true : _f, targetRef = _b.targetRef, observerOptions = _b.observerOptions, onResize = _b.onResize;
    var skipResize = useRef(skipOnMount);
    var localRef = useRef(null);
    var resizeHandler = useRef();
    var ref = targetRef !== null && targetRef !== void 0 ? targetRef : localRef;
    var _g = useState({
        width: undefined,
        height: undefined
    }), size = _g[0], setSize = _g[1];
    useEnhancedEffect(function () {
        if (!handleWidth && !handleHeight)
            return;
        var notifyResize = createNotifier(setSize, handleWidth, handleHeight);
        var resizeCallback = function (entries) {
            if (!handleWidth && !handleHeight)
                return;
            entries.forEach(function (entry) {
                var _a = (entry && entry.contentRect) || {}, width = _a.width, height = _a.height;
                var shouldSetSize = !skipResize.current;
                if (shouldSetSize) {
                    notifyResize({ width: width, height: height });
                }
                skipResize.current = false;
            });
        };
        resizeHandler.current = patchResizeHandler(resizeCallback, refreshMode, refreshRate, refreshOptions);
        var resizeObserver = new window.ResizeObserver(resizeHandler.current);
        if (ref.current) {
            resizeObserver.observe(ref.current, observerOptions);
        }
        return function () {
            var _a, _b;
            resizeObserver.disconnect();
            (_b = (_a = resizeHandler.current).cancel) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
    }, [refreshMode, refreshRate, refreshOptions, handleWidth, handleHeight, observerOptions, ref.current]);
    useEffect(function () {
        onResize === null || onResize === void 0 ? void 0 : onResize(size.width, size.height);
    }, [size]);
    return __assign({ ref: ref }, size);
}export{ResizeDetector as default,useResizeDetector,withResizeDetector};//# sourceMappingURL=index.esm.js.map
