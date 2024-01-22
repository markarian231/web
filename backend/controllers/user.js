const asyncHandler = require("express-async-handler");
const validationResult = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../model/User");

dotenv.config();

const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult.validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  if (!User.findOne({ email })) {
    res
      .status(403)
      .json({ message: `User with email: ${email} does not exists` });
  }

  const user = await User.findOne({ email });

  if(!user){
    return res.status(400).json("Nie istnieje uzytkownik o podanym adresie email");
  }
  if (await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user.id,
        },
      },
      "haslo123",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ success: true, accessToken });
  } else {
    res.status(200).json({success: false, message:"Email or password is not valid"});
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult.validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Business logic - registration
  const { firstName, lastName, email, password } = req.body;

  if ((await User.findOne({ email })) !== null) {
    res.status(200).json({ result: 0, message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  let newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({ result: 1, user: newUser});
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { loginUser, currentUser, registerUser };
