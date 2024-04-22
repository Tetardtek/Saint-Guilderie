require("dotenv").config();

const tables = require("../tables");

// The B of BREAD - Browse (Read all) - GET
const browse = async (req, res, next) => {
  try {
    const quest = await tables.quests.readAll();
    res.json(quest);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read one - GET
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const quest = await tables.quests.read(id);

    if (field && quest && Array.isArray(quest[field])) {
      res.json({ [field]: quest[field] });
    } else if (quest) {
      res.json(quest);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const questId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { title, description, reward, id_guilds_pnj } = req.body;

    const quest = await tables.quests.read(questId);

    if (!quest) {
      return res.status(404).json({ message: "quest not found" });
    }

    const updatedFields = {};

    if (title !== undefined) {
      updatedFields.title = title;
    }
    if (description !== undefined) {
      updatedFields.description = description;
    }
    if (reward !== undefined) {
      updatedFields.reward = reward;
    }
    if (id_guilds_pnj !== undefined) {
      updatedFields.id_guilds_pnj = id_guilds_pnj;
    }

    const affectedRows = await tables.quests.edit(questId, updatedFields);

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedquest = await tables.quests.read(questId);
    return res.json({
      message: "Success Update",
      quest: editedquest,
    });
  } catch (error) {
    console.error("Error on quest update", error);
    return res.status(500).json({ message: "Error on quest update" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    const { title, description, reward, id_guilds_pnj } = req.body;

    const quest = {
      title,
      description,
      reward,
      id_guilds_pnj,
    };

    const insertId = await tables.quests.create(quest);

    res.status(201).json({ message: "Success", id: insertId });
  } catch (err) {
    console.error("Error on quest creation", err);
    next(err);
  }
};

// The D of BREAD - Delete operation
const destroy = async (req, res, next) => {
  try {
    await tables.quests.delete(req.params.id);

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
