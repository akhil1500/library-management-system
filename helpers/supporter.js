const getResponseObject = ()=>({
    status: "success",
    message: "",
    data: {},
    errorCode: null
});

const getErrorResponse = ()=> ({
    status: "error",
    message: "",
    data: {},
    errorCode: null
})

module.exports = {
    getResponseObject,
    getErrorResponse
}