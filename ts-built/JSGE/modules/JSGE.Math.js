/**
 * Limiting a number to the given range.
 *
 *
 * @param {number} value The given value to be in the range
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type number
 */
export const clamp = (value, min, max) => {
    return value < min ? min : max < value ? max : value;
};
