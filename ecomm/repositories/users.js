const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const Repository = require("./repository");
const scrypt = util.promisify(crypto.scrypt);

class UserRepository extends Repository {
  async create(attributes) {
    attributes.id = this.randomID();
    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(attributes.password, salt, 64);
    const records = await this.getAll();
    const record = {
      ...attributes,
      password: `${buf.toString("hex")}.${salt}`,
    };
    records.push(record);
    await this.writeAll(records);
    return record;
  }

  async comparePassword(savedPassword, suppliedPassword) {
    const [hashed, salt] = savedPassword.split(".");
    const hashSupplied = await scrypt(suppliedPassword, salt, 64);
    return hashed === hashSupplied.toString("hex");
  }
}

module.exports = new UserRepository("users.json");
