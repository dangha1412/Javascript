const { check } = require("express-validator");
const userRepo = require("../../repositories/users");
module.exports = {
  requireTitle: check("title")
    .trim()
    .isLength({ min: 5, max: 40 })
    .withMessage("Must between 4 and 20 characters"),
  requirePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage("Must be a number greater than 1"),
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid Email")
    .custom(async (email) => {
      const existingUser = await userRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error("email in use");
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must between 4 and 20 characters"),
  requirePasswordConfirmation: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must between 4 and 20 characters")
    .custom(async (passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("password must match");
      }
    }),
  requireEmailExists: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email")
    .custom(async (email) => {
      const user = await userRepo.getOneBy({ email });
      if (!user) {
        throw new Error("Email not found!");
      }
    }),
  requireValidPasswordForUser: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await userRepo.getOneBy({ email: req.body.email });
      if (!user) {
        throw new Error("Invalid PPassword");
      }
      const validPassword = await userRepo.comparePassword(
        user.password,
        password
      );
      if (!validPassword) {
        throw new Error("Invalid PPassword");
      }
    }),
};
