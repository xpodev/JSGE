import MathA from '../include/JSGE.Math.js';
import Utilities from '../include/JSGE.Utilities.js';

module UI {
    export class Color {
        #r: number
        #g: number
        #b: number
        #a: number


        constructor(r: number | Color, g: number, b: number, a: number = 1) {
            if (typeof r === "string") {
                this.validate(r)
            } else if (Utilities.isOfType(r, Number) && Utilities.isOfType(g, Number) && Utilities.isOfType(b, Number) && Utilities.isOfType(a, Number)) {
                this.#r = MathA.clamp(r as number, 0, 255);
                this.#g = MathA.clamp(g, 0, 255);
                this.#b = MathA.clamp(b, 0, 255);
                this.#a = MathA.clamp(a, 0, 1);
            } else if (r instanceof Color) {
                this.#r = r.r;
                this.#g = r.g;
                this.#b = r.b;
                this.#a = r.a;
            } else {
                throw new TypeError("Can not create new color with the given arguments");
            }
        }
        /* #region  Color set/get */
        get a() {
            return this.#a;
        }

        set a(value) {
            this.#a = JSGE.Math.clamp(value, 0, 1);
        }

        get r() {
            return this.#r;
        }

        set r(value) {
            this.#r = JSGE.Math.clamp(value, 0, 255);
        }

        get g() {
            return this.#g;
        }

        set g(value) {
            this.#g = JSGE.Math.clamp(value, 0, 255);
        }

        get b() {
            return this.#b;
        }

        set b(value) {
            this.#b = JSGE.Math.clamp(value, 0, 255);
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
            return new Color(0, 255, 255)
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

        private validate(strColor) {
            var hexParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(strColor);
            if (hexParts) {
                this.#r = parseInt(hexParts[1], 16);
                this.#g = parseInt(hexParts[2], 16);
                this.#b = parseInt(hexParts[3], 16);
            } else {
                throw new TypeError(`'${strColor}' is not a valid color. Colors are set by (r, g, b, [Optional a]) or HEX code`)
            }
        }
    }
}

export default UI;
