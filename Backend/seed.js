// eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}]

// Load environment variables from .env file
require("dotenv").config();

// Import database client
const database = require("./database/client");

const insertRoles = async () => {
  return database.query(`
  INSERT INTO roles (rolename) VALUES
  ('user'),
  ('moderator'),
  ('administrator')
  `);
};

const insertUsers = async () => {
  return database.query(`
  INSERT INTO users (pseudo, password, mail, corn, id_roles) VALUES
  ('Administrator', '$2b$10$4VWdZ7SANvRr7qn3k6LAEu6eGApGQUvPOqcCCmgzVLKNlSpBL0rGa', 'administrator@email.com', 0, 3),
  ('Moderator', '$2b$10$c4u.4Q1LzVQBKm.SKX2nPuWEZ/I3jiMUygxr.mMZK4MVJilKYX0rC', 'moderator@email.com', 0, 2)
  `);
};

const seed = async () => {
  try {
    await database.query("START TRANSACTION");

    await insertRoles();
    await insertUsers();

    await database.query("COMMIT");

    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    await database.query("ROLLBACK");
    console.error("Error filling the database:", err.message);
  }
};

seed();
