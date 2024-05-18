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
};

const insertGuildsJ = async () => {
  return database.query(`
  INSERT INTO guilds_j (name, description, id_quest) VALUES
  ('Artiste', 'Guilde des artistes', 'NULL'),
  ('Chevalier', 'Guilde des chevaliers', 'NULL'),
  ('Elfes', 'Guilde des elfes', 'NULL'),
  ('Erudit', 'Guilde des érudits', 'NULL'),
  ('Forgeron', 'Guilde des forgerons', 'NULL'),
  ('Goblins', 'Guilde des goblins', 'NULL'),
  ('Marchand', 'Guilde des marchands', 'NULL'),
  ('Paladin', 'Guilde des paladins', 'NULL'),
  ('Parieur', 'Guilde des parieurs', 'NULL'),
  ('Sorciere', 'Guilde des sorcières', 'NULL')
  `);
};

const insertQuests = async () => {
  return database.query(`
  INSERT INTO quests (title, description_j, description_pnj, reward, id_guilds_pnj) VALUES
  ('Quête 1', 'Description de la quête 1', 'Info de la quête 1 pnj', 1, NULL),
  ('Quête 2', 'Description de la quête 2', 'Info de la quête 2 pnj', 2, NULL),
  ('Quête 3', 'Description de la quête 3', 'Info de la quête 3 pnj', 3, NULL)
  `);
};

const insertGuildsPNJ = async () => {
  return database.query(`
  INSERT INTO guilds_pnj (name, description, logo) VALUES
  ('Artiste', 'Guilde des artistes', 'public/logoguild/Artiste.png'),
  ('Chevalier', 'Guilde des chevaliers', 'public/logoguild/Chevalier.png'),
  ('Elfes', 'Guilde des elfes', 'public/logoguild/Elfes.png'),
  ('Erudit', 'Guilde des érudits', 'public/logoguild/Erudit.png'),
  ('Forgeron', 'Guilde des forgerons', 'public/logoguild/Forgeron.png'),
  ('Goblins', 'Guilde des goblins', 'public/logoguild/Goblins.png'),
  ('Marchand', 'Guilde des marchands', 'public/logoguild/Marchand.png'),
  ('Paladin', 'Guilde des paladins', 'public/logoguild/Paladin.png'),
  ('Parieur', 'Guilde des parieurs', 'public/logoguild/Parieur.png'),
  ('Sorciere', 'Guilde des sorcières', 'public/logoguild/Sorciere.png')
  `);
};

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
