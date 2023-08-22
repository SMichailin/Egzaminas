exports.validateProcedure = (req, res, next) => {
  let errors = {};
  const { title, category, duration, imgSrc} = req.body;
  if (!title) {
    errors.title = errMessage("required", "Pavadinimas");
  } else if (title.length < 2) {
    errors.title = errMessage("min_symbols", "Pavadinimas", 2);
  } else if (title.length > 40) {
    errors.title = errMessage("max_symbols", "Pavadinimas", 40);
  } 


  if (!category) {
    errors.category = errMessage("required", "Kategorija");
  } else if (category.length < 2) {
    errors.category = errMessage("min_symbols", "Kategorija", 2);
  } else if (category.length > 30) {
    errors.category = errMessage("max_symbols", "Kategorija", 20);
  }


  if (!duration) {
    errors.duration = errMessage("required", "Trukmė");
  } else if (duration <= 0) {
    errors.duration = `Trukmė negali būti trumpesn4 už 1 min`;
  } else if (duration > 500) {
    errors.duration = `Trukmė negali būti ilgesnė nei 300 min`;
  }

  if (!imgSrc) {
    errors.imgSrc = errMessage("required", "Paveikslėlio nuoroda");
  } 

  !Object.keys(errors).length
    ? next()
    : res.status(500).json({ status: "error", data: errors });
};