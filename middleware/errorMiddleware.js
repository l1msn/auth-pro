const authError = require("../exceptions/authError")

function errorHandler(error, request, response, next) {
    console.log(error);
    if(error instanceof authError)
        return response.status(error.status).json({message: error.message, errors: error.errors});
    return response.status(500).json({message: "Unexpected error from server"})
}

module.exports = errorHandler;