const express = require("express");
const router = express.Router();
const Shoe = require("../model/Shoe");
const shoesController = require("../controllers/shoes-controller");
const validateToken = require("../middleware/auth");

router.get("/", shoesController.getAllShoes);
router.post("/", shoesController.addShoe);
router.get("/:id", shoesController.getById);
router.put("/:id", shoesController.updateShoe);
router.delete("/:id", shoesController.deleteShoe);

module.exports = router;
