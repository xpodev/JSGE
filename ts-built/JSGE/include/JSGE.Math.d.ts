declare module _Math {
    export enum LerpMode {
        Clamp = 0,
        UnClamped = 1,
        Repeat = 2
    }
    export const ROTATION_MATRIX: {
        m11: number;
        m12: number;
        m21: number;
        m22: number;
        /**
         *
         * @param r Angle in degrees
         */
        setAngle: (r: number) => void;
        multiply: (v: Vector2) => Vector2;
    };
    class Base2D {
        protected x: number;
        protected y: number;
        constructor(x?: number, y?: number);
        get X(): number;
        set X(x: number);
        get Y(): number;
        set Y(y: number);
    }
    class Base3D {
        protected x: number;
        protected y: number;
        protected z: number;
        constructor(x?: number, y?: number, z?: number);
        get X(): number;
        set X(x: number);
        get Y(): number;
        set Y(y: number);
        get Z(): number;
        set Z(z: number);
    }
    export class Vector2 extends Base2D {
        static add(a: Vector2, b: Vector2): Vector2;
        add(a: Vector2): void;
        static subtract(a: Vector2, b: Vector2): Vector2;
        subtract(v: Vector2): void;
        plus(a: Vector2): Vector2;
        minus(a: Vector2): Vector2;
        static multiply(a: Vector2, b: number): Vector2;
        multiply(a: number): void;
        multiplied(a: number): Vector2;
        static dot(a: Vector2, b: Vector2): number;
        dot(a: Vector2): number;
        toPoint(): Point2D;
    }
    export class Vector3 extends Base3D {
        toPoint(): Point3D;
    }
    export class Point2D extends Base2D {
        toVector(): Vector2;
    }
    export class Point3D extends Base3D {
        toVector(): Vector3;
    }
    export class Matrix {
    }
    /**
     * Returns the absolute value of a number (the value without regard to whether it is positive or negative).
     * For example, the absolute value of -5 is the same as the absolute value of 5.
     * @param x A numeric expression for which the absolute value is needed.
     */
    export function abs(x: number): number;
    /**
     * Returns the arc cosine (or inverse cosine) of a number.
     * @param x A numeric expression.
     */
    export function acos(x: number): number;
    /**
     * Returns the arcsine of a number.
     * @param x A numeric expression.
     */
    export function asin(x: number): number;
    /**
     * Returns the arctangent of a number.
     * @param x A numeric expression for which the arctangent is needed.
     */
    export function atan(x: number): number;
    /**
     * Returns the angle (in radians) from the X axis to a point.
     * @param y A numeric expression representing the cartesian y-coordinate.
     * @param x A numeric expression representing the cartesian x-coordinate.
     */
    export function atan2(y: number, x: number): number;
    /**
     * Returns the smallest integer greater than or equal to its numeric argument.
     * @param x A numeric expression.
     */
    export function ceil(x: number): number;
    /**
     * Limiting a number to a given range.
     *
     * @param {Number} x The given value to be in the range.
     * @param {Number} min The lower boundary of the output range.
     * @param {Number} max The upper boundary of the output range.
     * @returns The value in the range [min, max].
     * @type number
     */
    export function clamp(x: number, min: number, max: number): number;
    /**
     * Returns one of two numbers that is closer to the given value.
     * If the differences are equal than `a` is returned.
     * @param a first number
     * @param b second number
     * @param x the value to check
     */
    export function closer(a: number, b: number, x: number): number;
    /**
     * Returns the cosine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    export function cos(x: number): number;
    /**
     * Converts from radians to degrees.
     * @param radians The angle in radians to convert to degrees.
     */
    export function degrees(radians: number): number;
    /**
     * Returns e (the base of natural logarithms) raised to a power.
     * @param x A numeric expression representing the power of e.
     */
    export function exp(x: number): number;
    /**
     * Returns the greatest integer less than or equal to its numeric argument.
     * @param x A numeric expression.
     */
    export function floor(x: number): number;
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
    export function lerp(x: number, y: number, t: number, mode?: LerpMode): number;
    /**
     * Returns the natural logarithm (base e) of a number.
     * @param x A numeric expression.
     */
    export function log(x: number): number;
    /**
     * Returns the larger of a set of supplied numeric expressions.
     * @param values Numeric expressions to be evaluated.
     */
    export function max(...values: number[]): number;
    /**
     * Returns the smaller of a set of supplied numeric expressions.
     * @param values Numeric expressions to be evaluated.
     */
    export function min(...values: number[]): number;
    /**
     * Returns the value of a base expression taken to a specified power.
     * @param x The base value of the expression.
     * @param y The exponent value of the expression.
     */
    export function pow(x: number, y: number): number;
    /** Returns a pseudorandom number between 0 and 1. */
    export function random(): number;
    /**
     * Returns a supplied numeric expression rounded to the nearest integer.
     * @param x The value to be rounded to the nearest integer.
     */
    export function round(x: number): number;
    /**
     * Converts from degrees to radians.
     * @param degrees The angle in degrees to convert to radians.
     */
    export function radians(degrees: number): number;
    /**
     * Returns the sine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    export function sin(x: number): number;
    /**
     * Returns the square root of a number.
     * @param x A numeric expression.
     */
    export function sqrt(x: number): number;
    /**
     * Returns the tangent of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    export function tan(x: number): number;
    export {};
}
export default _Math;
