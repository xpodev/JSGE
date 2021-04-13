import JMath from '../include/JSGE.Math.js';
import Utilities from '../include/JSGE.Utilities.js';

module UI {
    export class Color {
        #r: number
        #g: number
        #b: number
        #a: number

        constructor(color: Color);
        constructor(hex_string: string);
        constructor(r: number, g: number, b: number, a: number | void);
        constructor(r: number | Color | string, g: number | void, b: number | void, a: number | void) {
            if (typeof r === "string") {
                this.validate(r)
            } else if (Utilities.areOfType([r, g, b, a], Number)) {
                this.#r = JMath.clamp(r as number, 0, 255);
                this.#g = JMath.clamp(g as number, 0, 255);
                this.#b = JMath.clamp(b as number, 0, 255);
                this.#a = JMath.clamp(a as number, 0, 1);
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
            this.#a = JMath.clamp(value, 0, 1);
        }

        get r() {
            return this.#r;
        }

        set r(value) {
            this.#r = JMath.clamp(value, 0, 255);
        }

        get g() {
            return this.#g;
        }

        set g(value) {
            this.#g = JMath.clamp(value, 0, 255);
        }

        get b() {
            return this.#b;
        }

        set b(value) {
            this.#b = JMath.clamp(value, 0, 255);
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

        private validate(strColor: string) {
            var hexParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(strColor);
            if (hexParts) {
                this.#r = parseInt(hexParts[1], 16);
                this.#g = parseInt(hexParts[2], 16);
                this.#b = parseInt(hexParts[3], 16);
            } else {
                throw new TypeError(`'${strColor}' is not a valid color.`);
            }
        }
    }
}

export default UI;
