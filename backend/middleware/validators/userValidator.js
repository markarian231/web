const check = require("express-validator");

const registrationValidator = [
  check.check("email")
    .exists()
    .withMessage("Request body has no EMAIL parameter")
    .isEmail()
    .withMessage("Email address cannot be empty and should have proper format")
    .bail(),
  check.check("firstName")
    .exists()
    .withMessage("Request body has no EMAIL parameter")
    .notEmpty()
    .withMessage("First name is required")
    .bail(),
  check.check("lastName")
    .exists()
    .withMessage("Request body has no EMAIL parameter")
    .notEmpty()
    .withMessage("Last name is required")
    .bail(),
  check.check("password")
    .exists()
    .withMessage("Request body has no EMAIL parameter")
    .notEmpty()
    .withMessage("Password is required")
    .bail(),
];

const loginValidator = [
  check.check("email")
    .exists()
    .withMessage("Request body has no EMAIL parameter")
    .notEmpty()
    .withMessage("Email cannot be empty string")
    .isEmail()
    .withMessage("Email has improper format")
    .bail(),
  check.check("password")
    .exists()
    .withMessage("Request body has no PASSWORD parameter")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .bail(),
];

module.exports = { registrationValidator, loginValidator };
