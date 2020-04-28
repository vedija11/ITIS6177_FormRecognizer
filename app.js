const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

//Import route
const formRecognizer = require('./routes/formRecognizer.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middleware
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Form Recognizer API",
      description: "Form Recognizer API Information",
      contact: {
        name: "Vedija Jagtap"
      },
      servers: ["http://localhost:5000"]
    }
  },
  // ['.routes/*.js']
  apis: ["app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
* @swagger
* /signIn:
*  post:
*    description: Used to authenticate user and generate access-token
*  parameters:
*      - name: username
*        in: query
*        description: username/email of the user
*        required: true
*      - name: password
*        in: query
*        description: password of the user
*        required: true
*  responses:
*      '200':
*        description: A successful signIn
*      '400':
*         description: SignIn unsuccessful because of invalid credentials
*/

/**
* @swagger
* /user/analyzeReceipt:
*    post:
*      description: Signed In user can access the analyze receipt API
*    parameters:
*      - name: imageURL
*        in: query
*        description: URL of the receipt to be analyzed
*        required: true
*    responses:
*      '200':
*        description: Successfully analyzed the receipt using form recognizer API
*      '400':
*        description: Bad request error, Invalid input
*      '415':
*        description: Unsupported media type
*      '500':
*        description: Internal server error
*/

/**
* @swagger
* /analyzeReceipt:
*    post:
*      description: User not signed in but can access the analyze receipt API
*    parameters:
*      - name: imageURL
*        in: query
*        description: URL of the receipt to be analyzed
*        required: true
*    responses:
*      '202':
*        description: Successfully analyzed the receipt using form recognizer API
*      '400':
*        description: Bad request error, Invalid input
*      '415':
*        description: Unsupported media type
*      '500':
*        description: Internal server error
*/

/**
* @swagger
* /receiptResults:
*    get:
*      description: Get Results from receipt that was analyzed
*    responses:
*      '200':
*        description: Successfully returned the results after analyzing the receipt
*      '404':
*        description: Invalid or expired operation Id
*      '500':
*        description: Internal server error
*/


//Route Middleware
app.use('/', formRecognizer);

app.use((req, res, next) => {
  var error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(5000, () => console.log('Listening on port 5000'));