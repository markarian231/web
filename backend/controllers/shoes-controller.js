const Shoe = require("../model/Shoe");

const getAllShoes = async (req, res, next) => {
  let shoes;
  try {
    shoes = await Shoe.find();
  } catch (err) {
    console.log(err);
  }

  if (!shoes) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ shoes });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let shoe;
  try {
    shoe = await Shoe.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!shoe) {
    return res.status(404).json({ message: "No Shoe found" });
  }
  return res.status(200).json({ shoe });
};

const addShoe = async (req, res, next) => {
  const { name, producent, description, price, available, image } = req.body;
  let shoe;
  try {
    shoe = new Shoe({
      name,
      producent,
      description,
      price,
      available,
      image,
    });
    await shoe.save();
  } catch (err) {
    console.log(err);
  }

  if (!shoe) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({ shoe });
};

const updateShoe = async (req, res, next) => {
  const id = req.params.id;
  const { name, producent, description, price, available, image } = req.body;
  let shoe;
  try {
    shoe = await Shoe.findByIdAndUpdate(id, {
      name,
      producent,
      description,
      price,
      available,
      image,
    });
    shoe = await shoe.save();
  } catch (err) {
    console.log(err);
  }
  if (!shoe) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json({ shoe });
};

const deleteShoe = async (req, res, next) => {
  const id = req.params.id;
  let shoe;
  try {
    shoe = await Shoe.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!shoe) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};

exports.getAllShoes = getAllShoes;
exports.addShoe = addShoe;
exports.getById = getById;
exports.updateShoe = updateShoe;
exports.deleteShoe = deleteShoe;
