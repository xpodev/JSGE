declare module MathA {
    enum LerpMode {
        Clamp = 0,
        UnClamped = 1,
        Repeat = 2
    }
    class Vector2 {
        private x;
        private y;
        constructor(x?: number, y?: number);
        get X(): number;
        set X(x: number);
        get Y(): number;
        set Y(y: number);
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
    }
    class Vector3 {
    }
    /**
     * Returns the absolute value of a number (the value without regard to whether it is positive or negative).
     * For example, the absolute value of -5 is the same as the absolute value of 5.
     * @param x A numeric expression for which the absolute value is needed.
     */
    function abs(x: number): number;
    /**
     * Returns the arc cosine (or inverse cosine) of a number.
     * @param x A numeric expression.
     */
    function acos(x: number): number;
    /**
     * Returns the arcsine of a number.
     * @param x A numeric expression.
     */
    function asin(x: number): number;
    /**
     * Returns the arctangent of a number.
     * @param x A numeric expression for which the arctangent is needed.
     */
    function atan(x: number): number;
    /**
     * Returns the angle (in radians) from the X axis to a point.
     * @param y A numeric expression representing the cartesian y-coordinate.
     * @param x A numeric expression representing the cartesian x-coordinate.
     */
    function atan2(y: number, x: number): number;
    /**
     * Returns the smallest integer greater than or equal to its numeric argument.
     * @param x A numeric expression.
     */
    function ceil(x: number): number;
    /**
     * Limiting a number to a given range.
     *
     * @param {Number} x The given value to be in the range.
     * @param {Number} min The lower boundary of the output range.
     * @param {Number} max The upper boundary of the output range.
     * @returns The value in the range [min, max].
     * @type number
     */
    function clamp(x: number, min: number, max: number): number;
    /**
     * Returns the cosine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    function cos(x: number): number;
    /**
     * Returns e (the base of natural logarithms) raised to a power.
     * @param x A numeric expression representing the power of e.
     */
    function exp(x: number): number;
    /**
     * Returns the greatest integer less than or equal to its numeric argument.
     * @param x A numeric expression.
     */
    function floor(x: number): number;
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
    function lerp(x: number, y: number, t: number, mode?: LerpMode): number;
    /**
     * Returns the natural logarithm (base e) of a number.
     * @param x A numeric expression.
     */
    function log(x: number): number;
    /**
     * Returns the larger of a set of supplied numeric expressions.
     * @param values Numeric expressions to be evaluated.
     */
    function max(...values: number[]): number;
    /**
     * Returns the smaller of a set of supplied numeric expressions.
     * @param values Numeric expressions to be evaluated.
     */
    function min(...values: number[]): number;
    /**
     * Returns the value of a base expression taken to a specified power.
     * @param x The base value of the expression.
     * @param y The exponent value of the expression.
     */
    function pow(x: number, y: number): number;
    /** Returns a pseudorandom number between 0 and 1. */
    function random(): number;
    /**
     * Returns a supplied numeric expression rounded to the nearest integer.
     * @param x The value to be rounded to the nearest integer.
     */
    function round(x: number): number;
    /**
     * Returns the sine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    function sin(x: number): number;
    /**
     * Returns the square root of a number.
     * @param x A numeric expression.
     */
    function sqrt(x: number): number;
    /**
     * Returns the tangent of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    function tan(x: number): number;
}
export default MathA;
