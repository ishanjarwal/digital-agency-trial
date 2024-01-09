const { check } = require('express-validator');

const formvalidate = [
    check('fullname').not().isEmpty().withMessage("Please provide your name"),
    check('interest').not().isEmpty().withMessage("Please select one"),
    check('contact').not().isEmpty().withMessage("Please provide your contact details"),
    check('projectBrief').not().isEmpty().withMessage("Please describe your project ideas"),
    check('budget').not().isEmpty().withMessage("Please select one")
]
export default formvalidate;