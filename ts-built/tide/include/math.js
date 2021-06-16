import Utilities from "./utilities.js";
var _Math;
(function (_Math) {
    /** The mathematical constant e. This is Euler's number, the base of natural logarithms. */
    const E = Math.E;
    /** The natural logarithm of 10. */
    const LN10 = Math.LN10;
    /** The natural logarithm of 2. */
    const LN2 = Math.LN2;
    /** The base-2 logarithm of e. */
    const LOG2E = Math.LOG2E;
    /** The base-10 logarithm of e. */
    /** Pi. This is the ratio of the circumference of a circle to its diameter. */
    const PI = Math.PI;
    /** The square root of 0.5, or, equivalently, one divided by the square root of 2. */
    const SQRT1_2 = Math.SQRT1_2;
    /** The square root of 2. */
    const SQRT2 = Math.SQRT2;
    let LerpMode;
    (function (LerpMode) {
        LerpMode[LerpMode["Clamp"] = 0] = "Clamp";
        LerpMode[LerpMode["UnClamped"] = 1] = "UnClamped";
        LerpMode[LerpMode["Repeat"] = 2] = "Repeat";
    })(LerpMode = _Math.LerpMode || (_Math.LerpMode = {}));
    class RotationMatrix2D {
        constructor(_m11 = 0, _m12 = 0, _m21 = 0, _m22 = 0) {
            this._m11 = _m11;
            this._m12 = _m12;
            this._m21 = _m21;
            this._m22 = _m22;
        }
        /**
         *
         * @param r Angle in degrees
         */
        setAngle(r) {
            const rad = radians(r);
            this._m11 = Math.cos(rad);
            this._m12 = Math.sin(rad);
            this._m21 = Math.sin(-rad);
            this._m22 = Math.cos(-rad);
        }
        transform(v) {
            const x = v.X * this._m11 + v.X * this._m12;
            const y = v.Y * this._m21 + v.Y * this._m22;
            // @ts-expect-error */
            // ts is stupid. it thinks v.constructor is a Function, which is not constructible (?) so we just tell it that it's stupid and now it shuts up.
            return new v.constructor(x, y);
        }
    }
    _Math.RotationMatrix2D = RotationMatrix2D;
    ;
    class Base2D {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        /* #region  Getter/Setter */
        get X() {
            return this.x;
        }
        set X(x) {
            Utilities.isOfType(x, Number, true);
            this.x = x;
        }
        get Y() {
            return this.y;
        }
        set Y(y) {
            Utilities.isOfType(y, Number, true);
            this.y = y;
        }
    }
    class Base3D {
        constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        /* #region  Getter/Setter */
        get X() {
            return this.x;
        }
        set X(x) {
            Utilities.isOfType(x, Number, true);
            this.x = x;
        }
        get Y() {
            return this.y;
        }
        set Y(y) {
            Utilities.isOfType(y, Number, true);
            this.y = y;
        }
        get Z() {
            return this.z;
        }
        set Z(z) {
            Utilities.isOfType(z, Number, true);
            this.z = z;
        }
    }
    class Vector2 extends Base2D {
        static add(a, b) {
            Utilities.areOfType([a, b], Vector2, true);
            return new Vector2(a.x + b.y, a.y + b.y);
        }
        add(a) {
            Utilities.isOfType(a, Vector2, true);
            this.x += a.x;
            this.y += a.y;
        }
        static subtract(a, b) {
            Utilities.areOfType([a, b], Vector2, true);
            return new Vector2(a.x - b.x, a.y - b.y);
        }
        subtract(v) {
            Utilities.isOfType(v, Vector2, true);
            this.x -= v.x;
            this.y -= v.y;
        }
        plus(a) {
            return Vector2.add(this, a);
        }
        minus(a) {
            return Vector2.subtract(this, a);
        }
        static multiply(a, b) {
            Utilities.isOfType(a, Vector2, true);
            if (Utilities.isOfType(b, Number)) {
                return new Vector2(a.x * b, a.y * b);
            }
            else {
                throw new TypeError(`Argument '${b}' can not be used as multiplier for Vector2`);
            }
        }
        multiply(a) {
            if (Utilities.isOfType(a, Number)) {
                this.x *= a;
                this.y *= a;
            }
            else {
                throw new TypeError(`Argument '${a}' can not be used as multiplier for Vector2`);
            }
        }
        multiplied(a) {
            return Vector2.multiply(this, a);
        }
        static dot(a, b) {
            Utilities.areOfType([a, b], Vector2, true);
            return a.x * b.x + a.y * b.y;
        }
        dot(a) {
            Utilities.isOfType(a, Vector2, true);
            return this.x * a.x + this.y * a.y;
        }
        toPoint() {
            return new Point2D(this.x, this.y);
        }
        get length() {
            return _Math.sqrt(this.squareLength);
        }
        get squareLength() {
            return this.x * this.x + this.y * this.y;
        }
    }
    _Math.Vector2 = Vector2;
    class Vector3 extends Base3D {
        toPoint() {
            return new Point3D(this.x, this.y, this.z);
        }
    }
    _Math.Vector3 = Vector3;
    class Point2D extends Base2D {
        toVector() {
            return new Vector2(this.x, this.y);
        }
    }
    _Math.Point2D = Point2D;
    class Point3D extends Base3D {
        toVector() {
            return new Vector3(this.x, this.y, this.z);
        }
    }
    _Math.Point3D = Point3D;
    class Matrix {
    }
    _Math.Matrix = Matrix;
    /**
     * Returns the absolute value of a number (the value without regard to whether it is positive or negative).
     * For example, the absolute value of -5 is the same as the absolute value of 5.
     * @param x A numeric expression for which the absolute value is needed.
     */
    function abs(x) {
        return Math.abs(x);
    }
    _Math.abs = abs;
    /**
     * Returns the arc cosine (or inverse cosine) of a number.
     * @param x A numeric expression.
     */
    function acos(x) {
        return Math.acos(x);
    }
    _Math.acos = acos;
    /**
     * Returns the arcsine of a number.
     * @param x A numeric expression.
     */
    function asin(x) {
        return Math.asin(x);
    }
    _Math.asin = asin;
    /**
     * Returns the arctangent of a number.
     * @param x A numeric expression for which the arctangent is needed.
     */
    function atan(x) {
        return Math.atan(x);
    }
    _Math.atan = atan;
    /**
     * Returns the angle (in radians) from the X axis to a point.
     * @param y A numeric expression representing the cartesian y-coordinate.
     * @param x A numeric expression representing the cartesian x-coordinate.
     */
    function atan2(y, x) {
        return Math.atan2(y, x);
    }
    _Math.atan2 = atan2;
    /**
     * Returns the smallest integer greater than or equal to its numeric argument.
     * @param x A numeric expression.
     */
    function ceil(x) {
        return Math.ceil(x);
    }
    _Math.ceil = ceil;
    /**
     * Limiting a number to a given range.
     *
     * @param {Number} x The given value to be in the range.
     * @param {Number} min The lower boundary of the output range.
     * @param {Number} max The upper boundary of the output range.
     * @returns The value in the range [min, max].
     * @type number
     */
    function clamp(x, min, max) {
        return x < min ? min : max < x ? max : x;
    }
    _Math.clamp = clamp;
    /**
     * The closest value in an array to the given number.
     * @param x the value to check
     * @param values the values to find the closest from
     */
    function closest(x, values) {
        let minDistance = Infinity;
        let index;
        values.forEach((v, i) => {
            const d = Math.abs(v - x);
            if (d < minDistance) {
                minDistance = d;
                index = i;
            }
        });
        return values[index];
    }
    _Math.closest = closest;
    /**
     * Returns the cosine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    function cos(x) {
        return Math.cos(x);
    }
    _Math.cos = cos;
    /**
     * Converts from radians to degrees.
     * @param radians The angle in radians to convert to degrees.
     */
    function degrees(radians) {
        return radians * 180 / Math.PI;
    }
    _Math.degrees = degrees;
    /**
     * Returns e (the base of natural logarithms) raised to a power.
     * @param x A numeric expression representing the power of e.
     */
    function exp(x) {
        return Math.exp(x);
    }
    _Math.exp = exp;
    /**
     * Returns the greatest integer less than or equal to its numeric argument.
     * @param x A numeric expression.
     */
    function floor(x) {
        return Math.floor(x);
    }
    _Math.floor = floor;
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
    function lerp(x, y, t, mode = LerpMode.Clamp) {
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
    _Math.lerp = lerp;
    /**
     * Returns the natural logarithm (base e) of a number.
     * @param x A numeric expression.
     */
    function log(x) {
        return Math.log(x);
    }
    _Math.log = log;
    /**
     * Returns the larger of a set of supplied numeric expressions.
     * @param values Numeric expressions to be evaluated.
     */
    function max(...values) {
        return Math.max(...values);
    }
    _Math.max = max;
    /**
     * Returns the smaller of a set of supplied numeric expressions.
     * @param values Numeric expressions to be evaluated.
     */
    function min(...values) {
        return Math.min(...values);
    }
    _Math.min = min;
    /**
     * Returns the value of a base expression taken to a specified power.
     * @param x The base value of the expression.
     * @param y The exponent value of the expression.
     */
    function pow(x, y) {
        return Math.pow(x, y);
    }
    _Math.pow = pow;
    /** Returns a pseudorandom number between 0 and 1. */
    function random() {
        return Math.random();
    }
    _Math.random = random;
    /**
     * Returns a supplied numeric expression rounded to the nearest integer.
     * @param x The value to be rounded to the nearest integer.
     */
    function round(x) {
        return Math.round(x);
    }
    _Math.round = round;
    /**
     * Converts from degrees to radians.
     * @param degrees The angle in degrees to convert to radians.
     */
    function radians(degrees) {
        return degrees * Math.PI / 180;
    }
    _Math.radians = radians;
    /**
     * Returns the sine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    function sin(x) {
        return Math.sin(x);
    }
    _Math.sin = sin;
    /**
     * Returns the square root of a number.
     * @param x A numeric expression.
     */
    function sqrt(x) {
        return Math.sqrt(x);
    }
    _Math.sqrt = sqrt;
    /**
     * Returns the tangent of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    function tan(x) {
        return Math.tan(x);
    }
    _Math.tan = tan;
})(_Math || (_Math = {}));
export default _Math;
