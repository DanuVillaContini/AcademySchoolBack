const { Router } = require("express")
const { check, param, body} = require("express-validator")
const { expressValidations } = require("../middleware/common.validation")
const { showYear } = require("../controllers/year.controllers")

const yearRouter = Router()

yearRouter.get('/show',showYear)

module.exports = yearRouter