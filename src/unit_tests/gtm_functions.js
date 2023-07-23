/**
 * Returns a random number (integer) within the given range.
 *
 * @param {number} min - Minimum potential value of the returned integer.
 * @param {number} max - Maximum potential value of the returned integer.
 * @returns {number} - Random integer within the specified range.
 */
function generateRandom(min, max) {
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error("Both arguments must be numbers.");
  }

  if (min > max) {
    throw new Error("The minimum value must be less than or equal to the maximum value.");
  }

  // Calculate the random integer within the range [min, max].
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

