const bcryprt = require("bcryptjs");

/**
 * Hash the password
 * @param {String} password Hash the password
 * @returns {String} hashed password
 */
const hashPassword = async (password) => {
  const salt = await bcryprt.genSalt(10);
  return await bcryprt.hash(password, salt);
};

/**
 * Compare the password
 * @param {String} password password
 * @param {String} hashedPassword hashed password
 * @returns {Boolean} true if the password is correct
 */
const comparePassword = async (password, hashedPassword) => {
  return await bcryprt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
