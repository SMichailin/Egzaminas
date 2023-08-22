const Procedure = require("../models/procedureModel");
const User = require("../models/userModel");
const { isValidObjectId } = require("mongoose");

exports.getCategories = async (req, res) => {
  try {
    let categories = await Procedure.distinct("category");

    res.status(200).json({
      status: "success",
      data: {
        categories: categories,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAllProcedures = async (req, res) => {
  const { category } = req.query;

  try {
    let allProcedures;
    if (category) {
      allProcedures = await Procedure.find({ category: category });
    } else {
      allProcedures = await Procedure.find();
    }

    res.status(200).json({
      status: "success",
      data: {
        procedures: allProcedures,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getProcedure = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res
      .status(404)
      .json({ status: "error", mess: `Blogai nurodytas ID` });
  }
  try {
    const procedure = await Procedure.findById(id);
    if (!procedure) {
      return res
        .status(404)
        .json({ status: "error", mess: `Procedūra, id: ${id} neegzistuoja` });
    } else {
      res.status(200).json(procedure);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", mess: err.message });
  }
};

exports.addProcedure = async (req, res) => {
  try {
    const { title, category, duration, imgSrc } = req.body;
    const findProcedure = await Procedure.findOne({ title });
    if (findProcedure) {
      return res.status(400).json({
        status: "error",
        mess: "Procedūra su tokiu pavadinimu jau egzistuoja",
      });
    }
    const newProcedure = await Procedure.create({
      title,
      category,
      duration,
      imgSrc,
    });
    res.status(201).json(newProcedure);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", mess: err });
  }
};

exports.editProcedure = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, duration, imgSrc } = req.body;

    const findProcedure = await Procedure.findOne({ _id: id });
    if (!findProcedure) {
      return res.status(400).json({
        status: "error",
        mess: "Procedūra nerasta",
      });
    }
    try {
      const updated_procedure = await Procedure.findOneAndUpdate(
        {
          _id: id,
        },
        {
          title,
          category,
          duration,
          imgSrc,
        }
      );
      res.json({
        status: "success",
        data: updated_procedure,
      });
    } catch (err) {
      res.status(500).json({ status: "error", mess: err });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", mess: err });
  }
};

exports.deleteProcedure = async (req, res) => {
  try {
    const { id } = req.params;
    const delete_procedure = await Procedure.findById(id);
    if (!delete_procedure) {
      return res
        .status(404)
        .json({ status: "error", mess: `Procedūra nr: ${id} neegzistuoja` });
    } else {
      try {
        await Procedure.findByIdAndDelete(id);
        res.status(200).json({
          status: "success",
          message: `Procedūra nr: ${id} sėkmingai pašalintas.`,
          procedure: delete_procedure,
        });
      } catch (error) {
        res.status(500).json({ status: "error", mess: err });
      }
    }
  } catch (err) {
    res.status(500).json({ status: "error", mess: err });
  }
};
