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
  INSERT INTO users (pseudo, password, mail, corn, id_roles, id_guilds_j) VALUES
  ('Administrator', '$2b$10$4VWdZ7SANvRr7qn3k6LAEu6eGApGQUvPOqcCCmgzVLKNlSpBL0rGa', 'administrator@email.com', 0, 3, NULL),
  ('Moderator', '$2b$10$c4u.4Q1LzVQBKm.SKX2nPuWEZ/I3jiMUygxr.mMZK4MVJilKYX0rC', 'moderator@email.com', 0, 2, NULL)
  `);
};

const insertRules = async () => {
  return database.query(`
  INSERT INTO rules (description) VALUES
  ('Gentil tu seras'),
  ('Les autres tu respecteras'),
  ('Les règles tu suivras')
  `);
}

const insertGuildsJ = async () => {
  return database.query(`
  INSERT INTO guilds_j (name, description, id_quest) VALUES
  ('Les aventuriers', 'Guilde des aventuriers', NULL),
  ('Les mages', 'Guilde des mages', NULL),
  ('Les guerriers', 'Guilde des guerriers', NULL)
  `);
}

const insertQuests = async () => {
  return database.query(`
  INSERT INTO quests (title, description, reward, id_guilds_pnj) VALUES
  ('Quête 1', 'Description de la quête 1', 100, NULL),
  ('Quête 2', 'Description de la quête 2', 200, NULL),
  ('Quête 3', 'Description de la quête 3', 300, NULL)
  `);
}

const insertGuildsPNJ = async () => {
  return database.query(`
  INSERT INTO guilds_pnj (name, description, logo) VALUES
  ('PNJ 1', 'Description PNJ 1', 'Logo PNJ 1'),
  ('PNJ 2', 'Description PNJ 2', 'Logo PNJ 2'),
  ('PNJ 3', 'Description PNJ 3', 'Logo PNJ 3')
  `);
}

const seed = async () => {
  try {
    await database.query("START TRANSACTION");

    await insertRoles();
    await insertUsers();
    await insertRules();
    await insertGuildsJ();
    await insertQuests();
    await insertGuildsPNJ();

    await database.query("COMMIT");

    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    await database.query("ROLLBACK");
    console.error("Error filling the database:", err.message);
  }
};

seed();
