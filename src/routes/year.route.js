const { Router } = require("express")
const { check, param, body} = require("express-validator")
const { expressValidations } = require("../middleware/common.validation")
const { showYear } = require("../controllers/year.controllers")

const yearRouter = Router()

// http://localhost:8000/year/show
yearRouter.get('/show',showYear)

module.exports = yearRouter