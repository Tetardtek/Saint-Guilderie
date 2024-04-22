require("dotenv").config();

const tables = require("../tables");

// The B of BREAD - Browse (Read all) - GET
const browse = async (req, res, next) => {
  try {
    const guildPNJ = await tables.guilds_pnj.readAll();
    res.json(guildPNJ);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read one - GET
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const guildPNJ = await tables.guilds_pnj.read(id);

    if (field && guildPNJ && Array.isArray(guildPNJ[field])) {
      res.json({ [field]: guildPNJ[field] });
    } else if (guildPNJ) {
      res.json(guildPNJ);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const guildPNJId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { name, description, logo } = req.body;

    const guildPNJ = await tables.guilds_pnj.read(guildPNJId);

    if (!guildPNJ) {
      return res.status(404).json({ message: "guildPNJ not found" });
    }

    const updatedFields = {};

    if (name !== undefined) {
      updatedFields.name = name;
    }
    if (description !== undefined) {
      updatedFields.description = description;
    }
    if (logo !== undefined) {
      updatedFields.logo = logo;
    }

    const affectedRows = await tables.guilds_pnj.edit(
      guildPNJId,
      updatedFields
    );

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedguildPNJ = await tables.guilds_pnj.read(guildPNJId);
    return res.json({
      message: "Success Update",
      guildPNJ: editedguildPNJ,
    });
  } catch (error) {
    console.error("Error on guildPNJ update", error);
    return res.status(500).json({ message: "Error on guildPNJ update" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    const { name, description, logo } = req.body;

    const guildPNJ = {
      name,
      description,
      logo,
    };

    const insertId = await tables.guilds_pnj.create(guildPNJ);

    res.status(201).json({ message: "Success", id: insertId });
  } catch (err) {
    console.error("Error on guildPNJ creation", err);
    next(err);
  }
};

// The D of BREAD - Delete operation
const destroy = async (req, res, next) => {
  try {
    await tables.guilds_pnj.delete(req.params.id);

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
