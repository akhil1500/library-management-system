const express = require("express");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

const cors = require("cors");
const helmet = require("helmet");
const httpErrors = require("http-errors");
const { getErrorResponse } = require("./helpers/supporter");
const addHeaders = require("./middlewares/addHeaders");

process.on("unhandledRejection", (err)=>{
    console.error(err);
    throw err;
})

const startApp = (mongoDb)=>{
    const app = express();

    // Serve Swagger documentation
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


    app.use(cors(
		{
			"origin": "*",
			"methods": ['GET', 'POST', 'PUT', 'PATCH' , 'DELETE', 'OPTIONS'],
			"preflightContinue": false,
		}
	));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(helmet());

    app.use(addHeaders(mongoDb));
    

    app.get("/olms", (req, res)=>{
        res.json({message: `Hello olms server ${process.env.NODE_ENV}`});
    });
    app.get("/olms/health-check", (req, res)=>{
        res.json({message: `Service is up and running in ${process.env.NODE_ENV}`});
    })

    app.use("/olms/v1/", require("./v1_routes/index"));

    app.use((req, res, next)=>{
        next(httpErrors(404));
    })

    app.use((err, req,res, next)=>{
        const response = getErrorResponse();
        const status = err.status || 500;
        response.message = err.message || "Internal Server Error!";
        response.errorCode = err.error_code;
        res.set({
			"Cache-Control": "no-cache",
		});
        return res.status(status).json(response);
    })


    return app;
}

module.exports = {startApp};