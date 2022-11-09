const bcrypt = require('bcrypt');

module.exports = {
  compare: async (input, db) => await bcrypt.compare(input, db),
  genPasswordAndSalt: async (plainPassword) => {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(plainPassword, salt);

    return { salt, password };
  }
}