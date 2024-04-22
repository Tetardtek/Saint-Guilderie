require("dotenv").config();

const tables = require("../tables");

// The B of BREAD - Browse (Read all) - GET
const browse = async (req, res, next) => {
  try {
    const guildJ = await tables.guilds_j.readAll();
    res.json(guildJ);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read one - GET
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const guildJ = await tables.guilds_j.read(id);

    if (field && guildJ && Array.isArray(guildJ[field])) {
      res.json({ [field]: guildJ[field] });
    } else if (guildJ) {
      res.json(guildJ);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const guildJId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { name, description, id_quest } = req.body;

    const guildJ = await tables.guilds_j.read(guildJId);

    if (!guildJ) {
      return res.status(404).json({ message: "guildJ not found" });
    }

    const updatedFields = {};

    if (name !== undefined) {
      updatedFields.name = name;
    }
    if (description !== undefined) {
      updatedFields.description = description;
    }
    if (id_quest !== undefined) {
      updatedFields.id_quest = id_quest;
    }

    const affectedRows = await tables.guilds_j.edit(guildJId, updatedFields);

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedguildJ = await tables.guilds_j.read(guildJId);
    return res.json({
      message: "Success Update",
      guildJ: editedguildJ,
    });
  } catch (error) {
    console.error("Error on guildJ update", error);
    return res.status(500).json({ message: "Error on guildJ update" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    const { name, description, id_quest } = req.body;

    const guildJ = {
      name,
      description,
      id_quest,
    };

    const insertId = await tables.guilds_j.create(guildJ);

    res.status(201).json({ message: "Success", id: insertId });
  } catch (err) {
    console.error("Error on guildJ creation", err);
    next(err);
  }
};

// The D of BREAD - Delete operation
const destroy = async (req, res, next) => {
  try {
    await tables.guilds_j.delete(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
