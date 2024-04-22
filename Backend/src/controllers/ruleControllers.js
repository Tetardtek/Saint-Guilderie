require("dotenv").config();

const tables = require("../tables");

// The B of BREAD - Browse (Read all) - GET
const browse = async (req, res, next) => {
  try {
    const rules = await tables.rules.readAll();
    res.json(rules);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read one - GET
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field } = req.query;

    const rule = await tables.rules.read(id);

    if (field && rule && Array.isArray(rule[field])) {
      res.json({ [field]: rule[field] });
    } else if (rule) {
      res.json(rule);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  const ruleId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Empty body" });
    }

    const { description } = req.body;

    const rule = await tables.rules.read(ruleId);

    if (!rule) {
      return res.status(404).json({ message: "rule not found" });
    }

    const updatedFields = {};

    if (description !== undefined) {
      updatedFields.description = description;
    }

    const affectedRows = await tables.rules.edit(ruleId, updatedFields);

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Update fail" });
    }

    const editedrule = await tables.rules.read(ruleId);
    return res.json({
      message: "Success Update",
      rule: editedrule,
    });
  } catch (error) {
    console.error("Error on rule update", error);
    return res.status(500).json({ message: "Error on rule update" });
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    const { description } = req.body;

    const rule = {
      description,
    };

    const insertId = await tables.rules.create(rule);

    res.status(201).json({ message: "Success", id: insertId });
  } catch (err) {
    console.error("Error on rule creation", err);
    next(err);
  }
};

// The D of BREAD - Delete operation
const destroy = async (req, res, next) => {
  try {
    await tables.rules.delete(req.params.id);

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
