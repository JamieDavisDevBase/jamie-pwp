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
require("dotenv").config()

const app = express()

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

  response.append("access-control-allow-origin", "*")
  console.log(request.body)
  return response.json("email successfully sent")

}

indexRoute.route("/")
  .get(handleGetRequest)
  .post(validation, handlePostRequest)

app.use("/apis", indexRoute)

app.listen(4200, () => {
  console.log("Express server successfully built")
})



