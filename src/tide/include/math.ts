import Utilities from "./utilities.js";

module _Math {
    /** The mathematical constant e. This is Euler's number, the base of natural logarithms. */
    const E: number = Math.E;
    /** The natural logarithm of 10. */
    const LN10: number = Math.LN10;
    /** The natural logarithm of 2. */
    const LN2: number = Math.LN2;
    /** The base-2 logarithm of e. */
    const LOG2E: number = Math.LOG2E;
    /** The base-10 logarithm of e. */
    /** Pi. This is the ratio of the circumference of a circle to its diameter. */
    const PI: number = Math.PI;
    /** The square root of 0.5, or, equivalently, one divided by the square root of 2. */
    const SQRT1_2: number = Math.SQRT1_2;
    /** The square root of 2. */
    const SQRT2: number = Math.SQRT2;

    export enum LerpMode {
        Clamp,
        UnClamped,
        Repeat
    }

    export class RotationMatrix2D {
        constructor(
            private _m11: number = 0,
            private _m12: number = 0,
            private _m21: number = 0,
            private _m22: number = 0
        ) {

        }

        /**
         * 
         * @param r Angle in degrees
         */
        setAngle(r: number): void {
            const rad = radians(r);
            this._m11 = Math.cos(rad);
            this._m12 = Math.sin(rad);
            this._m21 = Math.sin(-rad);
            this._m22 = Math.cos(-rad);
        }

        transform(v: Vector2): Vector2;
        transform(v: Point2D): Point2D;
        transform(v: Vector2 | Point2D): Vector2 | Point2D {
            const x = v.X * this._m11 + v.X * this._m12;
            const y = v.Y * this._m21 + v.Y * this._m22;
            // @ts-expect-error */
            // ts is stupid. it thinks v.constructor is a Function, which is not constructible (?) so we just tell it that it's stupid and now it shuts up.
            return new v.constructor(x, y);
        }
    };

    class Base2D {
        constructor(protected x: number = 0, protected y: number = 0) {

        }

        /* #region  Getter/Setter */
        get X() {
            return this.x;
        }

        set X(x: number) {
            Utilities.isOfType(x, Number, true);
            this.x = x;
        }

        get Y() {
            return this.y;
        }

        set Y(y: number) {
            Utilities.isOfType(y, Number, true);
            this.y = y;
        }
    }

    class Base3D {
        constructor(protected x: number = 0, protected y: number = 0, protected z: number = 0) {

        }

        /* #region  Getter/Setter */
        get X() {
            return this.x;
        }

        set X(x: number) {
            Utilities.isOfType(x, Number, true);
            this.x = x;
        }

        get Y() {
            return this.y;
        }

        set Y(y: number) {
            Utilities.isOfType(y, Number, true);
            this.y = y;
        }

        get Z() {
            return this.z;
        }

        set Z(z: number) {
            Utilities.isOfType(z, Number, true);
            this.z = z;
        }
    }

    export class Vector2 extends Base2D {

        static add(a: Vector2, b: Vector2): Vector2 {
            Utilities.areOfType([a, b], Vector2, true);
            return new Vector2(a.x + b.y, a.y + b.y);
        }

        add(a: Vector2): void {
            Utilities.isOfType(a, Vector2, true);
            this.x += a.x;
            this.y += a.y;
        }

        static subtract(a: Vector2, b: Vector2): Vector2 {
            Utilities.areOfType([a, b], Vector2, true);
            return new Vector2(a.x - b.x, a.y - b.y);
        }

        subtract(v: Vector2): void {
            Utilities.isOfType(v, Vector2, true);
            this.x -= v.x;
            this.y -= v.y;
        }

        plus(a: Vector2): Vector2 {
            return Vector2.add(this, a);
        }

        minus(a: Vector2): Vector2 {
            return Vector2.subtract(this, a);
        }

        static multiply(a: Vector2, b: number): Vector2;
        static multiply(a: Vector2, b: number): Vector2 {
            Utilities.isOfType(a, Vector2, true);
            if (Utilities.isOfType(b, Number)) {
                return new Vector2(a.x * (b as number), a.y * (b as number));
            } else {
                throw new TypeError(`Argument '${b}' can not be used as multiplier for Vector2`);
            }
        }

        multiply(a: number): void;
        multiply(a: number): void {
            if (Utilities.isOfType(a, Number)) {
                this.x *= a as number;
                this.y *= a as number;
            } else {
                throw new TypeError(`Argument '${a}' can not be used as multiplier for Vector2`);
            }
        }

        multiplied(a: number): Vector2;
        multiplied(a: number): Vector2 {
            return Vector2.multiply(this, a);
        }

        static dot(a: Vector2, b: Vector2): number;
        static dot(a: Vector2, b: Vector2): number {
            Utilities.areOfType([a, b], Vector2, true);
            return a.x * b.x + a.y * b.y;
        }

        dot(a: Vector2): number;
        dot(a: Vector2): number {
            Utilities.isOfType(a, Vector2, true);
            return this.x * a.x + this.y * a.y;
        }

        toPoint(): Point2D {
            return new Point2D(this.x, this.y);
        }

        get length(): number {
            return _Math.sqrt(this.squareLength);
        }

        get squareLength(): number {
            return this.x * this.x + this.y * this.y;
        }
    }

    export class Vector3 extends Base3D {
        toPoint(): Point3D {
            return new Point3D(this.x, this.y, this.z);
        }
    }

    export class Point2D extends Base2D {
        toVector(): Vector2 {
            return new Vector2(this.x, this.y);
        }
    }

    export class Point3D extends Base3D {
        toVector(): Vector3 {
            return new Vector3(this.x, this.y, this.z);
        }
    }

    export class Matrix {

    }

    /**
     * Returns the absolute value of a number (the value without regard to whether it is positive or negative).
     * For example, the absolute value of -5 is the same as the absolute value of 5.
     * @param x A numeric expression for which the absolute value is needed.
     */
    export function abs(x: number): number {
        return Math.abs(x);
    }
    /**
     * Returns the arc cosine (or inverse cosine) of a number.
     * @param x A numeric expression.
     */
    export function acos(x: number): number {
        return Math.acos(x);
    }
    /**
     * Returns the arcsine of a number.
     * @param x A numeric expression.
     */
    export function asin(x: number): number {
        return Math.asin(x);
    }
    /**
     * Returns the arctangent of a number.
     * @param x A numeric expression for which the arctangent is needed.
     */
    export function atan(x: number): number {
        return Math.atan(x);
    }
    /**
     * Returns the angle (in radians) from the X axis to a point.
     * @param y A numeric expression representing the cartesian y-coordinate.
     * @param x A numeric expression representing the cartesian x-coordinate.
     */
    export function atan2(y: number, x: number): number {
        return Math.atan2(y, x);
    }
    /**
     * Returns the smallest integer greater than or equal to its numeric argument.
     * @param x A numeric expression.
     */
    export function ceil(x: number): number {
        return Math.ceil(x);
    }
    /**
     * Limiting a number to a given range.
     *
     * @param {Number} x The given value to be in the range.
     * @param {Number} min The lower boundary of the output range.
     * @param {Number} max The upper boundary of the output range.
     * @returns The value in the range [min, max].
     * @type number
     */
    export function clamp(x: number, min: number, max: number): number {
        return x < min ? min : max < x ? max : x;
    }
    /**
     * The closest value in an array to the given number.
     * @param x the value to check
     * @param values the values to find the closest from
     */
    export function closest(x: number, values: number[]): number {
        let minDistance = Infinity;
        let index: number;
        values.forEach((v, i) => {
            const d = Math.abs(v - x);
            if (d < minDistance) {
                minDistance = d;
                index = i;
            }
        });
        return values[index];
    }
    /**
     * Returns the cosine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    export function cos(x: number): number {
        return Math.cos(x);
    }
    /**
     * Converts from radians to degrees.
     * @param radians The angle in radians to convert to degrees.
     */
    export function degrees(radians: number): number {
        return radians * 180 / Math.PI;
    }
    /**
     * Returns e (the base of natural logarithms) raised to a power.
     * @param x A numeric expression representing the power of e.
     */
    export function exp(x: number): number {
        return Math.exp(x);
    }
    /**
     * Returns the greatest integer less than or equal to its numeric argument.
     * @param x A numeric expression.
     */
    export function floor(x: number): number {
        return Math.floor(x);
    }
    /**
     * Linearly interpolates between two points
     * @param {Number} x Start value, returned when t = 0.
     * @param {Number} y End value, returned when t = 1.
     * @param {Number} t Value used to interpolate between a and b.
     * @param {LerpMode} mode Enum LerpMode
     * 
     * Clamp - t is clamped between 0 and 1.
     * 
     * UnClamped - t doesn't change.
     * 
     * Repeat - t is the reminder of division by 1.
     * @returns Interpolated value, equals to `x + (y - x) * t`.
     */
    export function lerp(x: number, y: number, t: number, mode: LerpMode = LerpMode.Clamp): number {
        switch (mode) {
            case LerpMode.Clamp:
                t = clamp(t, 0, 1);
                break;
            case LerpMode.Repeat:
                t = t % 1;
                break;
            case LerpMode.UnClamped:
                break;
            default:
                t = clamp(t, 0, 1);
                break;
        }
        return (x + (y - x) * t);
    }
    /**
     * Returns the natural logarithm (base e) of a number.
     * @param x A numeric expression.
     */
    export function log(x: number): number {
        return Math.log(x);
    }
    /**
     * Returns the larger of a set of supplied numeric expressions.
     * @param values Numeric expressions to be evaluated.
     */
    export function max(...values: number[]): number {
        return Math.max(...values);
    }
    /**
     * Returns the smaller of a set of supplied numeric expressions.
     * @param values Numeric expressions to be evaluated.
     */
    export function min(...values: number[]): number {
        return Math.min(...values);
    }
    /**
     * Returns the value of a base expression taken to a specified power.
     * @param x The base value of the expression.
     * @param y The exponent value of the expression.
     */
    export function pow(x: number, y: number): number {
        return Math.pow(x, y);
    }
    /** Returns a pseudorandom number between 0 and 1. */
    export function random(): number {
        return Math.random();
    }
    /**
     * Returns a supplied numeric expression rounded to the nearest integer.
     * @param x The value to be rounded to the nearest integer.
     */
    export function round(x: number): number {
        return Math.round(x);
    }
    /**
     * Converts from degrees to radians.
     * @param degrees The angle in degrees to convert to radians.
     */
    export function radians(degrees: number): number {
        return degrees * Math.PI / 180;
    }
    /**
     * Returns the sine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    export function sin(x: number): number {
        return Math.sin(x);
    }
    /**
     * Returns the square root of a number.
     * @param x A numeric expression.
     */
    export function sqrt(x: number): number {
        return Math.sqrt(x);
    }
    /**
     * Returns the tangent of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    export function tan(x: number): number {
        return Math.tan(x);
    }
}

export default _Math;