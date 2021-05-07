import _Math from '../include/JSGE.Math.js';
import Utilities from '../include/JSGE.Utilities.js';
var UI;
(function (UI) {
    class Color {
        constructor(r, g, b, a) {
            if (typeof r === "string") {
                this.validate(r);
            }
            else if (Utilities.areOfType([r, g, b, a], Number)) {
                this._r = _Math.clamp(r, 0, 255);
                this._g = _Math.clamp(g, 0, 255);
                this._b = _Math.clamp(b, 0, 255);
                this._a = _Math.clamp(a, 0, 1);
            }
            else if (r instanceof Color) {
                this._r = r.r;
                this._g = r.g;
                this._b = r.b;
                this._a = r.a;
            }
            else {
                throw new TypeError("Can not create new color with the given arguments");
            }
        }
        /* #region  Color set/get */
        get a() {
            return this._a;
        }
        set a(value) {
            this._a = _Math.clamp(value, 0, 1);
        }
        get r() {
            return this._r;
        }
        set r(value) {
            this._r = _Math.clamp(value, 0, 255);
        }
        get g() {
            return this._g;
        }
        set g(value) {
            this._g = _Math.clamp(value, 0, 255);
        }
        get b() {
            return this._b;
        }
        set b(value) {
            this._b = _Math.clamp(value, 0, 255);
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
            var hexParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(strColor);
            if (hexParts) {
                this._r = parseInt(hexParts[1], 16);
                this._g = parseInt(hexParts[2], 16);
                this._b = parseInt(hexParts[3], 16);
                this._a = parseInt(hexParts[4], 16);
            }
            else {
                throw new TypeError(`'${strColor}' is not a valid color.`);
            }
        }
    }
    UI.Color = Color;
})(UI || (UI = {}));
export default UI;
