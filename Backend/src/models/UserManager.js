const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  // The C of CRUD - Create operation
  async create(user) {
    const { pseudo, password, mail, corn } = user;

    const rolesId = 1;

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (pseudo, password, mail, corn, id_roles) VALUES (?, ?, ?, 0, ?)`,
      [pseudo, password, mail, corn, id_roles]
    );

    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(id, field) {
    if (field) {
      const [rows] = await this.database.query(
        `SELECT ?? FROM ${this.table} WHERE id = ?`,
        [field, id]
      );

      if (rows.length === 0) {
        return null;
      }

      return rows[0][field];
    }

    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async getByMail(mail) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE mail = ?`,
      [mail]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async edit(id, updatedFields) {
    const allowedFields = ["pseudo", "password", "mail", "corn", "id_roles"];

    const fieldsToUpdate = Object.keys(updatedFields).filter((field) =>
      allowedFields.includes(field)
    );

    const updateValues = fieldsToUpdate.map((field) => updatedFields[field]);

    if (fieldsToUpdate.length === 0) {
      return 0;
    }

    const updateQuery = `UPDATE ${this.table} SET ${fieldsToUpdate
      .map((field) => `${field} = ?`)
      .join(", ")} WHERE id = ?`;

    updateValues.push(id);

    const [result] = await this.database.query(updateQuery, updateValues);

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = UserManager;
