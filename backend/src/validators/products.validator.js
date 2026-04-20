import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: "Validation Error",
      errors: errors.array(),
    });
  }
  next();
}

export const createProductValidator = [
  body("title").notEmpty().withMessage("Product name is required"),
  body("description").notEmpty().withMessage("Product description is required"),
  body("priceAmount")
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("priceCurrency")
    .notEmpty()
    .withMessage("Product price currency is required"),
  validateRequest,
];
