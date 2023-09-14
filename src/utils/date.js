// Description: Date utilities.

/**
 * Formats a date object using the Intl.DateTimeFormat API.
 * @param {Date} date - The date object.
 * @param {object} options - The options to pass to the Intl.DateTimeFormat constructor.
 * @returns {string} The formatted date.
 */
export const format = (date, options) =>
  new Intl.DateTimeFormat(undefined, { ...options }).format(date);

/**
 * Gets the current date in the format YYYY-MM-DD.
 * @returns {string} The current date in the format YYYY-MM-DD.
 */
export const today = new Date().toISOString().split("T")[0];

/**
 * Gets the hour of the day from a date object.
 *
 * @param {Date} date - The date object.
 * @returns {number} The hour of the day, from 0 to 23.
 */
export const getHour = (date) =>
  format(date, { hour: "numeric", hour12: false });

/**
 * Gets the date in the format MMM DD, HH:MM.
 * @param {Date} date - The date object.
 * @returns {string} The date in the format MMM DD, HH:MM.
 */
export const getDateTime = (date) =>
  format(date, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
