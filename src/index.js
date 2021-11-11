//get access to express application
//setup initial middleware
// create a handler/controller for my route
//and setup express to listen on port 4200
//handle form validation
//implement recaptcha
//configure and send emails using mailgun
const express = require("express")
const morgan = require("morgan")
const bodyParser = require('body-parser')
const {check, validationResult} = require("express-validator")
const Mailgun = require("mailgun.js")
const formData = require("form-data")
const Recaptcha = require("express-recaptcha").RecaptchaV2
require("dotenv").config()

const app = express()
const mailgun = new Mailgun(formData)


app.use(morgan("dev"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const indexRoute = express.Router()

const handleGetRequest = (request, response) => {
  return response.json("The express server is live")
}
const validation = [
  check("name", "A valid name is required")
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check("email", "Please provide a valid email")
    .isEmail(),
  check("message", "A message shorter than 2000 characters is required")
    .escape()
    .isLength({min:1, max:2000})

]


const handlePostRequest = (request, response) => {
  const errors = validationResult(request)
  response.append("access-control-allow-origin", "*")
  console.log(request.body)
  return response.json("email successfully sent")

  if(errors.isEmpty() === false) {
    const currentError = errors.array()[0]
  }

}

indexRoute.route("/")
  .get(handleGetRequest)
  .post(validation, recaptcha.verify, handlePostRequest)

app.use("/apis", indexRoute)

app.listen(4200, () => {
  console.log("Express server successfully built")
})



