var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
import JMath from '../include/JSGE.Math.js';
import Utilities from '../include/JSGE.Utilities.js';
var UI;
(function (UI) {
    var _r, _g, _b, _a;
    class Color {
        constructor(r, g, b, a) {
            _r.set(this, void 0);
            _g.set(this, void 0);
            _b.set(this, void 0);
            _a.set(this, void 0);
            if (typeof r === "string") {
                this.validate(r);
            }
            else if (Utilities.areOfType([r, g, b, a], Number)) {
                __classPrivateFieldSet(this, _r, JMath.clamp(r, 0, 255));
                __classPrivateFieldSet(this, _g, JMath.clamp(g, 0, 255));
                __classPrivateFieldSet(this, _b, JMath.clamp(b, 0, 255));
                __classPrivateFieldSet(this, _a, JMath.clamp(a, 0, 1));
            }
            else if (r instanceof Color) {
                __classPrivateFieldSet(this, _r, r.r);
                __classPrivateFieldSet(this, _g, r.g);
                __classPrivateFieldSet(this, _b, r.b);
                __classPrivateFieldSet(this, _a, r.a);
            }
            else {
                throw new TypeError("Can not create new color with the given arguments");
            }
        }
        /* #region  Color set/get */
        get a() {
            return __classPrivateFieldGet(this, _a);
        }
        set a(value) {
            __classPrivateFieldSet(this, _a, JMath.clamp(value, 0, 1));
        }
        get r() {
            return __classPrivateFieldGet(this, _r);
        }
        set r(value) {
            __classPrivateFieldSet(this, _r, JMath.clamp(value, 0, 255));
        }
        get g() {
            return __classPrivateFieldGet(this, _g);
        }
        set g(value) {
            __classPrivateFieldSet(this, _g, JMath.clamp(value, 0, 255));
        }
        get b() {
            return __classPrivateFieldGet(this, _b);
        }
        set b(value) {
            __classPrivateFieldSet(this, _b, JMath.clamp(value, 0, 255));
        }
        /* #endregion */
        /* #region  Pre-defined colors */
        static get black() {
            return new Color(0, 0, 0);
        }
        static get red() {
            return new Color(255, 0, 0);
        }
        static get green() {
            return new Color(0, 255, 0);
        }
        static get blue() {
            return new Color(0, 0, 255);
        }
        static get cyan() {
            return new Color(0, 255, 255);
        }
        static get magenta() {
            return new Color(255, 0, 255);
        }
        static get yellow() {
            return new Color(255, 255, 0);
        }
        static get white() {
            return new Color(255, 255, 255);
        }
        /* #endregion */
        validate(strColor) {
            var hexParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(strColor);
            if (hexParts) {
                __classPrivateFieldSet(this, _r, parseInt(hexParts[1], 16));
                __classPrivateFieldSet(this, _g, parseInt(hexParts[2], 16));
                __classPrivateFieldSet(this, _b, parseInt(hexParts[3], 16));
            }
            else {
                throw new TypeError(`'${strColor}' is not a valid color.`);
            }
        }
    }
    _r = new WeakMap(), _g = new WeakMap(), _b = new WeakMap(), _a = new WeakMap();
    UI.Color = Color;
})(UI || (UI = {}));
export default UI;
